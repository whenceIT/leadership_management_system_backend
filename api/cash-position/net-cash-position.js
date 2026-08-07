const express = require('express');
const router = express.Router();
const pool = require('../../db');

/**
 * @route GET /api/cash-position/net-cash-position
 * @desc Calculate Net Cash Position
 * 
 * Formula: NET CASH POSITION = (Amount Disbursed × 1.40) − Defaults − Mandatory Fixed Costs − Salaries & Performance Allowances
 * 
 * @query {number} office_id - Optional office ID
 * @query {number} province_id - Optional province ID
 * @query {number} district_id - Optional district ID
 * @query {string} start_date - Optional start date (YYYY-MM-DD)
 * @query {string} end_date - Optional end date (YYYY-MM-DD)
 * @access Public
 */

// Helper function to calculate Net Cash Position for a single office
async function calculateNetCashPositionForOffice(officeId, startDate, endDate) {
  // Get office info including workstations
  const [officeInfo] = await pool.query(
    'SELECT name, branch_capacity FROM offices WHERE id = ?',
    [officeId]
  );
  
  const workstations = officeInfo.length > 0 ? (officeInfo[0].branch_capacity || 0) : 0;
  const loanTargetPerWorkstation = 40000;
  const minimumLoanTarget = workstations * loanTargetPerWorkstation;

  // 1. Amount Disbursed - Sum of principal for disbursed loans
  const [disbursedResult] = await pool.query(`
    SELECT COALESCE(SUM(principal), 0) AS total_disbursed
    FROM loans
    WHERE office_id = ?
      AND disbursement_date BETWEEN ? AND ?
  `, [officeId, startDate, endDate]);
  const amountDisbursed = parseFloat(disbursedResult[0].total_disbursed) || 0;

  // 2. Defaults (uncollected amounts) - loans with overdue repayments
  const [defaultsResult] = await pool.query(`
    SELECT COALESCE(SUM(t.total_defaults), 0) AS total_defaults
    FROM loans l
    JOIN (
      SELECT
        loan_id,
        SUM(debit) - SUM(credit) AS total_defaults
      FROM loan_transactions
      WHERE status = 'approved'
      GROUP BY loan_id
    ) t ON l.id = t.loan_id
    WHERE l.office_id = ?
      AND l.status = 'disbursed'
      AND l.first_repayment_date < CURDATE()
      AND t.total_defaults > 0
      AND l.disbursement_date BETWEEN ? AND ?
  `, [officeId, startDate, endDate]);
  const defaults = parseFloat(defaultsResult[0].total_defaults) || 0;

  // 2a. Total Collected - payments received from borrowers
  const [collectedResults] = await pool.query(`
    SELECT COALESCE(SUM(t.total_collected), 0) AS total_collected
    FROM loans l
    JOIN (
      SELECT
        loan_id,
        SUM(credit) AS total_collected
      FROM loan_transactions
      WHERE status = 'approved'
      GROUP BY loan_id
    ) t ON l.id = t.loan_id
    WHERE l.office_id = ?
      AND l.disbursement_date BETWEEN ? AND ?
  `, [officeId, startDate, endDate]);
  const totalCollected = parseFloat(collectedResults[0].total_collected) || 0;

  // 3. Mandatory Fixed Costs (Admin + Building + Statutory)
  const [fixedCostsResult] = await pool.query(`
    SELECT COALESCE(SUM(amount), 0) AS total
    FROM deposits
    WHERE office = ?
      AND deposit_type IN (1,3,5)
      AND status = 1
      AND date BETWEEN ? AND ?
  `, [officeId, startDate, endDate]);
  const [debtResult] = await pool.query(`
    SELECT COALESCE(SUM(amount), 0) AS total
    FROM setup_debt_transactions
    WHERE office_id = ?
      AND status = 1
      AND created_at BETWEEN ? AND ?
  `, [officeId, startDate, endDate]);
  const mandatoryFixedCosts = parseFloat(fixedCostsResult[0].total) + parseFloat(debtResult[0].total);

  // 4. Salaries & Performance Allowances
  const [salariesResult] = await pool.query(`
    SELECT COALESCE(SUM(amount), 0) AS total_salaries
    FROM deposits
    WHERE office = ?
      AND deposit_type = 6
      AND status = 1
      AND date BETWEEN ? AND ?
  `, [officeId, startDate, endDate]);

  // Also get performance allowances from deposits (deposit_type = 7)
  const [allowancesResult] = await pool.query(`
    SELECT COALESCE(SUM(amount), 0) AS total_allowances
    FROM deposits
    WHERE office = ?
      AND deposit_type = 7
      AND status = 1
      AND date BETWEEN ? AND ?
  `, [officeId, startDate, endDate]);

  const salariesAndAllowances = 
    parseFloat(salariesResult[0].total_salaries || 0) + 
    parseFloat(allowancesResult[0].total_allowances || 0);

  // Calculate Net Cash Position
  const adjustedDisbursed = amountDisbursed * 1.40;
  const netCashPosition = adjustedDisbursed - defaults - mandatoryFixedCosts - salariesAndAllowances;
  
  // Calculate shortfall against loan target
  const shortfallAgainstTarget = minimumLoanTarget - adjustedDisbursed;
  const totalMinimumNeeded = shortfallAgainstTarget > 0 ? shortfallAgainstTarget + mandatoryFixedCosts : mandatoryFixedCosts;

  // Calculate collection rate
  const collectionRate = adjustedDisbursed > 0 ? (totalCollected / adjustedDisbursed) * 100 : 0;
  const isCollectionGood = collectionRate >= 90;

  // Determine verdict based on calculations
  let verdict = '';
  let verdictReason = '';

  if (amountDisbursed < minimumLoanTarget) {
    // Under-disbursing branch - problem is disbursement
    verdict = 'Not a going concern';
    verdictReason = `The branch disbursed K${amountDisbursed.toLocaleString()} against a minimum target of K${minimumLoanTarget.toLocaleString()}. Even after accounting for the branch's current collections of K${totalCollected.toLocaleString()} and defaults of K${defaults.toLocaleString()}, it can only bring back K${adjustedDisbursed.toLocaleString()} against a K${minimumLoanTarget.toLocaleString()} target. The shortfall was locked in the day the branch under-disbursed. Adding mandatory fixed costs, K${totalMinimumNeeded.toLocaleString()} is the minimum this branch needs to recover from old defaults, refinancing, or other sources just to stand still. The problem is disbursement, not effort.`;
  } else if (netCashPosition <= 0) {
    // Met target but still losing money - problem is collections
    verdict = 'Not a going concern';
    verdictReason = `The branch disbursed K${amountDisbursed.toLocaleString()} (meeting the target) but has K${defaults.toLocaleString()} in defaults and only K${totalCollected.toLocaleString()} in collected repayments (collection rate: ${collectionRate.toFixed(1)}%). After accounting for the adjusted disbursement of K${adjustedDisbursed.toLocaleString()}, the branch cannot cover mandatory fixed costs (K${mandatoryFixedCosts.toLocaleString()}) and salaries/allowances (K${salariesAndAllowances.toLocaleString()}). This branch is eating its capital despite meeting the disbursement target. The problem is collections, not disbursement. Defaults must be reviewed with the same seriousness as disbursement.`;
  } else if (!isCollectionGood) {
    // Disbursed enough but collection is below 90%
    verdict = 'Not a going concern';
    verdictReason = `The branch disbursed K${amountDisbursed.toLocaleString()} (meeting target) and has positive net cash position (K${netCashPosition.toLocaleString()}), but collection rate is only ${collectionRate.toFixed(1)}% (below 90% threshold). Collected K${totalCollected.toLocaleString()} against expected K${adjustedDisbursed.toLocaleString()}. Defaults must be reviewed with the same seriousness as disbursement.`;
  } else {
    // Healthy branch - positive net cash position and good collection
    const marginPercentage = ((netCashPosition / amountDisbursed) * 100).toFixed(2);
    verdict = 'Going concern';
    verdictReason = `The branch meets the standard on both disbursement (K${amountDisbursed.toLocaleString()}) and collections (${collectionRate.toFixed(1)}% collected). After covering all mandatory costs (K${mandatoryFixedCosts.toLocaleString()}) and salaries/allowances (K${salariesAndAllowances.toLocaleString()}), the branch has a surplus of K${netCashPosition.toLocaleString()} (${marginPercentage}% of disbursed amount). However, this margin is thin - a small increase in defaults or a poor month of disbursement is enough to erase it. The branch needs to be watched, not left alone.`;
  }

  return {
    office_id: officeId,
    office_name: officeInfo.length > 0 ? officeInfo[0].name : null,
    workstations: workstations,
    minimum_loan_target: minimumLoanTarget,
    amount_disbursed: amountDisbursed,
    adjusted_disbursed_140_percent: adjustedDisbursed,
    total_collected: totalCollected,
    collection_rate: parseFloat(collectionRate.toFixed(2)),
    shortfall_against_target: shortfallAgainstTarget,
    defaults: defaults,
    mandatory_fixed_costs: mandatoryFixedCosts,
    salaries_performance_allowances: salariesAndAllowances,
    net_cash_position: netCashPosition,
    total_minimum_needed: totalMinimumNeeded,
    verdict: verdict,
    verdict_reason: verdictReason
  };
}

// Function to calculate Net Cash Position for district (loops through offices in the district)
async function calculateNetCashPositionForDistrict(districtId, startDate, endDate) {
  // Get all offices in the district
  const [officesResult] = await pool.query(
    'SELECT id, name FROM offices WHERE district_id = ?',
    [districtId]
  );

  let totalAmountDisbursed = 0;
  let totalDefaults = 0;
  let totalMandatoryFixedCosts = 0;
  let totalSalariesAndAllowances = 0;
  let totalMinimumLoanTarget = 0;
  let totalCollected = 0;
  const officeBreakdown = [];

  for (const office of officesResult) {
    const result = await calculateNetCashPositionForOffice(office.id, startDate, endDate);
    
    totalAmountDisbursed += result.amount_disbursed;
    totalDefaults += result.defaults;
    totalMandatoryFixedCosts += result.mandatory_fixed_costs;
    totalSalariesAndAllowances += result.salaries_performance_allowances;
    totalMinimumLoanTarget += result.minimum_loan_target;
    totalCollected += result.total_collected;

    officeBreakdown.push({
      office_id: office.id,
      office_name: result.office_name,
      workstations: result.workstations,
      minimum_loan_target: result.minimum_loan_target,
      amount_disbursed: result.amount_disbursed,
      net_cash_position: result.net_cash_position,
      verdict: result.verdict,
      verdict_reason: result.verdict_reason
    });
  }

  const totalAdjustedDisbursed = totalAmountDisbursed * 1.40;
  const totalNetCashPosition = totalAdjustedDisbursed - totalDefaults - totalMandatoryFixedCosts - totalSalariesAndAllowances;
  const shortfallAgainstTarget = totalMinimumLoanTarget - totalAdjustedDisbursed;
  const totalMinimumNeeded = shortfallAgainstTarget > 0 ? shortfallAgainstTarget + totalMandatoryFixedCosts : totalMandatoryFixedCosts;

  // Calculate collection rate
  const collectionRate = totalAdjustedDisbursed > 0 ? (totalCollected / totalAdjustedDisbursed) * 100 : 0;
  const isCollectionGood = collectionRate >= 90;

  // Determine verdict for district
  let verdict = '';
  let verdictReason = '';

  if (totalAmountDisbursed < totalMinimumLoanTarget) {
    verdict = 'Not a going concern';
    verdictReason = `The district disbursed K${totalAmountDisbursed.toLocaleString()} against a minimum target of K${totalMinimumLoanTarget.toLocaleString()}. The problem is overall under-disbursement across offices in this district.`;
  } else if (totalNetCashPosition <= 0) {
    verdict = 'Not a going concern';
    verdictReason = `The district met its disbursement target (K${totalAmountDisbursed.toLocaleString()}) but has high defaults (K${totalDefaults.toLocaleString()}, collection rate: ${collectionRate.toFixed(1)}%). Combined mandatory fixed costs (K${totalMandatoryFixedCosts.toLocaleString()}) and salaries/allowances (K${totalSalariesAndAllowances.toLocaleString()}) exceed the adjusted disbursement (K${totalAdjustedDisbursed.toLocaleString()}). The problem is collections.`;
  } else if (!isCollectionGood) {
    verdict = 'Not a going concern';
    verdictReason = `The district disbursed K${totalAmountDisbursed.toLocaleString()} (meeting target) and has positive net cash position (K${totalNetCashPosition.toLocaleString()}), but collection rate is only ${collectionRate.toFixed(1)}% (below 90% threshold). Collected K${totalCollected.toLocaleString()} against expected K${totalAdjustedDisbursed.toLocaleString()}. Defaults must be reviewed with the same seriousness as disbursement.`;
  } else {
    verdict = 'Going concern';
    verdictReason = `The district meets targets on both disbursement (K${totalAmountDisbursed.toLocaleString()}) and collections (${collectionRate.toFixed(1)}% collected). Net cash position: K${totalNetCashPosition.toLocaleString()}. Margin is thin - needs monitoring.`;
  }

  return {
    district_id: districtId,
    total_minimum_loan_target: totalMinimumLoanTarget,
    total_amount_disbursed: totalAmountDisbursed,
    adjusted_disbursed_140_percent: totalAdjustedDisbursed,
    total_collected: totalCollected,
    collection_rate: parseFloat(collectionRate.toFixed(2)),
    shortfall_against_target: shortfallAgainstTarget,
    defaults: totalDefaults,
    mandatory_fixed_costs: totalMandatoryFixedCosts,
    salaries_performance_allowances: totalSalariesAndAllowances,
    net_cash_position: totalNetCashPosition,
    total_minimum_needed: totalMinimumNeeded,
    verdict: verdict,
    verdict_reason: verdictReason,
    office_breakdown: officeBreakdown
  };
}

// Function to calculate Net Cash Position for province (loops through offices in the province)
async function calculateNetCashPositionForProvince(provinceId, startDate, endDate) {
  // Get all offices in the province
  const [officesResult] = await pool.query(
    'SELECT id, name FROM offices WHERE province_id = ?',
    [provinceId]
  );

  let totalAmountDisbursed = 0;
  let totalDefaults = 0;
  let totalMandatoryFixedCosts = 0;
  let totalSalariesAndAllowances = 0;
  let totalMinimumLoanTarget = 0;
  let totalCollected = 0;
  const officeBreakdown = [];

  for (const office of officesResult) {
    const result = await calculateNetCashPositionForOffice(office.id, startDate, endDate);
    
    totalAmountDisbursed += result.amount_disbursed;
    totalDefaults += result.defaults;
    totalMandatoryFixedCosts += result.mandatory_fixed_costs;
    totalSalariesAndAllowances += result.salaries_performance_allowances;
    totalMinimumLoanTarget += result.minimum_loan_target;
    totalCollected += result.total_collected;

    officeBreakdown.push({
      office_id: office.id,
      office_name: result.office_name,
      workstations: result.workstations,
      minimum_loan_target: result.minimum_loan_target,
      amount_disbursed: result.amount_disbursed,
      net_cash_position: result.net_cash_position,
      verdict: result.verdict,
      verdict_reason: result.verdict_reason
    });
  }

  const totalAdjustedDisbursed = totalAmountDisbursed * 1.40;
  const totalNetCashPosition = totalAdjustedDisbursed - totalDefaults - totalMandatoryFixedCosts - totalSalariesAndAllowances;
  const shortfallAgainstTarget = totalMinimumLoanTarget - totalAdjustedDisbursed;
  const totalMinimumNeeded = shortfallAgainstTarget > 0 ? shortfallAgainstTarget + totalMandatoryFixedCosts : totalMandatoryFixedCosts;

  // Calculate collection rate
  const collectionRate = totalAdjustedDisbursed > 0 ? (totalCollected / totalAdjustedDisbursed) * 100 : 0;
  const isCollectionGood = collectionRate >= 90;

  // Determine verdict for province
  let verdict = '';
  let verdictReason = '';

  if (totalAmountDisbursed < totalMinimumLoanTarget) {
    verdict = 'Not a going concern';
    verdictReason = `The province disbursed K${totalAmountDisbursed.toLocaleString()} against a minimum target of K${totalMinimumLoanTarget.toLocaleString()}. The problem is overall under-disbursement across offices in this province.`;
  } else if (totalNetCashPosition <= 0) {
    verdict = 'Not a going concern';
    verdictReason = `The province met its disbursement target (K${totalAmountDisbursed.toLocaleString()}) but has high defaults (K${totalDefaults.toLocaleString()}, collection rate: ${collectionRate.toFixed(1)}%). Combined mandatory fixed costs (K${totalMandatoryFixedCosts.toLocaleString()}) and salaries/allowances (K${totalSalariesAndAllowances.toLocaleString()}) exceed the adjusted disbursement (K${totalAdjustedDisbursed.toLocaleString()}). The problem is collections.`;
  } else if (!isCollectionGood) {
    verdict = 'Not a going concern';
    verdictReason = `The province disbursed K${totalAmountDisbursed.toLocaleString()} (meeting target) and has positive net cash position (K${totalNetCashPosition.toLocaleString()}), but collection rate is only ${collectionRate.toFixed(1)}% (below 90% threshold). Collected K${totalCollected.toLocaleString()} against expected K${totalAdjustedDisbursed.toLocaleString()}. Defaults must be reviewed with the same seriousness as disbursement.`;
  } else {
    verdict = 'Going concern';
    verdictReason = `The province meets targets on both disbursement (K${totalAmountDisbursed.toLocaleString()}) and collections (${collectionRate.toFixed(1)}% collected). Net cash position: K${totalNetCashPosition.toLocaleString()}. Margin is thin - needs monitoring.`;
  }

  return {
    province_id: provinceId,
    total_minimum_loan_target: totalMinimumLoanTarget,
    total_amount_disbursed: totalAmountDisbursed,
    adjusted_disbursed_140_percent: totalAdjustedDisbursed,
    total_collected: totalCollected,
    collection_rate: parseFloat(collectionRate.toFixed(2)),
    shortfall_against_target: shortfallAgainstTarget,
    defaults: totalDefaults,
    mandatory_fixed_costs: totalMandatoryFixedCosts,
    salaries_performance_allowances: totalSalariesAndAllowances,
    net_cash_position: totalNetCashPosition,
    total_minimum_needed: totalMinimumNeeded,
    verdict: verdict,
    verdict_reason: verdictReason,
    office_breakdown: officeBreakdown
  };
}

router.get('/', async (req, res) => {
  try {
    const todaysDate = new Date().toISOString().split('T')[0];
    const startLimitDate = '2025-01-04';
    
    const { office_id, province_id, district_id, start_date, end_date } = req.query;

    let startDate = start_date || startLimitDate;
    let endDate = end_date || todaysDate;

    // Ensure start date is not earlier than start limit
    if (startDate < startLimitDate) {
      startDate = startLimitDate;
    }

    // Calculate based on filter priority: office_id > district_id > province_id
    if (office_id) {
      // Function to calculate Net Cash Position for office
      const result = await calculateNetCashPositionForOffice(office_id, startDate, endDate);
      
      // Get office name
      const [officeResult] = await pool.query('SELECT name FROM offices WHERE id = ?', [office_id]);
      
      res.json({
        success: true,
        data: {
          filter_type: 'office',
          office_id: parseInt(office_id),
          office_name: officeResult.length > 0 ? officeResult[0].name : null,
          period: { start_date: startDate, end_date: endDate },
          ...result
        }
      });
    } else if (district_id) {
      // Function to calculate Net Cash Position for district
      const result = await calculateNetCashPositionForDistrict(district_id, startDate, endDate);
      
      res.json({
        success: true,
        data: {
          filter_type: 'district',
          district_id: parseInt(district_id),
          period: { start_date: startDate, end_date: endDate },
          ...result
        }
      });
    } else if (province_id) {
      // Function to calculate Net Cash Position for province
      const result = await calculateNetCashPositionForProvince(province_id, startDate, endDate);
      
      res.json({
        success: true,
        data: {
          filter_type: 'province',
          province_id: parseInt(province_id),
          period: { start_date: startDate, end_date: endDate },
          ...result
        }
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Please provide office_id, district_id, or province_id'
      });
    }

  } catch (error) {
    console.error('Error calculating Net Cash Position:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to calculate Net Cash Position',
      message: error.message
    });
  }
});

module.exports = router;