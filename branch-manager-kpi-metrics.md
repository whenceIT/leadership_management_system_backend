# Branch Manager KPI Metrics Guide

This document explains the Key Performance Indicators (KPIs) displayed on the Branch Manager Dashboard, including their formulas, database sources, and how they relate to the loan management system.

---

## Overview

Branch managers are assigned to specific branches via the [`offices`](database-dictionary.md:1538) table (`manager_id` field). Each branch has clients (`clients.office_id`) and loans (`loans.office_id`) associated with it. These KPIs measure the performance of a branch manager's portfolio.

---

## 1. Monthly Disbursement

| Status | Value | Target |
|--------|-------|--------|
| ✓ On Track | K420,000 | K450,000+ |

### Definition
The total principal amount of loans disbursed during the current month for the branch.

### Formula
```
Monthly Disbursement = SUM(loans.approved_amount)
WHERE loans.office_id = {branch_id}
  AND loans.status = 'disbursed'
  AND loans.disbursement_date BETWEEN {month_start} AND {month_end}
```

### Database Tables
- [`loans`](database-dictionary.md:988) - Main loan records
  - `office_id` - Links to branch
  - `approved_amount` - The disbursed amount
  - `disbursement_date` - Date of disbursement
  - `status` - Must be 'disbursed'

### Status Indicators
| Status | Condition |
|--------|-----------|
| ✓ On Track | ≥ Target (K450,000+) |
| ⚠ At Risk | 70-99% of Target |
| ✗ Below Target | < 70% of Target |

### SQL Example
```sql
SELECT SUM(approved_amount) as monthly_disbursement
FROM loans
WHERE office_id = :branch_id
  AND status = 'disbursed'
  AND disbursement_date >= DATE_FORMAT(NOW(), '%Y-%m-01')
  AND disbursement_date < DATE_ADD(DATE_FORMAT(NOW(), '%Y-%m-01'), INTERVAL 1 MONTH);
```

---

## 2. Month-1 Default Rate

| Status | Value | Target |
|--------|-------|--------|
| ⚠ At Risk | 26.5% | ≤25% |

### Definition
The percentage of loans that go into default (miss first payment) within the first month after disbursement. This is a critical early warning indicator of loan quality and client vetting effectiveness.

### Formula
```
Month-1 Default Rate = (Count of Loans Missing First Payment / Total Disbursed Loans in Cohort) × 100

Where:
- Loans Missing First Payment = Loans where first installment is unpaid after 30+ days from first_repayment_date
- Cohort = Loans disbursed in the measurement period
```

### Database Tables
- [`loans`](database-dictionary.md:988) - Loan records
  - `first_repayment_date` - Expected first payment date
  - `disbursement_date` - When loan was given
  - `status` - Current loan status
  
- [`loan_repayment_schedules`](database-dictionary.md:1218) - Payment schedules
  - `loan_id` - Links to loan
  - `installment` - Installment number (1 for first)
  - `principal_paid` - Amount paid
  - `interest_paid` - Amount paid
  - `due_date` - When payment was due

- [`loan_transactions`](database-dictionary.md:1290) - Payment records
  - `transaction_type` = 'repayment'
  - `date` - Payment date

### Calculation Logic
```sql
-- Step 1: Get loans disbursed in the cohort period
WITH cohort_loans AS (
  SELECT id, office_id, first_repayment_date, approved_amount
  FROM loans
  WHERE office_id = :branch_id
    AND status = 'disbursed'
    AND disbursement_date BETWEEN :cohort_start AND :cohort_end
),
-- Step 2: Identify loans with missed first payment
missed_first_payment AS (
  SELECT l.id
  FROM cohort_loans l
  JOIN loan_repayment_schedules lrs ON lrs.loan_id = l.id
  WHERE lrs.installment = 1
    AND lrs.due_date < DATE_SUB(NOW(), INTERVAL 30 DAY)
    AND (lrs.principal_paid + lrs.interest_paid) < (lrs.principal + lrs.interest) * 0.9
)
SELECT 
  (SELECT COUNT(*) FROM missed_first_payment) / 
  (SELECT COUNT(*) FROM cohort_loans) * 100 as month_1_default_rate;
```

### Status Indicators
| Status | Condition |
|--------|-----------|
| ✓ On Track | ≤ 25% |
| ⚠ At Risk | 25-30% |
| ✗ Critical | > 30% |

### Why It Matters
- High Month-1 default rates indicate:
  - Poor client vetting/screening
  - Over-indebted clients
  - Fraud or ghost loans
  - Inadequate loan officer training

---

## 3. Recovery Rate (Month-4)

| Status | Value | Target |
|--------|-------|--------|
| ⚠ At Risk | 62% | ≥65% |

### Definition
The percentage of the expected loan portfolio that has been collected by the 4th month after disbursement. This measures the branch's ability to collect payments on time.

### Formula
```
Recovery Rate (Month-4) = (Total Collected by Month 4 / Total Expected by Month 4) × 100

Where:
- Total Collected = SUM of all repayments (principal + interest) received
- Total Expected = SUM of scheduled payments due by month 4
```

### Database Tables
- [`loans`](database-dictionary.md:988) - Loan records
  - `office_id` - Branch identifier
  - `disbursement_date` - Start date for calculation
  
- [`loan_transactions`](database-dictionary.md:1290) - Payment records
  - `transaction_type` = 'repayment'
  - `principal` - Principal portion collected
  - `interest` - Interest portion collected
  - `date` - Collection date
  
- [`loan_repayment_schedules`](database-dictionary.md:1218) - Expected payments
  - `principal` - Expected principal
  - `interest` - Expected interest
  - `due_date` - When payment is due

### Calculation Logic
```sql
WITH loans_4_months AS (
  -- Loans disbursed 4+ months ago
  SELECT id, office_id, approved_amount, disbursement_date
  FROM loans
  WHERE office_id = :branch_id
    AND status IN ('disbursed', 'closed', 'paid')
    AND disbursement_date <= DATE_SUB(NOW(), INTERVAL 4 MONTH)
),
expected_collections AS (
  -- Total expected by month 4
  SELECT SUM(lrs.principal + lrs.interest) as total_expected
  FROM loans_4_months l
  JOIN loan_repayment_schedules lrs ON lrs.loan_id = l.id
  WHERE lrs.due_date <= DATE_ADD(l.disbursement_date, INTERVAL 4 MONTH)
),
actual_collections AS (
  -- Total collected by month 4
  SELECT SUM(lt.principal + lt.interest) as total_collected
  FROM loans_4_months l
  JOIN loan_transactions lt ON lt.loan_id = l.id
  WHERE lt.transaction_type = 'repayment'
    AND lt.date <= DATE_ADD(l.disbursement_date, INTERVAL 4 MONTH)
    AND lt.reversed = 0
)
SELECT 
  (SELECT total_collected FROM actual_collections) / 
  (SELECT total_expected FROM expected_collections) * 100 as recovery_rate_month_4;
```

### Status Indicators
| Status | Condition |
|--------|-----------|
| ✓ On Track | ≥ 65% |
| ⚠ At Risk | 55-64% |
| ✗ Critical | < 55% |

### Why It Matters
- Low recovery rates indicate:
  - Collection inefficiencies
  - Poor follow-up on overdue accounts
  - Client cash flow problems
  - Need for loan restructuring

---

## 4. LCs at K50K+ Tier

| Status | Value | Target |
|--------|-------|--------|
| ✓ On Track | 35% | ≥40% |

### Definition
"LCs" = Loan Clients. This metric measures the percentage of active loan clients who have loans at or above the K50,000 tier. This indicates the branch's ability to serve higher-value clients and grow loan sizes.

### Formula
```
LCs at K50K+ Tier = (Count of Clients with Active Loans ≥ K50,000 / Total Active Loan Clients) × 100
```

### Database Tables
- [`loans`](database-dictionary.md:988) - Loan records
  - `client_id` - Links to client
  - `office_id` - Branch identifier
  - `approved_amount` - Loan amount
  - `status` - Must be 'disbursed' (active)
  
- [`clients`](database-dictionary.md:307) - Client records
  - `office_id` - Branch assignment
  - `status` - Must be 'active'

### Calculation Logic
```sql
WITH active_loan_clients AS (
  -- Distinct clients with active loans at this branch
  SELECT DISTINCT client_id
  FROM loans
  WHERE office_id = :branch_id
    AND status = 'disbursed'
),
clients_at_tier AS (
  -- Clients with at least one loan ≥ K50,000
  SELECT DISTINCT client_id
  FROM loans
  WHERE office_id = :branch_id
    AND status = 'disbursed'
    AND approved_amount >= 50000
)
SELECT 
  (SELECT COUNT(*) FROM clients_at_tier) / 
  (SELECT COUNT(*) FROM active_loan_clients) * 100 as lcs_at_50k_tier;
```

### Status Indicators
| Status | Condition |
|--------|-----------|
| ✓ On Track | ≥ 40% |
| ⚠ At Risk | 30-39% |
| ✗ Below Target | < 30% |

### Why It Matters
- Higher tier clients typically:
  - Have better repayment capacity
  - Generate more interest income
  - Are more established businesses
  - Indicate branch maturity and trust

---

## 5. Net Contribution

| Status | Value | Target |
|--------|-------|--------|
| ✓ On Track | K295,000 | K324,000+ |

### Definition
The net financial contribution of the branch to the organization, calculated as total income generated minus direct costs. This is a profitability measure.

### Formula
```
Net Contribution = Total Branch Income - Total Branch Expenses

Where:
- Total Branch Income = Interest Income + Fee Income + Penalty Income
- Total Branch Expenses = Operating Expenses + Staff Costs + Other Direct Costs
```

### Database Tables

**Income Sources:**
- [`loan_transactions`](database-dictionary.md:1290) - Interest and fees collected
  - `interest` - Interest collected
  - `fee` - Fees collected
  - `penalty` - Penalties collected
  - `office_id` - Branch identifier
  
- [`gl_journal_entries`](database-dictionary.md:797) - General ledger entries
  - `transaction_type` = 'interest', 'fee', 'penalty'
  - `credit` - Income amount
  - `office_id` - Branch identifier

**Expense Sources:**
- [`expenses`](database-dictionary.md:650) - Operating expenses
  - `office_id` - Branch identifier
  - `amount` - Expense amount
  - `status` = 'approved'
  
- [`payroll`](database-dictionary.md:1655) - Staff costs
  - `office_id` - Branch identifier
  - `paid_amount` - Salary paid

### Calculation Logic
```sql
WITH branch_income AS (
  -- Interest, fees, and penalties collected this month
  SELECT 
    COALESCE(SUM(interest), 0) as interest_income,
    COALESCE(SUM(fee), 0) as fee_income,
    COALESCE(SUM(penalty), 0) as penalty_income
  FROM loan_transactions
  WHERE office_id = :branch_id
    AND transaction_type = 'repayment'
    AND date >= DATE_FORMAT(NOW(), '%Y-%m-01')
    AND reversed = 0
),
branch_expenses AS (
  -- Operating expenses
  SELECT COALESCE(SUM(amount), 0) as operating_expenses
  FROM expenses
  WHERE office_id = :branch_id
    AND status = 'approved'
    AND date >= DATE_FORMAT(NOW(), '%Y-%m-01')
),
staff_costs AS (
  -- Payroll costs
  SELECT COALESCE(SUM(paid_amount), 0) as staff_expenses
  FROM payroll
  WHERE office_id = :branch_id
    AND date >= DATE_FORMAT(NOW(), '%Y-%m-01')
)
SELECT 
  (bi.interest_income + bi.fee_income + bi.penalty_income) - 
  (be.operating_expenses + sc.staff_expenses) as net_contribution
FROM branch_income bi, branch_expenses be, staff_costs sc;
```

### Status Indicators
| Status | Condition |
|--------|-----------|
| ✓ On Track | ≥ K324,000 |
| ⚠ At Risk | K280,000 - K323,999 |
| ✗ Below Target | < K280,000 |

### Why It Matters
- Net contribution measures:
  - Branch profitability
  - Resource allocation efficiency
  - Return on investment for the branch
  - Sustainability of operations

---

## Summary Dashboard

| Metric | Current | Target | Status | Formula |
|--------|---------|--------|--------|---------|
| Monthly Disbursement | K420,000 | K450,000+ | ✓ On Track | `SUM(loans.approved_amount)` for current month |
| Month-1 Default Rate | 26.5% | ≤25% | ⚠ At Risk | `(Missed 1st Payment / Total Disbursed) × 100` |
| Recovery Rate (Month-4) | 62% | ≥65% | ⚠ At Risk | `(Collected / Expected) × 100` by month 4 |
| LCs at K50K+ Tier | 35% | ≥40% | ✓ On Track | `(Clients ≥K50K / Total Clients) × 100` |
| Net Contribution | K295,000 | K324,000+ | ✓ On Track | `Income - Expenses` |

---

## Key Database Relationships

```
offices (Branch)
    │
    ├── manager_id ──► users (Branch Manager)
    │
    ├── clients.office_id ──► clients
    │       │
    │       └── loans.client_id ──► loans
    │               │
    │               ├── loan_transactions.loan_id
    │               │       └── Repayments, Interest, Fees
    │               │
    │               └── loan_repayment_schedules.loan_id
    │                       └── Expected payments
    │
    ├── loans.office_id ──► loans
    │       │
    │       └── (same relationships as above)
    │
    ├── expenses.office_id ──► expenses
    │       └── Operating costs
    │
    └── payroll.office_id ──► payroll
            └── Staff costs
```

---

## Status Icons Legend

| Icon | Meaning |
|------|---------|
| ✓ On Track | Meeting or exceeding target |
| ⚠ At Risk | Close to target but needs attention |
| ✗ Below Target | Significantly below target, requires intervention |

---

## Notes for Branch Managers

1. **Monthly Disbursement**: Focus on quality over quantity. High disbursement with high default rates is counterproductive.

2. **Month-1 Default Rate**: If this is high, review your client screening process and ensure loan officers are conducting proper due diligence.

3. **Recovery Rate**: Monitor this weekly. If declining, increase follow-up with overdue clients and consider restructuring options.

4. **LCs at K50K+ Tier**: Work on graduating clients to higher tiers through good performance and relationship building.

5. **Net Contribution**: Balance growth with cost control. Every expense should contribute to revenue generation.

---

*Document generated based on the loan management system database schema.*
