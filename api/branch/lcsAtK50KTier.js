const express = require('express');
const router = express.Router();
const pool = require('../../../db');

/**
 * @route POST /api/kpi-scores/lcs-at-k50k-tier
 * @desc Record LCs at K50K+ Tier KPI score
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
      WHERE id = ? AND name = 'LCs at K50K+ Tier' AND position_id = 5
    `, [kpi_id]);

    if (kpiResult.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'LCs at K50K+ Tier KPI not found'
      });
    }

    const kpi = kpiResult[0];

    // Get all loan consultants (user role == 4) in the office
    const [loanConsultantsResult] = await pool.query(`
      SELECT u.id, u.first_name, u.last_name
      FROM users u
      JOIN role_users ru ON u.id = ru.user_id
      WHERE u.office_id = ? AND ru.role_id = 4 AND u.status = 'Active'
    `, [office_id]);

    const totalLoanConsultants = loanConsultantsResult.length;

    // Calculate number of LCs with K50K+ portfolio tier
    let lcsAtK50KTier = 0;
    for (const consultant of loanConsultantsResult) {
      const [portfolioResult] = await pool.query(`
        SELECT COALESCE(SUM(l.principal), 0) AS total_portfolio
        FROM loans l
        WHERE l.loan_officer_id = ? AND l.status = 'disbursed'
      `, [consultant.id]);

      if (portfolioResult[0].total_portfolio >= 50000) {
        lcsAtK50KTier++;
      }
    }

    // Calculate percentage of LCs at K50K+ tier
    const percentageAtK50KTier = totalLoanConsultants > 0 ? ((lcsAtK50KTier / totalLoanConsultants) * 100).toFixed(2) : 0;

    // Validate score is percentage (should always be true since we calculated it)
    if (kpi.scoring !== 'percentage') {
      return res.status(500).json({
        success: false,
        error: 'LCs at K50K+ Tier KPI should have percentage scoring'
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
        [percentageAtK50KTier, kpi.id, user_id]
      );
    } else {
      // Insert new score
      await pool.query(
        'INSERT INTO smart_kpi_score (kpi_id, user_id, score, created_date) VALUES (?, ?, ?, NOW())',
        [kpi.id, user_id, percentageAtK50KTier]
      );
    }

    res.json({
      success: true,
      message: 'LCs at K50K+ Tier KPI score recorded successfully',
      data: {
        kpi_id: kpi.id,
        user_id,
        score: parseFloat(percentageAtK50KTier),
        kpi_name: kpi.name,
        weight: kpi.weight,
        period: {
          start_date: effectiveStartDate,
          end_date: effectiveEndDate
        },
        calculation: {
          total_loan_consultants: totalLoanConsultants,
          lcs_at_k50k_tier: lcsAtK50KTier,
          percentage_at_k50k_tier: parseFloat(percentageAtK50KTier)
        }
      }
    });

  } catch (error) {
    console.error('Error recording LCs at K50K+ Tier KPI score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to record LCs at K50K+ Tier KPI score',
      message: error.message
    });
  }
});

/**
 * @route GET /api/kpi-scores/lcs-at-k50k-tier/:user_id
 * @desc Get LCs at K50K+ Tier KPI score for a user
 * @access Public
 */
router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const [scoreResult] = await pool.query(`
      SELECT s.*, k.name, k.description, k.scoring, k.target, k.category, k.weight
      FROM smart_kpi_score s
      JOIN smart_kpis k ON s.kpi_id = k.id
      WHERE k.name = 'LCs at K50K+ Tier' 
        AND k.position_id = 5
        AND s.user_id = ?
    `, [user_id]);

    if (scoreResult.length === 0) {
      return res.json({
        success: true,
        message: 'No LCs at K50K+ Tier KPI score found for this user',
        data: null
      });
    }

    res.json({
      success: true,
      data: scoreResult[0]
    });

  } catch (error) {
    console.error('Error fetching LCs at K50K+ Tier KPI score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch LCs at K50K+ Tier KPI score',
      message: error.message
    });
  }
});

module.exports = router;
