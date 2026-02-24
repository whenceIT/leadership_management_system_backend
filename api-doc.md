# API Documentation

## Overview

This document provides detailed documentation for all the API endpoints defined in `index.js`. The API is built with Express.js and interacts with a MySQL database to provide various functionalities related to user authentication, KPIs, loans, alerts, and performance metrics.

## Base URL

All endpoints are relative to: `http://localhost:5000`

## Endpoints

### 1. Health Check

**Endpoint:** `GET /health`

**Description:** Test database connection

**Parameters:** None

**Response:**
```json
{
  "status": "ok",
  "message": "Database connection is working",
  "data": [{"status": 1}]
}
```

### 2. Authentication

#### Sign In
**Endpoint:** `POST /sign-in`

**Description:** Authenticate user with email and password

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
- Success: User object
- Failure: "incorrect password"

#### Get User Information
**Endpoint:** `GET /get-user/:email`

**Description:** Get user details including role, cycle date, and province

**Parameters:**
- `email`: User's email address (URL parameter)

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role_id": 2,
  "cycle_date": "2023-12-31",
  "province": 1
}
```

### 3. KPIs (Key Performance Indicators)

#### Get All KPIs
**Endpoint:** `GET /all-kpis`

**Description:** Get all smart KPIs from the database

**Parameters:** None

**Response:** Array of KPI objects

#### Add New KPI
**Endpoint:** `POST /kpi`

**Description:** Create a new smart KPI

**Request Body:**
```json
{
  "role": "loan_officer",
  "name": "Loan Disbursement Target",
  "description": "Monthly loan disbursement target",
  "scoring": "percentage",
  "target": 100000,
  "position_id": 1,
  "category": "disbursement",
  "weight": 0.3
}
```

**Response:**
```json
{
  "message": "KPI added",
  "kpiId": 1
}
```

#### Get KPI by ID
**Endpoint:** `GET /kpi/:id`

**Description:** Get a single KPI by its ID

**Parameters:**
- `id`: KPI ID (URL parameter)

**Response:** KPI object

#### Get KPIs by Role
**Endpoint:** `GET /kpis/role/:role`

**Description:** Get all KPIs for a specific role

**Parameters:**
- `role`: Role name (URL parameter)

**Response:** Array of KPI objects

#### Delete KPI
**Endpoint:** `DELETE /kpi/:id`

**Description:** Delete a KPI by its ID

**Parameters:**
- `id`: KPI ID (URL parameter)

**Response:**
```json
{
  "message": "KPI deleted"
}
```

#### Update KPI
**Endpoint:** `PUT /kpi/:id`

**Description:** Update an existing KPI

**Parameters:**
- `id`: KPI ID (URL parameter)

**Request Body:**
```json
{
  "role": "loan_officer",
  "name": "Updated Loan Disbursement Target",
  "description": "Monthly loan disbursement target (updated)",
  "scoring": "percentage",
  "target": 150000,
  "position_id": 1,
  "category": "disbursement",
  "weight": 0.35
}
```

**Response:**
```json
{
  "message": "KPI updated"
}
```

### 4. Leadership Positions

**Endpoint:** `GET /leadership-positions`

**Description:** Get all job positions

**Parameters:** None

**Response:** Array of position objects

### 5. KPI Scores

#### Get All KPI Scores
**Endpoint:** `GET /all-smart-kpi-scores`

**Description:** Get all KPI scores from the database

**Parameters:** None

**Response:** Array of KPI score objects

#### Get KPI Scores by User and Position
**Endpoint:** `GET /smart-kpi-scores/:user_id/:position_id`

**Description:** Get KPI scores for a specific user and position

**Parameters:**
- `user_id`: User ID (URL parameter)
- `position_id`: Position ID (URL parameter)

**Response:** Array of KPI scores with KPI details

### 6. Loans

#### Get Smart Loans
**Endpoint:** `GET /smart-loans`

**Description:** Get loans with filtering options

**Query Parameters:**
- `status`: Loan status (required)
- `start_date`: Start date for date range filter (optional)
- `end_date`: End date for date range filter (optional)
- `office_id`: Office ID filter (optional)
- `province_id`: Province ID filter (optional)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [/* Array of loan objects */]
}
```

#### Get Loan by ID
**Endpoint:** `GET /loan/:id`

**Description:** Get a single loan by its ID

**Parameters:**
- `id`: Loan ID (URL parameter)

**Response:** Loan object

### 7. Offices

**Endpoint:** `GET /offices`

**Description:** Get all offices

**Parameters:** None

**Response:** Array of office objects

### 8. Smart Priority Actions

#### Create Smart Priority Action
**Endpoint:** `POST /create-smart-priority-actions`

**Description:** Create a new smart priority action

**Request Body:**
```json
{
  "actions": "Complete loan application review",
  "due": 2,
  "urgent": 1,
  "position_id": 1,
  "user_id": 1,
  "office_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Smart priority action created successfully",
  "data": {/* Created action object */}
}
```

#### Get Smart Priority Actions
**Endpoint:** `GET /smart-priority-actions`

**Description:** Get smart priority actions with filtering options

**Query Parameters:**
- `start_date`: Start date (optional, default: today)
- `end_date`: End date (optional, default: today)
- `user_id`: User ID filter (optional)
- `office_id`: Office ID filter (optional)
- `position_id`: Position ID filter (optional)
- `status`: Status filter (optional)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [/* Array of action objects */]
}
```

### 9. Staff

#### Get Active Staff
**Endpoint:** `GET /staff`

**Description:** Get all active users (staff) with optional filters

**Query Parameters:**
- `office_id`: Office ID filter (optional)
- `province_id`: Province ID filter (optional)

**Response:** Array of user objects

#### Get Staff by Position
**Endpoint:** `GET /staffbyPosition`

**Description:** Get active users by position with optional filters

**Query Parameters:**
- `position_id`: Position ID filter (optional)
- `office_id`: Office ID filter (optional)
- `province_id`: Province ID filter (optional)

**Response:** Array of user objects

### 10. Branch Statistics

**Endpoint:** `GET /branch-stats`

**Description:** Get branch statistics including staff, loans, clients, and other metrics

**Formula (Simple Terms):**
```
Branch Statistics:
1. Total Staff: Number of active users in the branch
2. Staff on Leave: Number of users with approved leave
3. Pending Loans: Number of loans with status = 'pending'
4. Disbursed Loans: Number of loans with status = 'disbursed'
5. Active Clients: Number of clients with status = 'active'
6. Pending Advances: Number of advances with status = 'pending'
7. Approved Advances: Number of advances with status = 'approved'
8. Pending Expenses: Number of expenses with status = 'pending'
9. Open Tickets: Number of tickets with status = 'open'
10. Loan Portfolio: Total principal amount of all disbursed loans
11. Pending Transactions: Number of pending loan transactions

All metrics are calculated in real-time for the specified branch.
```

**Query Parameters:**
- `office_id`: Office ID (required)

**Response:**
```json
{
  "success": true,
  "data": {
    "office_id": 1,
    "total_staff": 10,
    "staff_on_leave": 2,
    "pending_loans": 5,
    "disbursed_loans": 50,
    "active_clients": 100,
    "pending_advances": 3,
    "approved_advances": 7,
    "pending_expenses": 2,
    "open_tickets": 15,
    "loan_portfolio": 500000,
    "pending_transactions": 8
  }
}
```

### 11. Smart Alerts

#### Get Smart Alerts
**Endpoint:** `GET /smart-alerts`

**Description:** Get smart alerts with filtering options

**Query Parameters:**
- `user_id`: User ID filter (optional)
- `position_id`: Position ID filter (optional)
- `office_id`: Office ID filter (optional)
- `kpi_id`: KPI ID filter (optional)
- `type`: Alert type filter (optional)
- `priority`: Priority filter (optional)
- `category`: Category filter (optional)
- `unread_only`: Show only unread alerts (optional, default: true)
- `limit`: Number of alerts to return (optional, default: 50)

**Response:**
```json
{
  "success": true,
  "data": [/* Array of alert objects */],
  "count": 10
}
```

#### Create Smart Alert
**Endpoint:** `POST /smart-alerts`

**Description:** Create a new smart alert

**Request Body:**
```json
{
  "type": "warning",
  "priority": "high",
  "message": "Loan disbursement target not met",
  "title": "Target Warning",
  "category": "disbursement",
  "source": "system",
  "kpi_id": 1,
  "position_id": 1,
  "office_id": 1,
  "province_id": 1,
  "user_id": 1,
  "action_url": "/loans",
  "action_label": "View Loans",
  "expires_at": "2023-12-31",
  "metadata": {"target": 100000, "actual": 80000}
}
```

**Response:**
```json
{
  "success": true,
  "data": {/* Created alert object */},
  "message": "Alert created successfully"
}
```

#### Get Alert by ID
**Endpoint:** `GET /smart-alerts/:id`

**Description:** Get a single alert by its ID

**Parameters:**
- `id`: Alert ID (URL parameter)

**Response:**
```json
{
  "success": true,
  "data": {/* Alert object */}
}
```

#### Update Alert
**Endpoint:** `PATCH /smart-alerts/:id`

**Description:** Update an existing alert

**Parameters:**
- `id`: Alert ID (URL parameter)

**Request Body:**
```json
{
  "is_read": true,
  "is_dismissed": false,
  "type": "info",
  "priority": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "data": {/* Updated alert object */},
  "message": "Alert updated successfully"
}
```

#### Delete Alert
**Endpoint:** `DELETE /smart-alerts/:id`

**Description:** Delete an alert by its ID

**Parameters:**
- `id`: Alert ID (URL parameter)

**Response:**
```json
{
  "success": true,
  "message": "Alert deleted successfully"
}
```

#### Mark All Alerts as Read
**Endpoint:** `POST /smart-alerts/mark-all-read`

**Description:** Mark all alerts as read for a user/position

**Request Body:**
```json
{
  "user_id": 1,
  "position_id": 1,
  "office_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "5 alerts marked as read"
}
```

### 12. Loan Consultant Stats

**Endpoint:** `GET /loan-consultant-stats`

**Description:** Get loan consultant statistics with filtering options

**Formula (Simple Terms):**
```
Loan Consultant Metrics:
1. New Applications: Number of loans with status = 'pending'
2. Under Review: Number of pending loans older than 3 days
3. Approved: Number of loans with status = 'approved'
4. Disbursed: Number of loans with status = 'disbursed'
5. Total Loans: Total number of loans in all statuses
6. Pending Loans: Number of loans with status in ['pending', 'new', 'under_review']
7. Declined: Number of loans with status in ['declined', 'rejected']

All metrics are calculated for the specified period and can be filtered by office, province, or specific loan officer.
```

**Query Parameters:**
- `start_date`: Start date filter (optional)
- `end_date`: End date filter (optional)
- `office_id`: Office ID filter (optional)
- `province_id`: Province ID filter (optional)
- `user_id`: User ID filter (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "new_applications": 15,
    "under_review": 3,
    "approved": 10,
    "disbursed": 8,
    "total_loans": 36,
    "pending_loans": 18,
    "declined": 8
  }
}
```

### 13. User Tiers

#### Get User Tier
**Endpoint:** `GET /user-tiers/:userId`

**Description:** Get user tier information including current tier, next tier, benefits, and historical tiers

**Parameters:**
- `userId`: User ID (URL parameter)

**Response:**
```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "current_tier": {/* Tier object */},
    "next_tier": {/* Tier object or null */},
    "portfolio_summary": {/* Portfolio summary */},
    "benefits": [/* Array of benefit objects */],
    "historical_tiers": [/* Array of historical tier objects */]
  }
}
```

#### Update User Portfolio Value
**Endpoint:** `PUT /user-tiers/:userId/portfolio`

**Description:** Update user portfolio value and check for tier upgrade

**Parameters:**
- `userId`: User ID (URL parameter)

**Request Body:**
```json
{
  "portfolio_value": 150000
}
```

**Response:**
```json
{
  "success": true,
  "message": "Portfolio value updated successfully",
  "data": {
    "user_id": 1,
    "old_portfolio_value": 100000,
    "new_portfolio_value": 150000,
    "tier_upgraded": true,
    "current_tier": {/* Current tier object */},
    "next_tier": {/* Next tier object */}
  }
}
```

### 14. Audit Logs

**Endpoint:** `GET /audit-logs/:user_id`

**Description:** Get audit logs with loan and client information

**Parameters:**
- `user_id`: User ID (URL parameter)

**Response:**
```json
{
  "success": true,
  "user_id": 1,
  "total_audit_logs": 50,
  "data": [/* Array of audit log objects */]
}
```

### 15. Month-1 Default Rate

**Endpoint:** `GET /month1-default-rate`

**Description:** Calculate Month-1 Default Rate for a branch/office

**Formula (Simple Terms):**
```
Month-1 Default Rate = (Number of Loans Defaulted in Month 1 / Total Loans Disbursed in the Period) × 100

- A loan is considered "Month-1 Default" if:
  1. It was written off within 30 days of disbursement, OR
  2. It's still disbursed but has arrears (unpaid amounts) for 30 days or more

Target: ≤ 3.0% (considered "on target")
```

**Query Parameters:**
- `office_id`: Branch office ID (required)
- `period_start`: Start date for the period (optional, default: current month start)
- `period_end`: End date for the period (optional, default: current month end)

**Response:**
```json
{
  "success": true,
  "data": {
    "metric": "Month-1 Default Rate",
    "office_id": 1,
    "period": {/* Period dates */},
    "current_period": {/* Current period data */},
    "previous_period": {/* Previous period data */},
    "trend": {/* Trend information */},
    "benchmark": {/* Benchmark information */},
    "defaulted_loans": [/* Array of defaulted loans */]
  }
}
```

### 16. Collections Rate

**Endpoint:** `GET /collections-rate`

**Description:** Calculate Collections Rate for a branch/office

**Formula (Simple Terms):**
```
Collections Rate = (Total Amount Collected / Total Amount Due for Collection) × 100

- Total Amount Collected: Sum of all loan repayments (principal + interest + fees + penalties) received
- Total Amount Due: Sum of all scheduled repayments (principal + interest + fees + penalties) for the period

Target: ≥ 93.0% (considered "on target")
```

**Query Parameters:**
- `office_id`: Branch office ID (required)
- `period_start`: Start date for the period (optional, default: current month start)
- `period_end`: End date for the period (optional, default: current month end)
- `target_rate`: Target collections rate (optional, default: 93.0)

**Response:**
```json
{
  "success": true,
  "data": {
    "metric": "Collections Rate",
    "office_id": 1,
    "period": {/* Period dates */},
    "current_period": {/* Current period data */},
    "previous_period": {/* Previous period data */},
    "breakdown": {/* Detailed breakdown */},
    "trend": {/* Trend information */},
    "target": {/* Target information */},
    "summary": {/* Summary statistics */},
    "daily_trend": [/* Daily trend data */],
    "officer_performance": [/* Officer performance data */]
  }
}
```

### 17. Active Loans

**Endpoint:** `GET /active-loans`

**Description:** Get Active Loans count and details for a branch/office

**Formula (Simple Terms):**
```
Active Loans Count = Number of loans with status = 'disbursed'

Key Metrics:
- Active Loans Count: Total number of currently disbursed loans
- Outstanding Balance: Total amount still owed (principal + interest + fees + penalties)
- Capacity Utilization: (Active Loans / Branch Capacity) × 100
- Weekly Change: (New Disbursements - Closed/Written-off Loans) in the last week

Capacity Status:
- At Capacity: ≥ 90% utilization
- Near Capacity: 75-89% utilization
- Available: < 75% utilization
```

**Query Parameters:**
- `office_id`: Branch office ID (required)
- `include_details`: Include detailed loan list (optional, default: false)
- `loan_officer_id`: Filter by specific loan officer (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "metric": "Active Loans",
    "office_id": 1,
    "office_name": "Branch Name",
    "current_period": {/* Current period data */},
    "outstanding_balance": {/* Outstanding balance details */},
    "capacity": {/* Branch capacity information */},
    "status_breakdown": [/* Status breakdown */],
    "product_breakdown": [/* Product breakdown */],
    "officer_breakdown": [/* Officer breakdown */]
  }
}
```

### 18. Staff Productivity

**Endpoint:** `GET /staff-productivity`

**Description:** Calculate Staff Productivity for a branch/office

**Formula (Simple Terms):**
```
Staff Productivity = (Weighted Score of Individual KPIs) × 100

Weights:
- Disbursement Target Achievement: 40% (how much of the loan disbursement target was met)
- Collections Rate: 30% (how much of the expected collections was received)
- Portfolio Quality (PAR): 20% (lower PAR is better - measures loans in arrears)
- Client Acquisition: 10% (number of new clients acquired)

Performance Ratings:
- ≥ 90%: Excellent
- ≥ 80%: Good
- ≥ 70%: Average
- < 70%: Needs Improvement

Target: ≥ 80% (considered "on target")
```

**Query Parameters:**
- `office_id`: Branch office ID (required)
- `period_start`: Start date for the period (optional, default: current month start)
- `period_end`: End date for the period (optional, default: current month end)
- `include_officers`: Include individual officer breakdown (optional, default: true)

**Response:**
```json
{
  "success": true,
  "data": {
    "metric": "Staff Productivity",
    "office_id": 1,
    "office_name": "Branch Name",
    "period": {/* Period dates */},
    "current_period": {/* Current period data */},
    "previous_period": {/* Previous period data */},
    "kpi_weights": {/* KPI weights */},
    "performance_summary": {/* Performance summary */},
    "performance_categories": {/* Performance categories */},
    "benchmark": {/* Benchmark information */},
    "officer_breakdown": [/* Officer breakdown */],
    "top_performers": [/* Top performers */],
    "needs_attention": [/* Officers needing attention */]
  }
}
```

### 19. Province Branches Performance

**Endpoint:** `GET /province-branches-performance`

**Description:** Get Branch Performance Overview for Provincial Managers

**Formula (Simple Terms):**
```
Net Contribution = Total Income - Total Expenses

Income Breakdown:
- Interest Income: Interest collected from loans
- Fee Income: Fees collected from loans
- Penalty Income: Penalties collected from loans
- Other Income: Non-loan related income
- Ledger Income: Income from the general ledger

Key Metrics:
- Net Contribution: Total income minus total expenses (profit/loss)
- Portfolio Value: Total outstanding balance of all loans
- PAR (Portfolio at Risk): Percentage of loans with arrears > 30 days
- Collections Rate: (Total Collected / Total Expected) × 100
- Active Loans: Number of currently disbursed loans
- Active Clients: Number of active clients

Branches are ranked by net contribution (highest to lowest)
```

**Query Parameters:**
- `province_id`: Province ID to filter branches (required)
- `period_start`: Start date for the period (optional, default: current month start)
- `period_end`: End date for the period (optional, default: current month end)
- `include_details`: Include detailed breakdown (optional, default: false)

**Response:**
```json
{
  "success": true,
  "data": {
    "metric": "Branch Performance Overview",
    "province": {/* Province information */},
    "period": {/* Period dates */},
    "province_summary": {/* Province summary */},
    "branches": [/* Array of branch performance objects */]
  }
}
```

### 20. Monthly Disbursement

**Endpoint:** `GET /monthly-disbursement`

**Description:** Calculate Monthly Disbursement for a branch/office

**Formula (Simple Terms):**
```
Monthly Disbursement = Total amount of loans disbursed in the month

- Only loans with status = 'disbursed' are counted
- Calculated by summing the approved amount of all disbursed loans

Status Indicators:
- On Track: ≥ Target (default: K450,000+)
- At Risk: 70-99% of Target
- Below Target: < 70% of Target
```

**Query Parameters:**
- `user_id`: User ID (branch manager) (optional)
- `office_id`: Branch office ID (optional)
- `period_start`: Start date for the period (optional, default: current month start)
- `period_end`: End date for the period (optional, default: current month end)
- `target`: Target amount (optional, default: 450000)

**Response:**
```json
{
  "success": true,
  "data": {
    "metric": "Monthly Disbursement",
    "user_id": 1,
    "office_id": 1,
    "office_name": "Branch Name",
    "period": {/* Period dates */},
    "current_period": {/* Current period data */},
    "previous_period": {/* Previous period data */},
    "target": {/* Target information */},
    "status": {/* Status information */},
    "trend": {/* Trend information */},
    "projection": {/* Projection data */},
    "breakdown": {/* Breakdown by product and officer */},
    "daily_trend": [/* Daily trend data */]
  }
}
```

### 21. Review Sign-offs

#### Create Review Sign-off
**Endpoint:** `POST /api/reviews/signoff`

**Description:** Create a performance review sign-off record

**Request Body:**
```json
{
  "position": "Branch Manager",
  "signature": "John Doe",
  "signedAt": "2023-12-31T15:30:00Z",
  "reviewType": "quarterly",
  "user_id": 1,
  "office_id": 1,
  "notes": "Performance review completed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Review sign-off recorded successfully",
  "data": {/* Created sign-off object */}
}
```

#### Get Review Sign-offs
**Endpoint:** `GET /api/reviews/signoffs`

**Description:** Get all review sign-offs with optional filtering

**Query Parameters:**
- `user_id`: User ID filter (optional)
- `office_id`: Office ID filter (optional)
- `position`: Position filter (optional)
- `reviewType`: Review type filter (optional)
- `start_date`: Start date filter (optional)
- `end_date`: End date filter (optional)
- `limit`: Number of sign-offs to return (optional, default: 50)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [/* Array of sign-off objects */]
}
```

#### Get Review Sign-off by ID
**Endpoint:** `GET /api/reviews/signoffs/:id`

**Description:** Get a single review sign-off by ID

**Parameters:**
- `id`: Sign-off ID (URL parameter)

**Response:**
```json
{
  "success": true,
  "data": {/* Sign-off object */}
}
```

### 22. Scheduled Reviews

#### Schedule a Review
**Endpoint:** `POST /api/reviews/schedule`

**Description:** Schedule a new performance review

**Request Body:**
```json
{
  "position": "Branch Manager",
  "reviewType": "quarterly",
  "title": "Q4 Performance Review",
  "description": "Quarterly performance review for branch managers",
  "scheduledDate": "2023-12-31",
  "scheduledTime": "14:00",
  "assignee": "Branch Manager",
  "priority": "high",
  "sendReminder": true,
  "reminderDaysBefore": 2,
  "user_id": 1,
  "office_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Review scheduled successfully",
  "data": {/* Scheduled review object */}
}
```

#### Get Scheduled Reviews
**Endpoint:** `GET /api/reviews/schedule`

**Description:** Get all scheduled reviews with optional filtering

**Query Parameters:**
- `position`: Position filter (optional)
- `status`: Status filter (optional)
- `upcoming`: Show only upcoming reviews (optional, default: false)
- `user_id`: User ID filter (optional)
- `office_id`: Office ID filter (optional)
- `start_date`: Start date filter (optional)
- `end_date`: End date filter (optional)
- `limit`: Number of reviews to return (optional, default: 50)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [/* Array of scheduled review objects */]
}
```

#### Get Scheduled Review by ID
**Endpoint:** `GET /api/reviews/schedule/:id`

**Description:** Get a single scheduled review by ID

**Parameters:**
- `id`: Review ID (URL parameter)

**Response:**
```json
{
  "success": true,
  "data": {/* Scheduled review object */}
}
```

#### Update Scheduled Review
**Endpoint:** `PUT /api/reviews/schedule/:id`

**Description:** Update a scheduled review

**Parameters:**
- `id`: Review ID (URL parameter)

**Request Body:**
```json
{
  "title": "Updated Q4 Performance Review",
  "description": "Updated quarterly performance review",
  "scheduledDate": "2024-01-05",
  "scheduledTime": "15:00",
  "status": "in-progress"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Review updated successfully",
  "data": {/* Updated review object */}
}
```

#### Delete Scheduled Review
**Endpoint:** `DELETE /api/reviews/schedule/:id`

**Description:** Cancel/delete a scheduled review

**Parameters:**
- `id`: Review ID (URL parameter)

**Response:**
```json
{
  "success": true,
  "message": "Scheduled review cancelled successfully"
}
```

#### Update Review Status
**Endpoint:** `PATCH /api/reviews/schedule/:id/status`

**Description:** Update only the status of a scheduled review

**Parameters:**
- `id`: Review ID (URL parameter)

**Request Body:**
```json
{
  "status": "completed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Review status updated successfully",
  "data": {
    "id": 1,
    "previousStatus": "in-progress",
    "newStatus": "completed"
  }
}
```

### 23. Branch Collection Waterfall

**Endpoint:** `GET /branch-collection-waterfall`

**Description:** Calculate Collections Waterfall for a branch/office

**Formula (Simple Terms):**
```
Collections Waterfall Metrics:
1. Due: Total amount expected to be collected (sum of scheduled repayments)
2. Collected: Amount received as full payments or reloan payments
3. Partial: Amount received as partial payments
4. Overdue: Uncollected amounts past the due date
5. Compliance: (Collected / Due) × 100

Key Definitions:
- Full Payment: Payment that covers the entire scheduled amount
- Partial Payment: Payment that covers only part of the scheduled amount
- Overdue: Amount not paid by the due date

Compliance Target: ≥ 95% (Excellent), ≥ 80% (Good), ≥ 70% (Average), < 70% (Needs Attention)
```

**Query Parameters:**
- `office_id`: Branch office ID (required)
- `start_date`: Start date for the period (optional, default: 2023-02-01)
- `end_date`: End date for the period (optional, default: current date)

**Response:**
```json
{
  "success": true,
  "data": {
    "metric": "Collections Waterfall",
    "office_id": 1,
    "office_name": "Branch Name",
    "period": {/* Period dates */},
    "currency": "ZMW",
    "summary": {/* Summary of waterfall metrics */},
    "analysis": {/* Analysis of collections data */},
    "officer_breakdown": [/* Officer breakdown */],
    "monthly_trend": [/* Monthly trend data */],
    "expected_monthly": [/* Expected monthly data */]
  }
}
```

## Database Tables

The API interacts with the following database tables:

1. `users` - User information
2. `role_users` - User roles
3. `cycle_dates` - Cycle dates for users
4. `offices` - Office information
5. `province` - Province information
6. `smart_kpis` - Smart KPI definitions
7. `smart_kpi_score` - KPI scores
8. `loans` - Loan information
9. `smart_priority_actions` - Smart priority actions
10. `leave_days` - Leave days
11. `clients` - Client information
12. `advances` - Advances
13. `expenses` - Expenses
14. `tickets` - Tickets
15. `loan_transactions` - Loan transactions
16. `smart_alerts` - Smart alerts
17. `user_tiers` - User tier information
18. `tier_definitions` - Tier definitions
19. `tier_benefits` - Tier benefits
20. `audit_trail` - Audit trail
21. `loan_repayment_schedules` - Loan repayment schedules
22. `target_tracker` - Target tracker
23. `loan_products` - Loan products
24. `review_signoffs` - Review sign-offs
25. `scheduled_reviews` - Scheduled reviews
26. `other_income` - Other income
27. `ledger_income` - Ledger income

## Error Handling

All endpoints follow standard HTTP error codes:

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

Error responses typically include a JSON object with `error` and/or `message` fields.

## Authentication

The API uses email/password authentication through the `/sign-in` endpoint. Currently, there is no token-based authentication, but this could be added in future versions.

## Rate Limiting

There is currently no rate limiting implemented. Consider adding rate limiting for production environments.

## Conclusion

This API provides a comprehensive set of endpoints for managing various aspects of a lending platform, including user management, KPIs, loans, alerts, and performance metrics. The endpoints are well-organized and follow RESTful principles, making it easy to integrate with frontend applications.