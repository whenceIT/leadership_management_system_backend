const express = require("express");
const router = express.Router();
const pool = require("../../db");
const {
  getCirclePeriod,
  baseTotalOfficeCollected,
  provinceTotalCollected,
  districtTotalCollected,
  payrollmanagerTotalCollected,
  motorloansTotalCollected,
} = require("./performance-creteria-calc");

/**
 * @route GET /api/remuneration/performance-creteria
 * @desc Calculate performance criteria collection totals based on job position
 * @query {string} user_id - Required for payroll_manager / motor_loans positions
 * @query {string} job_position - Required. Determines which calculation runs.
 *   Supported: office_manager | province_manager | district_manager | payroll_manager | motor_loans
 * @query {string} office_id - Required for office_manager / province_manager / district_manager
 * @query {string} [start_date] - Optional circle start date (YYYY-MM-DD)
 * @query {string} [end_date] - Optional circle end date (YYYY-MM-DD)
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const { user_id, job_position, office_id, start_date, end_date } = req.query;

    if (!job_position) {
      return res.status(400).json({
        success: false,
        error: "job_position is required",
      });
    }

    const { startDate, endDate } = getCirclePeriod(start_date, end_date);

    const position = String(job_position).toLowerCase().replace(/\s+/g, "_");
    let total_collected = 0;
    let detail = {};

    switch (position) {
      case "branch_manager":
      case "office": {
        if (!office_id) {
          return res.status(400).json({
            success: false,
            error: "office_id is required for office_manager position",
          });
        }
        total_collected = await baseTotalOfficeCollected(
          office_id,
          startDate,
          endDate
        );
        detail = { scope: "office", office_id };
        break;
      }

      case "province_manager":
      case "province": {
        if (!office_id) {
          return res.status(400).json({
            success: false,
            error: "office_id is required to determine province",
          });
        }
        const [officeRows] = await pool.query(
          `SELECT province_id FROM offices WHERE id = ?`,
          [office_id]
        );
        if (officeRows.length === 0) {
          return res.status(404).json({
            success: false,
            error: "Office not found",
          });
        }
        const [provinceOffices] = await pool.query(
          `SELECT id FROM offices WHERE province_id = ?`,
          [officeRows[0].province_id]
        );
        const provinceOfficeIds = provinceOffices.map((o) => o.id);
        total_collected = await provinceTotalCollected(
          provinceOfficeIds,
          startDate,
          endDate
        );
        detail = {
          scope: "province",
          province_id: officeRows[0].province_id,
          office_ids: provinceOfficeIds,
        };
        break;
      }

      case "district_manager":
      case "district": {
        if (!office_id) {
          return res.status(400).json({
            success: false,
            error: "office_id is required to determine district",
          });
        }
        const [officeRows] = await pool.query(
          `SELECT district_id FROM offices WHERE id = ?`,
          [office_id]
        );
        if (officeRows.length === 0) {
          return res.status(404).json({
            success: false,
            error: "Office not found",
          });
        }
        const [districtOffices] = await pool.query(
          `SELECT id FROM offices WHERE district_id = ?`,
          [officeRows[0].district_id]
        );
        const districtOfficeIds = districtOffices.map((o) => o.id);
        total_collected = await districtTotalCollected(
          districtOfficeIds,
          startDate,
          endDate
        );
        detail = {
          scope: "district",
          district_id: officeRows[0].district_id,
          office_ids: districtOfficeIds,
        };
        break;
      }

      case "payroll_manager":
      case "payrollmanager": {
        if (!user_id) {
          return res.status(400).json({
            success: false,
            error: "user_id is required for payroll_manager position",
          });
        }
        total_collected = await payrollmanagerTotalCollected(
          user_id,
          startDate,
          endDate
        );
        detail = { scope: "payroll_manager", user_id, loan_product_id: 1 };
        break;
      }

      case "motor_vehicle_manager":
      case "motorloans": {
        if (!user_id) {
          return res.status(400).json({
            success: false,
            error: "user_id is required for motor_loans position",
          });
        }
        total_collected = await motorloansTotalCollected(
          user_id,
          startDate,
          endDate
        );
        detail = { scope: "motor_loans", user_id, loan_product_id: 0 };
        break;
      }

      default: {
        return res.status(400).json({
          success: false,
          error: `Unknown job_position: ${job_position}`,
        });
      }
    }

    res.json({
      success: true,
      data: {
        job_position,
        user_id: user_id || null,
        office_id: office_id || null,
        period: {
          start_date: startDate,
          end_date: endDate,
        },
        total_collected: parseFloat(total_collected.toFixed(2)),
        detail,
      },
    });
  } catch (error) {
    console.error("Error calculating performance criteria:", error);
    res.status(500).json({
      success: false,
      error: "Failed to calculate performance criteria",
      message: error.message,
    });
  }
});

module.exports = router;
