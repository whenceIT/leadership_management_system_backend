const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM remuneration_tiers ORDER BY tier_number ASC"
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching remuneration tiers:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch remuneration tiers",
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { tier_number, name, description, is_active = true } = req.body;
    if (!tier_number || !name) {
      return res.status(400).json({ success: false, error: "tier_number and name are required" });
    }
    const [result] = await pool.query(
      "INSERT INTO remuneration_tiers (tier_number, name, description, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [tier_number, name, description || null, is_active ? 1 : 0]
    );
    res.status(201).json({ success: true, message: "Remuneration tier created successfully", data: { id: result.insertId } });
  } catch (error) {
    console.error("Error creating remuneration tier:", error);
    res.status(500).json({ success: false, error: "Failed to create remuneration tier", message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM remuneration_tiers WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: "Remuneration tier not found" });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Error fetching remuneration tier:", error);
    res.status(500).json({ success: false, error: "Failed to fetch remuneration tier", message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { tier_number, name, description, is_active } = req.body;
    const [result] = await pool.query(
      "UPDATE remuneration_tiers SET tier_number = ?, name = ?, description = ?, is_active = ?, updated_at = NOW() WHERE id = ?",
      [tier_number, name, description || null, is_active ? 1 : 0, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Remuneration tier not found" });
    }
    res.json({ success: true, message: "Remuneration tier updated successfully" });
  } catch (error) {
    console.error("Error updating remuneration tier:", error);
    res.status(500).json({ success: false, error: "Failed to update remuneration tier", message: error.message });
  }
});

module.exports = router;
