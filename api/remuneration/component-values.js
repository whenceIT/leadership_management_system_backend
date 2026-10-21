const express = require("express");
const router = express.Router();
const pool = require("../../db");

/**
 * @route GET /api/remuneration/component-values
 * @desc Get all component values for a config
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const { remuneration_config_id } = req.query;
    let query = `
      SELECT prcv.*, 
             rc.name as component_name, 
             rc.code as component_code,
             rc.component_type,
             rc.paid_by,
             rc.calculation_type
      FROM position_remuneration_component_values prcv
      LEFT JOIN remuneration_components rc ON rc.id = prcv.remuneration_component_id
      WHERE 1=1
    `;
    const params = [];

    if (remuneration_config_id) {
      query += " AND prcv.remuneration_config_id = ?";
      params.push(remuneration_config_id);
    }

    query += " ORDER BY prcv.id ASC";

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching component values:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch component values",
      message: error.message,
    });
  }
});

/**
 * @route POST /api/remuneration/component-values
 * @desc Create/update component value for a config
 * @access Public
 */
router.post("/", async (req, res) => {
  try {
    const {
      remuneration_config_id,
      remuneration_component_id,
      amount,
      percentage,
      calculation_base,
      is_included_in_gross = false,
      is_included_in_company_cost = false,
      notes,
    } = req.body;

    if (!remuneration_config_id || !remuneration_component_id) {
      return res.status(400).json({
        success: false,
        error: "remuneration_config_id and remuneration_component_id are required",
      });
    }

    // Check if exists
    const [existing] = await pool.query(
      "SELECT id FROM position_remuneration_component_values WHERE remuneration_config_id = ? AND remuneration_component_id = ?",
      [remuneration_config_id, remuneration_component_id]
    );

    if (existing.length > 0) {
      // Update
      await pool.query(
        `UPDATE position_remuneration_component_values 
         SET amount = ?, percentage = ?, calculation_base = ?, 
             is_included_in_gross = ?, is_included_in_company_cost = ?, notes = ?, updated_at = NOW() 
         WHERE id = ?`,
        [
          amount || null,
          percentage || null,
          calculation_base || null,
          is_included_in_gross ? 1 : 0,
          is_included_in_company_cost ? 1 : 0,
          notes || null,
          existing[0].id,
        ]
      );
      return res.json({
        success: true,
        message: "Component value updated successfully",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO position_remuneration_component_values 
       (remuneration_config_id, remuneration_component_id, amount, percentage, calculation_base, 
        is_included_in_gross, is_included_in_company_cost, notes, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        remuneration_config_id,
        remuneration_component_id,
        amount || null,
        percentage || null,
        calculation_base || null,
        is_included_in_gross ? 1 : 0,
        is_included_in_company_cost ? 1 : 0,
        notes || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Component value created successfully",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Error creating/updating component value:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create/update component value",
      message: error.message,
    });
  }
});

module.exports = router;
