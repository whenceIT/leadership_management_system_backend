const express = require("express");
const router = express.Router();
const pool = require("../../db");

/**
 * @route GET /api/remuneration/criteria
 * @desc Get all criteria for a config
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const { remuneration_config_id } = req.query;
    let query = "SELECT * FROM remuneration_criteria WHERE 1=1";
    const params = [];

    if (remuneration_config_id) {
      query += " AND remuneration_config_id = ?";
      params.push(remuneration_config_id);
    }

    query += " ORDER BY id ASC";

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching criteria:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch criteria",
      message: error.message,
    });
  }
});

/**
 * @route POST /api/remuneration/criteria
 * @desc Create a criterion
 * @access Public
 */
router.post("/", async (req, res) => {
  try {
    const {
      remuneration_config_id,
      criterion_name,
      criterion_code,
      measurement_type,
      operator,
      target_value,
      measurement_period,
      is_mandatory = true,
      verification_source,
    } = req.body;

    if (
      !remuneration_config_id ||
      !criterion_name ||
      !criterion_code ||
      !measurement_type ||
      !operator ||
      !measurement_period
    ) {
      return res.status(400).json({
        success: false,
        error: "remuneration_config_id, criterion_name, criterion_code, measurement_type, operator, and measurement_period are required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO remuneration_criteria 
       (remuneration_config_id, criterion_name, criterion_code, measurement_type, operator, 
        target_value, measurement_period, is_mandatory, verification_source, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        remuneration_config_id,
        criterion_name,
        criterion_code,
        measurement_type,
        operator,
        target_value || null,
        measurement_period,
        is_mandatory ? 1 : 0,
        verification_source || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Criterion created successfully",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Error creating criterion:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create criterion",
      message: error.message,
    });
  }
});

module.exports = router;
