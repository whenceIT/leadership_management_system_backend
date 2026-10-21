const express = require("express");
const router = express.Router();
const pool = require("../../db");

/**
 * @route GET /api/remuneration/bonus-rules
 * @desc Get bonus rules
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const { job_position_id, status, period } = req.query;
    let query = `
      SELECT rbr.*, jp.name as position_name
      FROM remuneration_bonus_rules rbr
      LEFT JOIN job_positions jp ON jp.id = rbr.job_position_id
      WHERE 1=1
    `;
    const params = [];

    if (job_position_id) {
      query += " AND rbr.job_position_id = ?";
      params.push(job_position_id);
    }
    if (status) {
      query += " AND rbr.status = ?";
      params.push(status);
    }
    if (period) {
      query += " AND rbr.period = ?";
      params.push(period);
    }

    query += " ORDER BY rbr.effective_from DESC";

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching bonus rules:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch bonus rules",
      message: error.message,
    });
  }
});

/**
 * @route POST /api/remuneration/bonus-rules
 * @desc Create bonus rule
 * @access Public
 */
router.post("/", async (req, res) => {
  try {
    const {
      job_position_id,
      bonus_name,
      bonus_type,
      amount,
      percentage,
      performance_metric,
      minimum_target,
      period,
      effective_from,
      effective_to,
      status = "draft",
    } = req.body;

    if (!bonus_name || !bonus_type || !period || !effective_from) {
      return res.status(400).json({
        success: false,
        error: "bonus_name, bonus_type, period, and effective_from are required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO remuneration_bonus_rules 
       (job_position_id, bonus_name, bonus_type, amount, percentage, performance_metric, 
        minimum_target, period, effective_from, effective_to, status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        job_position_id || null,
        bonus_name,
        bonus_type,
        amount || null,
        percentage || null,
        performance_metric || null,
        minimum_target || null,
        period,
        effective_from,
        effective_to || null,
        status,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Bonus rule created successfully",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Error creating bonus rule:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create bonus rule",
      message: error.message,
    });
  }
});

module.exports = router;
