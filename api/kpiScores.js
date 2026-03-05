const express = require('express');
const router = express.Router();
const pool = require('../../db');

/**
 * @route POST /api/kpi-scores
 * @desc Record KPI scores for users
 * @access Public
 */
router.post('/', async (req, res) => {
  try {
    const { kpi_id, user_id, score } = req.body;

    // Validate required fields
    if (!kpi_id || !user_id) {
      return res.status(400).json({
        success: false,
        error: 'kpi_id and user_id are required'
      });
    }

    // Get KPI details to validate scoring type and weight
    const [kpiResult] = await pool.query(
      'SELECT * FROM smart_kpis WHERE id = ?',
      [kpi_id]
    );

    if (kpiResult.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'KPI not found'
      });
    }

    const kpi = kpiResult[0];

    // Validate score based on KPI type
    let validatedScore = score;
    if (kpi.scoring === 'percentage') {
      // For percentage scoring, ensure score is between 0-100
      if (score < 0 || score > 100) {
        return res.status(400).json({
          success: false,
          error: 'Percentage score must be between 0 and 100'
        });
      }
    } else if (kpi.scoring === 'numeric') {
      // For numeric scoring, ensure score is non-negative
      if (score < 0) {
        return res.status(400).json({
          success: false,
          error: 'Numeric score must be non-negative'
        });
      }
    }

    // Check if score already exists for this KPI and user
    const [existingScoreResult] = await pool.query(
      'SELECT * FROM smart_kpi_score WHERE kpi_id = ? AND user_id = ?',
      [kpi_id, user_id]
    );

    if (existingScoreResult.length > 0) {
      // Update existing score
      await pool.query(
        'UPDATE smart_kpi_score SET score = ?, created_date = NOW() WHERE kpi_id = ? AND user_id = ?',
        [validatedScore, kpi_id, user_id]
      );
    } else {
      // Insert new score
      await pool.query(
        'INSERT INTO smart_kpi_score (kpi_id, user_id, score, created_date) VALUES (?, ?, ?, NOW())',
        [kpi_id, user_id, validatedScore]
      );
    }

    res.json({
      success: true,
      message: 'KPI score recorded successfully'
    });

  } catch (error) {
    console.error('Error recording KPI score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to record KPI score',
      message: error.message
    });
  }
});

/**
 * @route POST /api/kpi-scores/batch
 * @desc Record multiple KPI scores in batch
 * @access Public
 */
router.post('/batch', async (req, res) => {
  try {
    const { scores } = req.body;

    if (!scores || !Array.isArray(scores) || scores.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Scores must be provided as a non-empty array'
      });
    }

    const validScores = [];
    const errors = [];

    // Validate each score
    for (let i = 0; i < scores.length; i++) {
      const scoreData = scores[i];
      const { kpi_id, user_id, score } = scoreData;

      if (!kpi_id || !user_id) {
        errors.push(`Score ${i + 1}: kpi_id and user_id are required`);
        continue;
      }

      // Get KPI details
      const [kpiResult] = await pool.query(
        'SELECT * FROM smart_kpis WHERE id = ?',
        [kpi_id]
      );

      if (kpiResult.length === 0) {
        errors.push(`Score ${i + 1}: KPI not found`);
        continue;
      }

      const kpi = kpiResult[0];

      // Validate score based on KPI type
      let validatedScore = score;
      if (kpi.scoring === 'percentage') {
        if (score < 0 || score > 100) {
          errors.push(`Score ${i + 1}: Percentage score must be between 0 and 100`);
          continue;
        }
      } else if (kpi.scoring === 'numeric') {
        if (score < 0) {
          errors.push(`Score ${i + 1}: Numeric score must be non-negative`);
          continue;
        }
      }

      validScores.push({
        kpi_id,
        user_id,
        score: validatedScore
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }

    // Process valid scores
    for (const scoreData of validScores) {
      const { kpi_id, user_id, score } = scoreData;

      // Check if score already exists
      const [existingScoreResult] = await pool.query(
        'SELECT * FROM smart_kpi_score WHERE kpi_id = ? AND user_id = ?',
        [kpi_id, user_id]
      );

      if (existingScoreResult.length > 0) {
        await pool.query(
          'UPDATE smart_kpi_score SET score = ?, created_date = NOW() WHERE kpi_id = ? AND user_id = ?',
          [score, kpi_id, user_id]
        );
      } else {
        await pool.query(
          'INSERT INTO smart_kpi_score (kpi_id, user_id, score, created_date) VALUES (?, ?, ?, NOW())',
          [kpi_id, user_id, score]
        );
      }
    }

    res.json({
      success: true,
      message: `Successfully recorded ${validScores.length} KPI scores`,
      details: {
        total: scores.length,
        successful: validScores.length,
        failed: errors.length
      }
    });

  } catch (error) {
    console.error('Error recording batch KPI scores:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to record batch KPI scores',
      message: error.message
    });
  }
});

/**
 * @route GET /api/kpi-scores/user/:user_id
 * @desc Get all KPI scores for a specific user
 * @access Public
 */
router.get('/user/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const [scores] = await pool.query(`
      SELECT 
        s.id AS score_id,
        s.kpi_id,
        s.user_id,
        s.score,
        s.created_date,
        k.name,
        k.description,
        k.scoring,
        k.target,
        k.role,
        k.position_id,
        k.category,
        k.weight
      FROM smart_kpi_score s
      JOIN smart_kpis k ON s.kpi_id = k.id
      WHERE s.user_id = ?
      ORDER BY k.category, k.name
    `, [user_id]);

    res.json({
      success: true,
      count: scores.length,
      data: scores
    });

  } catch (error) {
    console.error('Error fetching user KPI scores:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user KPI scores',
      message: error.message
    });
  }
});

/**
 * @route GET /api/kpi-scores/user/:user_id/position/:position_id
 * @desc Get KPI scores for a user by position
 * @access Public
 */
router.get('/user/:user_id/position/:position_id', async (req, res) => {
  try {
    const { user_id, position_id } = req.params;

    const [scores] = await pool.query(`
      SELECT 
        s.id AS score_id,
        k.id AS kpi_id,
        s.user_id,
        s.score,
        s.created_date,
        k.name,
        k.description,
        k.scoring,
        k.target,
        k.role,
        k.position_id,
        k.category,
        k.weight
      FROM smart_kpis k
      LEFT JOIN smart_kpi_score s 
          ON s.kpi_id = k.id 
          AND s.user_id = ?
      WHERE k.position_id = ?
      ORDER BY k.category, k.name
    `, [user_id, position_id]);

    res.json({
      success: true,
      count: scores.length,
      data: scores
    });

  } catch (error) {
    console.error('Error fetching user KPI scores by position:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user KPI scores by position',
      message: error.message
    });
  }
});

/**
 * @route GET /api/kpi-scores/kpi/:kpi_id
 * @desc Get all scores for a specific KPI
 * @access Public
 */
router.get('/kpi/:kpi_id', async (req, res) => {
  try {
    const { kpi_id } = req.params;

    const [scores] = await pool.query(`
      SELECT 
        s.id AS score_id,
        s.kpi_id,
        s.user_id,
        s.score,
        s.created_date,
        u.first_name,
        u.last_name,
        u.email,
        u.office_id
      FROM smart_kpi_score s
      JOIN users u ON s.user_id = u.id
      WHERE s.kpi_id = ?
      ORDER BY s.created_date DESC
    `, [kpi_id]);

    res.json({
      success: true,
      count: scores.length,
      data: scores
    });

  } catch (error) {
    console.error('Error fetching KPI scores:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch KPI scores',
      message: error.message
    });
  }
});

/**
 * @route GET /api/kpi-scores/calculate/:user_id/:position_id
 * @desc Calculate total weighted KPI score for a user by position
 * @access Public
 */
router.get('/calculate/:user_id/:position_id', async (req, res) => {
  try {
    const { user_id, position_id } = req.params;

    const [scoresResult] = await pool.query(`
      SELECT 
        s.score,
        k.weight
      FROM smart_kpi_score s
      JOIN smart_kpis k ON s.kpi_id = k.id
      WHERE s.user_id = ? AND k.position_id = ?
    `, [user_id, position_id]);

    if (scoresResult.length === 0) {
      return res.json({
        success: true,
        message: 'No KPI scores found for this user and position',
        data: {
          total_score: 0,
          max_possible_score: 0,
          percentage: 0,
          scores_count: 0
        }
      });
    }

    // Calculate total weighted score
    let totalWeightedScore = 0;
    let totalWeight = 0;

    scoresResult.forEach(row => {
      const score = parseFloat(row.score);
      const weight = parseFloat(row.weight);
      
      totalWeightedScore += (score * weight) / 100; // Assuming scores are percentages
      totalWeight += weight;
    });

    // Calculate percentage (0-100 scale)
    const percentage = totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0;

    res.json({
      success: true,
      data: {
        total_score: parseFloat(totalWeightedScore.toFixed(2)),
        max_possible_score: parseFloat(totalWeight.toFixed(2)),
        percentage: parseFloat(percentage.toFixed(2)),
        scores_count: scoresResult.length
      }
    });

  } catch (error) {
    console.error('Error calculating KPI score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to calculate KPI score',
      message: error.message
    });
  }
});

/**
 * @route DELETE /api/kpi-scores/:id
 * @desc Delete a specific KPI score
 * @access Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM smart_kpi_score WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'KPI score not found'
      });
    }

    res.json({
      success: true,
      message: 'KPI score deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting KPI score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete KPI score',
      message: error.message
    });
  }
});

/**
 * @route DELETE /api/kpi-scores/user/:user_id
 * @desc Delete all KPI scores for a specific user
 * @access Public
 */
router.delete('/user/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM smart_kpi_score WHERE user_id = ?',
      [user_id]
    );

    res.json({
      success: true,
      message: `Successfully deleted ${result.affectedRows} KPI scores for user ${user_id}`
    });

  } catch (error) {
    console.error('Error deleting user KPI scores:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete user KPI scores',
      message: error.message
    });
  }
});

module.exports = router;
