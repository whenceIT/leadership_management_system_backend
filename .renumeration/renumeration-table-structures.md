public function up(): void
    {
        Schema::create('remuneration_tiers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->tinyInteger('tier_number');
            $table->string('name', 100);
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('position_remuneration_configs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('job_position_id');
            $table->unsignedBigInteger('remuneration_tier_id');
            $table->decimal('gross_pay', 12, 2);
            $table->decimal('target_net_pay', 12, 2)->nullable();
            $table->char('currency', 3)->default('ZMW');
            $table->string('threshold_type', 50)->nullable();
            $table->decimal('threshold_amount', 14, 2)->nullable();
            $table->string('threshold_operator', 10)->nullable();
            $table->decimal('threshold_upper_amount', 14, 2)->nullable();
            $table->string('threshold_period', 20)->nullable();
            $table->integer('min_branches')->nullable();
            $table->integer('max_branches')->nullable();
            $table->date('effective_from');
            $table->date('effective_to')->nullable();
            $table->string('status', 20)->default('draft');
            $table->timestamps();

            $table->unique(['job_position_id', 'remuneration_tier_id', 'effective_from'], 'prc_pos_tier_date_uq');
        });

        Schema::create('remuneration_components', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 100);
            $table->string('code', 50)->unique();
            $table->string('component_type', 30);
            $table->string('payment_method', 30)->nullable();
            $table->string('tax_treatment', 30)->nullable();
            $table->string('paid_by', 20);
            $table->string('calculation_type', 20);
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('position_remuneration_component_values', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('remuneration_config_id');
            $table->unsignedBigInteger('remuneration_component_id');
            $table->decimal('amount', 12, 2)->nullable();
            $table->decimal('percentage', 7, 4)->nullable();
            $table->string('calculation_base', 50)->nullable();
            $table->boolean('is_included_in_gross')->default(false);
            $table->boolean('is_included_in_company_cost')->default(false);
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['remuneration_config_id', 'remuneration_component_id'], 'prcv_cfg_comp_uq');
        });

        Schema::create('remuneration_criteria', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('remuneration_config_id');
            $table->string('criterion_name', 150);
            $table->string('criterion_code', 60);
            $table->string('measurement_type', 40);
            $table->string('operator', 15);
            $table->decimal('target_value', 14, 2)->nullable();
            $table->string('measurement_period', 20);
            $table->boolean('is_mandatory')->default(true);
            $table->string('verification_source', 100)->nullable();
            $table->timestamps();

            $table->unique(['remuneration_config_id', 'criterion_code'], 'rc_cfg_code_uq');
        });

        Schema::create('remuneration_housing_bands', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('job_position_id');
            $table->unsignedBigInteger('remuneration_tier_id');
            $table->decimal('monthly_limit', 12, 2);
            $table->date('effective_from');
            $table->date('effective_to')->nullable();
            $table->string('status', 20)->default('active');
            $table->timestamps();
            
        });

        Schema::create('remuneration_bonus_rules', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('job_position_id')->nullable();
            $table->string('bonus_name', 150);
            $table->string('bonus_type', 30);
            $table->decimal('amount', 12, 2)->nullable();
            $table->decimal('percentage', 7, 4)->nullable();
            $table->string('performance_metric', 100)->nullable();
            $table->decimal('minimum_target', 12, 2)->nullable();
            $table->string('period', 20);
            $table->date('effective_from');
            $table->date('effective_to')->nullable();
            $table->string('status', 20)->default('draft');
            $table->timestamps();

        });

        Schema::create('employee_remuneration_assignments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('user_id');
            $table->unsignedBigInteger('job_position_id');
            $table->unsignedBigInteger('remuneration_config_id');
            $table->boolean('acting_capacity')->default(false);
            $table->date('effective_from');
            $table->date('effective_to')->nullable();
            $table->string('approval_status', 20)->default('pending');
            $table->unsignedInteger('approved_by')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            });

        Schema::create('remuneration_assessments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('employee_remuneration_assignment_id');
            $table->date('assessment_period');
            $table->json('actual_performance')->nullable();
            $table->decimal('achievement_percentage', 7, 2)->nullable();
            $table->string('assessment_status', 30)->default('pending');
            $table->text('corrective_plan')->nullable();
            $table->unsignedInteger('reviewed_by')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->string('decision', 30)->nullable();
            $table->text('decision_notes')->nullable();
            $table->timestamps();
            
        });
    }






    Based on the Whence Financial Services Managerial Remuneration Guide Summary, I recommend building the remuneration structure around your existing job_positions table rather than duplicating job positions.

The database should separate managerial tiers, salary configurations, performance requirements, allowances and deductions, housing benefits, and annual bonuses. This will allow the Remuneration Module to calculate how much a manager qualifies to earn based on their position, tier, performance, and applicable benefits.
1. Recommended database structure
job_positions

Existing table — source of managerial job positions


remuneration_tiers

Tier 1–4, seniority level and tier descriptions


position_remuneration_configs

Salary, net pay, gross pay, thresholds and company cost for each position and tier


remuneration_components

Housing, travel, fuel, pension, insurance and deductions


remuneration_criteria

Revenue targets, efficiency, recovery income and KPIs


remuneration_housing_bands

Position-specific rental limits per tier


remuneration_bonus_rules

Annual bonuses and performance allowances




employee_remuneration_assignments

The manager's assigned tier, effective salary configuration and approval status


This is the recommended configuration structure. The tables below are a proposed design derived from the document; they are not existing tables that I have verified in your database.
2. Table 1 — remuneration_tiers
Stores the tier levels and seniority descriptions from the remuneration guide.
Column	Type	Purpose
id	BIGINT PK	Unique tier ID
tier_number	TINYINT	Tier number, e.g. 1–6
name	VARCHAR(100)	Most Senior, Senior, Mid-Level, Junior/Entry, Base
description	TEXT NULL	Tier responsibility description
is_active	BOOLEAN	Whether the tier is available
created_at	TIMESTAMP	Creation date
updated_at	TIMESTAMP	Last update
Important: The guide's general managerial structure uses four tiers, while some specialist roles, including Payroll Loans Manager and Motor Vehicle Manager, extend to Tiers 5 and 6. Therefore, do not restrict the database to four tiers.
3. Table 2 — position_remuneration_configs
This is the main salary configuration table. Each record represents the remuneration package for a particular job_positions record at a particular tier.
Column	Type	Purpose
id	BIGINT PK	Configuration ID
job_position_id	BIGINT FK	References job_positions.id
remuneration_tier_id	BIGINT FK	References remuneration_tiers.id
gross_pay	DECIMAL(12,2)	Monthly gross salary
target_net_pay	DECIMAL(12,2) NULL	Target net cash salary from the guide
currency	CHAR(3)	Default ZMW
threshold_type	VARCHAR(50) NULL	Revenue, recovery income, value protected, system performance, etc.
threshold_amount	DECIMAL(14,2) NULL	Required financial threshold
threshold_operator	VARCHAR(10) NULL	>=, <, or between
threshold_upper_amount	DECIMAL(14,2) NULL	Upper bound when using a range
threshold_period	VARCHAR(20) NULL	Monthly, quarterly or annual
min_branches	INT NULL	Minimum branch count where applicable
max_branches	INT NULL	Maximum branch count where applicable
effective_from	DATE	Start date for this salary configuration
effective_to	DATE NULL	End date, if superseded
status	VARCHAR(20)	Draft, active, inactive
created_at	TIMESTAMP	Creation date
updated_at	TIMESTAMP	Last update
Add a unique constraint on (job_position_id, remuneration_tier_id, effective_from).

Why this table matters: The guide specifies different salaries and qualifying thresholds for Provincial Managers, District Managers, Branch Managers, Departmental Heads, and specialist roles. Storing them against both position and tier allows each role to have its own salary structure.
4. Table 3 — remuneration_components
Stores the individual financial components that make up a manager's remuneration package. This avoids adding a new database column every time management introduces a new allowance or deduction.
Column	Type	Purpose
id	BIGINT PK	Component ID
name	VARCHAR(100)	Housing, Travel, Fuel, NAPSA, NHIMA, PAYE, Pension, OneLife
code	VARCHAR(50) UNIQUE	Stable identifier, e.g. housing, napsa
component_type	VARCHAR(30)	Allowance, deduction, employer contribution, benefit
payment_method	VARCHAR(30) NULL	Cash, landlord payment, insurer payment, payroll deduction
tax_treatment	VARCHAR(30) NULL	Taxable, non-taxable, statutory
paid_by	VARCHAR(20)	Employee, employer, or institution
calculation_type	VARCHAR(20)	Fixed amount, percentage, formula
description	TEXT NULL	Component explanation
is_active	BOOLEAN	Whether the component can be used
created_at	TIMESTAMP	Creation date
updated_at	TIMESTAMP	Last update
Suggested component records based on the document include:
- Base salary
- Housing allowance
- Travel allowance
- Fuel allowance
- PAYE
- Employee NAPSA
- Employee NHIMA
- Employer NAPSA
- Employer NHIMA
- Employer pension contribution (Saturnia)
- OneLife insurance
Employee deductions and employer contributions must be separate components because they affect net pay and company cost differently.
5. Table 4 — position_remuneration_component_values
Connects the salary configuration to its individual allowances, deductions, and benefits.
Column	Type	Purpose
id	BIGINT PK	Record ID
remuneration_config_id	BIGINT FK	References position_remuneration_configs.id
remuneration_component_id	BIGINT FK	References remuneration_components.id
amount	DECIMAL(12,2) NULL	Fixed monthly amount
percentage	DECIMAL(7,4) NULL	Percentage when applicable
calculation_base	VARCHAR(50) NULL	Gross pay, basic salary, or other base
is_included_in_gross	BOOLEAN	Whether included in gross cash pay
is_included_in_company_cost	BOOLEAN	Whether included in company cost
notes	TEXT NULL	Configuration notes
created_at	TIMESTAMP	Creation date
updated_at	TIMESTAMP	Last update
Add a unique constraint on (remuneration_config_id, remuneration_component_id).

This table lets you configure different housing, travel, fuel, pension, insurance and deduction amounts for every position and tier without changing the database schema.
6. Table 5 — remuneration_criteria
Stores the performance conditions a manager must satisfy to qualify for a remuneration tier.
Column	Type	Purpose
id	BIGINT PK	Criterion ID
remuneration_config_id	BIGINT FK	Related salary configuration
criterion_name	VARCHAR(150)	Monthly deposits, branch efficiency, recovery income, etc.
criterion_code	VARCHAR(60)	Unique identifier within the configuration
measurement_type	VARCHAR(40)	Amount, percentage, count, boolean
operator	VARCHAR(15)	>=, <=, =, <, >
target_value	DECIMAL(14,2) NULL	Required target
measurement_period	VARCHAR(20)	Monthly, quarterly, annual
is_mandatory	BOOLEAN	Whether failure disqualifies the manager
verification_source	VARCHAR(100) NULL	Relevant dashboard, report or audit source
created_at	TIMESTAMP	Creation date
updated_at	TIMESTAMP	Last update
Examples from the guide include:
- Branch Manager — monthly bank deposits.
- District Manager — monthly revenue target and branch responsibility.
- Provincial Manager — revenue target and branch coverage.
- Manager Administration — annual value preservation.
- Recoveries Coordinator — monthly recovery income.
- IT Coordinator — system uptime and outsourcing thresholds.
This table stores the rules. The actual performance results should come from the relevant operational modules or a separate assessment table, rather than being hardcoded into the salary configuration.
7. Table 6 — remuneration_housing_bands
The guide specifies housing limits by managerial position and tier. Keep these separate from general cash allowances because housing is paid directly to the landlord and has specific eligibility rules.
Column	Type	Purpose
id	BIGINT PK	Record ID
job_position_id	BIGINT FK	References job_positions.id
remuneration_tier_id	BIGINT FK	Applicable tier
monthly_limit	DECIMAL(12,2)	Maximum monthly housing amount
effective_from	DATE	Start date
effective_to	DATE NULL	End date
status	VARCHAR(20)	Active or inactive
created_at	TIMESTAMP	Creation date
updated_at	TIMESTAMP	Last update
The guide's housing policy gives these examples:
Position	Tier 4	Tier 3	Tier 2	Tier 1
Branch Manager	K1,500	K2,000	K2,500	K3,000
District Manager	K3,000	K3,500	K4,000	K4,500
Provincial Manager	K4,500	K5,000	K5,500	K6,000
Director	K5,000	K5,500	K6,000	K6,500
These are the rental limits in the housing policy section, not necessarily the same figures appearing in every salary table. Keep the source values configurable and flag discrepancies for confirmation before payroll implementation.
8. Table 7 — remuneration_bonus_rules
Stores annual bonuses and performance allowances separately from fixed monthly salary.
Column	Type	Purpose
id	BIGINT PK	Bonus rule ID
job_position_id	BIGINT FK NULL	Applicable position, if role-specific
bonus_name	VARCHAR(150)	Annual performance bonus, etc.
bonus_type	VARCHAR(30)	Fixed amount, percentage, formula
amount	DECIMAL(12,2) NULL	Fixed bonus amount
percentage	DECIMAL(7,4) NULL	Percentage-based bonus
performance_metric	VARCHAR(100) NULL	Provincial Efficiency, PDUA, Branch Efficiency
minimum_target	DECIMAL(12,2) NULL	Minimum qualifying performance
period	VARCHAR(20)	Annual, quarterly, monthly
effective_from	DATE	Start date
effective_to	DATE NULL	End date
status	VARCHAR(20)	Draft, active, inactive
created_at	TIMESTAMP	Creation date
updated_at	TIMESTAMP	Last update
The document specifies, for example:
- Provincial Managers managing three or more branches: K10,000 annual bonus when the stated 80% Provincial Efficiency and PDUA conditions are met.
- District Managers: K8,000 performance allowance when the stated 80% Branch Efficiency and PDUA conditions are met.
The database should store the conditions, while the calculation process verifies the actual performance before awarding the bonus.
9. Table 8 — employee_remuneration_assignments
This table links an actual employee to the remuneration package they are assigned. It should reference your existing employee/user table and the salary configuration.
Column	Type	Purpose
id	BIGINT PK	Assignment ID
user_id	BIGINT FK	Employee/user ID
job_position_id	BIGINT FK	Current position
remuneration_config_id	BIGINT FK	Assigned position-tier configuration
acting_capacity	BOOLEAN	Whether the employee is acting
effective_from	DATE	Assignment start date
effective_to	DATE NULL	Assignment end date
approval_status	VARCHAR(20)	Pending, approved, rejected
approved_by	BIGINT FK NULL	Approving user
approved_at	TIMESTAMP NULL	Approval date
notes	TEXT NULL	Assignment notes
created_at	TIMESTAMP	Creation date
updated_at	TIMESTAMP	Last update
This makes it possible to identify the exact tier and salary package assigned to each manager, including acting appointments and historical changes.
10. Additional table recommended — remuneration_assessments
Because the guide states that increments are conditional, revocable and reviewed monthly, I recommend storing the results of each assessment rather than overwriting the manager's salary configuration.
Column	Type	Purpose
id	BIGINT PK	Assessment ID
employee_remuneration_assignment_id	BIGINT FK	Applicable employee assignment
assessment_period	DATE	Month being assessed
actual_performance	JSON NULL	Recorded performance metrics
achievement_percentage	DECIMAL(7,2) NULL	Overall achievement where applicable
assessment_status	VARCHAR(30)	Pending, passed, failed, under review
corrective_plan	TEXT NULL	Required corrective action
reviewed_by	BIGINT FK NULL	Reviewer
reviewed_at	TIMESTAMP NULL	Review date
decision	VARCHAR(30) NULL	Maintain, adjust, suspend, revoke
decision_notes	TEXT NULL	Decision explanation
created_at	TIMESTAMP	Creation date
updated_at	TIMESTAMP	Last update
This supports the document's monthly reviews, corrective plans, follow-up reports and potential suspension or revocation of increments.

11. How the salary calculation should work
The configuration tables should store the approved figures and rules. The payroll calculation process should derive the final amounts from those settings and the employee's verified performance.

1. Identify the employee's position

Look up the existing job_positions record and the employee's current assignment.




2. Evaluate tier eligibility

Compare actual revenue, efficiency, recovery or other role-specific performance against the configured criteria.




3. Calculate remuneration

Load gross pay, deductions, employer contributions, housing and other applicable benefits.




4. Review and approve

Record the assessment, approval, effective date and any decision to maintain or change the package.



The main financial outputs should be:
- Gross Pay: Base cash salary plus applicable cash allowances included in gross pay.
- Net Pay: Gross pay less applicable employee statutory deductions and other authorized deductions.
- Total Monthly Cost to Company: Gross pay plus employer statutory contributions, employer pension contributions and housing paid by the institution, plus any other applicable employer-paid benefits.
Do not assume net pay or statutory deductions can be calculated accurately using fixed percentages alone. The statutory calculation rules and applicable tax periods need to be configured separately, and the guide's sample figures should be treated as proposed reference values.
12. Final recommended table list
Table	Priority	Purpose
job_positions	Existing	Job position master data
remuneration_tiers	Essential	Tier definitions
position_remuneration_configs	Essential	Salary figures and qualification thresholds
remuneration_components	Essential	Allowance and deduction definitions
position_remuneration_component_values	Essential	Per-tier financial component values
remuneration_criteria	Essential	Performance requirements
remuneration_housing_bands	Recommended	Housing policy and rental limits
remuneration_bonus_rules	Recommended	Annual bonuses and performance allowances
employee_remuneration_assignments	Essential	Employee-to-tier assignment and approval
remuneration_assessments	Essential for ongoing reviews	Monthly performance assessments and increment decisions
My recommendation: Keep job_positions unchanged and build the remuneration module around these related tables. In particular, avoid putting tier_1_salary, tier_2_salary, housing_allowance, fuel_allowance and similar columns directly into job_positions. A relational configuration structure will make it easier to add new managerial roles, revise salary tiers, maintain historical salary versions and support the remuneration committee's future changes.