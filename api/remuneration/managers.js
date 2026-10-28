const express = require("express");
const router = express.Router();
const pool = require("../../db");

/**
 * @route GET /api/remuneration/managers
 * @desc Get all managers with job position, office, district, province info
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT u.id,
             u.first_name,
             u.last_name,
             u.email,
             u.phone,
             u.status,
             u.created_at,
             u.office_id,
             o.name AS office_name,
             o.district_id,
             d.name AS district_name,
             o.province_id,
             p.name AS province_name,
             jp.id AS job_position_id,
             jp.name AS job_position,
             ru.role_id
      FROM users u
      JOIN role_users ru ON ru.user_id = u.id
      LEFT JOIN job_positions jp ON jp.id = u.position_id
      LEFT JOIN offices o ON o.id = u.office_id
      LEFT JOIN districts d ON d.id = o.district_id
      LEFT JOIN province p ON p.id = o.province_id
      WHERE ru.role_id NOT IN (2, 3)
        AND u.status = 'active'
      ORDER BY u.created_at DESC
    `;

    const [rows] = await pool.query(query);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching managers:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch managers",
      message: error.message,
    });
  }
});

module.exports = router;
