const express = require('express');
const router = express.Router();
const pool = require('../../db');
const dayjs = require('dayjs');

/**
 * @route GET /api/performance/consultants-performance-by-office
 * @desc Get consultants performance for all offices (or a single office when office_id is provided)
 * @query {string} [office_id] - Optional office ID. When omitted, results are returned for all offices.
 * @query {string} [start_date] - Optional start date (YYYY-MM-DD)
 * @query {string} [end_date] - Optional end date (YYYY-MM-DD)
 * @access Public
 */
router.get('/consultants-performance-by-office', async (req, res) => {
  try {

    const { office_id, start_date, end_date } = req.query;

    // 1. GET ALL OFFICES (filtered by office_id when provided)
    let officesQuery = 'SELECT id, name FROM offices';
    let officesParams = [];

    if (office_id) {
      officesQuery += ' WHERE id = ?';
      officesParams = [office_id];
    }

    const [offices] = await pool.query(officesQuery, officesParams);

    const results = [];

    // 2. LOOP THROUGH ALL OFFICES
    for (const office of offices) {

      // GET CONSULTANTS IN OFFICE
      const [consultants] = await pool.query(`
        SELECT u.id, u.first_name, u.last_name, u.office_id, o.province_id, o.district_id
        FROM users u
        JOIN role_users ru ON ru.user_id = u.id
        JOIN offices o ON o.id = u.office_id
        WHERE ru.role_id IN (3,4,6)
          AND u.office_id = ?
          AND u.status = 'active'
      `, [office.id]);

      for (const consultant of consultants) {
        const user_id = consultant.id;

        // CYCLE DATE
        const [cycleEndRows] = await pool.query(
          `SELECT * FROM cycle_dates WHERE loan_officer_id = ? LIMIT 1`,
          [user_id]
        );

        const cycle_end_on = cycleEndRows.length > 0 ? cycleEndRows[0].cycle_end_date : null;

        // Handle different cycle dates per user
        let startDate = start_date;
        let endDate = end_date;

        if (!startDate || !endDate) {
          const cycleEndDay = cycle_end_on ? Number(dayjs(cycle_end_on).date()) : 24;
          const today = dayjs();

          let currentMonth = dayjs().startOf('month');
          let cycleDay = Math.min(cycleEndDay, currentMonth.daysInMonth());
          let cycleDate = currentMonth.date(cycleDay).add(1, 'day');

          if (today.isBefore(cycleDate)) {
            let prevMonth = dayjs().subtract(1, 'month').startOf('month');
            cycleDay = Math.min(cycleEndDay, prevMonth.daysInMonth());
            cycleDate = prevMonth.date(cycleDay).add(1, 'day');
          }

          startDate = cycleDate.format('YYYY-MM-DD');
          endDate = cycleDate.add(1, 'month').subtract(1, 'day').format('YYYY-MM-DD');
        }

        const last_start_date = dayjs(start_date).subtract(1, 'month').format('YYYY-MM-DD');
        const last_end_date = dayjs(end_date).subtract(1, 'month').format('YYYY-MM-DD');

        // 2. LOANS
        const [loans] = await pool.query(`
          SELECT id FROM loans WHERE loan_officer_id = ?
        `, [user_id]);

        const [loans_test] = await pool.query(`
          SELECT id
          FROM loans
          WHERE loan_officer_id = ?
            AND created_date BETWEEN ? AND ?
        `, [user_id, last_start_date, last_end_date]);

        const loanIds = loans.map(l => l.id);
        const loanIdsTest = loans_test.map(l => l.id);

        // 3. CARRY OVER
        const [carryOverRows] = await pool.query(`
          SELECT amount
          FROM carry_overs
          WHERE user_id = ?
            AND DATE(cycle_date) = DATE(?)
            AND status = 'active'
          LIMIT 1
        `, [user_id, startDate]);

        const carryOverAmount = carryOverRows.length > 0 ? Number(carryOverRows[0].amount) : 0;

        let total_uncollected = 0;
        let test_still_uncollected = 0;
        let test_total_uncollected = 0;
        let total_collected = 0;
        let given_out = carryOverAmount;
        let total_reloans = 0;
        let total_part_payments = 0;
        let total_full_payments = 0;
        let total_recovery = 0;

        if (loanIds.length > 0) {
          const [reloanRows] = await pool.query(`
            SELECT COUNT(*) AS cnt FROM loan_transactions
            WHERE loan_id IN (?) AND date >= ? AND date <= ? AND payment_apply_to = 'reloan_payment'
          `, [loanIds, startDate, endDate]);
          total_reloans = Number(reloanRows[0].cnt) || 0;

          const [partPaymentRows] = await pool.query(`
            SELECT COUNT(*) AS cnt FROM loan_transactions
            WHERE loan_id IN (?) AND date >= ? AND date <= ? AND payment_apply_to = 'part_payment'
          `, [loanIds, startDate, endDate]);
          total_part_payments = Number(partPaymentRows[0].cnt) || 0;

          const [fullPaymentRows] = await pool.query(`
            SELECT COUNT(*) AS cnt FROM loan_transactions
            WHERE loan_id IN (?) AND date >= ? AND date <= ? AND payment_apply_to = 'full_payment'
          `, [loanIds, startDate, endDate]);
          total_full_payments = Number(fullPaymentRows[0].cnt) || 0;

          const [recoveryRows] = await pool.query(`
            SELECT COUNT(*) AS cnt FROM loan_transactions
            WHERE loan_id IN (?) AND date >= ? AND date <= ? AND (is_recovery = 1 OR recovery = 1)
          `, [loanIds, startDate, endDate]);
          total_recovery = Number(recoveryRows[0].cnt) || 0;

          const [transactions] = await pool.query(`
            SELECT loan_id, debit, credit, transaction_type, payment_apply_to, balance_bf
            FROM loan_transactions
            WHERE loan_id IN (?) 
              AND date >= ? AND date <= ?
          `, [loanIds, startDate, endDate]);

          const [transactions_two] = await pool.query(`
            SELECT loan_id, debit, credit, transaction_type, payment_apply_to, balance_bf
            FROM loan_transactions
            WHERE loan_id IN (?)
              AND (date < ? OR transaction_type = 'interest_waiver')
          `, [loanIds, start_date]);

          const [transactions_three] = await pool.query(`
            SELECT loan_id, debit, credit, transaction_type, payment_apply_to, balance_bf
            FROM loan_transactions
            WHERE loan_id IN (?)
              AND date BETWEEN ? AND ?
          `, [loanIds, last_start_date, last_end_date]);

          if (loanIdsTest.length > 0) {
            const [transactions_four] = await pool.query(`
              SELECT loan_id, debit, credit, transaction_type, payment_apply_to, balance_bf
              FROM loan_transactions
              WHERE loan_id IN (?) 
            `, [loanIdsTest]);

            let total_debit_four = 0;
            let total_credit_four = 0;

            transactions_four.forEach(t => {
              const debit = Number(t.debit) || 0;
              const credit = Number(t.credit) || 0;
              total_debit_four += debit;
              total_credit_four += credit;
            });
            test_still_uncollected = total_debit_four - total_credit_four;
          }

          let total_debit_three = 0;
          let total_credit_three = 0;

          transactions_three.forEach(t => {
            const debit = Number(t.debit) || 0;
            const credit = Number(t.credit) || 0;
            total_debit_three += debit;
            total_credit_three += credit;
          });
          test_total_uncollected = total_debit_three - total_credit_three;

          transactions.forEach(t => {
            const debit = Number(t.debit) || 0;
            const credit = Number(t.credit) || 0;

            if (t.transaction_type === 'repayment') {
              if (t.payment_apply_to === 'reloan_payment') {
                total_collected += Number(t.balance_bf);
              } else if (['full_payment', 'part_payment'].includes(t.payment_apply_to)) {
                total_collected += credit;
              }
            }

            if (t.transaction_type === 'disbursement') {
              given_out += debit;
            }

            if (t.transaction_type === 'repayment' && t.payment_apply_to === 'reloan_payment') {
              const reloan_amount = (Number(t.balance_bf) || 0) - credit;
              given_out += reloan_amount;
            }
          });

          transactions_two.forEach(t => {
            const debit = Number(t.debit) || 0;
            const credit = Number(t.credit) || 0;

            if (t.transaction_type !== 'specified_due_date_fee') {
              total_uncollected += debit - credit;
            }
          });
        }

        const still_uncollected = total_uncollected - total_collected;
        const pdua = total_uncollected > 0 ? total_collected / total_uncollected : 0;

        // 4. TARGET MET FOR CURRENT CYCLE
        const [currentTargetRows] = await pool.query(`
          SELECT COUNT(*) AS total
          FROM (
            SELECT MIN(id) AS id
            FROM targets_met
            WHERE user_id = ?
              AND date >= ?
              AND date <= ?
            GROUP BY user_id
          ) AS x
        `, [user_id, startDate, endDate]);

        const target_met_current = currentTargetRows[0].total > 0 ? 1 : 0;

        // 5. TARGET MET HISTORY FOR LAST 5 PREVIOUS CYCLES
        const target_history = [];

        for (let i = 1; i <= 5; i++) {
          const previousStartDate = dayjs(startDate).subtract(i, 'month').format('YYYY-MM-DD');
          const previousEndDate = dayjs(endDate).subtract(i, 'month').format('YYYY-MM-DD');

          const [historyTargetRows] = await pool.query(`
            SELECT COUNT(*) AS total
            FROM (
              SELECT MIN(id) AS id
              FROM targets_met
              WHERE user_id = ?
                AND date >= ?
                AND date <= ?
              GROUP BY user_id
            ) AS x
          `, [user_id, previousStartDate, previousEndDate]);

          target_history.push(historyTargetRows[0].total > 0 ? 1 : 0);
        }

        // push results from all offices
        results.push({
          user_id,
          office: consultant.office_id,
          office_name: office.name,
          province: consultant.province_id,
          district: consultant.district_id,
          name: `${consultant.first_name} ${consultant.last_name}`,
          total_uncollected: total_uncollected.toFixed(2),
          test_total_uncollected: test_total_uncollected.toFixed(2),
          test_still_uncollected: test_still_uncollected.toFixed(2),
          total_collected: total_collected.toFixed(2),
          still_uncollected: still_uncollected.toFixed(2),
          given_out: given_out.toFixed(2),
          pdua: pdua.toFixed(2),
          total_reloans,
          total_part_payments,
          total_full_payments,
          total_recovery,
          carry_over: carryOverAmount,
          target_met_current,
          target_history,
          cycle_end_on,
        });
      }
    }

    res.json({
      data: results,
      meta: {
        total_offices: offices.length,
        total_consultants: results.length
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
