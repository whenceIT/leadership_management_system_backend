const express = require("express");
const router = express.Router();
const pool = require("../../db");

/**
 * @route GET /api/remuneration/assessments
 * @desc Get assessments
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const { employee_remuneration_assignment_id, assessment_status } = req.query;
    let query = "SELECT * FROM remuneration_assessments WHERE 1=1";
    const params = [];

    if (employee_remuneration_assignment_id) {
      query += " AND employee_remuneration_assignment_id = ?";
      params.push(employee_remuneration_assignment_id);
    }
    if (assessment_status) {
      query += " AND assessment_status = ?";
      params.push(assessment_status);
    }

    query += " ORDER BY assessment_period DESC";

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching assessments:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch assessments",
      message: error.message,
    });
  }
});

/**
 * @route POST /api/remuneration/assessments
 * @desc Create assessment
 * @access Public
 */
router.post("/", async (req, res) => {
  try {
    const {
      employee_remuneration_assignment_id,
      assessment_period,
      actual_performance,
      achievement_percentage,
      assessment_status = "pending",
      corrective_plan,
      reviewed_by,
      reviewed_at,
      decision,
      decision_notes,
    } = req.body;

    if (!employee_remuneration_assignment_id || !assessment_period) {
      return res.status(400).json({
        success: false,
        error: "employee_remuneration_assignment_id and assessment_period are required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO remuneration_assessments 
       (employee_remuneration_assignment_id, assessment_period, actual_performance, achievement_percentage, 
        assessment_status, corrective_plan, reviewed_by, reviewed_at, decision, decision_notes, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        employee_remuneration_assignment_id,
        assessment_period,
        actual_performance ? JSON.stringify(actual_performance) : null,
        achievement_percentage || null,
        assessment_status,
        corrective_plan || null,
        reviewed_by || null,
        reviewed_at || null,
        decision || null,
        decision_notes || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Assessment created successfully",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Error creating assessment:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create assessment",
      message: error.message,
    });
  }
});

module.exports = router;
