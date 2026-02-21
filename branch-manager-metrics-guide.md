# Branch Manager Dashboard Metrics Guide

This document explains the key performance metrics displayed on the Branch Manager Dashboard, including their formulas, data sources, and business significance within the Loan Management System.

---

## Overview

Branch Managers oversee lending operations at their assigned branch (`office_id`). The dashboard provides real-time insights into portfolio health, collection performance, and staff productivity.

---

## 1. Month-1 Default Rate

### Display Example
```
Month-1 Default Rate
2.3%
-0.5% from last month
```

### Definition
The **Month-1 Default Rate** measures the percentage of loans that have entered default status within the first month after disbursement. This is a critical early warning indicator of portfolio quality and underwriting effectiveness.

### Formula
```
Month-1 Default Rate = (Number of Loans Defaulted in Month 1 / Total Loans Discharged in the Period) × 100
```

### Data Sources

| Table | Fields Used |
|-------|-------------|
| [`loans`](database-dictionary.md:988) | `id`, `office_id`, `status`, `disbursement_date`, `written_off_date` |
| [`loan_repayment_schedules`](database-dictionary.md:1218) | `loan_id`, `due_date`, `principal_paid`, `interest_paid`, `total_due` |
| [`loan_transactions`](database-dictionary.md:1290) | `loan_id`, `transaction_type`, `date`, `principal`, `interest` |

### Calculation Logic
```sql
-- Pseudo-code for Month-1 Default Rate
SELECT 
    COUNT(CASE WHEN l.status IN ('written_off', 'defaulted') 
               AND DATEDIFF(l.written_off_date, l.disbursement_date) <= 30 
               OR (arrears_days >= 30 AND l.status = 'disbursed') 
          THEN 1 END) AS defaulted_loans,
    COUNT(*) AS total_disbursed_loans
FROM loans l
WHERE l.office_id = :branch_office_id
  AND l.disbursement_date BETWEEN :period_start AND :period_end
  AND l.status IN ('disbursed', 'written_off', 'closed', 'paid');

-- Default Rate = (defaulted_loans / total_disbursed_loans) × 100
```

### Business Significance for Branch Managers
- **Portfolio Quality Indicator**: Lower rates indicate better underwriting and client vetting
- **Early Warning System**: Identifies problematic loan products or client segments
- **Staff Performance**: Reflects loan officer due diligence in client assessment
- **Target Comparison**: Compare against organizational benchmarks (typically < 3%)

### Trend Analysis
- **-0.5% from last month**: Indicates improvement in portfolio quality
- Positive trends suggest better client selection or improved economic conditions
- Negative trends require immediate investigation of underwriting practices

---

## 2. Collections Rate

### Display Example
```
Collections Rate
94.5%
+1.2% from target
```

### Definition
The **Collections Rate** measures the percentage of expected repayments that have been successfully collected during the reporting period. This is the primary indicator of cash flow health and borrower repayment behavior.

### Formula
```
Collections Rate = (Total Amount Collected / Total Amount Due for Collection) × 100
```

### Data Sources

| Table | Fields Used |
|-------|-------------|
| [`loans`](database-dictionary.md:988) | `id`, `office_id`, `principal`, `interest_rate`, `status` |
| [`loan_transactions`](database-dictionary.md:1290) | `loan_id`, `office_id`, `transaction_type`, `amount`, `principal`, `interest`, `fee`, `penalty`, `date` |
| [`loan_repayment_schedules`](database-dictionary.md:1218) | `loan_id`, `due_date`, `total_due`, `principal_paid`, `interest_paid`, `fees_paid`, `penalty_paid` |

### Calculation Logic
```sql
-- Pseudo-code for Collections Rate
SELECT 
    SUM(lt.principal + lt.interest + lt.fee + lt.penalty) AS total_collected,
    SUM(lrs.total_due) AS total_expected
FROM loan_transactions lt
JOIN loans l ON lt.loan_id = l.id
JOIN loan_repayment_schedules lrs ON lrs.loan_id = l.id
WHERE l.office_id = :branch_office_id
  AND lt.transaction_type = 'repayment'
  AND lt.date BETWEEN :period_start AND :period_end
  AND lrs.due_date BETWEEN :period_start AND :period_end
  AND lt.reversed = 0
  AND lt.status = 'approved';

-- Collections Rate = (total_collected / total_expected) × 100
```

### Alternative Formula (Using Derived Fields)
```sql
SELECT 
    SUM(principal_derived + interest_derived + fees_derived + penalty_derived) AS collected,
    SUM(total_due) AS expected
FROM loan_transactions lt
JOIN loan_repayment_schedules lrs ON lt.loan_id = lrs.loan_id
WHERE lt.office_id = :branch_office_id
  AND lt.transaction_type = 'repayment'
  AND lt.date BETWEEN :period_start AND :period_end;
```

### Business Significance for Branch Managers
- **Cash Flow Health**: Higher rates ensure adequate liquidity for operations
- **Client Behavior**: Reflects borrower willingness and ability to repay
- **Collection Efficiency**: Measures effectiveness of collection strategies
- **Target Performance**: +1.2% above target indicates exceptional performance

### Target Setting
- Organizational target typically set at 90-95%
- Branch targets may vary based on:
  - Historical performance
  - Economic conditions in the region
  - Client demographic profiles

---

## 3. Active Loans

### Display Example
```
Active Loans
1,247
+23 this week
```

### Definition
**Active Loans** represents the total count of loans currently in "disbursed" status at the branch, indicating the size of the active loan portfolio being managed.

### Formula
```
Active Loans Count = COUNT(loans WHERE status = 'disbursed' AND office_id = :branch_id)
```

### Data Sources

| Table | Fields Used |
|-------|-------------|
| [`loans`](database-dictionary.md:988) | `id`, `office_id`, `status`, `disbursement_date`, `closed_date`, `written_off_date` |
| [`clients`](database-dictionary.md:307) | `id`, `office_id`, `status` |

### Calculation Logic
```sql
-- Current Active Loans Count
SELECT COUNT(*) AS active_loans
FROM loans
WHERE office_id = :branch_office_id
  AND status = 'disbursed';

-- Weekly Change (+23 this week)
SELECT 
    COUNT(CASE WHEN disbursement_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) 
               AND status = 'disbursed' 
          THEN 1 END) -
    COUNT(CASE WHEN closed_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) 
               AND status IN ('closed', 'written_off', 'paid') 
          THEN 1 END) AS weekly_change
FROM loans
WHERE office_id = :branch_office_id;
```

### Loan Status Definitions (from [`loans.status`](database-dictionary.md:1032))
| Status | Description |
|--------|-------------|
| `new` | Application created, not yet submitted |
| `pending` | Application submitted, awaiting approval |
| `approved` | Loan approved, awaiting disbursement |
| `disbursed` | **Active loan with outstanding balance** |
| `closed` | Loan fully repaid and closed |
| `written_off` | Loan written off as bad debt |
| `paid` | Loan fully paid |
| `declined` | Application declined |
| `rejected` | Application rejected |

### Business Significance for Branch Managers
- **Portfolio Size**: Indicates branch lending volume and market penetration
- **Workload Indicator**: Helps in resource allocation and staff planning
- **Growth Tracking**: +23 this week shows portfolio expansion
- **Capacity Planning**: Compare against branch capacity limits

### Related Metrics
```sql
-- Active Loan Value (Total Outstanding)
SELECT SUM(principal_derived - principal_paid) AS outstanding_balance
FROM loans l
JOIN loan_repayment_schedules lrs ON l.id = lrs.loan_id
WHERE l.office_id = :branch_office_id
  AND l.status = 'disbursed';
```

---

## 4. Staff Productivity

### Display Example
```
Staff Productivity
87%
+5% improvement
```

### Definition
**Staff Productivity** measures the efficiency and effectiveness of loan officers at the branch in meeting their performance targets. This composite metric evaluates multiple KPIs including disbursement targets, collection efficiency, and portfolio quality.

### Formula
```
Staff Productivity = (Weighted Score of Individual KPIs) × 100

Where KPIs include:
- Disbursement Target Achievement (40% weight)
- Collections Rate (30% weight)
- Portfolio Quality / PAR (20% weight)
- Client Acquisition (10% weight)
```

### Data Sources

| Table | Fields Used |
|-------|-------------|
| [`users`](database-dictionary.md:2225) | `id`, `office_id`, `first_name`, `last_name` |
| [`loans`](database-dictionary.md:988) | `id`, `office_id`, `loan_officer_id`, `principal`, `status`, `disbursement_date` |
| [`loan_transactions`](database-dictionary.md:1290) | `loan_id`, `created_by_id`, `amount`, `transaction_type`, `date` |
| [`clients`](database-dictionary.md:307) | `id`, `office_id`, `staff_id`, `status`, `joined_date` |
| [`target_tracker`](database-dictionary.md:2162) | `user_id`, `given_out`, `target`, `cycle_date` |
| [`target_reports`](database-dictionary.md:2150) | `user_id`, `office_id`, `given_out`, `uncollected` |

### Calculation Logic
```sql
-- Individual Loan Officer Productivity Score
SELECT 
    u.id AS officer_id,
    CONCAT(u.first_name, ' ', u.last_name) AS officer_name,
    
    -- Disbursement Target Achievement (40%)
    (COALESCE(SUM(l.principal), 0) / COALESCE(tt.target, 1)) * 100 * 0.40 
    AS disbursement_score,
    
    -- Collections Rate (30%)
    (SUM(CASE WHEN lt.transaction_type = 'repayment' THEN lt.amount ELSE 0 END) /
     NULLIF(SUM(lrs.total_due), 0)) * 100 * 0.30 
    AS collection_score,
    
    -- Portfolio Quality - Low PAR (20%)
    (100 - COALESCE(par.rate, 0)) * 0.20 
    AS quality_score,
    
    -- Client Acquisition (10%)
    (COUNT(DISTINCT c.id) / COALESCE(client_target.target_count, 1)) * 100 * 0.10 
    AS acquisition_score
    
FROM users u
LEFT JOIN loans l ON l.loan_officer_id = u.id AND l.office_id = :branch_office_id
LEFT JOIN loan_transactions lt ON lt.loan_id = l.id AND lt.transaction_type = 'repayment'
LEFT JOIN loan_repayment_schedules lrs ON lrs.loan_id = l.id
LEFT JOIN target_tracker tt ON tt.user_id = u.id
LEFT JOIN clients c ON c.staff_id = u.id AND c.status = 'active'
WHERE u.office_id = :branch_office_id
  AND u.status = 'Active'
GROUP BY u.id;

-- Branch Average Productivity = AVG(all_officer_scores)
```

### KPI Components Explained

#### 1. Disbursement Target Achievement (40% weight)
```sql
-- From target_tracker table
SELECT 
    user_id,
    given_out AS actual_disbursement,
    target AS target_disbursement,
    (given_out / NULLIF(target, 0)) * 100 AS achievement_rate
FROM target_tracker
WHERE cycle_date = :current_cycle;
```

#### 2. Collections Rate (30% weight)
```sql
-- Collections performance per officer
SELECT 
    l.loan_officer_id,
    SUM(lt.principal + lt.interest + lt.fee + lt.penalty) AS collected,
    SUM(lrs.total_due) AS expected,
    (SUM(lt.principal + lt.interest + lt.fee + lt.penalty) / NULLIF(SUM(lrs.total_due), 0)) * 100 
    AS collection_rate
FROM loan_transactions lt
JOIN loans l ON lt.loan_id = l.id
JOIN loan_repayment_schedules lrs ON lrs.loan_id = l.id
WHERE lt.transaction_type = 'repayment'
  AND lt.reversed = 0
  AND l.office_id = :branch_office_id
GROUP BY l.loan_officer_id;
```

#### 3. Portfolio Quality / PAR (20% weight)
```sql
-- Portfolio at Risk calculation
SELECT 
    loan_officer_id,
    SUM(CASE WHEN arrears_days > 30 THEN outstanding_balance ELSE 0 END) / 
    SUM(outstanding_balance) * 100 AS par_30_rate
FROM (
    SELECT 
        l.loan_officer_id,
        l.id,
        DATEDIFF(CURRENT_DATE, MIN(lrs.due_date)) AS arrears_days,
        (lrs.total_due - lrs.principal_paid - lrs.interest_paid) AS outstanding_balance
    FROM loans l
    JOIN loan_repayment_schedules lrs ON lrs.loan_id = l.id
    WHERE l.status = 'disbursed'
      AND l.office_id = :branch_office_id
      AND lrs.paid = 0
    GROUP BY l.id, l.loan_officer_id
) portfolio
GROUP BY loan_officer_id;
```

#### 4. Client Acquisition (10% weight)
```sql
-- New clients acquired per officer
SELECT 
    c.staff_id AS officer_id,
    COUNT(*) AS new_clients
FROM clients c
WHERE c.office_id = :branch_office_id
  AND c.status = 'active'
  AND c.joined_date >= :period_start
GROUP BY c.staff_id;
```

### Business Significance for Branch Managers
- **Performance Monitoring**: Track individual and team performance
- **Resource Allocation**: Identify high performers and those needing support
- **Incentive Programs**: Basis for performance-based compensation
- **Training Needs**: +5% improvement indicates effective training or process improvements

### Productivity Benchmarks
| Score Range | Rating | Action |
|-------------|--------|--------|
| 90-100% | Excellent | Recognition & mentorship role |
| 80-89% | Good | Maintain current strategies |
| 70-79% | Average | Identify improvement areas |
| Below 70% | Needs Improvement | Training & close monitoring |

---

## Summary: Branch Manager Responsibilities

Based on the database structure, Branch Managers are responsible for:

### 1. Portfolio Management
- Monitor all loans with their `office_id` (branch)
- Track loan statuses from disbursement to closure
- Manage write-offs and rescheduling requests

### 2. Staff Oversight
- Supervise loan officers (`users.office_id` = branch)
- Review and approve loan applications
- Monitor individual performance via `target_tracker`

### 3. Collections Management
- Oversee collection activities
- Review `loan_transactions` for repayment patterns
- Manage arrears and default prevention

### 4. Client Relations
- Manage client acquisition at branch level
- Ensure client data quality in `clients` table
- Handle escalations and complaints

### 5. Financial Reporting
- Branch-level financial performance
- Expense management via `expenses` table
- Income tracking via `ledger_income` table

---

## Key Database Relationships

```
offices (branch)
    ├── users (staff) ────┬── loans (as loan_officer_id)
    │                      ├── clients (as staff_id)
    │                      └── target_tracker
    │
    ├── loans ─────────────┬── loan_transactions
    │       │              ├── loan_repayment_schedules
    │       │              └── clients (as client_id)
    │       │
    └── clients ───────────└── loan_applications
```

---

## Formulas Quick Reference

| Metric | Formula | Target Range |
|--------|---------|--------------|
| Month-1 Default Rate | (Defaults in Month 1 / Total Disbursed) × 100 | < 3% |
| Collections Rate | (Collected Amount / Expected Amount) × 100 | > 90% |
| Active Loans | COUNT(loans WHERE status = 'disbursed') | Branch Capacity |
| Staff Productivity | Weighted KPI Score | > 80% |

---

## Related Reports

Branch Managers can generate detailed reports via the [`report_scheduler`](database-dictionary.md:1832) table:

- `loan_portfolio_report` - Portfolio composition
- `repayments_report` - Collection details
- `arrears_report` - Delinquency analysis
- `loan_officer_performance_report` - Staff productivity
- `collection_report` - Daily/weekly collections

---

*Document generated for SLS Backend Loan Management System*
*Last updated: February 2026*
