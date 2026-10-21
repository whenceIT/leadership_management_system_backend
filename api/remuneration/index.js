const express = require("express");
const router = express.Router();
const pool = require("../../db");

/**
 * @route GET /api/remuneration
 * @desc Get overview of remuneration module
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const [tiers] = await pool.query("SELECT COUNT(*) as count FROM remuneration_tiers");
    const [configs] = await pool.query("SELECT COUNT(*) as count FROM position_remuneration_configs WHERE status = 'active'");
    const [components] = await pool.query("SELECT COUNT(*) as count FROM remuneration_components WHERE is_active = 1");
    const [assignments] = await pool.query("SELECT COUNT(*) as count FROM employee_remuneration_assignments WHERE approval_status = 'approved'");

    res.json({
      success: true,
      data: {
        overview: {
          tiers: tiers[0].count,
          active_configs: configs[0].count,
          active_components: components[0].count,
          approved_assignments: assignments[0].count,
        },
        endpoints: {
          tiers: "/api/remuneration/tiers",
          configs: "/api/remuneration/configs",
          components: "/api/remuneration/components",
          component_values: "/api/remuneration/component-values",
          criteria: "/api/remuneration/criteria",
          housing_bands: "/api/remuneration/housing-bands",
          bonus_rules: "/api/remuneration/bonus-rules",
          assignments: "/api/remuneration/assignments",
          assessments: "/api/remuneration/assessments",
          calculate: "/api/remuneration/calculate/:assignment_id?period=YYYY-MM-DD",
        },
      },
    });
  } catch (error) {
    console.error("Error fetching remuneration overview:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch remuneration overview",
      message: error.message,
    });
  }
});

module.exports = router;
