const express = require('express');
const router = express.Router();
const pool = require('../../../db');

/**
 * @route POST /api/kpi-scores/branch-net-contribution
 * @desc Record Branch Net Contribution KPI score
 * @access Public
 */
router.post('/', async (req, res) => {
  try {
    const { user_id, kpi_id, office_id, province_id, start_date, end_date } = req.body;

    // Validate required fields
    if (!user_id || !kpi_id || !office_id) {
      return res.status(400).json({
        success: false,
        error: 'user_id, kpi_id, and office_id are required'
      });
    }

    // Set default dates if not provided (24th of previous month to 24th of current month)
    const today = new Date();
    const defaultStartDate = new Date(today.getFullYear(), today.getMonth() - 1, 24);
    const defaultEndDate = new Date(today.getFullYear(), today.getMonth(), 24);
    
    const effectiveStartDate = start_date || defaultStartDate.toISOString().split('T')[0];
    const effectiveEndDate = end_date || defaultEndDate.toISOString().split('T')[0];

    // Get KPI from database to verify it's the correct one
    const [kpiResult] = await pool.query(`
      SELECT * FROM smart_kpis 
      WHERE id = ? AND name = 'Net Contribution' AND position_id = 5
    `, [kpi_id]);

    if (kpiResult.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Branch Net Contribution KPI not found'
      });
    }

    const kpi = kpiResult[0];

    // Calculate Branch Net Contribution: Total Income - Total Expenses
    // Income includes: interest income, fee income, penalty income, other income, ledger income
    // Expenses include: all approved expenses

    // Calculate total income
    const [incomeResult] = await pool.query(`
      SELECT 
        COALESCE(SUM(lt.interest), 0) AS interest_income,
        COALESCE(SUM(lt.fee), 0) AS fee_income,
        COALESCE(SUM(lt.penalty), 0) AS penalty_income,
        COALESCE(SUM(lt.interest + lt.fee + lt.penalty), 0) AS loan_income,
        COALESCE((SELECT SUM(amount) FROM other_income WHERE office_id = ? AND date BETWEEN ? AND ? AND status = 'approved'), 0) AS other_income,
        COALESCE((SELECT SUM(amount) FROM ledger_income WHERE office_id = ? AND date BETWEEN ? AND ?), 0) AS ledger_income
      FROM loan_transactions lt
      JOIN loans l ON lt.loan_id = l.id
      WHERE l.office_id = ?
        AND lt.transaction_type = 'repayment'
        AND lt.date BETWEEN ? AND ?
        AND lt.status = 'approved'
    `, [office_id, effectiveStartDate, effectiveEndDate, office_id, effectiveStartDate, effectiveEndDate, office_id, effectiveStartDate, effectiveEndDate]);

    // Calculate total expenses
    const [expenseResult] = await pool.query(`
      SELECT COALESCE(SUM(amount), 0) AS total_expenses
      FROM expenses
      WHERE office_id = ?
        AND date BETWEEN ? AND ?
        AND status = 'approved'
    `, [office_id, effectiveStartDate, effectiveEndDate]);

    // Calculate net contribution
    const totalIncome = incomeResult[0].loan_income + incomeResult[0].other_income + incomeResult[0].ledger_income;
    const totalExpenses = expenseResult[0].total_expenses;
    const netContribution = totalIncome - totalExpenses;

    // Validate score is numeric (should always be true since we calculated it)
    if (kpi.scoring !== 'numeric') {
      return res.status(500).json({
        success: false,
        error: 'Branch Net Contribution KPI should have numeric scoring'
      });
    }

    // Check if score already exists
    const [existingScoreResult] = await pool.query(
      'SELECT * FROM smart_kpi_score WHERE kpi_id = ? AND user_id = ?',
      [kpi.id, user_id]
    );

    if (existingScoreResult.length > 0) {
      // Update existing score
      await pool.query(
        'UPDATE smart_kpi_score SET score = ?, created_date = NOW() WHERE kpi_id = ? AND user_id = ?',
        [netContribution, kpi.id, user_id]
      );
    } else {
      // Insert new score
      await pool.query(
        'INSERT INTO smart_kpi_score (kpi_id, user_id, score, created_date) VALUES (?, ?, ?, NOW())',
        [kpi.id, user_id, netContribution]
      );
    }

    res.json({
      success: true,
      message: 'Branch Net Contribution KPI score recorded successfully',
      data: {
        kpi_id: kpi.id,
        user_id,
        score: netContribution,
        kpi_name: kpi.name,
        weight: kpi.weight,
        period: {
          start_date: effectiveStartDate,
          end_date: effectiveEndDate
        },
        calculation: {
          total_income: totalIncome,
          total_expenses: totalExpenses,
          income_breakdown: {
            loan_income: incomeResult[0].loan_income,
            other_income: incomeResult[0].other_income,
            ledger_income: incomeResult[0].ledger_income,
            interest_income: incomeResult[0].interest_income,
            fee_income: incomeResult[0].fee_income,
            penalty_income: incomeResult[0].penalty_income
          }
        }
      }
    });

  } catch (error) {
    console.error('Error recording Branch Net Contribution KPI score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to record Branch Net Contribution KPI score',
      message: error.message
    });
  }
});

/**
 * @route GET /api/kpi-scores/branch-net-contribution/:user_id
 * @desc Get Branch Net Contribution KPI score for a user
 * @access Public
 */
router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const [scoreResult] = await pool.query(`
      SELECT s.*, k.name, k.description, k.scoring, k.target, k.category, k.weight
      FROM smart_kpi_score s
      JOIN smart_kpis k ON s.kpi_id = k.id
      WHERE k.name = 'Net Contribution' 
        AND k.position_id = 5
        AND s.user_id = ?
    `, [user_id]);

    if (scoreResult.length === 0) {
      return res.json({
        success: true,
        message: 'No Branch Net Contribution KPI score found for this user',
        data: null
      });
    }

    res.json({
      success: true,
      data: scoreResult[0]
    });

  } catch (error) {
    console.error('Error fetching Branch Net Contribution KPI score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Branch Net Contribution KPI score',
      message: error.message
    });
  }
});

module.exports = router;
