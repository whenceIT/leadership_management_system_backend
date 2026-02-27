const express = require('express');
const router = express.Router();
const pool = require('../../../db');

router.post('/', async (req, res) => {
  try {
    const { user_id, kpi_id, office_id, province_id, start_date, end_date, score } = req.body;

    console.log('Received Month-1 Default Rate KPI score request:', req.body);
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
      WHERE id = ? AND position_id = 5
    `, [kpi_id]);

    if (kpiResult.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Month-1 Default Rate KPI not found'
      });
    }

    const kpi = kpiResult[0];

    let finalScore;
    let calculationDetails;

    if (score !== undefined) {
      // If score is provided, use it directly (manual entry)
      finalScore = parseFloat(score);
      calculationDetails = {
        manual_entry: true,
        provided_score: finalScore
      };
    } else {
      // Calculate Month-1 Default Rate: (Number of loans defaulted within 30 days of disbursement / Total disbursed loans) * 100
      const [totalDisbursedResult] = await pool.query(`
        SELECT 
          COUNT(*) AS total_disbursed
        FROM loans l
        WHERE l.office_id = ?
          AND l.disbursement_date BETWEEN ? AND ?
          AND l.status = 'disbursed'
      `, [office_id, effectiveStartDate, effectiveEndDate]);      
      
      const [defaultedInMonth1Result] = await pool.query(`
        SELECT COUNT(*) AS defaulted_in_month1 FROM loans l 
        WHERE l.office_id = ? 
        AND l.expected_first_repayment_date <= DATE_SUB(CURDATE(), INTERVAL 30 DAY) 
        AND l.disbursement_date BETWEEN ? AND ? 
        AND l.status = 'disbursed';
      `, [office_id, effectiveStartDate, effectiveEndDate]);
      
      const totalDisbursed = totalDisbursedResult[0].total_disbursed || 0;
      const defaultedInMonth1 = defaultedInMonth1Result[0].defaulted_in_month1 || 0;

      finalScore = totalDisbursed > 0 ? ((defaultedInMonth1 / totalDisbursed) * 100).toFixed(2) : 0;

      calculationDetails = {
        manual_entry: false,
        total_disbursed: totalDisbursed,
        defaulted_in_month1: defaultedInMonth1,
        default_rate: parseFloat(finalScore)
      };
    }

    // Validate score is percentage (should always be true since we calculated it)
    if (kpi.scoring !== 'percentage') {
      return res.status(500).json({
        success: false,
        error: 'Month-1 Default Rate KPI should have percentage scoring'
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
        [finalScore, kpi.id, user_id]
      );
    } else {
      // Insert new score
      await pool.query(
        'INSERT INTO smart_kpi_score (kpi_id, user_id, score, created_date) VALUES (?, ?, ?, NOW())',
        [kpi.id, user_id, finalScore]
      );
    }

    res.json({
      success: true,
      message: 'Month-1 Default Rate KPI score recorded successfully',
      data: {
        kpi_id: kpi.id,
        user_id,
        score: parseFloat(finalScore),
        kpi_name: kpi.name,
        weight: kpi.weight,
        period: {
          start_date: effectiveStartDate,
          end_date: effectiveEndDate
        },
        calculation: calculationDetails
      }
    });

  } catch (error) {
    console.error('Error recording Month-1 Default Rate KPI score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to record Month-1 Default Rate KPI score. Try again',
      message: error.message
    });
  }
});

/**
 * @route GET /api/kpi-scores/month1-default-rate/:user_id
 * @desc Get Month-1 Default Rate KPI score for a user
 * @access Public
 */
router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const [scoreResult] = await pool.query(`
      SELECT s.*, k.name, k.description, k.scoring, k.target, k.category, k.weight
      FROM smart_kpi_score s
      JOIN smart_kpis k ON s.kpi_id = k.id
      WHERE k.name = 'Month-1 Default Rate' 
        AND k.position_id = 5
        AND s.user_id = ?
    `, [user_id]);

    if (scoreResult.length === 0) {
      return res.json({
        success: true,
        message: 'No Month-1 Default Rate KPI score found for this user',
        data: null
      });
    }

    res.json({
      success: true,
      data: scoreResult[0]
    });

  } catch (error) {
    console.error('Error fetching Month-1 Default Rate KPI score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Month-1 Default Rate KPI score',
      message: error.message
    });
  }
});

module.exports = router;
