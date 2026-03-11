const express = require('express');
const router = express.Router();
const pool = require('../../db');

/**
 * @route GET /api/kpi-scores/office-users/:office_id
 * @desc Get all users in a specific office by office_id
 * @access Public
 */
router.get('/:office_id', async (req, res) => {
  try {
    const { office_id } = req.params;

    // Validate office_id is a number
    if (isNaN(office_id) || parseInt(office_id) <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid office_id. Must be a positive number'
      });
    }

    // Get all users in the specified office
    const [users] = await pool.query(`
      SELECT 
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.phone,
        u.status,
        u.designation,
        u.department,
        u.employee_number,
        u.date_of_joining,
        u.office_id,
        o.name AS office_name
      FROM users u
      LEFT JOIN offices o ON u.office_id = o.id
      WHERE u.office_id = ? AND u.status = 'Active'
      ORDER BY u.last_name, u.first_name
    `, [office_id]);

    // Check if office exists (even if no users are found)
    const [officeResult] = await pool.query(
      'SELECT id, name FROM offices WHERE id = ?',
      [office_id]
    );

    if (officeResult.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Office not found'
      });
    }

    res.json({
      success: true,
      office: {
        id: parseInt(office_id),
        name: officeResult[0].name
      },
      count: users.length,
      data: users
    });

  } catch (error) {
    console.error('Error fetching office users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch office users',
      message: error.message
    });
  }
});

/**
 * @route GET /api/kpi-scores/office-users
 * @desc Get all users with office information (optional filter by office_id as query parameter)
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const { office_id } = req.query;

    let query = `
      SELECT 
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.phone,
        u.status,
        u.designation,
        u.department,
        u.employee_number,
        u.date_of_joining,
        u.office_id,
        o.name AS office_name
      FROM users u
      LEFT JOIN offices o ON u.office_id = o.id
      WHERE u.status = 'Active'
    `;

    const params = [];

    if (office_id) {
      // Validate office_id if provided
      if (isNaN(office_id) || parseInt(office_id) <= 0) {
        return res.status(400).json({
          success: false,
          error: 'Invalid office_id. Must be a positive number'
        });
      }
      query += ' AND u.office_id = ?';
      params.push(office_id);
    }

    query += ' ORDER BY u.last_name, u.first_name';

    const [users] = await pool.query(query, params);

    res.json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users',
      message: error.message
    });
  }
});

module.exports = router;