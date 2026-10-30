const pool = require("../../db");
const dayjs = require("dayjs");

/**
 * Derive the circle period.
 * Default: 24th of previous month to 24th of current month.
 * @param {string} start_date
 * @param {string} end_date
 * @returns {{startDate: string, endDate: string}}
 */
function getCirclePeriod(start_date, end_date) {
  let startDate;
  let endDate;

  if (start_date && end_date) {
    startDate = start_date;
    endDate = end_date;
  } else {
    const today = dayjs();
    startDate = today.subtract(1, "month").date(24).format("YYYY-MM-DD");
    endDate = today.date(24).format("YYYY-MM-DD");
  }

  return { startDate, endDate };
}

/**
 * Sum collected amount for a set of loan_ids within a date range.
 * Mirrors the total_collected logic in api/performance/index.js:
 *   repayment + reloan_payment   -> balance_bf
 *   repayment + full_payment     -> credit
 *   repayment + part_payment     -> credit
 * @param {number[]} loanIds
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Promise<number>}
 */
async function sumCollectedForLoans(loanIds, startDate, endDate) {
  if (!loanIds || loanIds.length === 0) {
    return 0;
  }

  const [transactions] = await pool.query(
    `SELECT loan_id, debit, credit, transaction_type, payment_apply_to, balance_bf
     FROM loan_transactions
     WHERE loan_id IN (?) AND date >= ? AND date <= ?`,
    [loanIds, startDate, endDate]
  );

  let total_collected = 0;
  transactions.forEach((t) => {
    const credit = Number(t.credit) || 0;
    if (t.transaction_type === "repayment") {
      if (t.payment_apply_to === "reloan_payment") {
        total_collected += Number(t.balance_bf) || 0;
      } else if (["full_payment", "part_payment"].includes(t.payment_apply_to)) {
        total_collected += credit;
      }
    }
  });

  return total_collected;
}

/**
 * Total collected for all active consultants in an office during the circle period.
 * @param {number} office_id
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Promise<number>}
 */
async function baseTotalOfficeCollected(office_id, startDate, endDate) {
  const [consultants] = await pool.query(
    `SELECT u.id
     FROM users u
     JOIN role_users ru ON ru.user_id = u.id
     WHERE ru.role_id IN (3,4)
       AND u.office_id = ?
       AND u.status = 'active'`,
    [office_id]
  );

  const userIds = consultants.map((c) => c.id);
  if (userIds.length === 0) {
    return 0;
  }

  const [loans] = await pool.query(
    `SELECT id FROM loans WHERE loan_officer_id IN (?)`,
    [userIds]
  );

  const loanIds = loans.map((l) => l.id);
  return sumCollectedForLoans(loanIds, startDate, endDate);
}

/**
 * Sum total collected across all offices in a province.
 * Loops office_ids calling baseTotalOfficeCollected for each.
 * @param {number[]} officeIds
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Promise<number>}
 */
async function provinceTotalCollected(officeIds, startDate, endDate) {
  let total = 0;
  for (const office_id of officeIds) {
    total += await baseTotalOfficeCollected(office_id, startDate, endDate);
  }
  return total;
}

/**
 * Sum total collected across all offices in a district.
 * Loops office_ids calling baseTotalOfficeCollected for each.
 * @param {number[]} officeIds
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Promise<number>}
 */
async function districtTotalCollected(officeIds, startDate, endDate) {
  let total = 0;
  for (const office_id of officeIds) {
    total += await baseTotalOfficeCollected(office_id, startDate, endDate);
  }
  return total;
}

/**
 * Total collected for payroll manager: loans where loan_product_id == 1 and staff_id == user_id.
 * @param {number} user_id
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Promise<number>}
 */
async function payrollmanagerTotalCollected(user_id, startDate, endDate) {
  const [loans] = await pool.query(
    `SELECT id FROM loans WHERE staff_id = ? AND loan_product_id = 1`,
    [user_id]
  );
  const loanIds = loans.map((l) => l.id);
  return sumCollectedForLoans(loanIds, startDate, endDate);
}

/**
 * Total collected for motor loans: loans where loan_product_id == 0 and staff_id == user_id.
 * @param {number} user_id
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Promise<number>}
 */
async function motorloansTotalCollected(user_id, startDate, endDate) {
  const [loans] = await pool.query(
    `SELECT id FROM loans WHERE staff_id = ? AND loan_product_id = 0`,
    [user_id]
  );
  const loanIds = loans.map((l) => l.id);
  return sumCollectedForLoans(loanIds, startDate, endDate);
}

/**
 * Monthly net recovered for recoveries coordinator.
 * total_recovered - total_costs within the circle period.
 * Default period: 24th of previous month to 24th of current month.
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Promise<number>}
 */
async function recoveriescoordinatorTotalCollected(startDate, endDate) {
  const [recoveredRows] = await pool.query(
    `SELECT COALESCE(SUM(rp.amount), 0) AS total
     FROM recovery_payments rp
     JOIN recovery_cases rc ON rp.recovery_case_id = rc.id
     WHERE rp.status = 1
       AND rc.approved_date IS NOT NULL
       AND rc.created_at BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  const total_recovered = Number(recoveredRows[0].total) || 0;

  const [costsRows] = await pool.query(
    `SELECT COALESCE(SUM(rc2.amount), 0) AS total
     FROM recovery_costs rc2
     JOIN recovery_cases rc ON rc2.case_id = rc.id
     WHERE rc.approved_date IS NOT NULL
       AND rc2.cost_date BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  const total_costs = Number(costsRows[0].total) || 0;

  return total_recovered - total_costs;
}

/**
 * Value Preserved amount for Manager Administration.
 * Value actually returned to the institution:
 *   loan_transactions.credit +
 *   office_loan_transactions.credit +
 *   advance_transactions.amount_paid +
 *   setup_debt_transactions.amount +
 *   deposits.amount
 * Filtered within the circle period. Institution-wide (no user filter).
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Promise<number>}
 */
async function manageradministrationTargetCollected(startDate, endDate) {
  const [loanTxRows] = await pool.query(
    `SELECT COALESCE(SUM(credit), 0) AS total
     FROM loan_transactions
     WHERE date BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  const loanTxCredit = Number(loanTxRows[0].total) || 0;

  const [officeLoanTxRows] = await pool.query(
    `SELECT COALESCE(SUM(credit), 0) AS total
     FROM office_loan_transactions
     WHERE created_at BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  const officeLoanTxCredit = Number(officeLoanTxRows[0].total) || 0;

  const [advanceRows] = await pool.query(
    `SELECT COALESCE(SUM(amount_paid), 0) AS total
     FROM advance_transactions
     WHERE last_update_date BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  const advanceRecoveries = Number(advanceRows[0].total) || 0;

  const [setupDebtRows] = await pool.query(
    `SELECT COALESCE(SUM(amount), 0) AS total
     FROM setup_debt_transactions
     WHERE transaction_date BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  const setupDebtAmount = Number(setupDebtRows[0].total) || 0;

  const [depositRows] = await pool.query(
    `SELECT COALESCE(SUM(amount), 0) AS total
     FROM deposits
     WHERE date BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  const depositsAmount = Number(depositRows[0].total) || 0;

  return loanTxCredit + officeLoanTxCredit + advanceRecoveries + setupDebtAmount + depositsAmount;
}

/**
 * Value Protected/Enabled (Annual) for Policy Manager.
 * Value protecting/enabling the institution:
 *   Collateral approved value + Branch asset inventory total value + Fleet current value
 * Filtered by created_at within the circle period (or past 12 months for annual targets).
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Promise<number>}
 */
async function policymanagerTargetCollected(startDate, endDate) {
  const [collateralRows] = await pool.query(
    `SELECT COALESCE(SUM(approved_value), 0) AS total
     FROM collaterals
     WHERE created_at BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  const collateralValue = Number(collateralRows[0].total) || 0;

  const [assetRows] = await pool.query(
    `SELECT COALESCE(SUM(total_value), 0) AS total
     FROM branch_asset_inventories
     WHERE created_at BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  const assetValue = Number(assetRows[0].total) || 0;

  const [fleetRows] = await pool.query(
    `SELECT COALESCE(SUM(current_value), 0) AS total
     FROM fleets
     WHERE created_at BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  const fleetValue = Number(fleetRows[0].total) || 0;

  return collateralValue + assetValue + fleetValue;
}

/**
 * Value Protected/Optimized (Annual) for Performance Manager.
 * Value optimized through risk-mitigation assets:
 *   Collateral approved value + Branch asset inventory total value + Fleet current value
 * Filtered by created_at within the past 12 months (annual target).
 * Institution-wide (no user filter).
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Promise<number>}
 */
async function performancemanagerTargetCollected(startDate, endDate) {
  const [collateralRows] = await pool.query(
    `SELECT COALESCE(SUM(approved_value), 0) AS total
     FROM collaterals
     WHERE created_at BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  const collateralValue = Number(collateralRows[0].total) || 0;

  const [assetRows] = await pool.query(
    `SELECT COALESCE(SUM(total_value), 0) AS total
     FROM branch_asset_inventories
     WHERE created_at BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  const assetValue = Number(assetRows[0].total) || 0;

  const [fleetRows] = await pool.query(
    `SELECT COALESCE(SUM(current_value), 0) AS total
     FROM fleets
     WHERE created_at BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  const fleetValue = Number(fleetRows[0].total) || 0;

  return collateralValue + assetValue + fleetValue;
}

/**
 * Monthly revenue benchmark for risk manager.
 * Total collected for the entire data (all active consultants, all offices)
 * within the circle period.
 * Default period: 24th of previous month to 24th of current month.
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Promise<number>}
 */
/**
 * Monthly revenue benchmark for risk manager.
 * Monthly Revenue comes from income-generating tables on closed loans:
 *   Interest income (transaction_type = 'interest_initial', sum(debit))
 *   Penalty income (transaction_type = 'specified_due_date_fee', sum(debit))
 * Filtered by loan_transactions.date within the circle period.
 * Institution-wide (no user filter).
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Promise<number>}
 */
async function riskmanagerTotalCollected(startDate, endDate) {
  const [interestRows] = await pool.query(
    `SELECT COALESCE(SUM(lt.debit), 0) AS total
     FROM loan_transactions lt
     JOIN loans l ON l.id = lt.loan_id
     WHERE lt.transaction_type = 'interest_initial'
       AND l.status = 'closed'
       AND lt.date BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  const interestIncome = Number(interestRows[0].total) || 0;

  const [penaltyRows] = await pool.query(
    `SELECT COALESCE(SUM(lt.debit), 0) AS total
     FROM loan_transactions lt
     JOIN loans l ON l.id = lt.loan_id
     WHERE lt.transaction_type = 'specified_due_date_fee'
       AND l.status = 'closed'
       AND lt.date BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  const penaltyIncome = Number(penaltyRows[0].total) || 0;

  return interestIncome + penaltyIncome;
}

module.exports = {
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
};
