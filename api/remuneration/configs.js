const express = require("express");
const router = express.Router();
const pool = require("../../db");

/**
 * @route GET /api/remuneration/configs
 * @desc Get all position remuneration configs
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const { job_position_id, remuneration_tier_id, status } = req.query;
    let query = `
      SELECT prc.*, 
             jp.name as position_name, 
             rt.name as tier_name, 
             rt.tier_number
      FROM position_remuneration_configs prc
      LEFT JOIN job_positions jp ON jp.id = prc.job_position_id
      LEFT JOIN remuneration_tiers rt ON rt.id = prc.remuneration_tier_id
      WHERE 1=1
    `;
    const params = [];

    if (job_position_id) {
      query += " AND prc.job_position_id = ?";
      params.push(job_position_id);
    }
    if (remuneration_tier_id) {
      query += " AND prc.remuneration_tier_id = ?";
      params.push(remuneration_tier_id);
    }
    if (status) {
      query += " AND prc.status = ?";
      params.push(status);
    }

    query += " ORDER BY prc.effective_from DESC";

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching position remuneration configs:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch position remuneration configs",
      message: error.message,
    });
  }
});

/**
 * @route POST /api/remuneration/configs
 * @desc Create a new position remuneration config
 * @access Public
 */
router.post("/", async (req, res) => {
  try {
    const {
      job_position_id,
      remuneration_tier_id,
      gross_pay,
      target_net_pay,
      currency = "ZMW",
      threshold_type,
      threshold_amount,
      threshold_operator,
      threshold_upper_amount,
      threshold_period,
      min_branches,
      max_branches,
      effective_from,
      effective_to,
      status = "draft",
    } = req.body;

    if (!job_position_id || !remuneration_tier_id || !gross_pay || !effective_from) {
      return res.status(400).json({
        success: false,
        error: "job_position_id, remuneration_tier_id, gross_pay, and effective_from are required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO position_remuneration_configs 
       (job_position_id, remuneration_tier_id, gross_pay, target_net_pay, currency, 
        threshold_type, threshold_amount, threshold_operator, threshold_upper_amount, 
        threshold_period, min_branches, max_branches, effective_from, effective_to, status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        job_position_id,
        remuneration_tier_id,
        gross_pay,
        target_net_pay || null,
        currency,
        threshold_type || null,
        threshold_amount || null,
        threshold_operator || null,
        threshold_upper_amount || null,
        threshold_period || null,
        min_branches || null,
        max_branches || null,
        effective_from,
        effective_to || null,
        status,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Position remuneration config created successfully",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Error creating position remuneration config:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create position remuneration config",
      message: error.message,
    });
  }
});

/**
 * @route GET /api/remuneration/configs/:id
 * @desc Get a single position remuneration config
 * @access Public
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT prc.*, 
              jp.name as position_name, 
              rt.name as tier_name, 
              rt.tier_number
       FROM position_remuneration_configs prc
       LEFT JOIN job_positions jp ON jp.id = prc.job_position_id
       LEFT JOIN remuneration_tiers rt ON rt.id = prc.remuneration_tier_id
       WHERE prc.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Position remuneration config not found",
      });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Error fetching position remuneration config:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch position remuneration config",
      message: error.message,
    });
  }
});

/**
 * @route PUT /api/remuneration/configs/:id
 * @desc Update a position remuneration config
 * @access Public
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      job_position_id,
      remuneration_tier_id,
      gross_pay,
      target_net_pay,
      currency,
      threshold_type,
      threshold_amount,
      threshold_operator,
      threshold_upper_amount,
      threshold_period,
      min_branches,
      max_branches,
      effective_from,
      effective_to,
      status,
    } = req.body;

    const [result] = await pool.query(
      `UPDATE position_remuneration_configs 
       SET job_position_id = ?, remuneration_tier_id = ?, gross_pay = ?, target_net_pay = ?, 
           currency = ?, threshold_type = ?, threshold_amount = ?, threshold_operator = ?, 
           threshold_upper_amount = ?, threshold_period = ?, min_branches = ?, max_branches = ?, 
           effective_from = ?, effective_to = ?, status = ?, updated_at = NOW() 
       WHERE id = ?`,
      [
        job_position_id,
        remuneration_tier_id,
        gross_pay,
        target_net_pay || null,
        currency,
        threshold_type || null,
        threshold_amount || null,
        threshold_operator || null,
        threshold_upper_amount || null,
        threshold_period || null,
        min_branches || null,
        max_branches || null,
        effective_from,
        effective_to || null,
        status,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Position remuneration config not found",
      });
    }

    res.json({
      success: true,
      message: "Position remuneration config updated successfully",
    });
  } catch (error) {
    console.error("Error updating position remuneration config:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update position remuneration config",
      message: error.message,
    });
  }
});

module.exports = router;
