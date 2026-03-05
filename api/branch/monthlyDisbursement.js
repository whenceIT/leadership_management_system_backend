const express = require('express');
const router = express.Router();
const pool = require('../../db');

/**
 * @route POST /api/kpi-scores/monthly-disbursement
 * @desc Record Monthly Disbursement KPI score
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
      WHERE id = ? AND name = 'Monthly Disbursement' AND position_id = 5
    `, [kpi_id]);

    if (kpiResult.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Monthly Disbursement KPI not found'
      });
    }

    const kpi = kpiResult[0];

    // Calculate Monthly Disbursement: Total approved amount of disbursed loans
    const [disbursementResult] = await pool.query(`
      SELECT COALESCE(SUM(approved_amount), 0) AS total_disbursement
      FROM loans
      WHERE office_id = ?
        AND status = 'disbursed'
        AND disbursement_date BETWEEN ? AND ?
    `, [office_id, effectiveStartDate, effectiveEndDate]);

    const totalDisbursement = disbursementResult[0].total_disbursement;

    // Validate score is numeric (should always be true since we calculated it)
    if (kpi.scoring !== 'numeric') {
      return res.status(500).json({
        success: false,
        error: 'Monthly Disbursement KPI should have numeric scoring'
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
        [totalDisbursement, kpi.id, user_id]
      );
    } else {
      // Insert new score
      await pool.query(
        'INSERT INTO smart_kpi_score (kpi_id, user_id, score, created_date) VALUES (?, ?, ?, NOW())',
        [kpi.id, user_id, totalDisbursement]
      );
    }

    res.json({
      success: true,
      message: 'Monthly Disbursement KPI score recorded successfully',
      data: {
        kpi_id: kpi.id,
        user_id,
        score: totalDisbursement,
        kpi_name: kpi.name,
        weight: kpi.weight,
        period: {
          start_date: effectiveStartDate,
          end_date: effectiveEndDate
        },
        calculation: {
          total_disbursement: totalDisbursement
        }
      }
    });

  } catch (error) {
    console.error('Error recording Monthly Disbursement KPI score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to record Monthly Disbursement KPI score',
      message: error.message
    });
  }
});

/**
 * @route GET /api/kpi-scores/monthly-disbursement/:user_id
 * @desc Get Monthly Disbursement KPI score for a user
 * @access Public
 */
router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const [scoreResult] = await pool.query(`
      SELECT s.*, k.name, k.description, k.scoring, k.target, k.category, k.weight
      FROM smart_kpi_score s
      JOIN smart_kpis k ON s.kpi_id = k.id
      WHERE k.name = 'Monthly Disbursement' 
        AND k.position_id = 5
        AND s.user_id = ?
    `, [user_id]);

    if (scoreResult.length === 0) {
      return res.json({
        success: true,
        message: 'No Monthly Disbursement KPI score found for this user',
        data: null
      });
    }

    res.json({
      success: true,
      data: scoreResult[0]
    });

  } catch (error) {
    console.error('Error fetching Monthly Disbursement KPI score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Monthly Disbursement KPI score',
      message: error.message
    });
  }
});

module.exports = router;
