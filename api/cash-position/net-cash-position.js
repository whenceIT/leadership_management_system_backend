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
  // 1. Amount Disbursed - Sum of principal for disbursed loans
  const [disbursedResult] = await pool.query(`
    SELECT COALESCE(SUM(principal), 0) AS total_disbursed
    FROM loans
    WHERE office_id = ?
      AND disbursement_date BETWEEN ? AND ?
  `, [officeId, startDate, endDate]);
  const amountDisbursed = parseFloat(disbursedResult[0].total_disbursed) || 0;

  // 2. Defaults (uncollected amounts) - written off loans principal
  const [defaultsResult] = await pool.query(`
      SELECT
          COALESCE(SUM(t.outstanding_balance), 0) AS total_defaults
      FROM loans l
      JOIN (
          SELECT
              loan_id,
              SUM(debit) - SUM(credit) AS total_defaults
          FROM loan_transactions
            AND status = 'disbursed'
          GROUP BY loan_id
      ) t ON l.id = t.loan_id
      WHERE l.office_id = ?
        AND l.status = 'disbursed'
        AND l.first_repayment_date < CURDATE()
        AND t.total_defaults > 0
        AND l.created_at BETWEEN ? AND ?
  `, [officeId, startDate, endDate]);
  const defaults = parseFloat(defaultsResult[0].total_defaults) || 0;

  // 3. Mandatory Fixed Costs (Admin + Building + Statutory)
  const [fixedCostsResult] = await pool.query(`
      SELECT COALESCE(SUM(amount), 0) AS total
      FROM deposits
      WHERE office_id = ?
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
      WHERE office_id = ?
        AND deposit_type = 6
        AND status = 1
        AND date BETWEEN ? AND ?
  `, [officeId, startDate, endDate]);

  const salariesAndAllowances = 
    parseFloat(salariesResult[0].total_salaries || 0) + 
    parseFloat(salariesResult[0].total_allowances || 0);


  // Calculate Net Cash Position
  const adjustedDisbursed = amountDisbursed * 1.40;
  const netCashPosition = adjustedDisbursed - defaults - mandatoryFixedCosts - salariesAndAllowances;

  return {
    office_id: officeId,
    amount_disbursed: amountDisbursed,
    adjusted_disbursed_140_percent: adjustedDisbursed,
    defaults: defaults,
    mandatory_fixed_costs: mandatoryFixedCosts,
    salaries_performance_allowances: salariesAndAllowances,
    net_cash_position: netCashPosition
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
  const officeBreakdown = [];

  for (const office of officesResult) {
    const result = await calculateNetCashPositionForOffice(office.id, startDate, endDate);
    
    totalAmountDisbursed += result.amount_disbursed;
    totalDefaults += result.defaults;
    totalMandatoryFixedCosts += result.mandatory_fixed_costs;
    totalSalariesAndAllowances += result.salaries_performance_allowances;

    officeBreakdown.push({
      office_id: office.id,
      office_name: office.name,
      net_cash_position: result.net_cash_position
    });
  }

  const totalAdjustedDisbursed = totalAmountDisbursed * 1.40;
  const totalNetCashPosition = totalAdjustedDisbursed - totalDefaults - totalMandatoryFixedCosts - totalSalariesAndAllowances;

  return {
    district_id: districtId,
    total_amount_disbursed: totalAmountDisbursed,
    adjusted_disbursed_140_percent: totalAdjustedDisbursed,
    defaults: totalDefaults,
    mandatory_fixed_costs: totalMandatoryFixedCosts,
    salaries_performance_allowances: totalSalariesAndAllowances,
    net_cash_position: totalNetCashPosition,
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
  const officeBreakdown = [];

  for (const office of officesResult) {
    const result = await calculateNetCashPositionForOffice(office.id, startDate, endDate);
    
    totalAmountDisbursed += result.amount_disbursed;
    totalDefaults += result.defaults;
    totalMandatoryFixedCosts += result.mandatory_fixed_costs;
    totalSalariesAndAllowances += result.salaries_performance_allowances;

    officeBreakdown.push({
      office_id: office.id,
      office_name: office.name,
      net_cash_position: result.net_cash_position
    });
  }

  const totalAdjustedDisbursed = totalAmountDisbursed * 1.40;
  const totalNetCashPosition = totalAdjustedDisbursed - totalDefaults - totalMandatoryFixedCosts - totalSalariesAndAllowances;

  return {
    province_id: provinceId,
    total_amount_disbursed: totalAmountDisbursed,
    adjusted_disbursed_140_percent: totalAdjustedDisbursed,
    defaults: totalDefaults,
    mandatory_fixed_costs: totalMandatoryFixedCosts,
    salaries_performance_allowances: totalSalariesAndAllowances,
    net_cash_position: totalNetCashPosition,
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