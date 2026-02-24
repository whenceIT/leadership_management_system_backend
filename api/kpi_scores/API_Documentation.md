# KPI Scores API Documentation

This documentation provides detailed information about each individual KPI score API endpoint.

## Branch Manager KPIs (position_id = 5)

### 1. Monthly Disbursement KPI

**Endpoint:** `/api/kpi-scores/monthly-disbursement`

**Method:** POST

**Description:** Records Monthly Disbursement KPI score for a user. This KPI measures the total loan amount disbursed within the month.

**Scoring Type:** Numeric

**Weight:** 20%

**Target:** K450,000+

**Request Body:**
```json
{
  "user_id": 123,
  "score": 480000
}
```

**Response:**
```json
{
  "success": true,
  "message": "Monthly Disbursement KPI score recorded successfully",
  "data": {
    "kpi_id": 1,
    "user_id": 123,
    "score": 480000,
    "kpi_name": "Monthly Disbursement",
    "weight": 20
  }
}
```

### 2. Month-1 Default Rate KPI

**Endpoint:** `/api/kpi-scores/month1-default-rate`

**Method:** POST

**Description:** Records Month-1 Default Rate KPI score for a user. This KPI measures the percentage of loans defaulting within the first 30 days.

**Scoring Type:** Percentage

**Weight:** 25%

**Target:** ≤25%

**Request Body:**
```json
{
  "user_id": 123,
  "score": 22
}
```

**Response:**
```json
{
  "success": true,
  "message": "Month-1 Default Rate KPI score recorded successfully",
  "data": {
    "kpi_id": 2,
    "user_id": 123,
    "score": 22,
    "kpi_name": "Month-1 Default Rate",
    "weight": 25
  }
}
```

### 3. LCs at K50K+ Tier KPI

**Endpoint:** `/api/kpi-scores/lcs-at-k50k-tier`

**Method:** POST

**Description:** Records LCs at K50K+ Tier KPI score for a user. This KPI measures the percentage of Loan Consultants at K50K+ portfolio tier.

**Scoring Type:** Percentage

**Weight:** 15%

**Target:** ≥40%

**Request Body:**
```json
{
  "user_id": 123,
  "score": 45
}
```

**Response:**
```json
{
  "success": true,
  "message": "LCs at K50K+ Tier KPI score recorded successfully",
  "data": {
    "kpi_id": 3,
    "user_id": 123,
    "score": 45,
    "kpi_name": "LCs at K50K+ Tier",
    "weight": 15
  }
}
```

### 4. Branch Net Contribution KPI

**Endpoint:** `/api/kpi-scores/branch-net-contribution`

**Method:** POST

**Description:** Records Branch Net Contribution KPI score for a user. This KPI measures the branch net financial contribution (income minus expenses).

**Scoring Type:** Numeric

**Weight:** 15%

**Target:** K324,000+

**Request Body:**
```json
{
  "user_id": 123,
  "score": 350000
}
```

**Response:**
```json
{
  "success": true,
  "message": "Branch Net Contribution KPI score recorded successfully",
  "data": {
    "kpi_id": 4,
    "user_id": 123,
    "score": 350000,
    "kpi_name": "Net Contribution",
    "weight": 15
  }
}
```

### 5. Branch Recovery Rate (Month-4) KPI

**Endpoint:** `/api/kpi-scores/branch-recovery-rate-month4`

**Method:** POST

**Description:** Records Branch Recovery Rate (Month-4) KPI score for a user. This KPI measures the collection rate after 4 months from disbursement.

**Scoring Type:** Percentage

**Weight:** 25%

**Target:** ≥65%

**Request Body:**
```json
{
  "user_id": 123,
  "score": 70
}
```

**Response:**
```json
{
  "success": true,
  "message": "Branch Recovery Rate (Month-4) KPI score recorded successfully",
  "data": {
    "kpi_id": 5,
    "user_id": 123,
    "score": 70,
    "kpi_name": "Recovery Rate (Month-4)",
    "weight": 25
  }
}
```
