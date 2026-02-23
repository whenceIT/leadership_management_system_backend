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
--
-- Categories (PREDEFINED - USE ONLY THESE):
-- - Financial
-- - Operational
-- - Team & Development
-- - Strategic
-- - Compliance & Risk
-- - Technical
-- - Risk
-- ============================================================================

-- ============================================================================
-- BRANCH MANAGER KPIS (position_id = 5)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(5, 5, 'Monthly Disbursement', 'Total loan amount disbursed within the month', 'numeric', 'K450,000+', 'Financial', '20'),
(5, 5, 'Month-1 Default Rate', 'Percentage of loans defaulting within first 30 days', 'percentage', '≤25%', 'Risk', '25'),
(5, 5, 'Recovery Rate (Month-4)', 'Collection rate after 4 months from disbursement', 'percentage', '≥65%', 'Financial', '25'),
(5, 5, 'LCs at K50K+ Tier', 'Percentage of Loan Consultants at K50K+ portfolio tier', 'percentage', '≥40%', 'Team & Development', '15'),
(5, 5, 'Net Contribution', 'Branch net financial contribution (income minus expenses)', 'numeric', 'K324,000+', 'Financial', '15');

-- ============================================================================
-- DISTRICT MANAGER KPIS (position_id = 4)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(4, 4, 'Cross-Branch Default Avg', 'Average default rate across all branches in district', 'percentage', '≤25.36%', 'Risk', '25'),
(4, 4, 'District Recovery Rate', 'Overall collection rate for the district', 'percentage', '≥58.05%', 'Financial', '25'),
(4, 4, 'Audit Compliance', 'Compliance rate with audit requirements', 'percentage', '100%', 'Compliance & Risk', '20'),
(4, 4, 'Best Practice Rollout', 'Percentage of best practices implemented across branches', 'percentage', '100%', 'Operational', '15'),
(4, 4, 'Talent Pipeline (Promotions)', 'Number of staff promotions within the district', 'numeric', '≥2/year', 'Team & Development', '15');

-- ============================================================================
-- PROVINCIAL MANAGER KPIS (position_id = 2)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(2, 2, 'Provincial Net Contribution Growth', 'Year-over-year growth in provincial net contribution', 'percentage', '+25%', 'Financial', '25'),
(2, 2, 'Delinquency Reduction', 'Percentage point reduction in delinquency rate', 'numeric', '5pp', 'Risk', '25'),
(2, 2, 'New Product Revenue', 'Revenue generated from new loan products', 'numeric', '≥K500,000', 'Financial', '20'),
(2, 2, 'Partnership Revenue', 'Revenue from strategic partnerships', 'numeric', '≥K1,000,000', 'Financial', '15'),
(2, 2, 'DM Promotions', 'Number of District Manager promotions', 'numeric', '≥2', 'Team & Development', '15');

-- ============================================================================
-- RISK MANAGER KPIS (position_id = 7)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(7, 7, 'Losses Prevented', 'Total value of losses prevented through risk interventions', 'numeric', '≥K500,000', 'Risk', '25'),
(7, 7, 'Fraud Detection Rate', 'Percentage of fraud cases detected', 'percentage', '≥90%', 'Compliance & Risk', '25'),
(7, 7, 'Avg Detection Time', 'Average time to detect fraud or risk issues', 'numeric', '≤7 days', 'Operational', '15'),
(7, 7, 'Cash Compliance', 'Compliance rate with cash handling procedures', 'percentage', '100%', 'Compliance & Risk', '15'),
(7, 7, 'Recovery Rate on Fraud', 'Recovery rate for fraud-related losses', 'percentage', '≥40%', 'Financial', '20');

-- ============================================================================
-- LOAN CONSULTANT KPIS (position_id = 21)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(21, 21, 'Monthly Disbursement Volume', 'Total loan amount disbursed by LC', 'numeric', 'K300,000+', 'Financial', '30'),
(21, 21, 'Loan Approval Rate', 'Percentage of loan applications approved', 'percentage', '85%', 'Operational', '20'),
(21, 21, 'Collection Rate', 'Monthly collection rate on assigned portfolio', 'percentage', '96%+', 'Financial', '25'),
(21, 21, 'Default Rate', 'Percentage of loans in default', 'percentage', '≤1.8%', 'Risk', '15'),
(21, 21, 'Client Satisfaction Score', 'Client satisfaction rating', 'score_1_5', '4.5/5', 'Operational', '10');

-- ============================================================================
-- GENERAL OPERATIONS MANAGER (GOM) KPIS (position_id = 1)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(1, 1, 'Process Cycle Time', 'Average time to complete operational processes', 'numeric', '3.5 days', 'Operational', '20'),
(1, 1, 'Error Rate', 'Percentage of errors in operational processes', 'percentage', '1.0%', 'Operational', '15'),
(1, 1, 'SLA Compliance', 'Service level agreement compliance rate', 'percentage', '98%', 'Operational', '15'),
(1, 1, 'Cost per Transaction', 'Average cost per transaction processed', 'numeric', 'K40', 'Financial', '15'),
(1, 1, 'Organization Net Contribution', 'Total organizational net contribution', 'numeric', '≥K5,000,000', 'Financial', '20'),
(1, 1, 'Portfolio at Risk (PAR>30)', 'Portfolio at risk greater than 30 days', 'percentage', '≤5%', 'Risk', '15');

-- ============================================================================
-- DISTRICT REGIONAL MANAGER KPIS (position_id = 3)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(3, 3, 'Regional Disbursement', 'Total disbursement across the region', 'numeric', 'TBD', 'Financial', '25'),
(3, 3, 'Regional Default Rate', 'Average default rate across the region', 'percentage', '2.2%', 'Risk', '20'),
(3, 3, 'Regional Growth', 'Year-over-year growth in regional portfolio', 'percentage', '15%', 'Strategic', '10');

-- ============================================================================
-- IT MANAGER KPIS (position_id = 6)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(6, 6, 'System Uptime', 'System availability percentage', 'percentage', '99.9%', 'Technical', '25'),
(6, 6, 'Mean Time to Recovery', 'Average time to recover from system failures', 'numeric', '1.5 hours', 'Technical', '20'),
(6, 6, 'Change Success Rate', 'Percentage of successful change implementations', 'percentage', '98%', 'Technical', '15'),
(6, 6, 'Project On-Time Delivery', 'Percentage of projects delivered on time', 'percentage', '90%', 'Operational', '10'),
(6, 6, 'Security Incidents', 'Number of security incidents', 'numeric', '0', 'Compliance & Risk', '25'),
(6, 6, 'Support Ticket Resolution', 'Average time to resolve support tickets', 'numeric', '≤24 hours', 'Operational', '5');

-- ============================================================================
-- MANAGEMENT ACCOUNTANT KPIS (position_id = 8)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(8, 8, 'Report Accuracy', 'Accuracy rate of financial reports', 'percentage', '99.5%', 'Financial', '25'),
(8, 8, 'Month-End Close Time', 'Days to complete month-end close', 'numeric', '4 days', 'Operational', '20'),
(8, 8, 'Budget Variance', 'Variance from approved budget', 'percentage', '3%', 'Financial', '20'),
(8, 8, 'Forecast Accuracy', 'Accuracy of financial forecasts', 'percentage', '95%', 'Financial', '10'),
(8, 8, 'Audit Findings', 'Number of audit findings', 'numeric', '0', 'Compliance & Risk', '15'),
(8, 8, 'Cost Savings Identified', 'Cost savings opportunities identified', 'numeric', '≥K100,000', 'Financial', '10');

-- ============================================================================
-- MOTOR VEHICLES MANAGER KPIS (position_id = 9)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(9, 9, 'MV Loan Disbursement', 'Total motor vehicle loan disbursement', 'numeric', 'K350,000', 'Financial', '25'),
(9, 9, 'MV Default Rate', 'Default rate on motor vehicle loans', 'percentage', '1.8%', 'Risk', '20'),
(9, 9, 'MV Recovery Rate', 'Recovery rate on motor vehicle loans', 'percentage', '98%', 'Financial', '20'),
(9, 9, 'Dealer Partnerships', 'Number of active dealer partnerships', 'numeric', '15', 'Strategic', '15'),
(9, 9, 'Portfolio Quality', 'Percentage of MV loans in good standing', 'percentage', '≥95%', 'Financial', '20');

-- ============================================================================
-- PAYROLL LOANS MANAGER KPIS (position_id = 10)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(10, 10, 'Payroll Loan Disbursement', 'Total payroll loan disbursement', 'numeric', 'K600,000', 'Financial', '25'),
(10, 10, 'Payroll Default Rate', 'Default rate on payroll loans', 'percentage', '1.5%', 'Risk', '20'),
(10, 10, 'Employer Partnerships', 'Number of active employer partnerships', 'numeric', '55', 'Strategic', '20'),
(10, 10, 'Payroll Deduction Accuracy', 'Accuracy rate of payroll deductions', 'percentage', '99.9%', 'Operational', '20'),
(10, 10, 'Portfolio Growth', 'Year-over-year growth in payroll loan portfolio', 'percentage', '≥15%', 'Financial', '15');

-- ============================================================================
-- POLICY & TRAINING MANAGER KPIS (position_id = 11)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(11, 11, 'Training Completion Rate', 'Percentage of required training completed', 'percentage', '95%', 'Team & Development', '30'),
(11, 11, 'Training Effectiveness Score', 'Average effectiveness score for training programs', 'score_1_5', '4.3', 'Team & Development', '20'),
(11, 11, 'New Hire Onboarding Time', 'Average days to complete onboarding', 'numeric', '10 days', 'Team & Development', '15'),
(11, 11, 'Policy Acknowledgment', 'Percentage of policies acknowledged by staff', 'percentage', '100%', 'Compliance & Risk', '20'),
(11, 11, 'Training ROI', 'Return on investment for training programs', 'percentage', '≥150%', 'Financial', '15');

-- ============================================================================
-- MANAGER ADMINISTRATION KPIS (position_id = 12)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(12, 12, 'Document Processing Time', 'Average time to process administrative documents', 'numeric', '2.0 hours', 'Operational', '25'),
(12, 12, 'Administrative Cost Efficiency', 'Efficiency of administrative cost management', 'percentage', '92%', 'Financial', '25'),
(12, 12, 'Facility Utilization', 'Percentage of facility capacity utilized', 'percentage', '90%', 'Operational', '20'),
(12, 12, 'Staff Satisfaction (Admin)', 'Staff satisfaction with administrative services', 'percentage', '≥85%', 'Team & Development', '15'),
(12, 12, 'Process Automation Rate', 'Percentage of processes automated', 'percentage', '≥70%', 'Operational', '15');

-- ============================================================================
-- R&D COORDINATOR KPIS (position_id = 13)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(13, 13, 'Projects Completed', 'Number of R&D projects completed', 'numeric', '4', 'Strategic', '25'),
(13, 13, 'Innovation Index', 'Score on innovation metrics', 'numeric', '80', 'Strategic', '25'),
(13, 13, 'Research Adoption Rate', 'Percentage of research findings adopted', 'percentage', '75%', 'Strategic', '25'),
(13, 13, 'Research ROI', 'Return on investment for research initiatives', 'percentage', '≥200%', 'Financial', '15'),
(13, 13, 'Publication Rate', 'Number of research papers/reports published', 'numeric', '≥2', 'Strategic', '10');

-- ============================================================================
-- RECOVERIES COORDINATOR KPIS (position_id = 14)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(14, 14, 'Total Recovery Amount', 'Total amount recovered from written-off loans', 'numeric', 'K1,000,000', 'Financial', '25'),
(14, 14, 'Recovery Rate', 'Percentage of written-off amounts recovered', 'percentage', '75%', 'Financial', '25'),
(14, 14, 'Avg Days to Recovery', 'Average days to recover funds', 'numeric', '35 days', 'Operational', '20'),
(14, 14, 'Legal Escalation Rate', 'Percentage of cases requiring legal action', 'percentage', '5%', 'Compliance & Risk', '15'),
(14, 14, 'Collateral Realization', 'Percentage of collateral successfully realized', 'percentage', '≥70%', 'Financial', '15');

-- ============================================================================
-- IT COORDINATOR KPIS (position_id = 15)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(15, 15, 'First Contact Resolution', 'Percentage of issues resolved on first contact', 'percentage', '85%', 'Technical', '30'),
(15, 15, 'Average Response Time', 'Average time to respond to support requests', 'numeric', '30 minutes', 'Technical', '25'),
(15, 15, 'Ticket Backlog', 'Number of unresolved support tickets', 'numeric', '15', 'Operational', '20'),
(15, 15, 'User Satisfaction', 'User satisfaction with IT support', 'percentage', '≥90%', 'Team & Development', '15'),
(15, 15, 'Knowledge Base Updates', 'Number of knowledge base articles created/updated', 'numeric', '≥5/month', 'Technical', '10');

-- ============================================================================
-- GENERAL OPERATIONS ADMINISTRATOR (GOA) KPIS (position_id = 16)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(16, 16, 'Ticket Resolution Time', 'Average time to resolve operational tickets', 'numeric', '18 hours', 'Operational', '25'),
(16, 16, 'Document Accuracy', 'Accuracy rate of processed documents', 'percentage', '99%', 'Operational', '20'),
(16, 16, 'Request Completion Rate', 'Percentage of requests completed successfully', 'percentage', '98%', 'Operational', '20'),
(16, 16, 'Process Adherence', 'Adherence to standard operating procedures', 'percentage', '≥95%', 'Compliance & Risk', '15'),
(16, 16, 'Stakeholder Satisfaction', 'Satisfaction rating from internal stakeholders', 'percentage', '≥90%', 'Team & Development', '20');

-- ============================================================================
-- PERFORMANCE OPERATIONS ADMINISTRATOR (POA) KPIS (position_id = 17)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(17, 17, 'KPI Data Accuracy', 'Accuracy rate of KPI data entered', 'percentage', '99%', 'Operational', '30'),
(17, 17, 'Report Timeliness', 'Percentage of reports submitted on time', 'percentage', '100%', 'Operational', '25'),
(17, 17, 'Performance Review Completion', 'Percentage of performance reviews completed', 'percentage', '98%', 'Team & Development', '25'),
(17, 17, 'Data Integrity', 'Data integrity score for performance systems', 'percentage', '≥99%', 'Technical', '10'),
(17, 17, 'Process Improvement', 'Number of process improvements implemented', 'numeric', '≥3/quarter', 'Strategic', '10');

-- ============================================================================
-- CREATIVE ARTWORK & MARKETING REPRESENTATIVE MANAGER KPIS (position_id = 18)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(18, 18, 'Campaign Reach', 'Total reach of marketing campaigns', 'numeric', '100,000', 'Strategic', '25'),
(18, 18, 'Lead Generation', 'Number of qualified leads generated', 'numeric', '500', 'Financial', '25'),
(18, 18, 'Conversion Rate', 'Percentage of leads converted to customers', 'percentage', '4.0%', 'Financial', '20'),
(18, 18, 'Marketing ROI', 'Return on investment for marketing spend', 'percentage', '350%', 'Financial', '15'),
(18, 18, 'Brand Awareness', 'Brand awareness score', 'percentage', '≥75%', 'Strategic', '15');

-- ============================================================================
-- ADMINISTRATION KPIS (position_id = 19)
-- ============================================================================

INSERT INTO smart_kpis (role, position_id, name, description, scoring, target, category, weight) VALUES
(19, 19, 'Request Fulfillment Rate', 'Percentage of administrative requests fulfilled', 'percentage', '98%', 'Operational', '35'),
(19, 19, 'Response Time', 'Average time to respond to requests', 'numeric', '1.0 hour', 'Operational', '30'),
(19, 19, 'Process Efficiency', 'Efficiency score for administrative processes', 'percentage', '≥90%', 'Operational', '20'),
(19, 19, 'Compliance Rate', 'Compliance with administrative policies', 'percentage', '100%', 'Compliance & Risk', '15');

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

-- Verify by category (should only show predefined categories)
SELECT 
    category,
    COUNT(*) AS kpi_count
FROM smart_kpis
GROUP BY category
ORDER BY kpi_count DESC;

-- Verify scoring types distribution
SELECT 
    scoring,
    COUNT(*) AS kpi_count
FROM smart_kpis
GROUP BY scoring
ORDER BY kpi_count DESC;

-- Verify all categories are valid (should return 0 rows if all valid)
SELECT DISTINCT category 
FROM smart_kpis 
WHERE category NOT IN ('Financial', 'Operational', 'Team & Development', 'Strategic', 'Compliance & Risk', 'Technical', 'Risk');
