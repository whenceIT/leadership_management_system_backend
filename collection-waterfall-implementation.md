# Collections Waterfall Implementation Guide

## Overview

This document provides comprehensive instructions for commanding AI to implement a **Collections Waterfall** feature in the LMS (Loan Management System). The Collections Waterfall displays the flow of loan collections from due amounts through various collection statuses.

### Target Output Example

```
Collections Waterfall
View Details

Due         ZMW 125,000
----------------------
Collected   ZMW 118,125
----------------------
Partial     ZMW 4,500
----------------------
Overdue     ZMW 2,375
----------------------
Compliance  94.5%
```

---

## Database Structure Analysis

### Key Tables

#### 1. `loans` Table
- **Primary loan records**
- Key fields: `id`, `principal`, `status`, `disbursement_date`, `first_repayment_date`, `office_id`, `loan_officer_id`, `client_id`
- Status values: `new`, `pending`, `approved`, `disbursed`, `declined`, `rejected`, `withdrawn`, `written_off`, `closed`, `rescheduled`, `paid`

#### 2. `loan_transactions` Table
- **Transaction records for loans**
- Key fields: `id`, `loan_id`, `transaction_type`, `debit`, `credit`, `amount`, `date`, `payment_apply_to`, `status`
- Transaction types: `repayment`, `disbursement`, `interest_accrual`, `fee_accrual`, `penalty_accrual`, `write_off`, etc.
- Payment apply to: `interest`, `principal`, `fees`, `penalty`, `regular`, `reloan_payment`, `part_payment`, `full_payment`

#### 3. `loan_repayment_schedules` Table
- **Scheduled repayments**
- Key fields: `id`, `loan_id`, `installment`, `due_date`, `principal`, `principal_paid`, `interest`, `interest_paid`, `fees`, `fees_paid`, `penalty`, `penalty_paid`, `total_due`, `paid`

---

## Collections Waterfall Metrics Definitions

### 1. Due Amount
**Definition**: Total amount expected to be collected within a specific period.

```sql
-- Sum of total_due from repayment schedules within the period
SELECT SUM(total_due) 
FROM loan_repayment_schedules 
WHERE due_date BETWEEN :start_date AND :end_date
AND loan_id IN (SELECT id FROM loans WHERE status = 'disbursed');
```

### 2. Collected Amount
**Definition**: Total amount actually collected (full payments received).

```sql
-- Sum of credits from repayment transactions
SELECT SUM(credit) 
FROM loan_transactions 
WHERE transaction_type = 'repayment'
AND payment_apply_to IN ('full_payment', 'regular')
AND date BETWEEN :start_date AND :end_date
AND status = 'approved';
```

### 3. Partial Amount
**Definition**: Amount collected through partial payments.

```sql
-- Sum of credits from partial payment transactions
SELECT SUM(credit) 
FROM loan_transactions 
WHERE transaction_type = 'repayment'
AND payment_apply_to = 'part_payment'
AND date BETWEEN :start_date AND :end_date
AND status = 'approved';
```

### 4. Overdue Amount
**Definition**: Amount past due date that hasn't been collected.

```sql
-- Sum of unpaid amounts from schedules past due date
SELECT SUM(total_due - COALESCE(principal_paid,0) - COALESCE(interest_paid,0) - COALESCE(fees_paid,0) - COALESCE(penalty_paid,0))
FROM loan_repayment_schedules 
WHERE due_date < :current_date
AND paid = 0
AND loan_id IN (SELECT id FROM loans WHERE status = 'disbursed');
```

### 5. Compliance Rate
**Formula**: `(Collected Amount / Due Amount) * 100`

---

## AI Command Instructions

### Step 1: Create the Model

**Command to AI:**
```
Create a new model called `CollectionsWaterfall` in `app/Models/CollectionsWaterfall.php` 
that calculates collections metrics. The model should have methods:

1. `getDueAmount($startDate, $endDate, $officeId = null)` - Returns total due amount
2. `getCollectedAmount($startDate, $endDate, $officeId = null)` - Returns collected amount
3. `getPartialAmount($startDate, $endDate, $officeId = null)` - Returns partial payment amount
4. `getOverdueAmount($asOfDate, $officeId = null)` - Returns overdue amount
5. `getComplianceRate($dueAmount, $collectedAmount)` - Returns compliance percentage
6. `getWaterfallData($startDate, $endDate, $officeId = null)` - Returns all metrics in array

Use the existing Loan, LoanTransaction, and LoanRepaymentSchedule models.
Filter by office_id when provided for branch-level reporting.
```

### Step 2: Create the Controller

**Command to AI:**
```
Create a new controller called `CollectionsWaterfallController` in 
`app/Http/Controllers/CollectionsWaterfallController.php` with the following methods:

1. `index(Request $request)` - Display the collections waterfall dashboard
   - Accept date range filters (start_date, end_date)
   - Accept office_id filter for branch-specific view
   - Use role-based filtering (admin sees all, branch manager sees branch, province manager sees province)
   - Return view 'collections_waterfall.index'

2. `getChartData(Request $request)` - Return JSON data for charts
   - Return waterfall chart data structure
   - Include trend data for the selected period

3. `exportPdf(Request $request)` - Export waterfall report as PDF
   - Generate PDF report with company branding
   - Include detailed breakdown by loan officer

4. `getDetails(Request $request)` - Return detailed breakdown
   - AJAX endpoint for drill-down view
   - Return loans contributing to each metric

Follow the existing pattern in LoanController for role-based access control.
Use Sentinel for authentication and permission checks.
```

### Step 3: Create the View

**Command to AI:**
```
Create a new Blade view at `resources/views/collections_waterfall/index.blade.php` 
with the following structure:

1. Header section with title and date range filter form
2. Summary cards displaying:
   - Due Amount (with currency formatting)
   - Collected Amount (green color)
   - Partial Amount (yellow/orange color)
   - Overdue Amount (red color)
   - Compliance Rate (percentage with color coding)

3. Waterfall Chart using Chart.js or similar library:
   - Visual representation of the flow from Due → Collected → Partial → Overdue

4. Detailed table showing:
   - Breakdown by loan officer
   - Breakdown by office/branch
   - Individual loan contributions

5. Export buttons for PDF and Excel

Use AdminLTE styling to match the existing dashboard.
Include responsive design for mobile viewing.
```

### Step 4: Add Routes

**Command to AI:**
```
Add the following routes to `routes/web.php`:

Route::group(['middleware' => ['sentinel']], function () {
    Route::get('collections/waterfall', 'CollectionsWaterfallController@index')->name('collections.waterfall');
    Route::get('collections/waterfall/chart', 'CollectionsWaterfallController@getChartData')->name('collections.waterfall.chart');
    Route::get('collections/waterfall/pdf', 'CollectionsWaterfallController@exportPdf')->name('collections.waterfall.pdf');
    Route::get('collections/waterfall/details', 'CollectionsWaterfallController@getDetails')->name('collections.waterfall.details');
});
```

### Step 5: Add Menu Item

**Command to AI:**
```
Add a menu item for Collections Waterfall in the sidebar menu.
The menu should be visible to users with 'loans.view' permission.
Place it under a "Collections" submenu or "Reports" section.

Update the menu file at `resources/views/menu/admin.blade.php` or appropriate menu file.
```

### Step 6: Create Helper Functions (Optional)

**Command to AI:**
```
Add the following helper functions to `app/Helpers/GeneralHelper.php`:

1. `formatCurrency($amount, $currencyId = null)` - Format amount with currency symbol
2. `calculateComplianceRate($collected, $due)` - Calculate and format compliance percentage
3. `getCollectionsWaterfall($startDate, $endDate, $officeId = null)` - Return waterfall data array
```

---

## Complete Implementation Prompt

**Copy and paste this complete prompt to AI:**

```
Implement a Collections Waterfall feature for the LMS with the following requirements:

## Business Logic
The Collections Waterfall shows the flow of loan collections:
- **Due**: Total amount expected within a period (from loan_repayment_schedules.total_due)
- **Collected**: Full payments received (from loan_transactions where payment_apply_to = 'full_payment' or 'regular')
- **Partial**: Partial payments received (from loan_transactions where payment_apply_to = 'part_payment')
- **Overdue**: Uncollected amounts past due date
- **Compliance**: (Collected/Due) * 100

## Files to Create

### 1. Model: `app/Models/CollectionsWaterfall.php`
- Methods for each metric calculation
- Support for date range filtering
- Support for office/branch filtering
- Role-based data access

### 2. Controller: `app/Http/Controllers/CollectionsWaterfallController.php`
- index() - Main dashboard view
- getChartData() - JSON for charts
- exportPdf() - PDF export
- getDetails() - AJAX drill-down

### 3. View: `resources/views/collections_waterfall/index.blade.php`
- Summary cards with metrics
- Waterfall chart (Chart.js)
- Filter form (date range, office)
- Detailed breakdown table
- Export buttons

### 4. Routes in `routes/web.php`
- GET /collections/waterfall
- GET /collections/waterfall/chart
- GET /collections/waterfall/pdf
- GET /collections/waterfall/details

### 5. Menu Item
- Add to sidebar under Collections/Reports

## Technical Requirements
- Use existing models: Loan, LoanTransaction, LoanRepaymentSchedule
- Follow existing code patterns in LoanController
- Use Sentinel for authentication
- Use AdminLTE styling
- Support role-based filtering (admin, branch manager, province manager)
- Format currency as ZMW (Zambian Kwacha)

## Reference Existing Code
- See `app/Http/Controllers/LoanController.php` for patterns
- See `app/Models/Loan.php` for model relationships
- See `resources/views/loan/collections.blade.php` for similar view
- See `app/Helpers/GeneralHelper.php` for helper patterns
```

---

## Database Queries Reference

### Complete Waterfall Query

```php
public function getWaterfallData($startDate, $endDate, $officeId = null)
{
    // Base query for loans
    $loansQuery = Loan::where('status', 'disbursed');
    if ($officeId) {
        $loansQuery->where('office_id', $officeId);
    }
    $loanIds = $loansQuery->pluck('id');

    // Due Amount
    $due = LoanRepaymentSchedule::whereIn('loan_id', $loanIds)
        ->whereBetween('due_date', [$startDate, $endDate])
        ->sum('total_due');

    // Collected Amount (Full Payments)
    $collected = LoanTransaction::whereIn('loan_id', $loanIds)
        ->where('transaction_type', 'repayment')
        ->whereIn('payment_apply_to', ['full_payment', 'regular'])
        ->whereBetween('date', [$startDate, $endDate])
        ->where('status', 'approved')
        ->sum('credit');

    // Partial Amount
    $partial = LoanTransaction::whereIn('loan_id', $loanIds)
        ->where('transaction_type', 'repayment')
        ->where('payment_apply_to', 'part_payment')
        ->whereBetween('date', [$startDate, $endDate])
        ->where('status', 'approved')
        ->sum('credit');

    // Overdue Amount
    $overdue = LoanRepaymentSchedule::whereIn('loan_id', $loanIds)
        ->where('due_date', '<', date('Y-m-d'))
        ->where('paid', 0)
        ->selectRaw('SUM(total_due - COALESCE(principal_paid,0) - COALESCE(interest_paid,0) - COALESCE(fees_paid,0) - COALESCE(penalty_paid,0)) as overdue')
        ->value('overdue');

    // Compliance Rate
    $compliance = $due > 0 ? round(($collected / $due) * 100, 2) : 0;

    return [
        'due' => $due,
        'collected' => $collected,
        'partial' => $partial,
        'overdue' => $overdue ?? 0,
        'compliance' => $compliance,
        'currency' => 'ZMW'
    ];
}
```

---

## Role-Based Access Control

### Admin (role_id = 1)
- View all branches data
- No office filtering required

### Province Manager (role_id = 6)
- View all branches in their province
- Filter by province_id from user's profile

### Branch Manager (role_id = 4)
- View only their branch data
- Filter by office_id from user's profile

### Loan Officer (role_id = 3)
- View only their assigned loans
- Filter by loan_officer_id

---

## UI/UX Considerations

### Color Coding
- **Due**: Blue (#3c8dbc)
- **Collected**: Green (#00a65a)
- **Partial**: Orange (#f39c12)
- **Overdue**: Red (#dd4b39)
- **Compliance**: 
  - Green if >= 95%
  - Orange if 80-94%
  - Red if < 80%

### Chart Type
- Waterfall chart showing flow
- Bar chart for comparison
- Line chart for trends over time

### Responsive Design
- Cards stack on mobile
- Table horizontal scroll
- Chart resize on window change

---

## Testing Checklist

- [ ] Verify Due amount matches sum of repayment schedules
- [ ] Verify Collected amount matches transaction records
- [ ] Verify Partial amount is correctly identified
- [ ] Verify Overdue calculation is accurate
- [ ] Verify Compliance rate formula is correct
- [ ] Test with different date ranges
- [ ] Test with different office filters
- [ ] Test role-based access restrictions
- [ ] Test PDF export functionality
- [ ] Test chart data accuracy
- [ ] Test mobile responsiveness

---

## Related Files Reference

| File | Purpose |
|------|---------|
| [`app/Models/Loan.php`](app/Models/Loan.php) | Loan model with relationships |
| [`app/Models/LoanTransaction.php`](app/Models/LoanTransaction.php) | Transaction model |
| [`app/Models/LoanRepaymentSchedule.php`](app/Models/LoanRepaymentSchedule.php) | Repayment schedule model |
| [`app/Http/Controllers/LoanController.php`](app/Http/Controllers/LoanController.php) | Main loan controller |
| [`app/Helpers/GeneralHelper.php`](app/Helpers/GeneralHelper.php) | Helper functions |
| [`database/migrations/2018_04_17_145702_create_loans_table.php`](database/migrations/2018_04_17_145702_create_loans_table.php) | Loans table schema |
| [`database/migrations/2018_04_17_162446_create_loan_transactions_table.php`](database/migrations/2018_04_17_162446_create_loan_transactions_table.php) | Transactions table schema |
| [`database/migrations/2018_04_17_145803_create_loan_repayment_schedules_table.php`](database/migrations/2018_04_17_145803_create_loan_repayment_schedules_table.php) | Repayment schedules table schema |

---

## Additional Features to Consider

1. **Trend Analysis**: Show collections trend over multiple periods
2. **Loan Officer Ranking**: Rank officers by compliance rate
3. **Branch Comparison**: Compare branches side by side
