const express = require("express");
const router = express.Router();
const pool = require("../../db");

/**
 * @route GET /api/remuneration/assignments
 * @desc Get employee remuneration assignments
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const { user_id, job_position_id, approval_status } = req.query;
    let query = `
      SELECT era.*, 
             u.first_name, u.last_name, u.email,
             jp.name as position_name,
             prc.gross_pay,
             rt.name as tier_name,
             rt.tier_number
      FROM employee_remuneration_assignments era
      LEFT JOIN users u ON u.id = era.user_id
      LEFT JOIN job_positions jp ON jp.id = era.job_position_id
      LEFT JOIN position_remuneration_configs prc ON prc.id = era.remuneration_config_id
      LEFT JOIN remuneration_tiers rt ON rt.id = prc.remuneration_tier_id
      WHERE 1=1
    `;
    const params = [];

    if (user_id) {
      query += " AND era.user_id = ?";
      params.push(user_id);
    }
    if (job_position_id) {
      query += " AND era.job_position_id = ?";
      params.push(job_position_id);
    }
    if (approval_status) {
      query += " AND era.approval_status = ?";
      params.push(approval_status);
    }

    query += " ORDER BY era.effective_from DESC";

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch assignments",
      message: error.message,
    });
  }
});

/**
 * @route POST /api/remuneration/assignments
 * @desc Create employee remuneration assignment
 * @access Public
 */
router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      job_position_id,
      remuneration_config_id,
      acting_capacity = false,
      effective_from,
      effective_to,
      approval_status = "pending",
      approved_by,
      approved_at,
      notes,
    } = req.body;

    if (!user_id || !job_position_id || !remuneration_config_id || !effective_from) {
      return res.status(400).json({
        success: false,
        error: "user_id, job_position_id, remuneration_config_id, and effective_from are required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO employee_remuneration_assignments 
       (user_id, job_position_id, remuneration_config_id, acting_capacity, effective_from, effective_to, 
        approval_status, approved_by, approved_at, notes, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        user_id,
        job_position_id,
        remuneration_config_id,
        acting_capacity ? 1 : 0,
        effective_from,
        effective_to || null,
        approval_status,
        approved_by || null,
        approved_at || null,
        notes || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Error creating assignment:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create assignment",
      message: error.message,
    });
  }
});

/**
 * @route PUT /api/remuneration/assignments/:id/approve
 * @desc Approve an assignment
 * @access Public
 */
router.put("/:id/approve", async (req, res) => {
  try {
    const { id } = req.params;
    const { approved_by } = req.body;

    const [result] = await pool.query(
      "UPDATE employee_remuneration_assignments SET approval_status = 'approved', approved_by = ?, approved_at = NOW(), updated_at = NOW() WHERE id = ?",
      [approved_by || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Assignment not found",
      });
    }

    res.json({
      success: true,
      message: "Assignment approved successfully",
    });
  } catch (error) {
    console.error("Error approving assignment:", error);
    res.status(500).json({
      success: false,
      error: "Failed to approve assignment",
      message: error.message,
    });
  }
});

module.exports = router;
