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
             jp.name AS job_position,
             o.name AS office_name,
             d.name AS district_name,
             p.name AS province_name,
             ru.role_id
      FROM users u
      JOIN role_users ru ON ru.user_id = u.id
      LEFT JOIN employee_remuneration_assignments era ON era.user_id = u.id AND era.approval_status = 'approved'
      LEFT JOIN job_positions jp ON jp.id = era.job_position_id
      LEFT JOIN offices o ON o.id = u.office_id
      LEFT JOIN districts d ON d.id = o.district_id
      LEFT JOIN provinces p ON p.id = o.province_id
      WHERE ru.id NOT IN (2, 3)
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
