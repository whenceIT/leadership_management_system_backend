// KPI Scores API - Index File
// This file serves as the entry point for all KPI scores APIs

const express = require('express');
const router = express.Router();

// Import individual KPI score routers
const kpiScoresRouter = require('./kpiScores');
const monthlyDisbursementRouter = require('./monthlyDisbursement');
const month1DefaultRateRouter = require('./month1DefaultRate');
const lcsAtK50KTierRouter = require('./lcsAtK50KTier');
const branchNetContributionRouter = require('./branchNetContribution');
const branchRecoveryRateMonth4Router = require('./branchRecoveryRateMonth4');

// Mount routers
router.use('/', kpiScoresRouter);
router.use('/monthly-disbursement', monthlyDisbursementRouter);
router.use('/month1-default-rate', month1DefaultRateRouter);
router.use('/lcs-at-k50k-tier', lcsAtK50KTierRouter);
router.use('/branch-net-contribution', branchNetContributionRouter);
router.use('/branch-recovery-rate-month4', branchRecoveryRateMonth4Router);

module.exports = router;
