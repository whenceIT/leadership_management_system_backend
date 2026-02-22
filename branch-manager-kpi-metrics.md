# Branch Manager KPI Metrics Documentation

This document explains the Key Performance Indicators (KPIs) for Branch Managers in the Loan Management System, including their formulas, database tables involved, and how they are calculated.

---

## Overview

Branch Managers are responsible for overseeing branch operations, including loan disbursements, collections, and managing loan officers. The following KPIs help measure their performance:

| Metric | Target | Status Indicator |
|--------|--------|------------------|
| Monthly Disbursement | K450,000+ | ✓ On Track / ⚠ At Risk / ✗ Below Target |
| Month-1 Default Rate | ≤25% | ✓ On Track / ⚠ At Risk |
| Recovery Rate (Month-4) | ≥65% | ✓ On Track / ⚠ At Risk |
| LCs at K50K+ Tier | ≥40% | ✓ On Track / ⚠ At Risk |
| Net Contribution | K324,000+ | ✓ On Track / ⚠ At Risk |

---

## 1. Monthly Disbursement

### Definition
The total amount of loans disbursed by a branch during a specific month.

### Formula
```
Monthly Disbursement = SUM(loans.approved_amount)
WHERE loans.office_id = {branch_id}
  AND loans.status = 'disbursed'
  AND loans.disbursement_date BETWEEN {month_start} AND {month_end}
```

### Database Tables
| Table | Columns Used | Purpose |
|-------|--------------|---------|
| `loans` | `id`, `office_id`, `approved_amount`, `status`, `disbursement_date` | Main loan data |
| `offices` | `id`, `name` | Branch information |
| `users` | `id`, `office_id` | User-branch mapping |
| `loan_products` | `id`, `name` | Product categorization |

### SQL Query Example
```sql
SELECT 
    COALESCE(SUM(approved_amount), 0) AS monthly_disbursement,
    COUNT(*) AS disbursement_count,
    AVG(approved_amount) AS avg_loan_size
FROM loans
WHERE office_id = ?
  AND status = 'disbursed'
  AND disbursement_date BETWEEN ? AND ?
```

### Status Indicators
- **✓ On Track**: ≥ 100% of Target (K450,000+)
- **⚠ At Risk**: 70-99% of Target (K315,000 - K449,999)
- **✗ Below Target**: < 70% of Target (< K315,000)

### API Endpoint
```
GET /monthly-disbursement?office_id={branch_id}&period_start={start}&period_end={end}
```

---

## 2. Month-1 Default Rate

### Definition
The percentage of loans that default within the first month (30 days) of disbursement. This measures the quality of loan assessment and client vetting.

### Formula
```
Month-1 Default Rate = (Number of Loans Defaulted in Month 1 / Total Loans Disbursed) × 100
```

A loan is considered "Month-1 Default" if:
1. Status is 'written_off' AND was written off within 30 days of disbursement, OR
2. Status is 'disbursed' BUT has arrears ≥ 30 days (calculated from repayment schedule)

### Database Tables
| Table | Columns Used | Purpose |
|-------|--------------|---------|
| `loans` | `id`, `office_id`, `status`, `disbursement_date`, `written_off_date` | Loan status and dates |
| `loan_repayment_schedules` | `loan_id`, `due_date`, `paid`, `total_due` | Payment tracking |
| `clients` | `id`, `first_name`, `last_name`, `mobile` | Client information |

### SQL Query Example
```sql
SELECT 
    COUNT(*) AS total_disbursed,
    SUM(CASE 
        WHEN l.status = 'written_off' 
             AND DATEDIFF(l.written_off_date, l.disbursement_date) <= 30 
        THEN 1 
        WHEN l.status = 'disbursed' 
             AND EXISTS (
                 SELECT 1 FROM loan_repayment_schedules lrs 
                 WHERE lrs.loan_id = l.id 
                   AND lrs.paid = 0 
                   AND DATEDIFF(CURDATE(), lrs.due_date) >= 30
             )
        THEN 1
        ELSE 0 
    END) AS defaulted_in_month1
FROM loans l
WHERE l.office_id = ?
  AND l.disbursement_date BETWEEN ? AND ?
  AND l.status IN ('disbursed', 'written_off', 'closed', 'paid')
```

### Status Indicators
- **✓ On Track**: ≤ 25% default rate
- **⚠ At Risk**: > 25% default rate

### API Endpoint
```
GET /month1-default-rate?office_id={branch_id}&period_start={start}&period_end={end}
```

---

## 3. Recovery Rate (Month-4)

### Definition
The percentage of outstanding loan amount that has been recovered after 4 months from disbursement. This measures the effectiveness of collection efforts.

### Formula
```
Recovery Rate = (Total Amount Collected / Total Amount Due for Collection) × 100
```

For Month-4 specifically:
- Consider loans disbursed 4 months ago
- Calculate collections vs expected repayments for those loans

### Database Tables
| Table | Columns Used | Purpose |
|-------|--------------|---------|
| `loans` | `id`, `office_id`, `status`, `disbursement_date` | Loan identification |
| `loan_transactions` | `loan_id`, `transaction_type`, `principal`, `interest`, `fee`, `penalty`, `date`, `reversed`, `status` | Payment records |
| `loan_repayment_schedules` | `loan_id`, `due_date`, `total_due`, `principal`, `interest`, `fees`, `penalty` | Expected payments |

### SQL Query Example
```sql
-- Get collected amounts
SELECT 
    COALESCE(SUM(lt.principal + lt.interest + lt.fee + lt.penalty), 0) AS total_collected
FROM loan_transactions lt
JOIN loans l ON lt.loan_id = l.id
WHERE l.office_id = ?
  AND lt.transaction_type = 'repayment'
  AND lt.created_at BETWEEN ? AND ?
  AND lt.reversed = 0
  AND lt.status = 'approved'
  AND l.status IN ('disbursed', 'closed', 'paid')

-- Get expected amounts
SELECT 
    COALESCE(SUM(lrs.total_due), 0) AS total_expected
FROM loan_repayment_schedules lrs
JOIN loans l ON lrs.loan_id = l.id
WHERE l.office_id = ?
  AND lrs.due_date BETWEEN ? AND ?
  AND l.status IN ('disbursed', 'closed', 'paid')
```

### Status Indicators
- **✓ On Track**: ≥ 65% recovery rate
- **⚠ At Risk**: < 65% recovery rate

### API Endpoint
```
GET /collections-rate?office_id={branch_id}&period_start={start}&period_end={end}
```

---

## 4. LCs at K50K+ Tier

### Definition
The percentage of Loan Consultants (LCs) who have achieved a portfolio tier of K50,000 or higher. This measures the productivity and growth of loan officers.

### Formula
```
LCs at K50K+ Tier = (Number of LCs with Portfolio ≥ K50,000 / Total Active LCs) × 100
```

### Database Tables
| Table | Columns Used | Purpose |
|-------|--------------|---------|
| `users` | `id`, `office_id`, `status`, `job_position` | Loan officer identification |
| `loans` | `loan_officer_id`, `principal`, `status` | Portfolio calculation |
| `user_tiers` | `user_id`, `tier_id`, `current_portfolio_value` | Tier tracking |
| `tier_definitions` | `id`, `name`, `minimum_portfolio_value` | Tier thresholds |
| `job_positions` | `id`, `name` | Position identification |

### SQL Query Example
```sql
-- Get LCs with their portfolio values
SELECT 
    u.id AS officer_id,
    CONCAT(u.first_name, ' ', u.last_name) AS officer_name,
    COALESCE(SUM(l.principal), 0) AS portfolio_value,
    CASE 
        WHEN COALESCE(SUM(l.principal), 0) >= 50000 THEN 1 
        ELSE 0 
    END AS at_tier
FROM users u
LEFT JOIN loans l ON l.loan_officer_id = u.id AND l.status = 'disbursed'
WHERE u.office_id = ?
  AND u.status = 'Active'
  AND u.job_position = ? -- LC position ID
GROUP BY u.id, u.first_name, u.last_name
```

### Status Indicators
- **✓ On Track**: ≥ 40% of LCs at K50K+ tier
- **⚠ At Risk**: < 40% of LCs at K50K+ tier

### Related API Endpoints
```
GET /user-tiers/:userId
GET /staff-productivity?office_id={branch_id}
```

---

## 5. Net Contribution

### Definition
The net financial contribution of a branch to the organization, calculated as total income minus total expenses.

### Formula
```
Net Contribution = Total Income - Total Expenses

Where:
- Total Income = Interest Income + Fee Income + Penalty Income + Other Income
- Total Expenses = Operating Expenses + Staff Costs (Payroll)
```

### Database Tables
| Table | Columns Used | Purpose |
|-------|--------------|---------|
| `loan_transactions` | `interest`, `fee`, `penalty`, `transaction_type`, `date` | Income from loans |
| `expenses` | `amount`, `office_id`, `date`, `status` | Branch expenses |
| `payroll` | `paid_amount`, `office_id`, `date` | Staff costs |
| `other_income` | `amount`, `office_id`, `date`, `status` | Other income sources |
| `ledger_income` | `amount`, `office_id`, `date` | Ledger income |

### SQL Query Example
```sql
-- Get income from loan transactions
SELECT 
    COALESCE(SUM(lt.interest), 0) AS interest_income,
    COALESCE(SUM(lt.fee), 0) AS fee_income,
    COALESCE(SUM(lt.penalty), 0) AS penalty_income,
    COALESCE(SUM(lt.interest + lt.fee + lt.penalty), 0) AS total_loan_income
FROM loan_transactions lt
JOIN loans l ON lt.loan_id = l.id
WHERE l.office_id = ?
  AND lt.transaction_type = 'repayment'
  AND lt.date BETWEEN ? AND ?
  AND lt.reversed = 0
  AND lt.status = 'approved'

-- Get expenses
SELECT 
    COALESCE(SUM(amount), 0) AS total_expenses
FROM expenses
WHERE office_id = ?
  AND date BETWEEN ? AND ?
  AND status = 'approved'

-- Get payroll costs
SELECT 
    COALESCE(SUM(paid_amount), 0) AS total_payroll
FROM payroll
WHERE office_id = ?
  AND date BETWEEN ? AND ?
```

### Status Indicators
- **✓ On Track**: ≥ K324,000 net contribution
- **⚠ At Risk**: < K324,000 net contribution

### API Endpoint
```
GET /province-branches-performance?province_id={province_id}&include_details=true
```

---

## Database Schema Relationships

### Entity Relationship Diagram

```
┌─────────────┐     ┌─────────────┐     ┌──────────────────┐
│   offices   │────<│    loans    │────<│ loan_transactions│
│  (branch)   │     │             │     │                  │
└─────────────┘     └─────────────┘     └──────────────────┘
       │                   │                     │
       │                   │                     │
       ▼                   ▼                     ▼
┌─────────────┐     ┌─────────────┐     ┌──────────────────┐
│   users     │────<│  clients    │     │ loan_repayment   │
│ (staff/LC)  │     │             │     │    _schedules    │
└─────────────┘     └─────────────┘     └──────────────────┘
       │
       ▼
┌─────────────┐
│ user_tiers  │
│             │
└─────────────┘
```

### Key Relationships

| Relationship | Description |
|--------------|-------------|
| `clients.office_id` → `offices.id` | Clients belong to a branch |
| `loans.office_id` → `offices.id` | Loans belong to a branch |
| `loans.client_id` → `clients.id` | Loans belong to clients |
| `loans.loan_officer_id` → `users.id` | Loans assigned to loan officers |
| `loan_transactions.loan_id` → `loans.id` | Transactions linked to loans |
| `loan_repayment_schedules.loan_id` → `loans.id` | Schedules linked to loans |
| `users.office_id` → `offices.id` | Staff assigned to branches |
| `user_tiers.user_id` → `users.id` | Tier tracking per user |

---

## Important Notes

### Date Filtering
- **Use `created_at` column** for date filtering in most queries as it represents when the record was created in the system
- `disbursement_date` is used specifically for disbursement-related metrics
- `due_date` in `loan_repayment_schedules` is used for expected payment calculations

### SQL GROUP BY Considerations
When joining multiple tables with aggregate functions, ensure all non-aggregated columns are included in the GROUP BY clause to avoid `ONLY_FULL_GROUP_BY` SQL mode errors. Best practice is to:
1. Split complex queries into separate queries for each table
2. Join results in application code
3. Use subqueries for derived calculations

### Transaction Types in loan_transactions
| Type | Description |
|------|-------------|
| `repayment` | Regular loan payment |
| `disbursement` | Loan payout |
| `interest_accrual` | Interest calculation |
| `fee_accrual` | Fee calculation |
| `penalty_accrual` | Penalty calculation |
| `write_off` | Loan written off |

### Loan Status Values
| Status | Description |
|--------|-------------|
| `pending` | Application submitted |
| `approved` | Approved but not disbursed |
| `disbursed` | Active loan |
| `closed` | Fully paid |
| `written_off` | Written off as bad debt |
| `rejected` | Application rejected |
| `declined` | Application declined |

---

## API Endpoints Summary

| Endpoint | Purpose | Required Parameters |
|----------|---------|---------------------|
| `GET /monthly-disbursement` | Monthly disbursement totals | `office_id` or `user_id` |
| `GET /month1-default-rate` | Month-1 default rate | `office_id` |
| `GET /collections-rate` | Collections/Recovery rate | `office_id` |
| `GET /user-tiers/:userId` | User tier information | `userId` (path param) |
| `GET /staff-productivity` | Staff productivity scores | `office_id` |
| `GET /province-branches-performance` | Branch performance overview | `province_id` |
| `GET /active-loans` | Active loans count | `office_id` |

---

## Sample API Responses

### Monthly Disbursement Response
```json
{
  "success": true,
  "data": {
    "metric": "Monthly Disbursement",
    "office_id": 1,
    "office_name": "Lusaka Branch",
    "current_period": {
      "total_disbursement": 420000,
      "formatted": "K420K",
      "disbursement_count": 15
    },
    "target": {
      "amount": 450000,
      "achievement_percentage": 93.33
    },
    "status": {
      "code": "at_risk",
      "icon": "⚠",
      "label": "At Risk"
    }
  }
}
```

### Collections Rate Response
```json
{
  "success": true,
  "data": {
    "metric": "Collections Rate",
    "office_id": 1,
    "current_period": {
      "total_collected": 85000,
      "total_expected": 100000,
      "collection_rate": 85.00,
      "formatted_rate": "85.00%"
    },
    "target": {
      "rate": 93.0,
      "status": "below_target"
    }
  }
}
```

---

## Troubleshooting

### Common Issues

1. **SQL GROUP BY Errors**
   - Error: "Expression #X of SELECT list is not in GROUP BY clause"
   - Solution: Split joined queries into separate queries for each table

2. **Missing Data**
   - Check that `office_id` is correctly set for all entities
   - Verify date ranges are correct
   - Ensure status filters include relevant statuses

3. **Incorrect Calculations**
   - Verify `reversed = 0` filter for transactions
   - Check `status = 'approved'` for valid transactions
   - Use `COALESCE()` to handle NULL values

---

*Last Updated: February 2026*
*Document Version: 1.0*
