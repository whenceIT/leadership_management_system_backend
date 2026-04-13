Is this logic correct for overall cash position


app.get('/cash-position-score/company', async (req, res) => {
  try {
    const [offices] = await pool.query(`
      SELECT id
      FROM offices
    `);

    if (!offices.length) {
      return res.json({
        offices_count: 0,
        average_score: "0.00",
        percentage_points: "0.00"
      });
    }

    let scores = [];

    for (const office of offices) {
      const { closingBalance } = await calculateCashMetricsForOffice(office.id);

      let score = 0;

      if (closingBalance >= 20000 && closingBalance <= 30000) {
        score = 100;
      } else if (closingBalance > 30000 && closingBalance <= 50000) {
        score = 100 - ((closingBalance - 30000) / 20000) * 40;
      } else if (closingBalance >= 10000 && closingBalance < 20000) {
        score = 100 - ((20000 - closingBalance) / 10000) * 50;
      } else {
        score = 0;
      }

      if (score < 0) score = 0;

      scores.push(score);
    }

    const average_score =
      scores.reduce((sum, score) => sum + score, 0) / (scores.length || 1);

    const pp = average_score * 0.40;

    res.json({
      offices_count: scores.length,
      average_score: average_score.toFixed(2),
      percentage_points: pp.toFixed(2),
      cash_balance: closingBalance
    });

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


async function calculateCashMetricsForOffice(office_id) {
  const startLimitDate = '2025-01-04';
  const todaysDate = dayjs().format('YYYY-MM-DD');

  // ===============================
  // GET LAST LEDGER ENTRY
  // ===============================
  const [ledger] = await pool.query(`
    SELECT cash_balance, total_income
    FROM general_ledger
    WHERE office_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `, [office_id]);

  const recentLedgerEntry = ledger.length ? ledger[0] : null;

  const openingBalance = recentLedgerEntry
    ? Number(recentLedgerEntry.cash_balance)
    : 0;

  const totalIncome = recentLedgerEntry
    ? Number(recentLedgerEntry.total_income)
    : 0;

  // ===============================
  // ADVANCES
  // ===============================
  const [[advances]] = await pool.query(`
    SELECT SUM(amount) total
    FROM advances
    WHERE office_id = ?
    AND status IN ('approved','closed')
    AND date_approved BETWEEN ? AND ?
  `, [office_id, startLimitDate, todaysDate]);

  const advancesTotal = Number(advances.total) || 0;

  // ===============================
  // ADVANCE PAYMENTS
  // ===============================
  const [[advancesPaid]] = await pool.query(`
    SELECT SUM(at.amount_paid) total
    FROM advance_transactions at
    JOIN advances a ON a.id = at.advance_id
    WHERE a.office_id = ?
    AND at.last_update_date BETWEEN ? AND ?
  `, [office_id, startLimitDate, todaysDate]);

  const advancesTotalPaid = Number(advancesPaid.total) || 0;

  // ===============================
  // EXPENSES
  // ===============================
  const [[expenses]] = await pool.query(`
    SELECT SUM(amount) total
    FROM expenses
    WHERE office_id = ?
    AND date BETWEEN ? AND ?
  `, [office_id, startLimitDate, todaysDate]);

  const expensesTotal = Number(expenses.total) || 0;

  // ===============================
  // DEPOSITS
  // ===============================
  const [[deposits]] = await pool.query(`
    SELECT SUM(amount) total
    FROM deposits
    WHERE office = ?
    AND date BETWEEN ? AND ?
  `, [office_id, startLimitDate, todaysDate]);

  const depositsTotal = Number(deposits.total) || 0;

  // ===============================
  // FULL PAYMENTS
  // ===============================
  const [[fullPayments]] = await pool.query(`
    SELECT SUM(credit) total
    FROM loan_transactions
    WHERE office_id = ?
    AND transaction_type = 'repayment'
    AND payment_apply_to = 'full_payment'
    AND date BETWEEN ? AND ?
  `, [office_id, startLimitDate, todaysDate]);

  const fullPaymentsTotal = Number(fullPayments.total) || 0;

  // ===============================
  // RELOAN PAYMENTS
  // ===============================
  const [[reloan]] = await pool.query(`
    SELECT SUM(credit) total
    FROM loan_transactions
    WHERE office_id = ?
    AND payment_apply_to = 'reloan_payment'
    AND date BETWEEN ? AND ?
  `, [office_id, startLimitDate, todaysDate]);

  const reloanedAmountTotal = Number(reloan.total) || 0;

  // ===============================
  // PART PAYMENTS
  // ===============================
  const [[partPayments]] = await pool.query(`
    SELECT SUM(credit) total
    FROM loan_transactions
    WHERE office_id = ?
    AND payment_apply_to = 'part_payment'
    AND date BETWEEN ? AND ?
  `, [office_id, startLimitDate, todaysDate]);

  const partPaymentTotal = Number(partPayments.total) || 0;

  // ===============================
  // NEW LOANS
  // ===============================
  const [[newLoans]] = await pool.query(`
    SELECT SUM(debit) total
    FROM loan_transactions
    WHERE office_id = ?
    AND transaction_type = 'disbursement'
    AND date BETWEEN ? AND ?
  `, [office_id, startLimitDate, todaysDate]);

  const newLoansTotal = Number(newLoans.total) || 0;

  // ===============================
  // NET CHANGE
  // ===============================
  const netChange =
    fullPaymentsTotal +
    reloanedAmountTotal +
    partPaymentTotal +
    advancesTotalPaid +
    totalIncome -
    (advancesTotal + expensesTotal + newLoansTotal + depositsTotal);

  const closingBalance = openingBalance + netChange;

  return {
    closingBalance
  };
}


//Requirement Spec
Constituent Metric	Formula	Target	Weight	Normalization Logic
Cash Position Score	How close branch is to optimal range (K20,000 – K30,000)	Within range	40%	If within K20k-K30k: 100%
If between K30k-K50k: 100% - [(excess/K20k)×40]
If between K10k-K20k: 100% - [(shortfall/K10k)×50]
If above K50k or below K10k: 0%
