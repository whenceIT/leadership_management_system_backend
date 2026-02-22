-- ============================================================================
-- SMART KPIS SEED DATA
-- ============================================================================
-- Table: smart_kpis
-- Columns: id, role, position_id, name, description, scoring, target, category, weight
-- 
-- Position IDs Reference:
-- 1: General Operations Manager (GOM)
-- 2: Provincial Manager
-- 3: District Regional Manager
-- 4: District Manager
-- 5: Branch Manager
-- 6: IT Manager
-- 7: Risk Manager
-- 8: Management Accountant
-- 9: Motor Vehicles Manager
-- 10: Payroll Loans Manager
-- 11: Policy & Training Manager
-- 12: Manager Administration
-- 13: R&D Coordinator
-- 14: Recoveries Coordinator
-- 15: IT Coordinator
-- 16: General Operations Administrator (GOA)
-- 17: Performance Operations Administrator (POA)
-- 18: Creative Artwork & Marketing Representative Manager
-- 19: Administration
-- 20: Super Seer
-- 21: Loan Consultant
-- ============================================================================

-- ============================================================================
-- BRANCH MANAGER KPIS (position_id = 5)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(5, 5, 'Monthly Disbursement', 'Total loan amount disbursed within the month', 'numeric', 'K450,000+', 'Disbursement', '20'),
(5, 5, 'Month-1 Default Rate', 'Percentage of loans defaulting within first 30 days', 'percentage', '≤25%', 'Risk', '25'),
(5, 5, 'Recovery Rate (Month-4)', 'Collection rate after 4 months from disbursement', 'percentage', '≥65%', 'Collections', '25'),
(5, 5, 'LCs at K50K+ Tier', 'Percentage of Loan Consultants at K50K+ portfolio tier', 'percentage', '≥40%', 'Team Development', '15'),
(5, 5, 'Net Contribution', 'Branch net financial contribution (income minus expenses)', 'numeric', 'K324,000+', 'Financial', '15');

-- ============================================================================
-- DISTRICT MANAGER KPIS (position_id = 4)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(4, 4, 'Cross-Branch Default Avg', 'Average default rate across all branches in district', 'percentage', '≤25.36%', 'Risk', '25'),
(4, 4, 'District Recovery Rate', 'Overall collection rate for the district', 'percentage', '≥58.05%', 'Collections', '25'),
(4, 4, 'Audit Compliance', 'Compliance rate with audit requirements', 'percentage', '100%', 'Compliance', '20'),
(4, 4, 'Best Practice Rollout', 'Percentage of best practices implemented across branches', 'percentage', '100%', 'Operations', '15'),
(4, 4, 'Talent Pipeline (Promotions)', 'Number of staff promotions within the district', 'numeric', '≥2/year', 'Team Development', '15');

-- ============================================================================
-- PROVINCIAL MANAGER KPIS (position_id = 2)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(2, 2, 'Provincial Net Contribution Growth', 'Year-over-year growth in provincial net contribution', 'percentage', '+25%', 'Financial', '25'),
(2, 2, 'Delinquency Reduction', 'Percentage point reduction in delinquency rate', 'numeric', '5pp', 'Risk', '25'),
(2, 2, 'New Product Revenue', 'Revenue generated from new loan products', 'numeric', '≥K500,000', 'Revenue', '20'),
(2, 2, 'Partnership Revenue', 'Revenue from strategic partnerships', 'numeric', '≥K1,000,000', 'Revenue', '15'),
(2, 2, 'DM Promotions', 'Number of District Manager promotions', 'numeric', '≥2', 'Team Development', '15');

-- ============================================================================
-- RISK MANAGER KPIS (position_id = 7)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(7, 7, 'Losses Prevented', 'Total value of losses prevented through risk interventions', 'numeric', '≥K500,000', 'Risk Mitigation', '25'),
(7, 7, 'Fraud Detection Rate', 'Percentage of fraud cases detected', 'percentage', '≥90%', 'Fraud', '25'),
(7, 7, 'Avg Detection Time', 'Average time to detect fraud or risk issues', 'numeric', '≤7 days', 'Fraud', '15'),
(7, 7, 'Cash Compliance', 'Compliance rate with cash handling procedures', 'percentage', '100%', 'Compliance', '15'),
(7, 7, 'Recovery Rate on Fraud', 'Recovery rate for fraud-related losses', 'percentage', '≥40%', 'Recovery', '20');

-- ============================================================================
-- LOAN CONSULTANT KPIS (position_id = 21)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(21, 21, 'Portfolio Quality', 'Percentage of active loans in good standing', 'percentage', '≥95%', 'Portfolio', '25'),
(21, 21, 'Collections Rate', 'Monthly collection rate on assigned portfolio', 'percentage', '≥93%', 'Collections', '25'),
(21, 21, 'Client Retention', 'Percentage of clients who take repeat loans', 'percentage', '≥80%', 'Client Relations', '15'),
(21, 21, 'New Client Acquisition', 'Number of new clients acquired', 'numeric', '≥10/month', 'Growth', '15'),
(21, 21, 'Disbursement Target', 'Monthly loan disbursement achievement', 'percentage', '100%', 'Disbursement', '20');

-- ============================================================================
-- GENERAL OPERATIONS MANAGER KPIS (position_id = 1)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(1, 1, 'Organization Net Contribution', 'Total organizational net contribution', 'numeric', '≥K5,000,000', 'Financial', '20'),
(1, 1, 'Portfolio at Risk (PAR>30)', 'Portfolio at risk greater than 30 days', 'percentage', '≤5%', 'Risk', '20'),
(1, 1, 'Operational Efficiency', 'Cost to income ratio', 'percentage', '≤70%', 'Operations', '20'),
(1, 1, 'Strategic Initiative Completion', 'Percentage of strategic initiatives completed', 'percentage', '≥90%', 'Strategy', '20'),
(1, 1, 'Staff Satisfaction', 'Overall staff satisfaction score', 'percentage', '≥80%', 'HR', '20');

-- ============================================================================
-- MANAGEMENT ACCOUNTANT KPIS (position_id = 8)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(8, 8, 'Financial Reporting Accuracy', 'Accuracy rate of financial reports', 'percentage', '100%', 'Reporting', '25'),
(8, 8, 'Budget Variance', 'Variance from approved budget', 'percentage', '≤5%', 'Budget', '25'),
(8, 8, 'Month-End Close Time', 'Days to complete month-end close', 'numeric', '≤5 days', 'Operations', '20'),
(8, 8, 'Audit Findings', 'Number of audit findings', 'numeric', '0', 'Compliance', '15'),
(8, 8, 'Cost Savings Identified', 'Cost savings opportunities identified', 'numeric', '≥K100,000', 'Financial', '15');

-- ============================================================================
-- IT MANAGER KPIS (position_id = 6)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(6, 6, 'System Uptime', 'System availability percentage', 'percentage', '≥99.5%', 'Infrastructure', '25'),
(6, 6, 'Security Incidents', 'Number of security incidents', 'numeric', '0', 'Security', '25'),
(6, 6, 'Support Ticket Resolution', 'Average time to resolve support tickets', 'numeric', '≤24 hours', 'Support', '20'),
(6, 6, 'Project Delivery', 'On-time project delivery rate', 'percentage', '≥90%', 'Projects', '15'),
(6, 6, 'System Backup Success', 'Backup success rate', 'percentage', '100%', 'Infrastructure', '15');

-- ============================================================================
-- RECOVERIES COORDINATOR KPIS (position_id = 14)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(14, 14, 'Recovery Rate', 'Percentage of written-off amounts recovered', 'percentage', '≥50%', 'Recovery', '30'),
(14, 14, 'NPL Reduction', 'Non-performing loan portfolio reduction', 'percentage', '≥10%', 'Portfolio', '25'),
(14, 14, 'Recovery Collections', 'Total amount collected from recoveries', 'numeric', '≥K200,000', 'Collections', '20'),
(14, 14, 'Legal Case Resolution', 'Time to resolve legal recovery cases', 'numeric', '≤90 days', 'Legal', '15'),
(14, 14, 'Collateral Realization', 'Percentage of collateral successfully realized', 'percentage', '≥70%', 'Assets', '10');

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify total count
SELECT COUNT(*) AS total_kpis FROM smart_kpis;

-- Verify by position
SELECT 
    jp.name AS position_name,
    COUNT(sk.id) AS kpi_count
FROM smart_kpis sk
JOIN job_positions jp ON sk.position_id = jp.id
GROUP BY jp.id, jp.name
ORDER BY jp.id;

-- View all KPIs with position names
SELECT 
    sk.id,
    jp.name AS position_name,
    sk.name AS kpi_name,
    sk.scoring,
    sk.target,
    sk.category,
    sk.weight
FROM smart_kpis sk
JOIN job_positions jp ON sk.position_id = jp.id
ORDER BY sk.position_id, sk.id;
