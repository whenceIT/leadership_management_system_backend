const express = require("express");
const router = express.Router();
const pool = require("../../db");
const dayjs = require("dayjs");
const {
  getCirclePeriod,
  baseTotalOfficeCollected,
  provinceTotalCollected,
  districtTotalCollected,
  payrollmanagerTotalCollected,
  motorloansTotalCollected,
  recoveriescoordinatorTotalCollected,
  riskmanagerTotalCollected,
  manageradministrationTargetCollected,
  policymanagerTargetCollected,
  performancemanagerTargetCollected,
} = require("./performance-creteria-calc");

/**
 * @route GET /api/remuneration/performance-creteria
 * @desc Calculate performance criteria collection totals based on job position
 * @query {string} user_id - Required for payroll_manager / motor_loans positions (not for manager_administration)
 * @query {string} job_position - Required. Determines which calculation runs.
 *   Supported: office_manager | province_manager | district_manager | payroll_manager | motor_loans | recoveries_coordinator | risk_manager | manager_administration | policy_manager
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

    const { startDate: circleStart, endDate: circleEnd } = getCirclePeriod(
      start_date,
      end_date
    );

    const position = String(job_position).toLowerCase().replace(/\s+/g, "_");

    // manager_administration and policy_manager are annual targets:
    // always filter by the past 12 months, ignoring any passed date params
    let startDate;
    let endDate;
    if (
      position === "manager_administration" ||
      position === "manageradministration" ||
      position === "policy_manager" ||
      position === "policymanager"
    ) {
      startDate = dayjs().subtract(12, "month").startOf("day").format("YYYY-MM-DD");
      endDate = dayjs().endOf("day").format("YYYY-MM-DD");
    } else {
      startDate = circleStart;
      endDate = circleEnd;
    }

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
          office_id = 67
          // return res.status(400).json({
          //   success: false,
          //   error: "office_id is required to determine province",
          // });
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

      case "motor_vehicles_manager":
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

      case "recoveries_coordinator":
      case "recoveriescoordinator": {
        total_collected = await recoveriescoordinatorTotalCollected(
          startDate,
          endDate
        );
        detail = { scope: "recoveries_coordinator" };
        break;
      }

      case "risk_manager":
      case "riskmanager": {
        total_collected = await riskmanagerTotalCollected(
          startDate,
          endDate
        );
        detail = { scope: "risk_manager", all_offices: true };
        break;
      }

      case "manager_administration":
      case "manageradministration": {
        total_collected = await manageradministrationTargetCollected(
          startDate,
          endDate
        );
        detail = { scope: "manager_administration", all_institution: true };
        break;
      }

      case "policy_manager":
      case "policymanager": {
        total_collected = await policymanagerTargetCollected(
          startDate,
          endDate
        );
        detail = { scope: "policy_manager", all_institution: true };
        break;
      }

      case "performance_manager":
      case "performancemanager": {
        total_collected = await performancemanagerTargetCollected(
          startDate,
          endDate
        );
        detail = { scope: "performance_manager", all_institution: true };
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
