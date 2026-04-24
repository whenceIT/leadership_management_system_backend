const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * @route GET /api/summary
 * @desc Get financial summary report
 * @query {string} start_date - Optional start date (YYYY-MM-DD)
 * @query {string} end_date - Optional end date (YYYY-MM-DD)
 * @query {number} office_id - Optional office ID to filter results for a specific office
 * @query {number} province_id - Optional province ID to filter results for offices in a specific province
 * @query {number} district_id - Optional district ID to filter results for offices in a specific district
 * @query {number} approved_excess - Optional approved excess amount above K30,000
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const todaysDate = new Date().toISOString().split('T')[0];
    const startLimitDate = '2025-01-04';
    const { start_date, end_date, office_id, province_id, district_id, approved_excess } = req.query;

    let startDate = start_date || startLimitDate;
    let endDate = end_date || todaysDate;

    // Ensure start date is not earlier than start limit
    if (startDate < startLimitDate) {
      startDate = startLimitDate;
    }

    let totalAdvances = 0;
    let totalAdvancesPaid = 0;
    let totalExpenses = 0;
    let totalFullPayments = 0;
    let totalReloanedAmount = 0;
    let totalPartPayment = 0;
    let totalNewLoans = 0;
    let totalCashBalance = 0;

    // Get total income from ledger_income
    const [incomeResult] = await pool.query(
      'SELECT SUM(amount) AS total_income FROM ledger_income'
    );
    const totalIncome = parseFloat(incomeResult[0].total_income || 0);

    // Get offices (all or specific)
    let officesQuery = 'SELECT * FROM offices';
    let officesParams = [];
    if (office_id) {
      officesQuery += ' WHERE id = ?';
      officesParams = [office_id];
    } else if (province_id) {
      officesQuery += ' WHERE province_id = ?';
      officesParams = [province_id];
    } else if (district_id) {
      officesQuery += ' WHERE district_id = ?';
      officesParams = [district_id];
    }
    const [officesResult] = await pool.query(officesQuery, officesParams);

    // Constants for cash position thresholds
    const UPPER_THRESHOLD = 30000; // K30,000
    const LOWER_THRESHOLD = 20000; // K20,000
    const IDEAL_MIN = 20000;       // K20,000
    const IDEAL_MAX = 30000;       // K30,000

    for (const office of officesResult) {
      // Closing balance calculation for each office (transactions from start limit date to today)
      const [branchAdvancesResult] = await pool.query(
        'SELECT SUM(amount) AS total FROM advances WHERE office_id = ? AND status = ? AND date_approved BETWEEN ? AND ?',
        [office.id, 'approved', startLimitDate, todaysDate]
      );
      const branchAdvances = parseFloat(branchAdvancesResult[0].total || 0);

      const [branchAdvancesPaidResult] = await pool.query(
        'SELECT SUM(amount_paid) AS total FROM advances WHERE office_id = ? AND status = ? AND last_update_date BETWEEN ? AND ?',
        [office.id, 'approved', startLimitDate, todaysDate]
      );
      const branchAdvancesPaid = parseFloat(branchAdvancesPaidResult[0].total || 0);

      const [branchExpensesResult] = await pool.query(
        'SELECT SUM(amount) AS total FROM expenses WHERE office_id = ? AND date BETWEEN ? AND ?',
        [office.id, startLimitDate, todaysDate]
      );
      const branchExpenses = parseFloat(branchExpensesResult[0].total || 0);

      const [branchFullPaymentsResult] = await pool.query(
        'SELECT SUM(credit) AS total FROM loan_transactions WHERE office_id = ? AND transaction_type = ? AND payment_apply_to = ? AND date BETWEEN ? AND ?',
        [office.id, 'repayment', 'full_payment', startLimitDate, todaysDate]
      );
      const branchFullPayments = parseFloat(branchFullPaymentsResult[0].total || 0);

      const [branchReloanedAmountResult] = await pool.query(
        'SELECT SUM(credit) AS total FROM loan_transactions WHERE office_id = ? AND payment_apply_to = ? AND date BETWEEN ? AND ?',
        [office.id, 'reloan_payment', startLimitDate, todaysDate]
      );
      const branchReloanedAmount = parseFloat(branchReloanedAmountResult[0].total || 0);

      const [branchPartPaymentResult] = await pool.query(
        'SELECT SUM(credit) AS total FROM loan_transactions WHERE office_id = ? AND payment_apply_to = ? AND date BETWEEN ? AND ?',
        [office.id, 'part_payment', startLimitDate, todaysDate]
      );
      const branchPartPayment = parseFloat(branchPartPaymentResult[0].total || 0);

      const [branchNewLoansResult] = await pool.query(
        'SELECT SUM(debit) AS total FROM loan_transactions WHERE office_id = ? AND transaction_type = ? AND date BETWEEN ? AND ?',
        [office.id, 'disbursement', startLimitDate, todaysDate]
      );
      const branchNewLoans = parseFloat(branchNewLoansResult[0].total || 0);

      // Calculate net change
      const netChange = (branchFullPayments + branchReloanedAmount + branchPartPayment + branchAdvancesPaid) -
                        (branchNewLoans + branchAdvances + branchExpenses);

      // Get opening balance for each office
      const [openingBalanceResult] = await pool.query(
        'SELECT cash_balance FROM general_ledger WHERE office_id = ? ORDER BY created_at DESC LIMIT 1',
        [office.id]
      );
      const branchOpeningBalance = parseFloat(openingBalanceResult[0]?.cash_balance || 0);

      // Get branch income
      const [branchIncomeResult] = await pool.query(
        'SELECT total_income FROM general_ledger WHERE office_id = ? ORDER BY created_at DESC LIMIT 1',
        [office.id]
      );
      const branchIncome = parseFloat(branchIncomeResult[0]?.total_income || 0);

      const branchClosingBalance = branchOpeningBalance + netChange + branchIncome;

      // Update total cash balance
      totalCashBalance += branchClosingBalance;

      // Transactions being displayed (filtering by user-specified date range)
      const [advancesResult] = await pool.query(
        'SELECT SUM(amount) AS total FROM advances WHERE office_id = ? AND status = ? AND date_approved BETWEEN ? AND ?',
        [office.id, 'approved', startDate, endDate]
      );
      const advances = parseFloat(advancesResult[0].total || 0);

      const [advancesPaidResult] = await pool.query(
        'SELECT SUM(amount_paid) AS total FROM advances WHERE office_id = ? AND status = ? AND last_update_date BETWEEN ? AND ?',
        [office.id, 'approved', startDate, endDate]
      );
      const advancesPaid = parseFloat(advancesPaidResult[0].total || 0);

      const [expensesResult] = await pool.query(
        'SELECT SUM(amount) AS total FROM expenses WHERE office_id = ? AND date BETWEEN ? AND ?',
        [office.id, startDate, endDate]
      );
      const expenses = parseFloat(expensesResult[0].total || 0);

      const [fullPaymentsResult] = await pool.query(
        'SELECT SUM(credit) AS total FROM loan_transactions WHERE office_id = ? AND transaction_type = ? AND payment_apply_to = ? AND date BETWEEN ? AND ?',
        [office.id, 'repayment', 'full_payment', startDate, endDate]
      );
      const fullPayments = parseFloat(fullPaymentsResult[0].total || 0);

      const [reloanedAmountResult] = await pool.query(
        'SELECT SUM(credit) AS total FROM loan_transactions WHERE office_id = ? AND payment_apply_to = ? AND date BETWEEN ? AND ?',
        [office.id, 'reloan_payment', startDate, endDate]
      );
      const reloanedAmount = parseFloat(reloanedAmountResult[0].total || 0);

      const [partPaymentResult] = await pool.query(
        'SELECT SUM(credit) AS total FROM loan_transactions WHERE office_id = ? AND payment_apply_to = ? AND date BETWEEN ? AND ?',
        [office.id, 'part_payment', startDate, endDate]
      );
      const partPayment = parseFloat(partPaymentResult[0].total || 0);

      const [newLoansResult] = await pool.query(
        'SELECT SUM(debit) AS total FROM loan_transactions WHERE office_id = ? AND transaction_type = ? AND date BETWEEN ? AND ?',
        [office.id, 'disbursement', startDate, endDate]
      );
      const newLoans = parseFloat(newLoansResult[0].total || 0);

      totalAdvances += advances;
      totalAdvancesPaid += advancesPaid;
      totalExpenses += expenses;
      totalFullPayments += fullPayments;
      totalReloanedAmount += reloanedAmount;
      totalPartPayment += partPayment;
      totalNewLoans += newLoans;
    }

    totalCashBalance += totalIncome;

    // Calculate excess amounts based on cash position thresholds
    const totalExcessAmount = totalCashBalance > UPPER_THRESHOLD 
      ? totalCashBalance - UPPER_THRESHOLD 
      : 0;
    
    const userApprovedExcess = approved_excess ? parseFloat(approved_excess) : 0;
    const approvedExcessAmount = Math.min(userApprovedExcess, totalExcessAmount);
    const unapprovedExcessAmount = totalExcessAmount - approvedExcessAmount;

    res.json({
      success: true,
      data: {
        totalCashBalance,
        totalIncome,
        totalAdvances,
        totalAdvancesPaid,
        totalExpenses,
        totalFullPayments,
        totalReloanedAmount,
        totalPartPayment,
        totalNewLoans,
        startDate,
        endDate,
        // New excess amount metrics
        approvedExcessAmount,
        unapprovedExcessAmount,
        totalExcessAmount
      }
    });

  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch summary',
      message: error.message
    });
  }
});

module.exports = router;