# Performance Criteria API

Base path: `GET /api/remuneration/performance-creteria`

Calculates total collected amounts (month's revenue) for remuneration based on the employee's job position. The collection logic mirrors `api/performance/index.js`.

## Request

```
GET /api/remuneration/performance-creteria?job_position=branch_manager&office_id=5
```

### Query parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `job_position` | string | **Yes** | Position type: `branch_manager`, `province_manager`, `district_manager`, `payroll_manager`, `motor_loans`, `recoveries_coordinator`, `risk_manager`, `manager_administration`, `policy_manager` |
| `user_id` | string | No | Required for `payroll_manager` and `motor_loans`. Not required for `manager_administration` or `policy_manager` (institution-wide). |
| `office_id` | string | No | Required for `branch_manager`, `province_manager`, `district_manager` |
| `start_date` | string | No | Circle start date (`YYYY-MM-DD`). Defaults to 24th of previous month |
| `end_date` | string | No | Circle end date (`YYYY-MM-DD`). Defaults to 24th of current month |

### Circle period default

When `start_date` and `end_date` are omitted:

- **Most positions:** Circle period defaults to 24th of the previous month → 24th of the current month
- **`manager_administration`, `policy_manager`, and `performance_manager`:** Always filtered by the past **12 months** (from 12 months ago to today), regardless of any passed date params. These are annual targets.

---

## Position scopes

### branch_manager
Requires `office_id`. Returns total collected for all active consultants in that office.

```
GET /api/remuneration/performance-creteria?job_position=branch_manager&office_id=5
```

### province_manager
Requires `office_id`. Uses the office's `province_id` to find all offices in the province, then sums `baseTotalOfficeCollected` across each office.

```
GET /api/remuneration/performance-creteria?job_position=province_manager&office_id=5
```

### district_manager
Requires `office_id`. Uses the office's `district_id` to find all offices in the district, then sums `baseTotalOfficeCollected` across each office.

```
GET /api/remuneration/performance-creteria?job_position=district_manager&office_id=5
```

### payroll_manager
Requires `user_id`. Returns total collected for loans where `loan_product_id = 1` AND `staff_id = user_id`.

```
GET /api/remuneration/performance-creteria?job_position=payroll_manager&user_id=42
```

### motor_loans
Requires `user_id`. Returns total collected for loans where `loan_product_id = 0` AND `staff_id = user_id`.

```
GET /api/remuneration/performance-creteria?job_position=motor_loans&user_id=42
```

### recoveries_coordinator
No `user_id` or `office_id` required. Returns monthly net recovered (total recovered minus total costs) within the circle period.

```
GET /api/remuneration/performance-creteria?job_position=recoveries_coordinator
```
### risk_manager

No `user_id` or `office_id` required. Returns the Monthly Revenue Benchmark — revenue from closed loans within the circle period. Institution-wide (no user filter).

```
GET /api/remuneration/performance-creteria?job_position=risk_manager
```

**Monthly Revenue formula:**

| Component | Source Table | Description |
|-----------|-------------|-------------|
| Interest income | `loan_transactions` + `loans` | `debit` sum where `transaction_type = 'interest_initial'` and `loans.status = 'closed'` within circle period |
| Penalty income | `loan_transactions` + `loans` | `debit` sum where `transaction_type = 'specified_due_date_fee'` and `loans.status = 'closed'` within circle period |

**Monthly Revenue = Interest income + Penalty income**

### manager_administration
No `user_id` or `office_id` required. Returns the Value Preserved amount — net value actually returned to the institution within the circle period. Institution-wide (no user filter). Defaults to the past 12 months when no date params are passed.

```
GET /api/remuneration/performance-creteria?job_position=manager_administration
```

**Value Preserved formula:**

| Component | Source Table | Description |
|-----------|-------------|-------------|
| Credit sum | `loan_transactions` | `credit` sum within circle period |
| Credit sum | `office_loan_transactions` | `credit` sum within circle period |
| Advance recoveries | `advance_transactions` | `amount_paid` sum within circle period |
| Setup debt | `setup_debt_transactions` | `amount` sum within circle period |
| Deposits | `deposits` | `amount` sum within circle period |

**Value Preserved = loan_transactions.credit + office_loan_transactions.credit + advance_transactions.amount_paid + setup_debt_transactions.amount + deposits.amount**

### policy_manager
No `user_id` or `office_id` required. Returns the Value Protected/Enabled amount — value protecting/enabling the institution (point-in-time, no period filter). Institution-wide (no user filter).

```
GET /api/remuneration/performance-creteria?job_position=policy_manager
```

**Value Protected/Enabled formula:**

| Component | Source Table | Description |
|-----------|-------------|-------------|
| Collateral approved value | `collaterals` | `approved_value` sum within circle period |
| Branch asset inventory total value | `branch_asset_inventories` | `total_value` sum within circle period |
| Fleet current value | `fleets` | `current_value` sum within circle period |

**Value Protected/Enabled = Collateral approved value + Branch asset inventory total value + Fleet current value**

### performance_manager

No `user_id` or `office_id` required. Returns the Value Protected/Optimized (Annual) amount — value optimized through the loan portfolio within the past 12 months (annual target). Institution-wide (no user filter). Always filtered by the past 12 months regardless of any passed date params.

```
GET /api/remuneration/performance-creteria?job_position=performance_manager
```

**Value Protected/Optimized formula:**

| Component | Source Table | Description |
|-----------|-------------|-------------|
| Collateral approved value | `collaterals` | `approved_value` sum within past 12 months |
| Branch asset inventory total value | `branch_asset_inventories` | `total_value` sum within past 12 months |
| Fleet current value | `fleets` | `current_value` sum within past 12 months |

**Value Protected/Optimized = Collateral approved value + Branch asset inventory total value + Fleet current value**

---

```json
{
  "success": true,
  "data": {
    "job_position": "branch_manager",
    "user_id": null,
    "office_id": "5",
    "period": {
      "start_date": "2026-09-24",
      "end_date": "2026-10-24"
    },
    "total_collected": 12450.00,
    "detail": {
      "scope": "office",
      "office_id": "5"
    }
  }
}
```

### Response fields

| Field | Type | Description |
|-------|------|-------------|
| `job_position` | string | The position type requested |
| `user_id` | string\|null | The user_id passed (for payroll/motor positions) |
| `office_id` | string\|null | The office_id passed (for office/province/district positions) |
| `period.start_date` | string | Circle start date used |
| `period.end_date` | string | Circle end date used |
| `total_collected` | number | Total collected amount (2 decimals) |
| `detail` | object | Scope details used for the calculation |

---

## How `total_collected` is derived

Matches the logic in `api/performance/index.js`:

| Transaction type | Payment apply to | Amount used |
|------------------|------------------|-------------|
| `repayment` | `reloan_payment` | `balance_bf` |
| `repayment` | `full_payment` | `credit` |
| `repayment` | `part_payment` | `credit` |

Summed across all consultant loans in scope for the circle period.

---

## Errors

| Status | Body | Meaning |
|--------|------|---------|
| 400 | `{ "success": false, "error": "..." }` | Missing required parameter or unknown `job_position` |
| 404 | `{ "success": false, "error": "Office not found" }` | `office_id` does not exist |
| 500 | `{ "success": false, "error": "..." }` | Server error |

---

## Files

- `api/remuneration/performance-creteria.js` — route handler
- `api/remuneration/performance-creteria-calc.js` — calculation functions (`getCirclePeriod`, `baseTotalOfficeCollected`, `provinceTotalCollected`, `districtTotalCollected`, `payrollmanagerTotalCollected`, `motorloansTotalCollected`, `recoveriescoordinatorTotalCollected`, `riskmanagerTotalCollected`, `manageradministrationTargetCollected`, `policymanagerTargetCollected`)

Mounted in `index.js` at `app.use('/api/remuneration/performance-creteria', ...)`.
