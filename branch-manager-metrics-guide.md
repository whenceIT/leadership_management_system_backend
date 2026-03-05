# Branch Manager Dashboard Metrics Guide

## Overview

This document explains the key performance metrics displayed on the Branch Manager Dashboard for the Loan Management System. Each metric includes its definition, calculation formula, data sources, and business significance.

---

## 1. Month-1 Default Rate

### Display Format
```
Month-1 Default Rate
2.3%
-0.5% from last month
```

### Definition
The **Month-1 Default Rate** measures the percentage of loans that default within the first 30 days after disbursement. This is a critical early warning indicator of loan quality and credit assessment effectiveness.

### Formula
```
Month-1 Default Rate = (Number of Loans Defaulted in Month 1 / Total Loans Disbursed) × 100
```

### SQL Logic
```sql
-- A loan is considered "Month-1 Default" if:
-- 1. Status is 'written_off' and was written off within 30 days of disbursement, OR
-- 2. Status is 'disbursed' but has arrears >= 30 days (calculated from repayment schedule)

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
WHERE l.office_id = :branch_id
  AND l.disbursement_date BETWEEN :period_start AND :period_end
  AND l.status IN ('disbursed', 'written_off', 'closed', 'paid')
```

### Data Sources
| Table | Fields Used |
|-------|-------------|
| `loans` | `id`, `office_id`, `status`, `disbursement_date`, `written_off_date` |
| `loan_repayment_schedules` | `loan_id`, `due_date`, `paid` |
| `clients` | `first_name`, `last_name`, `mobile` (for details) |

### Business Significance
- **Target Rate**: ≤ 3.0%
- **Status Indicators**:
  - ✓ **On Target**: Rate ≤ 3.0%
  - ⚠ **Above Target**: Rate > 3.0%

### Trend Interpretation
| Trend | Meaning |
|-------|---------|
| **-0.5% from last month** | Improvement - fewer loans defaulting early |
| **+0.5% from last month** | Deterioration - more loans defaulting early |

### API Endpoint
```
GET /month1-default-rate?office_id={branch_id}&period_start={start}&period_end={end}
```

---

## 2. Collections Rate

### Display Format
```
Collections Rate
94.5%
+1.2% from target
```

### Definition
The **Collections Rate** measures the percentage of expected collections that were actually collected during a period. It indicates the effectiveness of the branch's collection efforts.

### Formula
```
Collections Rate = (Total Amount Collected / Total Amount Due for Collection) × 100
```

### SQL Logic
```sql
-- Total Collected
SELECT 
    COALESCE(SUM(lt.principal + lt.interest + lt.fee + lt.penalty), 0) AS total_collected
FROM loan_transactions lt
JOIN loans l ON lt.loan_id = l.id
WHERE l.office_id = :branch_id
  AND lt.transaction_type = 'repayment'
  AND lt.date BETWEEN :period_start AND :period_end
  AND lt.reversed = 0
  AND lt.status = 'approved'
  AND l.status IN ('disbursed', 'closed', 'paid')

-- Total Expected
SELECT 
    COALESCE(SUM(lrs.total_due), 0) AS total_expected
FROM loan_repayment_schedules lrs
JOIN loans l ON lrs.loan_id = l.id
WHERE l.office_id = :branch_id
  AND lrs.due_date BETWEEN :period_start AND :period_end
  AND l.status IN ('disbursed', 'closed', 'paid')
```

### Data Sources
| Table | Fields Used |
|-------|-------------|
| `loan_transactions` | `principal`, `interest`, `fee`, `penalty`, `transaction_type`, `date`, `reversed`, `status` |
| `loan_repayment_schedules` | `total_due`, `due_date` |
| `loans` | `office_id`, `status` |

### Business Significance
- **Target Rate**: 93.0% (default, configurable)
- **Status Indicators**:
  - ✓ **Exceeding Target**: Rate ≥ Target + 2%
  - ✓ **On Target**: Rate ≥ Target
  - ⚠ **Near Target**: Target - 5% ≤ Rate < Target
  - ✗ **Below Target**: Rate < Target - 5%

### Components Breakdown
| Component | Description |
|-----------|-------------|
| **Principal Collected** | Original loan amount repaid |
| **Interest Collected** | Interest payments received |
| **Fees Collected** | Fee payments received |
| **Penalty Collected** | Late payment penalties collected |

### API Endpoint
```
GET /collections-rate?office_id={branch_id}&period_start={start}&period_end={end}&target_rate={target}
```

---

## 3. Active Loans

### Display Format
```
Active Loans
1,247
+23 this week
```

### Definition
**Active Loans** represents the count of loans currently in "disbursed" status at a branch. These are loans that have been funded and are currently being repaid.

### Formula
```
Active Loans Count = COUNT(loans WHERE status = 'disbursed' AND office_id = :branch_id)
```

### SQL Logic
```sql
-- Current Active Loans Count
SELECT COUNT(*) AS active_loans_count
FROM loans
WHERE office_id = :branch_id
  AND status = 'disbursed'

-- Weekly Change (New Disbursements - Closed Loans)
SELECT 
    COUNT(CASE WHEN disbursement_date >= :one_week_ago AND status = 'disbursed' THEN 1 END) AS new_disbursements,
    COUNT(CASE WHEN (closed_date >= :one_week_ago AND status IN ('closed', 'paid')) 
               OR (written_off_date >= :one_week_ago AND status = 'written_off') THEN 1 END) AS closed_loans
FROM loans
WHERE office_id = :branch_id

-- Outstanding Balance
SELECT 
    COALESCE(SUM(
        COALESCE(lrs.total_due, 0) - 
        COALESCE(lrs.principal_paid, 0) - 
        COALESCE(lrs.interest_paid, 0) - 
        COALESCE(lrs.fees_paid, 0) - 
        COALESCE(lrs.penalty_paid, 0)
    ), 0) AS outstanding_balance
FROM loan_repayment_schedules lrs
JOIN loans l ON lrs.loan_id = l.id
WHERE l.office_id = :branch_id
  AND l.status = 'disbursed'
```

### Data Sources
| Table | Fields Used |
|-------|-------------|
| `loans` | `id`, `office_id`, `status`, `disbursement_date`, `closed_date`, `written_off_date`, `principal`, `principal_derived`, `interest_derived`, `fees_derived`, `penalty_derived` |
| `loan_repayment_schedules` | `total_due`, `principal_paid`, `interest_paid`, `fees_paid`, `penalty_paid` |
| `offices` | `branch_capacity` |

### Business Significance
- **Branch Capacity**: Compare against `offices.branch_capacity`
- **Utilization Status**:
  - **At Capacity**: Utilization ≥ 90%
  - **Near Capacity**: Utilization ≥ 75%
  - **Available**: Utilization < 75%

### Weekly Change Interpretation
| Change | Meaning |
|--------|---------|
| **+23 this week** | Net growth - more new loans than closures |
| **-5 this week** | Net decline - more closures than new loans |

### API Endpoint
```
GET /active-loans?office_id={branch_id}&include_details={true/false}&loan_officer_id={officer_id}
```

---

## 4. Staff Productivity

### Display Format
```
Staff Productivity
87%
+5% improvement
```

### Definition
**Staff Productivity** is a composite score measuring the overall performance of loan officers at a branch. It combines multiple KPIs with weighted importance to provide a single productivity metric.

### Formula
```
Staff Productivity = (Weighted Score of Individual KPIs)

Where:
- Disbursement Target Achievement: 40% weight
- Collections Rate: 30% weight
- Portfolio Quality (PAR): 20% weight
- Client Acquisition: 10% weight
```

### Component Calculations

#### 1. Disbursement Target Achievement (40%)
```sql
SELECT 
    tt.user_id,
    tt.given_out AS actual_disbursement,
    tt.target AS target_disbursement,
    CASE 
        WHEN tt.target > 0 THEN ROUND((tt.given_out / tt.target) * 100, 2)
        ELSE 0 
    END AS achievement_rate
FROM target_tracker tt
JOIN users u ON tt.user_id = u.id
WHERE u.office_id = :branch_id
  AND tt.cycle_date BETWEEN :period_start AND :period_end
```

**Score Calculation**: `MIN(100, achievement_rate) × 0.40`

#### 2. Collections Rate (30%)
```sql
SELECT 
    l.loan_officer_id,
    COALESCE(SUM(lt.principal + lt.interest + lt.fee + lt.penalty), 0) AS total_collected,
    COALESCE(SUM(lrs.total_due), 0) AS total_expected,
    CASE 
        WHEN SUM(lrs.total_due) > 0 
        THEN ROUND((SUM(lt.principal + lt.interest + lt.fee + lt.penalty) / SUM(lrs.total_due)) * 100, 2)
        ELSE 0 
    END AS collection_rate
FROM loans l
LEFT JOIN loan_transactions lt ON lt.loan_id = l.id
    AND lt.transaction_type = 'repayment'
    AND lt.date BETWEEN :period_start AND :period_end
    AND lt.reversed = 0
    AND lt.status = 'approved'
LEFT JOIN loan_repayment_schedules lrs ON lrs.loan_id = l.id
    AND lrs.due_date BETWEEN :period_start AND :period_end
WHERE l.office_id = :branch_id
  AND l.status IN ('disbursed', 'closed', 'paid')
GROUP BY l.loan_officer_id
```

**Score Calculation**: `MIN(100, collection_rate) × 0.30`

#### 3. Portfolio Quality / PAR (20%)
```sql
-- PAR = Portfolio at Risk (loans with arrears > 30 days)
SELECT 
    l.loan_officer_id,
    SUM(CASE WHEN arrears_days > 30 THEN outstanding_balance ELSE 0 END) AS par_balance,
    SUM(outstanding_balance) AS total_portfolio,
    CASE 
        WHEN SUM(outstanding_balance) > 0 
        THEN ROUND((SUM(CASE WHEN arrears_days > 30 THEN outstanding_balance ELSE 0 END) / SUM(outstanding_balance)) * 100, 2)
        ELSE 0 
    END AS par_30_rate
FROM (
    SELECT 
        l.loan_officer_id,
        l.id,
        DATEDIFF(CURRENT_DATE, MIN(lrs.due_date)) AS arrears_days,
        SUM(lrs.total_due - COALESCE(lrs.principal_paid, 0) - COALESCE(lrs.interest_paid, 0) - COALESCE(lrs.fees_paid, 0) - COALESCE(lrs.penalty_paid, 0)) AS outstanding_balance
    FROM loans l
    JOIN loan_repayment_schedules lrs ON lrs.loan_id = l.id
    WHERE l.status = 'disbursed'
      AND l.office_id = :branch_id
      AND lrs.paid = 0
    GROUP BY l.id, l.loan_officer_id
) portfolio
GROUP BY loan_officer_id
```

**Score Calculation**: `MAX(0, (100 - par_30_rate)) × 0.20`
*(Lower PAR = Higher Score)*

#### 4. Client Acquisition (10%)
```sql
SELECT 
    c.staff_id AS officer_id,
    COUNT(*) AS new_clients
FROM clients c
WHERE c.office_id = :branch_id
  AND c.status = 'active'
  AND c.joined_date BETWEEN :period_start AND :period_end
GROUP BY c.staff_id
```

**Score Calculation**: 
```
client_target = MAX(10, CEIL(total_active_clients × 0.1))
acquisition_rate = MIN(100, (new_clients / client_target) × 100)
score = acquisition_rate × 0.10
```

### Data Sources
| Table | Fields Used |
|-------|-------------|
| `users` | `id`, `office_id`, `status`, `first_name`, `last_name` |
| `target_tracker` | `user_id`, `given_out`, `target`, `cycle_date` |
| `loans` | `loan_officer_id`, `office_id`, `status` |
| `loan_transactions` | `principal`, `interest`, `fee`, `penalty`, `transaction_type`, `date` |
| `loan_repayment_schedules` | `total_due`, `due_date`, `paid`, `principal_paid`, `interest_paid`, `fees_paid`, `penalty_paid` |
| `clients` | `staff_id`, `office_id`, `status`, `joined_date` |

### Business Significance
- **Target Score**: 80%
- **Performance Categories**:
  | Rating | Score Range |
  |--------|-------------|
  | **Excellent** | ≥ 90% |
  | **Good** | 80% - 89% |
  | **Average** | 70% - 79% |
  | **Needs Improvement** | < 70% |

### Status Indicators
| Status | Condition |
|--------|-----------|
| ✓ **On Target** | Score ≥ 80% |
| ⚠ **Near Target** | Score 70% - 79% |
| ✗ **Below Target** | Score < 70% |

### API Endpoint
```
GET /staff-productivity?office_id={branch_id}&period_start={start}&period_end={end}&include_officers={true/false}
```

---

## Database Relationships

### Entity Relationship Diagram
```
┌─────────────┐     ┌─────────────┐     ┌──────────────────────┐
│   offices   │────<│    loans    │────<│ loan_repayment_      │
│             │     │             │     │ schedules            │
│ - id        │     │ - id        │     │ - id                 │
│ - name      │     │ - office_id │     │ - loan_id            │
│ - province_id│    │ - client_id │     │ - due_date           │
│ - manager_id│     │ - loan_     │     │ - total_due          │
│ - branch_   │     │   officer_id│     │ - principal_paid     │
│   capacity  │     │ - principal │     │ - interest_paid      │
└─────────────┘     │ - status    │     │ - fees_paid          │
      │             │ - disbursement_date│ - penalty_paid      │
      │             │ - written_off_date │ - paid              │
      │             └─────────────┘     └──────────────────────┘
      │                    │                     │
      │                    │                     │
      ▼                    ▼                     │
┌─────────────┐     ┌─────────────┐             │
│   users     │     │   clients   │             │
│             │     │             │             │
│ - id        │     │ - id        │             │
│ - office_id │     │ - office_id │             │
│ - status    │     │ - staff_id  │             │
│ - first_name│     │ - status    │             │
│ - last_name │     │ - joined_date│            │
└─────────────┘     └─────────────┘             │
      │                                         │
      │              ┌──────────────────────┐   │
      └─────────────>│ loan_transactions    │<──┘
                     │                      │
                     │ - id                 │
                     │ - loan_id            │
                     │ - transaction_type   │
                     │ - principal          │
                     │ - interest           │
                     │ - fee                │
                     │ - penalty            │
                     │ - date               │
                     │ - reversed           │
                     │ - status             │
                     └──────────────────────┘
```

### Key Relationships
| Relationship | Description |
|--------------|-------------|
| `offices` → `loans` | A branch has many loans |
| `offices` → `users` | A branch has many staff members |
| `offices` → `clients` | A branch has many clients |
| `loans` → `loan_repayment_schedules` | A loan has many repayment installments |
| `loans` → `loan_transactions` | A loan has many transactions |
| `users` → `loans` | A loan officer manages many loans (via `loan_officer_id`) |
| `clients` → `loans` | A client has many loans |
| `clients` → `users` | A client is assigned to a loan officer (via `staff_id`) |

---

## Quick Reference Table

| Metric | Formula | Target | API Endpoint |
|--------|---------|--------|--------------|
| **Month-1 Default Rate** | (Defaults in Month 1 / Total Disbursed) × 100 | ≤ 3.0% | `GET /month1-default-rate` |
| **Collections Rate** | (Collected / Expected) × 100 | ≥ 93.0% | `GET /collections-rate` |
| **Active Loans** | COUNT(status = 'disbursed') | Branch Capacity | `GET /active-loans` |
| **Staff Productivity** | Weighted KPI Score | ≥ 80% | `GET /staff-productivity` |

---

## Common Query Parameters

All endpoints support the following common parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `office_id` | integer | Yes | Branch office ID |
| `period_start` | date (YYYY-MM-DD) | No | Period start date (defaults to current month start) |
| `period_end` | date (YYYY-MM-DD) | No | Period end date (defaults to current month end) |

### Endpoint-Specific Parameters

| Endpoint | Parameter | Type | Description |
|----------|-----------|------|-------------|
| `/month1-default-rate` | - | - | - |
| `/collections-rate` | `target_rate` | float | Target collections rate (default: 93.0) |
| `/active-loans` | `include_details` | boolean | Include detailed loan list |
| `/active-loans` | `loan_officer_id` | integer | Filter by loan officer |
| `/staff-productivity` | `include_officers` | boolean | Include officer breakdown (default: true) |

---

## Error Handling

All endpoints return consistent error responses:

```json
{
    "success": false,
    "error": "Error description",
    "message": "Detailed error message"
}
```

### Common HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 400 | Bad Request - Missing required parameters |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Database or server error |

---

## Best Practices for Branch Managers

### Monitoring Month-1 Default Rate
1. Review defaulted loans weekly
2. Identify patterns in early defaults
3. Assess credit scoring effectiveness
4. Train loan officers on client vetting

### Improving Collections Rate
1. Monitor daily collections trends
2. Follow up on overdue payments promptly
3. Incentivize early repayments
4. Review top-performing loan officers' strategies

### Managing Active Loans
1. Track capacity utilization
2. Balance new disbursements with collections
3. Monitor portfolio quality alongside volume
4. Ensure adequate staffing for portfolio size

### Enhancing Staff Productivity
1. Set clear individual targets
2. Provide regular feedback
3. Recognize top performers
4. Address underperformance promptly
5. Balance workload across team members

---

*Document Version: 1.0*  
*Last Updated: February 2026*  
*Author: Loan Management System Documentation Team*
