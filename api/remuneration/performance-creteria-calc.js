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
     WHERE ru.role_id IN (3,4,6)
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

module.exports = {
  getCirclePeriod,
  baseTotalOfficeCollected,
  provinceTotalCollected,
  districtTotalCollected,
  payrollmanagerTotalCollected,
  motorloansTotalCollected,
};
