const express = require("express");
const router = express.Router();
const pool = require("../../db");

/**
 * @route GET /api/remuneration/components
 * @desc Get all remuneration components
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const { component_type, is_active } = req.query;
    let query = "SELECT * FROM remuneration_components WHERE 1=1";
    const params = [];

    if (component_type) {
      query += " AND component_type = ?";
      params.push(component_type);
    }
    if (is_active !== undefined) {
      query += " AND is_active = ?";
      params.push(is_active === "true" || is_active === true ? 1 : 0);
    }

    query += " ORDER BY name ASC";

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching remuneration components:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch remuneration components",
      message: error.message,
    });
  }
});

/**
 * @route POST /api/remuneration/components
 * @desc Create a new remuneration component
 * @access Public
 */
router.post("/", async (req, res) => {
  try {
    const {
      name,
      code,
      component_type,
      payment_method,
      tax_treatment,
      paid_by,
      calculation_type,
      description,
      is_active = true,
    } = req.body;

    if (!name || !code || !component_type || !paid_by || !calculation_type) {
      return res.status(400).json({
        success: false,
        error: "name, code, component_type, paid_by, and calculation_type are required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO remuneration_components 
       (name, code, component_type, payment_method, tax_treatment, paid_by, calculation_type, description, is_active, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        name,
        code,
        component_type,
        payment_method || null,
        tax_treatment || null,
        paid_by,
        calculation_type,
        description || null,
        is_active ? 1 : 0,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Remuneration component created successfully",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Error creating remuneration component:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create remuneration component",
      message: error.message,
    });
  }
});

/**
 * @route GET /api/remuneration/components/:id
 * @desc Get a single remuneration component
 * @access Public
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM remuneration_components WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Remuneration component not found",
      });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Error fetching remuneration component:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch remuneration component",
      message: error.message,
    });
  }
});

/**
 * @route PUT /api/remuneration/components/:id
 * @desc Update a remuneration component
 * @access Public
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      code,
      component_type,
      payment_method,
      tax_treatment,
      paid_by,
      calculation_type,
      description,
      is_active,
    } = req.body;

    const [result] = await pool.query(
      `UPDATE remuneration_components 
       SET name = ?, code = ?, component_type = ?, payment_method = ?, tax_treatment = ?, 
           paid_by = ?, calculation_type = ?, description = ?, is_active = ?, updated_at = NOW() 
       WHERE id = ?`,
      [
        name,
        code,
        component_type,
        payment_method || null,
        tax_treatment || null,
        paid_by,
        calculation_type,
        description || null,
        is_active ? 1 : 0,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Remuneration component not found",
      });
    }

    res.json({
      success: true,
      message: "Remuneration component updated successfully",
    });
  } catch (error) {
    console.error("Error updating remuneration component:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update remuneration component",
      message: error.message,
    });
  }
});

module.exports = router;
