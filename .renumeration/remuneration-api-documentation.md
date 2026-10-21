# Remuneration API Documentation

## Base URL
`http://localhost:5000/api/remuneration`

## Overview
The Remuneration API provides endpoints for managing the complete remuneration structure including tiers, configurations, components, assignments, assessments, and calculations.

---

## 1. Overview Endpoints

### GET /
Get overview of remuneration module with counts and endpoint listings.

**Endpoint:** `GET /api/remuneration/`

**Request:** None

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "tiers": 0,
      "active_configs": 0,
      "active_components": 0,
      "approved_assignments": 0
    },
    "endpoints": { ... }
  }
}
```

---

## 2. Remuneration Tiers

Tiers define seniority levels (Tier 1-6 as per the guide).

### GET /tiers
Get all remuneration tiers.

**Endpoint:** `GET /api/remuneration/tiers`

**Query Parameters:** None

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "tier_number": 1,
      "name": "Most Senior",
      "description": "...",
      "is_active": 1,
      "created_at": "2026-10-20T12:00:00.000Z",
      "updated_at": "2026-10-20T12:00:00.000Z"
    }
  ]
}
```

### POST /tiers
Create a new remuneration tier.

**Endpoint:** `POST /api/remuneration/tiers`

**Request Body:**
```json
{
  "tier_number": 1,
  "name": "Most Senior",
  "description": "Highest revenue responsibility",
  "is_active": true
}
```

**Required Fields:** `tier_number`, `name`

**Response:**
```json
{
  "success": true,
  "message": "Remuneration tier created successfully",
  "data": { "id": 1 }
}
```

### GET /tiers/:id
Get a specific tier by ID.

**Endpoint:** `GET /api/remuneration/tiers/:id`

**Response:** Single tier object (same structure as above). Returns 404 if not found.

### PUT /tiers/:id
Update a tier.

**Endpoint:** `PUT /api/remuneration/tiers/:id`

**Request Body:** Any of the fields from POST

**Response:**
```json
{
  "success": true,
  "message": "Remuneration tier updated successfully"
}
```

---

## 3. Position Remuneration Configs

Main salary configuration linking positions and tiers with thresholds.

### GET /configs
Get all position remuneration configs with position and tier details.

**Endpoint:** `GET /api/remuneration/configs`

**Query Parameters:**
- `job_position_id` (optional) - Filter by job position
- `remuneration_tier_id` (optional) - Filter by tier
- `status` (optional) - Filter by status (draft, active, inactive)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "job_position_id": 5,
      "remuneration_tier_id": 1,
      "gross_pay": 19948.00,
      "target_net_pay": 13500.00,
      "currency": "ZMW",
      "threshold_type": "revenue",
      "threshold_amount": 20000000.00,
      "threshold_operator": ">=",
      "threshold_upper_amount": null,
      "threshold_period": "monthly",
      "min_branches": null,
      "max_branches": null,
      "effective_from": "2026-01-01",
      "effective_to": null,
      "status": "active",
      "created_at": "...",
      "updated_at": "...",
      "position_name": "Branch Manager",
      "tier_name": "Most Senior",
      "tier_number": 1
    }
  ]
}
```

### POST /configs
Create a new remuneration config.

**Endpoint:** `POST /api/remuneration/configs`

**Request Body:**
```json
{
  "job_position_id": 5,
  "remuneration_tier_id": 1,
  "gross_pay": 19948.00,
  "target_net_pay": 13500.00,
  "currency": "ZMW",
  "threshold_type": "deposits",
  "threshold_amount": 20000000.00,
  "threshold_operator": ">=",
  "threshold_upper_amount": null,
  "threshold_period": "monthly",
  "min_branches": null,
  "max_branches": null,
  "effective_from": "2026-01-01",
  "effective_to": null,
  "status": "draft"
}
```

**Required Fields:** `job_position_id`, `remuneration_tier_id`, `gross_pay`, `effective_from`
**Defaults:** `currency`="ZMW", `status`="draft"

### GET /configs/:id
Get specific config with joined position/tier names.

**Endpoint:** `GET /api/remuneration/configs/:id`

### PUT /configs/:id
Update config.

**Endpoint:** `PUT /api/remuneration/configs/:id`

---

## 4. Remuneration Components

Master list of allowances, deductions, benefits, employer contributions.

### GET /components
Get all components.

**Endpoint:** `GET /api/remuneration/components`

**Query Parameters:**
- `component_type` (optional) - allowance, deduction, employer contribution, benefit
- `is_active` (optional) - true/false

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Housing Allowance",
      "code": "housing",
      "component_type": "allowance",
      "payment_method": "landlord payment",
      "tax_treatment": "non-taxable",
      "paid_by": "employer",
      "calculation_type": "fixed",
      "description": "...",
      "is_active": 1,
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

### POST /components
Create component.

**Endpoint:** `POST /api/remuneration/components`

**Request Body:**
```json
{
  "name": "Housing Allowance",
  "code": "housing",
  "component_type": "allowance",
  "payment_method": "landlord payment",
  "tax_treatment": "non-taxable",
  "paid_by": "employer",
  "calculation_type": "fixed",
  "description": "Housing benefit paid to landlord",
  "is_active": true
}
```

**Required Fields:** `name`, `code`, `component_type`, `paid_by`, `calculation_type`

### GET /components/:id
Get specific component.

### PUT /components/:id
Update component.

---

## 5. Component Values

Link components to configs with amounts/percentages.

### GET /component-values
Get component values for configs.

**Endpoint:** `GET /api/remuneration/component-values`

**Query Parameters:**
- `remuneration_config_id` (optional) - Filter by config

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "remuneration_config_id": 1,
      "remuneration_component_id": 2,
      "amount": 2500.00,
      "percentage": null,
      "calculation_base": "gross_pay",
      "is_included_in_gross": 0,
      "is_included_in_company_cost": 1,
      "notes": "...",
      "created_at": "...",
      "updated_at": "...",
      "component_name": "Housing Allowance",
      "component_code": "housing",
      "component_type": "allowance",
      "paid_by": "employer",
      "calculation_type": "fixed"
    }
  ]
}
```

### POST /component-values
Create or update component value (upsert).

**Endpoint:** `POST /api/remuneration/component-values`

**Request Body:**
```json
{
  "remuneration_config_id": 1,
  "remuneration_component_id": 2,
  "amount": 2500.00,
  "percentage": null,
  "calculation_base": "gross_pay",
  "is_included_in_gross": false,
  "is_included_in_company_cost": true,
  "notes": "As per housing policy"
}
```

**Required Fields:** `remuneration_config_id`, `remuneration_component_id`

**Behavior:** If value exists for (config_id, component_id), it updates; otherwise creates.

---

## 6. Remuneration Criteria

Performance requirements for qualifying tiers.

### GET /criteria
Get criteria.

**Endpoint:** `GET /api/remuneration/criteria`

**Query Parameters:**
- `remuneration_config_id` (optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "remuneration_config_id": 1,
      "criterion_name": "Monthly bank deposits",
      "criterion_code": "monthly_deposits",
      "measurement_type": "amount",
      "operator": ">=",
      "target_value": 20000000.00,
      "measurement_period": "monthly",
      "is_mandatory": 1,
      "verification_source": "Banking system",
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

### POST /criteria
Create criterion.

**Endpoint:** `POST /api/remuneration/criteria`

**Request Body:**
```json
{
  "remuneration_config_id": 1,
  "criterion_name": "Monthly bank deposits",
  "criterion_code": "monthly_deposits",
  "measurement_type": "amount",
  "operator": ">=",
  "target_value": 20000000.00,
  "measurement_period": "monthly",
  "is_mandatory": true,
  "verification_source": "Banking system"
}
```

**Required Fields:** `remuneration_config_id`, `criterion_name`, `criterion_code`, `measurement_type`, `operator`, `measurement_period`

---

## 7. Housing Bands

Housing limits by position and tier.

### GET /housing-bands
Get housing bands with position/tier details.

**Endpoint:** `GET /api/remuneration/housing-bands`

**Query Parameters:**
- `job_position_id` (optional)
- `remuneration_tier_id` (optional)
- `status` (optional) - active, inactive

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "job_position_id": 5,
      "remuneration_tier_id": 1,
      "monthly_limit": 3000.00,
      "effective_from": "2026-01-01",
      "effective_to": null,
      "status": "active",
      "created_at": "...",
      "updated_at": "...",
      "position_name": "Branch Manager",
      "tier_name": "Most Senior",
      "tier_number": 1
    }
  ]
}
```

### POST /housing-bands
Create housing band.

**Endpoint:** `POST /api/remuneration/housing-bands`

**Request Body:**
```json
{
  "job_position_id": 5,
  "remuneration_tier_id": 1,
  "monthly_limit": 3000.00,
  "effective_from": "2026-01-01",
  "effective_to": null,
  "status": "active"
}
```

**Required Fields:** `job_position_id`, `remuneration_tier_id`, `monthly_limit`, `effective_from`

---

## 8. Bonus Rules

Annual bonuses and performance allowances.

### GET /bonus-rules
Get bonus rules with position details.

**Endpoint:** `GET /api/remuneration/bonus-rules`

**Query Parameters:**
- `job_position_id` (optional)
- `status` (optional) - draft, active, inactive
- `period` (optional) - annual, quarterly, monthly

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "job_position_id": 3,
      "bonus_name": "Provincial Manager Annual Bonus",
      "bonus_type": "fixed",
      "amount": 10000.00,
      "percentage": null,
      "performance_metric": "Provincial Efficiency and PDUA",
      "minimum_target": 80.00,
      "period": "annual",
      "effective_from": "2026-01-01",
      "effective_to": null,
      "status": "active",
      "created_at": "...",
      "updated_at": "...",
      "position_name": "Provincial Manager"
    }
  ]
}
```

### POST /bonus-rules
Create bonus rule.

**Endpoint:** `POST /api/remuneration/bonus-rules`

**Request Body:**
```json
{
  "job_position_id": 3,
  "bonus_name": "Provincial Manager Annual Bonus",
  "bonus_type": "fixed",
  "amount": 10000.00,
  "percentage": null,
  "performance_metric": "Provincial Efficiency and PDUA",
  "minimum_target": 80.00,
  "period": "annual",
  "effective_from": "2026-01-01",
  "effective_to": null,
  "status": "draft"
}
```

**Required Fields:** `bonus_name`, `bonus_type`, `period`, `effective_from`

---

## 9. Employee Remuneration Assignments

Link employees to remuneration configs (tier/salary package).

### GET /assignments
Get assignments with employee, position, config, tier details.

**Endpoint:** `GET /api/remuneration/assignments`

**Query Parameters:**
- `user_id` (optional)
- `job_position_id` (optional)
- `approval_status` (optional) - pending, approved, rejected

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 10,
      "job_position_id": 5,
      "remuneration_config_id": 1,
      "acting_capacity": 0,
      "effective_from": "2026-01-01",
      "effective_to": null,
      "approval_status": "approved",
      "approved_by": 1,
      "approved_at": "2026-01-02T10:00:00.000Z",
      "notes": "...",
      "created_at": "...",
      "updated_at": "...",
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "position_name": "Branch Manager",
      "gross_pay": 19948.00,
      "tier_name": "Most Senior",
      "tier_number": 1
    }
  ]
}
```

### POST /assignments
Create employee assignment.

**Endpoint:** `POST /api/remuneration/assignments`

**Request Body:**
```json
{
  "user_id": 10,
  "job_position_id": 5,
  "remuneration_config_id": 1,
  "acting_capacity": false,
  "effective_from": "2026-01-01",
  "effective_to": null,
  "approval_status": "pending",
  "approved_by": null,
  "approved_at": null,
  "notes": "New assignment"
}
```

**Required Fields:** `user_id`, `job_position_id`, `remuneration_config_id`, `effective_from`
**Defaults:** `acting_capacity`=false, `approval_status`="pending"

### PUT /assignments/:id/approve
Approve an assignment.

**Endpoint:** `PUT /api/remuneration/assignments/:id/approve`

**Request Body:**
```json
{
  "approved_by": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Assignment approved successfully"
}
```

---

## 10. Remuneration Assessments

Store monthly performance assessments and increment decisions.

### GET /assessments
Get assessments.

**Endpoint:** `GET /api/remuneration/assessments`

**Query Parameters:**
- `employee_remuneration_assignment_id` (optional)
- `assessment_status` (optional) - pending, passed, failed, under review

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "employee_remuneration_assignment_id": 1,
      "assessment_period": "2026-01-31",
      "actual_performance": "{\"monthly_deposits\": 25000000}",
      "achievement_percentage": 125.00,
      "assessment_status": "passed",
      "corrective_plan": null,
      "reviewed_by": 1,
      "reviewed_at": "2026-02-05T10:00:00.000Z",
      "decision": "maintain",
      "decision_notes": "...",
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

**Note:** `actual_performance` is stored as JSON in DB and returned as a string/JSON.

### POST /assessments
Create assessment.

**Endpoint:** `POST /api/remuneration/assessments`

**Request Body:**
```json
{
  "employee_remuneration_assignment_id": 1,
  "assessment_period": "2026-01-31",
  "actual_performance": {
    "monthly_deposits": 25000000,
    "efficiency": 85
  },
  "achievement_percentage": 125.00,
  "assessment_status": "pending",
  "corrective_plan": null,
  "reviewed_by": null,
  "reviewed_at": null,
  "decision": null,
  "decision_notes": null
}
```

**Required Fields:** `employee_remuneration_assignment_id`, `assessment_period`
**Defaults:** `assessment_status`="pending"

---

## 11. Remuneration Calculation

Calculate remuneration for an employee assignment based on config and components.

### GET /calculate/:assignment_id
Calculate pay for an assignment.

**Endpoint:** `GET /api/remuneration/calculate/:assignment_id`

**Query Parameters:**
- `period` (required) - Period in YYYY-MM-DD format (typically month-end/start)

**Example:** `GET /api/remuneration/calculate/1?period=2026-01-31`

**Response:**
```json
{
  "success": true,
  "data": {
    "assignment_id": 1,
    "period": "2026-01-31",
    "employee": {
      "name": "John Doe",
      "user_id": 10
    },
    "position": "Branch Manager",
    "tier": "Most Senior",
    "tier_number": 1,
    "gross_pay": 19948.00,
    "currency": "ZMW",
    "employee_deductions": 6947.00,
    "net_cash_pay": 13001.00,
    "housing_allowance": 2500.00,
    "total_direct_value": 15501.00,
    "employer_contributions": 3285.00,
    "total_monthly_cost_to_company": 25733.00,
    "components": [
      {
        "name": "Housing Allowance",
        "code": "housing",
        "component_type": "allowance",
        "paid_by": "employer",
        "calculation_type": "fixed",
        "amount": 2500.00,
        "is_included_in_gross": 0,
        "is_included_in_company_cost": 1
      },
      {
        "name": "PAYE",
        "code": "paye",
        "component_type": "deduction",
        "paid_by": "employee",
        "calculation_type": "fixed",
        "amount": 4524.00,
        "is_included_in_gross": 0,
        "is_included_in_company_cost": 0
      }
    ]
  }
}
```

**Calculation Logic:**
- If component has `amount` set ? use it directly
- If component has `percentage` set (and no amount) ? amount = (gross_pay ? percentage) / 100
- Employee deductions: components where `paid_by="employee"` AND `component_type="deduction"`
- Employer contributions: components where `paid_by="employer"` OR `component_type="employer contribution"`
- Housing allowance: identified by code/name containing "housing" with `paid_by="employer"`
- Net cash pay = `gross_pay - employee_deductions`
- Total monthly cost to company = `gross_pay + employer_contributions + housing_allowance`

---

## Notes

1. All timestamps are in UTC format (ISO 8601)
2. Boolean values in DB are stored as 0/1; responses include as-is from DB (0/1). You can treat them as booleans in JS.
3. The calculation endpoint uses the configured component values - ensure components are properly configured for each config.
4. Monetary values are stored as DECIMAL and returned as numbers (float) in JSON.
5. Assessment `actual_performance` is a JSON column - pass as object in POST, receives back as stored JSON.
6. Some endpoints have upsert behavior (component-values) for convenience.

---

## Example Workflow

1. Create tiers: `POST /tiers` (Tier 1-4)
2. Create components: `POST /components` (housing, PAYE, NAPSA, NHIMA, pension, etc.)
3. Create configs: `POST /configs` linking position + tier with gross pay and thresholds
4. Add component values: `POST /component-values` for each component in the config
5. Add criteria: `POST /criteria` for performance requirements
6. Add housing bands: `POST /housing-bands` if needed
7. Create assignment: `POST /assignments` for employee, approve it
8. Calculate pay: `GET /calculate/:assignment_id?period=YYYY-MM-DD`
9. Record assessment: `POST /assessments` with actual performance
