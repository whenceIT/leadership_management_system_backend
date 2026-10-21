const express = require("express");
const router = express.Router();
const pool = require("../../db");

/**
 * @route GET /api/remuneration/calculate/:assignment_id
 * @desc Calculate remuneration for an employee assignment
 * @access Public
 */
router.get("/calculate/:assignment_id", async (req, res) => {
  try {
    const { assignment_id } = req.params;
    const { period } = req.query;

    if (!period) {
      return res.status(400).json({
        success: false,
        error: "period query parameter is required (YYYY-MM-DD format, typically month end/start)",
      });
    }

    // Get assignment details with config
    const [assignmentRows] = await pool.query(
      `SELECT era.*, 
              u.first_name, u.last_name,
              prc.gross_pay, prc.target_net_pay, prc.currency,
              rt.name as tier_name, rt.tier_number,
              jp.name as position_name
       FROM employee_remuneration_assignments era
       LEFT JOIN users u ON u.id = era.user_id
       LEFT JOIN position_remuneration_configs prc ON prc.id = era.remuneration_config_id
       LEFT JOIN remuneration_tiers rt ON rt.id = prc.remuneration_tier_id
       LEFT JOIN job_positions jp ON jp.id = era.job_position_id
       WHERE era.id = ?`,
      [assignment_id]
    );

    if (assignmentRows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Assignment not found",
      });
    }

    const assignment = assignmentRows[0];
    const configId = assignment.remuneration_config_id;

    // Get component values
    const [componentRows] = await pool.query(
      `SELECT prcv.*, rc.name, rc.code, rc.component_type, rc.paid_by, rc.calculation_type, rc.tax_treatment
       FROM position_remuneration_component_values prcv
       LEFT JOIN remuneration_components rc ON rc.id = prcv.remuneration_component_id
       WHERE prcv.remuneration_config_id = ?`,
      [configId]
    );

    const grossPay = parseFloat(assignment.gross_pay) || 0;
    let totalEmployeeDeductions = 0;
    let totalEmployerContributions = 0;
    let totalCashAllowances = 0;
    let housingAllowance = 0;
    const components = [];

    for (const comp of componentRows) {
      let amount = 0;
      if (comp.amount !== null) {
        amount = parseFloat(comp.amount);
      } else if (comp.percentage !== null && grossPay > 0) {
        const base = grossPay;
        amount = (base * parseFloat(comp.percentage)) / 100;
      }

      const compData = {
        name: comp.name,
        code: comp.code,
        component_type: comp.component_type,
        paid_by: comp.paid_by,
        calculation_type: comp.calculation_type,
        amount: parseFloat(amount.toFixed(2)),
        is_included_in_gross: comp.is_included_in_gross,
        is_included_in_company_cost: comp.is_included_in_company_cost,
      };
      components.push(compData);

      // Categorize
      if (comp.paid_by === "employee" && comp.component_type === "deduction") {
        totalEmployeeDeductions += amount;
      }
      if (comp.paid_by === "employer" || comp.component_type === "employer contribution") {
        totalEmployerContributions += amount;
      }
      if (comp.component_type === "allowance" && comp.paid_by === "employer") {
        // Housing typically paid directly to landlord
        if (comp.code === "housing" || comp.name.toLowerCase().includes("housing")) {
          housingAllowance += amount;
        } else if (comp.is_included_in_company_cost) {
          totalCashAllowances += amount;
        }
      }
    }

    const netCashPay = grossPay - totalEmployeeDeductions;
    const totalMonthlyCostToCompany =
      grossPay + totalEmployerContributions + housingAllowance;

    res.json({
      success: true,
      data: {
        assignment_id,
        period,
        employee: {
          name: `${assignment.first_name} ${assignment.last_name}`,
          user_id: assignment.user_id,
        },
        position: assignment.position_name,
        tier: assignment.tier_name,
        tier_number: assignment.tier_number,
        gross_pay: parseFloat(grossPay.toFixed(2)),
        currency: assignment.currency,
        employee_deductions: parseFloat(totalEmployeeDeductions.toFixed(2)),
        net_cash_pay: parseFloat(netCashPay.toFixed(2)),
        housing_allowance: parseFloat(housingAllowance.toFixed(2)),
        total_direct_value: parseFloat((netCashPay + housingAllowance).toFixed(2)),
        employer_contributions: parseFloat(totalEmployerContributions.toFixed(2)),
        total_monthly_cost_to_company: parseFloat(totalMonthlyCostToCompany.toFixed(2)),
        components,
      },
    });
  } catch (error) {
    console.error("Error calculating remuneration:", error);
    res.status(500).json({
      success: false,
      error: "Failed to calculate remuneration",
      message: error.message,
    });
  }
});

module.exports = router;
