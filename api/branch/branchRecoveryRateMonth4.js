const express = require('express');
const router = express.Router();
const pool = require('../../../db');

/**
 * @route POST /api/kpi-scores/branch-recovery-rate-month4
 * @desc Record Branch Recovery Rate (Month-4) KPI score
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
      WHERE id = ? AND name = 'Recovery Rate (Month-4)' AND position_id = 5
    `, [kpi_id]);

    if (kpiResult.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Branch Recovery Rate (Month-4) KPI not found'
      });
    }

    const kpi = kpiResult[0];

    // Calculate Branch Recovery Rate (Month-4): Collection rate after 4 months from disbursement
    // Get all loans disbursed 4 months before the effective end date
    const fourMonthsBeforeEnd = new Date(effectiveEndDate);
    fourMonthsBeforeEnd.setMonth(fourMonthsBeforeEnd.getMonth() - 4);
    const fourMonthsBeforeEndStr = fourMonthsBeforeEnd.toISOString().split('T')[0];

    const [recoveryRateResult] = await pool.query(`
      SELECT 
        COUNT(*) AS total_loans,
        SUM(CASE 
            WHEN l.status IN ('closed', 'paid') THEN 1 
            ELSE 0 
        END) AS recovered_loans,
        COALESCE(SUM(l.principal), 0) AS total_principal,
        COALESCE(SUM(CASE 
            WHEN l.status IN ('closed', 'paid') THEN l.principal 
            ELSE 0 
        END), 0) AS recovered_principal
      FROM loans l
      WHERE l.office_id = ?
        AND l.disbursement_date BETWEEN ? AND ?
        AND l.status IN ('disbursed', 'closed', 'paid', 'written_off')
    `, [office_id, fourMonthsBeforeEndStr, effectiveEndDate]);

    // Calculate recovery rate based on principal collected
    const recoveryRate = recoveryRateResult[0].total_principal > 0 
      ? ((recoveryRateResult[0].recovered_principal / recoveryRateResult[0].total_principal) * 100).toFixed(2) 
      : 0;

    // Validate score is percentage (should always be true since we calculated it)
    if (kpi.scoring !== 'percentage') {
      return res.status(500).json({
        success: false,
        error: 'Branch Recovery Rate (Month-4) KPI should have percentage scoring'
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
        [recoveryRate, kpi.id, user_id]
      );
    } else {
      // Insert new score
      await pool.query(
        'INSERT INTO smart_kpi_score (kpi_id, user_id, score, created_date) VALUES (?, ?, ?, NOW())',
        [kpi.id, user_id, recoveryRate]
      );
    }

    res.json({
      success: true,
      message: 'Branch Recovery Rate (Month-4) KPI score recorded successfully',
      data: {
        kpi_id: kpi.id,
        user_id,
        score: parseFloat(recoveryRate),
        kpi_name: kpi.name,
        weight: kpi.weight,
        period: {
          start_date: fourMonthsBeforeEndStr,
          end_date: effectiveEndDate
        },
        calculation: {
          total_loans: recoveryRateResult[0].total_loans,
          recovered_loans: recoveryRateResult[0].recovered_loans,
          total_principal: recoveryRateResult[0].total_principal,
          recovered_principal: recoveryRateResult[0].recovered_principal,
          recovery_rate: parseFloat(recoveryRate)
        }
      }
    });

  } catch (error) {
    console.error('Error recording Branch Recovery Rate (Month-4) KPI score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to record Branch Recovery Rate (Month-4) KPI score',
      message: error.message
    });
  }
});

/**
 * @route GET /api/kpi-scores/branch-recovery-rate-month4/:user_id
 * @desc Get Branch Recovery Rate (Month-4) KPI score for a user
 * @access Public
 */
router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const [scoreResult] = await pool.query(`
      SELECT s.*, k.name, k.description, k.scoring, k.target, k.category, k.weight
      FROM smart_kpi_score s
      JOIN smart_kpis k ON s.kpi_id = k.id
      WHERE k.name = 'Recovery Rate (Month-4)' 
        AND k.position_id = 5
        AND s.user_id = ?
    `, [user_id]);

    if (scoreResult.length === 0) {
      return res.json({
        success: true,
        message: 'No Branch Recovery Rate (Month-4) KPI score found for this user',
        data: null
      });
    }

    res.json({
      success: true,
      data: scoreResult[0]
    });

  } catch (error) {
    console.error('Error fetching Branch Recovery Rate (Month-4) KPI score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Branch Recovery Rate (Month-4) KPI score',
      message: error.message
    });
  }
});

module.exports = router;
