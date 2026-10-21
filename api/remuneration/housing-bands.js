const express = require("express");
const router = express.Router();
const pool = require("../../db");

/**
 * @route GET /api/remuneration/housing-bands
 * @desc Get housing bands
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const { job_position_id, remuneration_tier_id, status } = req.query;
    let query = `
      SELECT rhb.*, 
             jp.name as position_name, 
             rt.name as tier_name, 
             rt.tier_number
      FROM remuneration_housing_bands rhb
      LEFT JOIN job_positions jp ON jp.id = rhb.job_position_id
      LEFT JOIN remuneration_tiers rt ON rt.id = rhb.remuneration_tier_id
      WHERE 1=1
    `;
    const params = [];

    if (job_position_id) {
      query += " AND rhb.job_position_id = ?";
      params.push(job_position_id);
    }
    if (remuneration_tier_id) {
      query += " AND rhb.remuneration_tier_id = ?";
      params.push(remuneration_tier_id);
    }
    if (status) {
      query += " AND rhb.status = ?";
      params.push(status);
    }

    query += " ORDER BY rhb.effective_from DESC";

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching housing bands:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch housing bands",
      message: error.message,
    });
  }
});

/**
 * @route POST /api/remuneration/housing-bands
 * @desc Create housing band
 * @access Public
 */
router.post("/", async (req, res) => {
  try {
    const {
      job_position_id,
      remuneration_tier_id,
      monthly_limit,
      effective_from,
      effective_to,
      status = "active",
    } = req.body;

    if (!job_position_id || !remuneration_tier_id || !monthly_limit || !effective_from) {
      return res.status(400).json({
        success: false,
        error: "job_position_id, remuneration_tier_id, monthly_limit, and effective_from are required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO remuneration_housing_bands 
       (job_position_id, remuneration_tier_id, monthly_limit, effective_from, effective_to, status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [job_position_id, remuneration_tier_id, monthly_limit, effective_from, effective_to || null, status]
    );

    res.status(201).json({
      success: true,
      message: "Housing band created successfully",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Error creating housing band:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create housing band",
      message: error.message,
    });
  }
});

module.exports = router;
