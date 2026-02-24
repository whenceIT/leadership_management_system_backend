# KPI Scores API

This API provides endpoints for managing and calculating KPI scores for users in the leadership management system. The scores are automatically calculated based on data from the database rather than being manually input.

## Base URL

All endpoints are relative to `/api/kpi-scores`

## Endpoints

### 1. Record KPI Score

**POST /api/kpi-scores**

Records a single KPI score for a user. The score is calculated automatically from the database.

#### Request Body
```json
{
  "kpi_id": 1,
  "user_id": 123,
  "office_id": 1,
  "province_id": 1,
  "start_date": "2023-01-01",
  "end_date": "2023-01-31"
}
```

#### Response
```json
{
  "success": true,
  "message": "KPI score recorded successfully"
}
```

### 2. Record Multiple KPI Scores (Batch)

**POST /api/kpi-scores/batch**

Records multiple KPI scores in a single request. Scores are calculated automatically from the database.

#### Request Body
```json
{
  "scores": [
    {
      "kpi_id": 1,
      "user_id": 123,
      "office_id": 1,
      "province_id": 1,
      "start_date": "2023-01-01",
      "end_date": "2023-01-31"
    },
    {
      "kpi_id": 2,
      "user_id": 123,
      "office_id": 1,
      "province_id": 1,
      "start_date": "2023-01-01",
      "end_date": "2023-01-31"
    }
  ]
}
```

#### Response
```json
{
  "success": true,
  "message": "Successfully recorded 2 KPI scores",
  "details": {
    "total": 2,
    "successful": 2,
    "failed": 0
  }
}
```

### 3. Get User's KPI Scores

**GET /api/kpi-scores/user/:user_id**

Retrieves all KPI scores for a specific user.

#### Response
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "score_id": 1,
      "kpi_id": 1,
      "user_id": 123,
      "score": 85,
      "created_date": "2026-02-24T19:54:28.000Z",
      "name": "Monthly Disbursement",
      "description": "Total loan amount disbursed within the month",
      "scoring": "numeric",
      "target": "K450,000+",
      "role": 5,
      "position_id": 5,
      "category": "Financial",
      "weight": 20
    },
    ...
  ]
}
```

### 4. Get User's KPI Scores by Position

**GET /api/kpi-scores/user/:user_id/position/:position_id**

Retrieves KPI scores for a user filtered by position.

#### Response
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "score_id": 1,
      "kpi_id": 1,
      "user_id": 123,
      "score": 85,
      "created_date": "2026-02-24T19:54:28.000Z",
      "name": "Monthly Disbursement",
      "description": "Total loan amount disbursed within the month",
      "scoring": "numeric",
      "target": "K450,000+",
      "role": 5,
      "position_id": 5,
      "category": "Financial",
      "weight": 20
    },
    ...
  ]
}
```

### 5. Get KPI Scores for Specific KPI

**GET /api/kpi-scores/kpi/:kpi_id**

Retrieves all scores for a specific KPI across users.

#### Response
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "score_id": 1,
      "kpi_id": 1,
      "user_id": 123,
      "score": 85,
      "created_date": "2026-02-24T19:54:28.000Z",
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "office_id": 1
    },
    ...
  ]
}
```

### 6. Calculate Total Weighted KPI Score

**GET /api/kpi-scores/calculate/:user_id/:position_id**

Calculates the total weighted KPI score for a user based on their position.

#### Response
```json
{
  "success": true,
  "data": {
    "total_score": 88.5,
    "max_possible_score": 100,
    "percentage": 88.5,
    "scores_count": 5
  }
}
```

### 7. Delete KPI Score

**DELETE /api/kpi-scores/:id**

Deletes a specific KPI score.

#### Response
```json
{
  "success": true,
  "message": "KPI score deleted successfully"
}
```

### 8. Delete All KPI Scores for User

**DELETE /api/kpi-scores/user/:user_id**

Deletes all KPI scores for a specific user.

#### Response
```json
{
  "success": true,
  "message": "Successfully deleted 5 KPI scores for user 123"
}
```

### 9. Record Branch Net Contribution KPI Score

**POST /api/kpi-scores/branch-net-contribution**

Records the Branch Net Contribution KPI score, calculated as total income minus total expenses for a specific period.

#### Request Body
```json
{
  "user_id": 123,
  "kpi_id": 5,
  "office_id": 1,
  "province_id": 1,
  "start_date": "2023-01-01",
  "end_date": "2023-01-31"
}
```

#### Response
```json
{
  "success": true,
  "message": "Branch Net Contribution KPI score recorded successfully",
  "data": {
    "kpi_id": 5,
    "user_id": 123,
    "score": 350000,
    "kpi_name": "Branch Net Contribution",
    "weight": 15,
    "period": {
      "start_date": "2023-01-01",
      "end_date": "2023-01-31"
    },
    "calculation": {
      "total_income": 1000000,
      "total_expenses": 650000,
      "income_breakdown": {
        "loan_income": 800000,
        "other_income": 150000,
        "ledger_income": 50000,
        "interest_income": 500000,
        "fee_income": 250000,
        "penalty_income": 50000
      }
    }
  }
}
```

### 10. Record Monthly Disbursement KPI Score

**POST /api/kpi-scores/monthly-disbursement**

Records the Monthly Disbursement KPI score, calculated as total approved amount of disbursed loans for a specific period.

#### Request Body
```json
{
  "user_id": 123,
  "kpi_id": 1,
  "office_id": 1,
  "province_id": 1,
  "start_date": "2023-01-01",
  "end_date": "2023-01-31"
}
```

#### Response
```json
{
  "success": true,
  "message": "Monthly Disbursement KPI score recorded successfully",
  "data": {
    "kpi_id": 1,
    "user_id": 123,
    "score": 500000,
    "kpi_name": "Monthly Disbursement",
    "weight": 20,
    "period": {
      "start_date": "2023-01-01",
      "end_date": "2023-01-31"
    },
    "calculation": {
      "total_disbursement": 500000
    }
  }
}
```

### 11. Record Month-1 Default Rate KPI Score

**POST /api/kpi-scores/month1-default-rate**

Records the Month-1 Default Rate KPI score, calculated as percentage of loans defaulted within 30 days of disbursement.

#### Request Body
```json
{
  "user_id": 123,
  "kpi_id": 2,
  "office_id": 1,
  "province_id": 1,
  "start_date": "2023-01-01",
  "end_date": "2023-01-31"
}
```

#### Response
```json
{
  "success": true,
  "message": "Month-1 Default Rate KPI score recorded successfully",
  "data": {
    "kpi_id": 2,
    "user_id": 123,
    "score": 5.2,
    "kpi_name": "Month-1 Default Rate",
    "weight": 25,
    "period": {
      "start_date": "2023-01-01",
      "end_date": "2023-01-31"
    },
    "calculation": {
      "total_disbursed": 100,
      "defaulted_in_month1": 5,
      "default_rate": 5.2
    }
  }
}
```

### 12. Record LCs at K50K+ Tier KPI Score

**POST /api/kpi-scores/lcs-at-k50k-tier**

Records the LCs at K50K+ Tier KPI score, calculated as percentage of loan consultants with portfolio size >= K50,000.

#### Request Body
```json
{
  "user_id": 123,
  "kpi_id": 4,
  "office_id": 1,
  "province_id": 1,
  "start_date": "2023-01-01",
  "end_date": "2023-01-31"
}
```

#### Response
```json
{
  "success": true,
  "message": "LCs at K50K+ Tier KPI score recorded successfully",
  "data": {
    "kpi_id": 4,
    "user_id": 123,
    "score": 45.5,
    "kpi_name": "LCs at K50K+ Tier",
    "weight": 15,
    "period": {
      "start_date": "2023-01-01",
      "end_date": "2023-01-31"
    },
    "calculation": {
      "total_loan_consultants": 22,
      "lcs_at_k50k_tier": 10,
      "percentage_at_k50k_tier": 45.5
    }
  }
}
```

### 13. Record Branch Recovery Rate (Month-4) KPI Score

**POST /api/kpi-scores/branch-recovery-rate-month4**

Records the Branch Recovery Rate (Month-4) KPI score, calculated as collection rate after 4 months from disbursement.

#### Request Body
```json
{
  "user_id": 123,
  "kpi_id": 3,
  "office_id": 1,
  "province_id": 1,
  "start_date": "2023-01-01",
  "end_date": "2023-01-31"
}
```

#### Response
```json
{
  "success": true,
  "message": "Branch Recovery Rate (Month-4) KPI score recorded successfully",
  "data": {
    "kpi_id": 3,
    "user_id": 123,
    "score": 85.3,
    "kpi_name": "Branch Recovery Rate (Month-4)",
    "weight": 25,
    "period": {
      "start_date": "2022-09-01",
      "end_date": "2023-01-31"
    },
    "calculation": {
      "total_loans": 80,
      "recovered_loans": 68,
      "total_principal": 4000000,
      "recovered_principal": 3412000,
      "recovery_rate": 85.3
    }
  }
}
```

## KPI Scoring Types

### Numeric Scoring
For KPIs with `scoring = 'numeric'`, the score is automatically calculated as the actual value achieved from the database.

### Percentage Scoring
For KPIs with `scoring = 'percentage'`, the score is automatically calculated as a percentage value (0-100) representing the performance from the database.

## Weighted Score Calculation

The weighted score is calculated as:
```
Total Weighted Score = Σ (Score × Weight) / 100
```

Where:
- Score is the user's score for each KPI (automatically calculated)
- Weight is the weight assigned to each KPI (from `smart_kpis.weight`)

The final percentage is then calculated by dividing the total weighted score by the sum of all weights, multiplied by 100.
