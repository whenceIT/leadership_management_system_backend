const express = require('express');
const router = express.Router();

// Import individual KPI score routers
const kpiScoresRouter = require('./kpiScores');
const monthlyDisbursementRouter = require('./branch/monthlyDisbursement');
const month1DefaultRateRouter = require('./branch/month1DefaultRate');
const lcsAtK50KTierRouter = require('./branch/lcsAtK50KTier');
const branchNetContributionRouter = require('./branch/branchNetContribution');
const branchRecoveryRateMonth4Router = require('./branch/branchRecoveryRateMonth4');
const summaryRouter = require('./summary');
const netCashPositionRouter = require('./cash-position/net-cash-position');

// Remuneration routers
const remunerationRouter = require('./remuneration');
const remunerationTiersRouter = require('./remuneration/tiers');
const remunerationConfigsRouter = require('./remuneration/configs');
const remunerationComponentsRouter = require('./remuneration/components');
const remunerationComponentValuesRouter = require('./remuneration/component-values');
const remunerationCriteriaRouter = require('./remuneration/criteria');
const remunerationHousingBandsRouter = require('./remuneration/housing-bands');
const remunerationBonusRulesRouter = require('./remuneration/bonus-rules');
const remunerationAssignmentsRouter = require('./remuneration/assignments');
const remunerationAssessmentsRouter = require('./remuneration/assessments');
const remunerationCalculateRouter = require('./remuneration/calculate');
const remunerationPerformanceCreteriaRouter = require('./remuneration/performance-creteria');
const remunerationManagersRouter = require('./remuneration/managers');

// Mount routers
router.use('/', kpiScoresRouter);
router.use('/monthly-disbursement', monthlyDisbursementRouter);
router.use('/month1-default-rate', month1DefaultRateRouter);
router.use('/lcs-at-k50k-tier', lcsAtK50KTierRouter);
router.use('/branch-net-contribution', branchNetContributionRouter);
router.use('/branch-recovery-rate-month4', branchRecoveryRateMonth4Router);
router.use('/summary', summaryRouter);
router.use('/cash-position', netCashPositionRouter);

// Mount remuneration routers
router.use('/remuneration', remunerationRouter);
router.use('/remuneration/tiers', remunerationTiersRouter);
router.use('/remuneration/configs', remunerationConfigsRouter);
router.use('/remuneration/components', remunerationComponentsRouter);
router.use('/remuneration/component-values', remunerationComponentValuesRouter);
router.use('/remuneration/criteria', remunerationCriteriaRouter);
router.use('/remuneration/housing-bands', remunerationHousingBandsRouter);
router.use('/remuneration/bonus-rules', remunerationBonusRulesRouter);
router.use('/remuneration/assignments', remunerationAssignmentsRouter);
router.use('/remuneration/assessments', remunerationAssessmentsRouter);
router.use('/remuneration/calculate', remunerationCalculateRouter);
router.use('/remuneration/performance-creteria', remunerationPerformanceCreteriaRouter);
router.use('/remuneration/managers', remunerationManagersRouter);

module.exports = router;
