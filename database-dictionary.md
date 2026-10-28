whence_loan
account_type
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(255)	Yes	NULL			
parent	tinyint	Yes	0			
type	varchar(2)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
activations
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
user_id	int	No				
code	varchar(191)	No				
completed	tinyint(1)	No	0			
completed_at	timestamp	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1080	A	No	
administration_expenses
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
category_id	bigint	No		expense_categories -> id		
reference_number	varchar(191)	Yes	NULL			
comments	text	Yes	NULL			
amount	decimal(12,2)	No				
gl_account_code	varchar(191)	Yes	NULL			
expense_date	date	No				
entered_by	bigint	Yes	NULL			
bank_charge_type	varchar(191)	Yes	NULL		Monthly Bank Charges, Transaction Fees, Transfer Charges, SMS Charges	
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
administration_expenses_category_id_foreign	BTREE	No	No	category_id	0	A	No	
administrative_records
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
employee_id	int	No		users -> id		
record_type	enum('disciplinary', 'health', 'career')	No				
disciplinary_type	varchar(191)	Yes	NULL			
warning_type	varchar(191)	Yes	NULL			
warning_level	varchar(191)	Yes	NULL			
health_type	varchar(191)	Yes	NULL			
incident_type	varchar(191)	Yes	NULL			
career_type	varchar(191)	Yes	NULL			
name	varchar(191)	Yes	NULL			
description	text	Yes	NULL			
recording_date	date	Yes	NULL			
comments	text	Yes	NULL			
number_of_days	int	Yes	NULL			
absence_dates	json	Yes	NULL			
status	enum('pending', 'active', 'declined')	No	pending			
approved_by	int	Yes	NULL	users -> id		
approved_at	timestamp	Yes	NULL			
decline_reason	text	Yes	NULL			
created_by	int	No		users -> id		
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2	A	No	
administrative_records_approved_by_foreign	BTREE	No	No	approved_by	2	A	Yes	
administrative_records_employee_id_foreign	BTREE	No	No	employee_id	2	A	No	
administrative_records_created_by_foreign	BTREE	No	No	created_by	1	A	No	
admin_income
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
date	date	No				
amount	int	Yes	NULL			
description	text	No				
from	varchar(255)	No				
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
updated_at	timestamp	Yes	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	25	A	No	
advances
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
user_id	int	Yes	NULL			
office_id	int	Yes	NULL			
full_name	varchar(255)	Yes	NULL			
first_name	varchar(255)	Yes	NULL			
last_name	varchar(255)	Yes	NULL			
amount	decimal(10,2)	Yes	NULL			
installments	int	Yes	NULL			
installment_amount	decimal(10,2)	Yes	NULL			
status	enum('pending', 'approved', 'declined', 'closed')	Yes	pending			
mode_of_payment	varchar(255)	Yes	NULL			
purpose	text	Yes	NULL			
date_requested	date	Yes	NULL			
date_approved	date	Yes	NULL			
amount_paid	decimal(10,2)	Yes	NULL			
remaining_amount	decimal(10,2)	Yes	NULL			
expected_repayment_dates	date	Yes	NULL			
processed_today	tinyint(1)	Yes	0			
notes	text	Yes	NULL			
approved_by_id	int	Yes	NULL			
declined_by_id	int	Yes	NULL			
declined_notes	text	Yes	NULL			
last_update_date	timestamp	Yes	CURRENT_TIMESTAMP			
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
updated_at	timestamp	Yes	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2075	A	No	
advance_topups
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
office_id	int	Yes	NULL	offices -> id		
first_name	varchar(255)	No				
last_name	varchar(255)	No				
advance_id	int	No				
top_up_amount	decimal(10,2)	No				
top_up_date	date	No				
installments	int	No				
status	varchar(50)	No				
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
updated_at	timestamp	Yes	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	173	A	No	
fk_office_id	BTREE	No	No	office_id	21	A	Yes	
advance_transactions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
advance_id	int	No		advances -> id		
amount_paid	decimal(10,2)	No				
last_update_date	date	No				
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
updated_at	timestamp	Yes	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2451	A	No	
advance_id	BTREE	No	No	advance_id	1439	A	No	
alerts
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
rule	varchar(80)	No				
severity	varchar(20)	No	info			
title	varchar(255)	No				
description	text	No				
reference_id	bigint	Yes	NULL			
meta	json	Yes	NULL			
is_read	tinyint(1)	No	0			
created_by_id	bigint	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2303	A	No	
alerts_rule_created_at_index	BTREE	No	No	rule	7	A	No	
created_at	618	A	Yes
alerts_rule_index	BTREE	No	No	rule	7	A	No	
alerts_reference_id_index	BTREE	No	No	reference_id	226	A	Yes	
alerts_is_read_index	BTREE	No	No	is_read	1	A	No	
announcements
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
title	varchar(191)	No				
message	text	No				
end_date	date	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
appraisal_answer
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
question_id	int	No				
section_id	int	No				
form_id	int	No				
unit	int	No				
quater_date	varchar(191)	No				
answer	varchar(191)	Yes	NULL			
user_id	int	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	125775	A	No	
appraisal_form
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
form_name	varchar(191)	No				
role	varchar(11)	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	5	A	No	
appraisal_form_section
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
form_id	int	No				
section_name	varchar(191)	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	66	A	No	
appraisal_question
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
form_id	int	No				
section_id	int	No				
question	text	No				
unit	enum('%', '[1-5]', 'K', 'number', 'p_r', 'text', '[I,S,D]', 'subop1', 'subop2', 'subop3', 'subop4', 'yes/no', 'info', 'sb_r', 'p_r_dm', 'rr_r', 'rh_r', 'ma_r')	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	218	A	No	
appraisal_suboptions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
question_id	int	No				
section_id	int	No				
info	varchar(191)	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
approval_matrices
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
name	varchar(191)	No				
min_amount	decimal(18,2)	Yes	NULL			
max_amount	decimal(18,2)	Yes	NULL			
level	varchar(191)	No				
required_approver_id	bigint	No				
branch_id	bigint	Yes	NULL			
district_id	bigint	Yes	NULL			
province_id	bigint	Yes	NULL			
is_active	tinyint(1)	No	1			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
approval_matrices_active_idx	BTREE	No	No	level	0	A	No	
branch_id	0	A	Yes
district_id	0	A	Yes
province_id	0	A	Yes
is_active	0	A	No
app_versions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
version_name	varchar(20)	No				
version_code	int	No				
apk_url	varchar(255)	No				
mandatory	tinyint(1)	Yes	0			
notes	text	Yes	NULL			
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	4	A	No	
assets
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
created_by_id	int	Yes	NULL			
asset_type_id	int	Yes	NULL			
office_id	int	Yes	NULL			
name	varchar(191)	Yes	NULL			
purchase_date	date	Yes	NULL			
purchase_price	decimal(65,2)	Yes	NULL			
value	decimal(65,2)	Yes	NULL			
life_span	int	Yes	NULL			
salvage_value	decimal(65,2)	Yes	NULL			
serial_number	text	Yes	NULL			
notes	text	Yes	NULL			
files	text	Yes	NULL			
purchase_year	text	Yes	NULL			
status	enum('active', 'inactive', 'sold', 'damaged', 'written_off')	Yes	NULL			
active	tinyint	Yes	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1	A	No	
asset_depreciation
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
asset_id	int	Yes	NULL			
year	varchar(191)	Yes	NULL			
beginning_value	decimal(65,2)	Yes	NULL			
depreciation_value	decimal(65,2)	Yes	NULL			
rate	decimal(65,2)	Yes	NULL			
cost	decimal(65,2)	Yes	NULL			
accumulated	decimal(65,2)	Yes	NULL			
ending_value	decimal(65,2)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
asset_locations
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	No				
type	varchar(191)	Yes	branch			
active	tinyint(1)	No	1			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	47	A	No	
asset_locations_name_unique	BTREE	Yes	No	name	47	A	No	
asset_types
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
gl_account_fixed_asset_id	int	Yes	NULL			
gl_account_asset_id	int	Yes	NULL			
gl_account_contra_asset_id	int	Yes	NULL			
gl_account_expense_id	int	Yes	NULL			
gl_account_liability_id	int	Yes	NULL			
gl_account_income_id	int	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
type	varchar(191)	Yes	NULL			
currrent_type	varchar(191)	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	5	A	No	
audits
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
user_type	varchar(191)	Yes	NULL			
user_id	bigint	Yes	NULL			
event	varchar(191)	No				
auditable_type	varchar(191)	No				
auditable_id	bigint	No				
old_values	text	Yes	NULL			
new_values	text	Yes	NULL			
url	text	Yes	NULL			
ip_address	varchar(45)	Yes	NULL			
user_agent	varchar(1023)	Yes	NULL			
tags	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1099370	A	No	
audits_auditable_type_auditable_id_index	BTREE	No	No	auditable_type	1	A	No	
auditable_id	618	A	No
audits_user_id_user_type_index	BTREE	No	No	user_id	601	A	Yes	
user_type	687	A	Yes
audit_checklists
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
section	varchar(191)	No				
item_id	varchar(191)	No				
label	text	No				
check_text	text	Yes	NULL			
verify_text	text	No				
flag_text	text	No				
input_type	varchar(191)	No	text			
placeholder	varchar(191)	Yes	NULL			
order	int	No	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
audit_checklist_office_results
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
audit_log
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
module	int	No				
action	varchar(191)	No				
done_by	varchar(191)	No				
details	text	No				
date	datetime	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	6370	A	No	
audit_modules
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	No				
date	datetime	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2	A	No	
audit_submissions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
office_id	bigint	No				
auditor_id	bigint	No				
audit_date	date	No				
period_start	date	No				
period_end	date	No				
auditor_name	varchar(191)	No				
audit_scope	text	Yes	NULL			
opening_remarks	text	Yes	NULL			
audit_type	varchar(191)	Yes	NULL			
unannounced	varchar(191)	Yes	NULL			
manager_present	varchar(191)	Yes	NULL			
manager_name	varchar(191)	Yes	NULL			
fail_count	int	No	0			
risk_rating	varchar(191)	No				
notes	text	Yes	NULL			
s2_1	varchar(191)	Yes	NULL			
s2_1_notes	text	Yes	NULL			
s2_2	varchar(191)	Yes	NULL			
s2_2_notes	text	Yes	NULL			
s2_3	varchar(191)	Yes	NULL			
s2_3_notes	text	Yes	NULL			
s2_4	varchar(191)	Yes	NULL			
s2_4_notes	text	Yes	NULL			
s2_5	varchar(191)	Yes	NULL			
s2_5_notes	text	Yes	NULL			
s2_6	varchar(191)	Yes	NULL			
s2_6_notes	text	Yes	NULL			
s2_7	varchar(191)	Yes	NULL			
s2_7_notes	text	Yes	NULL			
s2_8	varchar(191)	Yes	NULL			
s2_8_notes	text	Yes	NULL			
s2_9	varchar(191)	Yes	NULL			
s2_9_notes	text	Yes	NULL			
s2_10	varchar(191)	Yes	NULL			
s2_10_notes	text	Yes	NULL			
s2_notes	text	Yes	NULL			
s3_total_active	int	Yes	NULL			
s3_incomplete_files	int	Yes	NULL			
s3_1	varchar(191)	Yes	NULL			
s3_1_notes	text	Yes	NULL			
s3_2	varchar(191)	Yes	NULL			
s3_2_notes	text	Yes	NULL			
s3_3	varchar(191)	Yes	NULL			
s3_3_notes	text	Yes	NULL			
s3_4	varchar(191)	Yes	NULL			
s3_4_notes	text	Yes	NULL			
s3_5	varchar(191)	Yes	NULL			
s3_5_notes	text	Yes	NULL			
s3_6	varchar(191)	Yes	NULL			
s3_6_notes	text	Yes	NULL			
s3_7	varchar(191)	Yes	NULL			
s3_7_notes	text	Yes	NULL			
s3_notes	text	Yes	NULL			
s4_system_collections	decimal(15,2)	Yes	NULL			
s4_wallet_collections	decimal(15,2)	Yes	NULL			
s4_1	varchar(191)	Yes	NULL			
s4_1_notes	text	Yes	NULL			
s4_2	varchar(191)	Yes	NULL			
s4_3	varchar(191)	Yes	NULL			
s4_3_notes	text	Yes	NULL			
s4_4	varchar(191)	Yes	NULL			
s4_4_notes	text	Yes	NULL			
s4_5	varchar(191)	Yes	NULL			
s4_5_notes	text	Yes	NULL			
s4_6	varchar(191)	Yes	NULL			
s4_6_notes	text	Yes	NULL			
s4_2_notes	text	Yes	NULL			
s4_notes	text	Yes	NULL			
s5_1	varchar(191)	Yes	NULL			
s5_1_notes	text	Yes	NULL			
s5_2	varchar(191)	Yes	NULL			
s5_2_notes	text	Yes	NULL			
s5_3	varchar(191)	Yes	NULL			
s5_3_notes	text	Yes	NULL			
s5_4	varchar(191)	Yes	NULL			
s5_4_notes	text	Yes	NULL			
s5_5	varchar(191)	Yes	NULL			
s5_5_notes	text	Yes	NULL			
s5_6	varchar(191)	Yes	NULL			
s5_6_notes	text	Yes	NULL			
s5_notes	text	Yes	NULL			
s6_total_staff	int	Yes	NULL			
s6_1	varchar(191)	Yes	NULL			
s6_1_notes	text	Yes	NULL			
s6_2	varchar(191)	Yes	NULL			
s6_2_notes	text	Yes	NULL			
s6_3	varchar(191)	Yes	NULL			
s6_3_notes	text	Yes	NULL			
s6_4	varchar(191)	Yes	NULL			
s6_4_notes	text	Yes	NULL			
s6_5	varchar(191)	Yes	NULL			
s6_5_notes	text	Yes	NULL			
s6_6	varchar(191)	Yes	NULL			
s6_6_notes	text	Yes	NULL			
s6_7	varchar(191)	Yes	NULL			
s6_7_notes	text	Yes	NULL			
s6_notes	text	Yes	NULL			
s7_1	varchar(191)	Yes	NULL			
s7_1_notes	text	Yes	NULL			
s7_2	varchar(191)	Yes	NULL			
s7_2_notes	text	Yes	NULL			
s7_3	varchar(191)	Yes	NULL			
s7_3_notes	text	Yes	NULL			
s7_4	varchar(191)	Yes	NULL			
s7_4_notes	text	Yes	NULL			
s7_5	varchar(191)	Yes	NULL			
s7_5_notes	text	Yes	NULL			
s7_6	varchar(191)	Yes	NULL			
s7_6_notes	text	Yes	NULL			
s7_notes	text	Yes	NULL			
s8_1	varchar(191)	Yes	NULL			
s8_1_notes	text	Yes	NULL			
s8_2	varchar(191)	Yes	NULL			
s8_2_notes	text	Yes	NULL			
s8_3	varchar(191)	Yes	NULL			
s8_3_notes	text	Yes	NULL			
s8_4	varchar(191)	Yes	NULL			
s8_4_notes	text	Yes	NULL			
s8_5	varchar(191)	Yes	NULL			
s8_5_notes	text	Yes	NULL			
s8_6	varchar(191)	Yes	NULL			
s8_6_notes	text	Yes	NULL			
s8_notes	text	Yes	NULL			
s9_1	varchar(191)	Yes	NULL			
s9_1_notes	text	Yes	NULL			
s9_2	varchar(191)	Yes	NULL			
s9_2_notes	text	Yes	NULL			
s9_3	varchar(191)	Yes	NULL			
s9_3_notes	text	Yes	NULL			
s9_4	varchar(191)	Yes	NULL			
s9_4_notes	text	Yes	NULL			
s9_5	varchar(191)	Yes	NULL			
s9_5_notes	text	Yes	NULL			
s9_notes	text	Yes	NULL			
key_findings	text	Yes	NULL			
immediate_actions	text	Yes	NULL			
recommendations	text	Yes	NULL			
followup_date	date	Yes	NULL			
escalation_required	varchar(191)	Yes	NULL			
auditor_signature	varchar(191)	Yes	NULL			
signoff_datetime	datetime	Yes	NULL			
manager_acknowledgement	varchar(191)	Yes	NULL			
manager_comments	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
audit_unique_period_idx	BTREE	No	No	office_id	0	A	No	
audit_date	0	A	No
period_start	0	A	No
period_end	0	A	No
audit_trail
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
user_id	int	Yes	NULL			
name	varchar(191)	Yes	NULL			
office_id	int	Yes	NULL			
module	varchar(191)	Yes	NULL			
action	varchar(191)	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	720444	A	No	
balance_type
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
bank_accounts
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	No				
account_number	int	No				
date	datetime	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	4	A	No	
bank_account_expenses
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
bank_account_id	bigint	No				
category_id	bigint	No		expense_categories -> id		
reference_number	varchar(191)	Yes	NULL			
comments	text	Yes	NULL			
amount	decimal(12,2)	No				
gl_account_code	varchar(191)	Yes	NULL			
transaction_date	date	No				
entered_by	bigint	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
bank_account_expenses_category_id_foreign	BTREE	No	No	category_id	0	A	No	
bank_deposit_log
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
deposit_type	int	No				
office_id	int	No				
user_id	int	No				
amount	decimal(65,4)	No				
deposit_method	varchar(191)	No				
deposit_id	bigint	Yes	NULL			
reference_number	varchar(191)	No				
created_date	datetime	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2612	A	No	
blacklist_history
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
client_id	bigint	No				
created_by_id	bigint	Yes	NULL			
office_id	bigint	Yes	NULL			
blacklist_reason_id	bigint	Yes	NULL			
date	date	Yes	NULL			
description	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
blacklist_reasons
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
name	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
blockages
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
office_id	bigint	No				
reason	text	Yes	NULL			
time_to_unlock	datetime	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
branch_asset_categories
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	No				
icon	varchar(191)	Yes	fa-tag			
allows_individual_tracking	tinyint(1)	No	0			
active	tinyint(1)	No	1			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	27	A	No	
branch_asset_damage_reports
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
office_id	int	Yes	NULL	offices -> id		
location_id	int	Yes	NULL	asset_locations -> id		
inventory_id	int	Yes	NULL	branch_asset_inventories -> id		
category_id	int	No		branch_asset_categories -> id		
quantity_affected	int	No	1			
reported_date	date	No				
description	text	No				
photo	varchar(191)	Yes	NULL			
status	enum('Reported', 'Assessed', 'Sent for Repair', 'Repaired', 'Closed')	No	Reported			
reported_by	int	Yes	NULL	users -> id		
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
branch_asset_damage_reports_office_id_foreign	BTREE	No	No	office_id	0	A	Yes	
branch_asset_damage_reports_category_id_foreign	BTREE	No	No	category_id	0	A	No	
branch_asset_damage_reports_reported_by_foreign	BTREE	No	No	reported_by	0	A	Yes	
branch_asset_damage_reports_location_id_foreign	BTREE	No	No	location_id	0	A	Yes	
branch_asset_damage_reports_inventory_id_foreign	BTREE	No	No	inventory_id	0	A	Yes	
branch_asset_individual_items
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
inventory_id	int	No		branch_asset_inventories -> id		
serial_number	varchar(191)	Yes	NULL			
assigned_to	int	Yes	NULL	users -> id		
condition	enum('Working', 'Damaged', 'Missing')	No	Working			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
branch_asset_individual_items_inventory_id_foreign	BTREE	No	No	inventory_id	0	A	No	
branch_asset_individual_items_assigned_to_foreign	BTREE	No	No	assigned_to	0	A	Yes	
branch_asset_inventories
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
asset_id	varchar(20)	Yes	NULL			
office_id	int	Yes	NULL	offices -> id		
location_id	int	Yes	NULL	asset_locations -> id		
category_id	int	No		branch_asset_categories -> id		
item_description	varchar(191)	Yes	NULL			
serial_number	varchar(191)	Yes	NULL			
unit_cost	decimal(12,2)	Yes	NULL			
total_value	decimal(14,2)	Yes	NULL			
total	int	No	0			
working	int	No	0			
damaged	int	No	0			
missing	int	No	0			
under_repair	int	No	0			
condition_text	varchar(191)	Yes	NULL			
allocated_to	varchar(191)	Yes	NULL			
remarks	text	Yes	NULL			
action_required	text	Yes	NULL			
valuation_basis	varchar(191)	Yes	NULL			
source_ref	varchar(191)	Yes	NULL			
last_verified_at	timestamp	Yes	NULL			
last_verified_by	int	Yes	NULL	users -> id		
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	585	A	No	
branch_asset_inventories_asset_id_unique	BTREE	Yes	No	asset_id	585	A	Yes	
branch_asset_inventories_category_id_foreign	BTREE	No	No	category_id	8	A	No	
branch_asset_inventories_last_verified_by_foreign	BTREE	No	No	last_verified_by	1	A	Yes	
branch_asset_inventories_office_id_foreign	BTREE	No	No	office_id	1	A	Yes	
branch_asset_inventories_location_id_foreign	BTREE	No	No	location_id	47	A	Yes	
branch_asset_repairs
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
damage_report_id	int	No		branch_asset_damage_reports -> id		
repair_date	date	Yes	NULL			
repair_cost	decimal(10,2)	Yes	0.00			
repair_provider	varchar(191)	Yes	NULL			
description	text	Yes	NULL			
invoice_path	varchar(191)	Yes	NULL			
date_returned	date	Yes	NULL			
condition_after	varchar(191)	Yes	Working			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
branch_asset_repairs_damage_report_id_foreign	BTREE	No	No	damage_report_id	0	A	No	
branch_asset_verifications
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
office_id	int	No		offices -> id		
period	varchar(191)	No				
requested_by	int	Yes	NULL	users -> id		
submitted_by	int	Yes	NULL	users -> id		
submitted_at	timestamp	Yes	NULL			
status	enum('Pending', 'Submitted', 'Acknowledged')	No	Pending			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
branch_asset_verifications_office_id_foreign	BTREE	No	No	office_id	0	A	No	
branch_asset_verifications_requested_by_foreign	BTREE	No	No	requested_by	0	A	Yes	
branch_asset_verifications_submitted_by_foreign	BTREE	No	No	submitted_by	0	A	Yes	
carry_overs
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
office_id	int	No				
user_id	int	No				
amount	decimal(10,0)	No				
cycle_date	date	No				
status	varchar(191)	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1914	A	No	
cash_audit_submissions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
user_id	int	No		users -> id		
office_id	int	No		offices -> id		
branch_name	varchar(191)	Yes	NULL			
district_manager_name	varchar(191)	Yes	NULL			
cash_5	decimal(15,2)	No	0.00			
cash_10	decimal(15,2)	No	0.00			
cash_20	decimal(15,2)	No	0.00			
cash_50	decimal(15,2)	No	0.00			
cash_100	decimal(15,2)	No	0.00			
cash_200	decimal(15,2)	No	0.00			
cash_500	decimal(15,2)	No	0.00			
cash_total	decimal(15,2)	No	0.00			
cash_count_datetime	timestamp	Yes	NULL			
petty_5	decimal(15,2)	No	0.00			
petty_10	decimal(15,2)	No	0.00			
petty_20	decimal(15,2)	No	0.00			
petty_50	decimal(15,2)	No	0.00			
petty_100	decimal(15,2)	No	0.00			
petty_200	decimal(15,2)	No	0.00			
petty_500	decimal(15,2)	No	0.00			
petty_total	decimal(15,2)	No	0.00			
petty_via_mobile_wallet	tinyint(1)	No	0			
mobile_ussd_reference	varchar(191)	Yes	NULL		Transaction reference from USSD balance enquiry	
mobile_number	varchar(191)	Yes	NULL		Airtel/MTN mobile number used	
sim_registered_name	varchar(191)	Yes	NULL		Registered name of SIM card holder	
dm_using_sim	varchar(191)	Yes	NULL		Name of DM using the SIM card	
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
cash_audit_submissions_user_id_foreign	BTREE	No	No	user_id	0	A	No	
cash_audit_submissions_office_id_foreign	BTREE	No	No	office_id	0	A	No	
cash_audit_wizard_config
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
is_active	tinyint(1)	No	0			
target_office_id	int	Yes	NULL	offices -> id	NULL = all offices with role 4	
created_by	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
cash_audit_wizard_config_target_office_id_foreign	BTREE	No	No	target_office_id	0	A	Yes	
cash_module_parameters
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
parameter_name	varchar(255)	Yes	NULL			
value	varchar(255)	Yes	NULL			
type	varchar(2550)	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	13	A	No	
category_material
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
course_category_id	bigint	No		course_categories -> id		
training_material_id	bigint	No		training_materials -> id		
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
cat_mat_unique	BTREE	Yes	No	course_category_id	0	A	No	
training_material_id	0	A	No
category_material_training_material_id_foreign	BTREE	No	No	training_material_id	0	A	No	
charges
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
created_by_id	int	Yes	NULL			
name	varchar(191)	Yes	NULL			
currency_id	int	Yes	NULL			
product	enum('loan', 'savings', 'shares', 'client')	No				
charge_type	enum('disbursement', 'disbursement_repayment', 'specified_due_date', 'installment_fee', 'overdue_installment_fee', 'loan_rescheduling_fee', 'overdue_maturity', 'savings_activation', 'withdrawal_fee', 'annual_fee', 'monthly_fee', 'activation', 'shares_purchase', 'shares_redeem')	No				
charge_option	enum('flat', 'percentage', 'installment_principal_due', 'installment_principal_interest_due', 'installment_interest_due', 'installment_total_due', 'total_due', 'principal_due', 'interest_due', 'total_outstanding', 'original_principal')	No				
charge_frequency	tinyint	No	0			
charge_frequency_type	enum('days', 'weeks', 'months', 'years')	No	days			
charge_frequency_amount	int	No	0			
amount	decimal(65,2)	Yes	NULL			
minimum_amount	decimal(65,2)	Yes	NULL			
maximum_amount	decimal(65,2)	Yes	NULL			
charge_payment_mode	enum('regular', 'account_transfer')	No	regular			
active	tinyint	No	1			
penalty	tinyint	No	0			
override	tinyint	No	0			
gl_account_income_id	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1	A	No	
charge_transactions_unapproved
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
created_by_id	int	No				
office_id	int	No				
loan_id	int	No				
transaction_type	varchar(50)	No				
debit	decimal(15,2)	No				
date	date	No				
status	enum('pending', 'approved', 'declined')	Yes	pending			
notes	text	Yes	NULL			
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
updated_at	timestamp	Yes	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	3415	A	No	
clientapp_users
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
email	varchar(255)	No				
password	varchar(255)	No				
client_id	int	No				
created_at	datetime	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1462	A	No	
clients
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
tpin	varchar(191)	Yes	NULL			
country_id	int	Yes	NULL			
office_id	int	Yes	NULL			
user_id	int	Yes	NULL			
staff_id	int	Yes	NULL			
referred_by_id	int	Yes	NULL			
account_no	varchar(191)	Yes	NULL			
external_id	varchar(191)	Yes	NULL			
title	varchar(191)	Yes	NULL			
first_name	varchar(191)	Yes	NULL			
middle_name	varchar(191)	Yes	NULL			
last_name	varchar(191)	Yes	NULL			
full_name	varchar(191)	Yes	NULL			
incorporation_number	varchar(191)	Yes	NULL			
display_name	varchar(191)	Yes	NULL			
picture	varchar(191)	Yes	NULL			
mobile	varchar(191)	Yes	NULL			
phone_primary	varchar(191)	Yes	NULL			
phone_secondary	varchar(191)	Yes	NULL			
next_of_kin_name	varchar(191)	Yes	NULL			
next_of_kin_relationship	varchar(191)	Yes	NULL			
next_of_kin_phone	varchar(191)	Yes	NULL			
next_of_kin_address	varchar(191)	Yes	NULL			
guarantor_name	varchar(191)	Yes	NULL			
guarantor_nrc	varchar(191)	Yes	NULL			
guarantor_phone	varchar(191)	Yes	NULL			
guarantor_address	varchar(191)	Yes	NULL			
guarantor_employer	varchar(191)	Yes	NULL			
guarantor_relationship	varchar(191)	Yes	NULL			
phone	varchar(191)	Yes	NULL			
email	varchar(191)	Yes	NULL			
email_primary	varchar(191)	Yes	NULL			
gender	enum('male', 'female', 'other', 'unspecified')	Yes	NULL			
client_type	enum('individual', 'business', 'ngo', 'other')	Yes	NULL			
status	enum('pending', 'active', 'inactive', 'declined', 'closed', 'blacklisted')	No	pending			
marital_status	enum('married', 'single', 'divorced', 'widowed', 'unspecified')	Yes	NULL			
dob	date	Yes	NULL			
street	varchar(191)	Yes	NULL			
ward	varchar(191)	Yes	NULL			
district	varchar(191)	Yes	NULL			
region	varchar(191)	Yes	NULL			
address	text	Yes	NULL			
address_line1	varchar(191)	Yes	NULL			
address_line2	varchar(191)	Yes	NULL			
city	varchar(191)	Yes	NULL			
joined_date	date	Yes	NULL			
activated_date	date	Yes	NULL			
reactivated_date	date	Yes	NULL			
declined_date	date	Yes	NULL			
declined_reason	text	Yes	NULL			
closed_reason	text	Yes	NULL			
closed_date	date	Yes	NULL			
created_by_id	int	Yes	NULL			
inactive_reason	text	Yes	NULL			
inactive_date	date	Yes	NULL			
inactive_by_id	int	Yes	NULL			
is_dormant_recovery	tinyint(1)	No	0			
activated_by_id	int	Yes	NULL			
reactivated_by_id	int	Yes	NULL			
declined_by_id	int	Yes	NULL			
closed_by_id	int	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
isclient	int	No	1			
working_place	varchar(191)	Yes	NULL			
working_position	varchar(191)	Yes	NULL			
salary	varchar(191)	Yes	NULL			
annual_income	varchar(191)	Yes	NULL			
employer	varchar(191)	Yes	NULL			
employer_address	varchar(191)	Yes	NULL			
business_name	varchar(191)	Yes	NULL			
business_type	varchar(191)	Yes	NULL			
nrc_number	varchar(191)	Yes	NULL			
blacklisted	tinyint	No	0			
approved_dormant	int	No	0			
date_blacklisted	date	Yes	NULL			
key_contact_person	varchar(191)	Yes	NULL			
key_contact_person_nrc_number	varchar(191)	Yes	NULL			
number_of_shareholders	varchar(191)	Yes	NULL			
company_registration_date	varchar(191)	Yes	NULL			
type_of_business	varchar(191)	Yes	NULL			
verification_status	varchar(191)	No	pending			
verified_by_id	bigint	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	49695	A	No	
clients_verification_status_index	BTREE	No	No	verification_status	1	A	No	
clients_app_otp
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
identifier	varchar(255)	No				
otp	varchar(255)	No				
expires_at	datetime	No				
created_date	datetime	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	174	A	No	
client_app_loan_applications
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
amount	decimal(65,4)	No				
branch	int	No				
client_id	int	No				
client_name	varchar(191)	No				
payment_method	varchar(191)	No				
payment_id	varchar(191)	No				
loan_purpose	text	No				
date	datetime	No	CURRENT_TIMESTAMP			
status	varchar(191)	No	pending			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1681	A	No	
client_app_picture_requests
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
client_id	int	No				
loan_officer	int	No				
office	int	No				
image	varchar(191)	No				
date	datetime	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	90	A	No	
client_identifications
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
client_id	int	Yes	NULL			
client_identification_type_id	int	Yes	NULL			
name	varchar(191)	Yes	NULL			
active	tinyint	No	1			
notes	text	Yes	NULL			
attachment	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	4644	A	No	
client_identification_types
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	3	A	No	
client_location
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	No				
client_id	int	No				
map_link	varchar(191)	No				
description	text	No				
created_date	datetime	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2	A	No	
client_next_of_kin
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
client_id	int	Yes	NULL			
client_relationship_id	int	Yes	NULL			
qualification	varchar(191)	Yes	NULL			
first_name	varchar(191)	Yes	NULL			
middle_name	varchar(191)	Yes	NULL			
last_name	varchar(191)	Yes	NULL			
ward	varchar(191)	Yes	NULL			
street	varchar(191)	Yes	NULL			
district	varchar(191)	Yes	NULL			
region	varchar(191)	Yes	NULL			
address	text	Yes	NULL			
picture	varchar(191)	Yes	NULL			
mobile	varchar(191)	Yes	NULL			
phone	varchar(191)	Yes	NULL			
email	varchar(191)	Yes	NULL			
gender	enum('male', 'female', 'other', 'unspecified')	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	13812	A	No	
client_profession
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
client_relationships
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	5	A	No	
client_transfer_log
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
client_id	int	No				
old_loan_officer_id	int	No				
new_loan_officer_id	int	No				
transferred_by	int	No				
transferred_at	datetime	No	CURRENT_TIMESTAMP			
created_at	datetime	No	CURRENT_TIMESTAMP			
updated_at	datetime	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2495	A	No	
client_transfer_requests
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
new_office_id	int	No				
done_by	int	No				
client_id	int	No				
old_office_id	int	No				
date	datetime	No	CURRENT_TIMESTAMP			
created_at	datetime	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
client_users
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
created_by_id	int	Yes	NULL			
client_id	int	Yes	NULL			
user_id	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	18	A	No	
collaterals
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
loan_id	int	Yes	NULL			
client_id	int	Yes	NULL			
collateral_type_id	int	Yes	NULL			
name	varchar(191)	No				
category	varchar(191)	Yes	NULL			
serial_num	varchar(255)	Yes	NULL			
serial	varchar(255)	Yes	NULL			
value	decimal(65,4)	Yes	NULL			
initial_price	decimal(65,4)	Yes	NULL			
current_worth	decimal(65,4)	Yes	NULL			
vetted_valuation	decimal(15,2)	Yes	NULL			
vetted_valuation_cost	decimal(15,2)	Yes	NULL			
vetted_valuation_by	bigint	Yes	NULL			
vetted_valuation_status	tinyint	No	0			
vvc_items	json	Yes	NULL			
approved_value	decimal(65,4)	Yes	NULL			
sold_price	decimal(15,2)	Yes	NULL			
buyer_name	varchar(191)	Yes	NULL			
buyer_phone	varchar(191)	Yes	NULL			
buyer_nrc	varchar(191)	Yes	NULL			
buyer_gender	varchar(191)	Yes	NULL			
penalty	decimal(15,2)	Yes	NULL			
disposal_costs	text	Yes	NULL			
status	varchar(255)	Yes	NULL			
new_approval_status	tinyint	No	0			
stage	enum('pledged', 'brought_in', 'seized')	Yes	NULL			
stage_icon	text	Yes	NULL			
condition	varchar(191)	No				
date_purchased	date	Yes	NULL			
pledged_at	date	Yes	NULL			
seized_at	date	Yes	NULL			
valuated_at	date	Yes	NULL			
listed_at	date	Yes	NULL			
sold_at	date	Yes	NULL			
written_off_at	date	Yes	NULL			
released_at	date	Yes	NULL			
release_requested_at	date	Yes	NULL			
date_resold	date	Yes	NULL			
created_by_id	int	Yes	NULL			
description	text	Yes	NULL			
picture	text	Yes	NULL			
gallery	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
province_id	bigint	Yes	NULL			
district_id	bigint	Yes	NULL			
office_id	bigint	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	38	A	No	
collaterals_serial_num_unique	BTREE	Yes	No	serial_num	8	A	Yes	
collateral_status_change_requests
Column	Type	Null	Default	Links to	Comments	Media type
id	bigint	No				
collateral_id	int	No				
requested_by_id	int	No				
approved_by_id	int	Yes	NULL			
old_status	enum('active', 'sold', 'defaulted', 'repossessed')	No				
new_status	enum('active', 'sold', 'defaulted', 'repossessed')	No				
stage	varchar(191)	Yes	NULL			
reason	text	No				
sold_price	decimal(15,2)	Yes	NULL			
disposal_costs	text	Yes	NULL			
penalty	decimal(15,2)	Yes	NULL			
approval_status	enum('pending', 'approved', 'rejected')	No	pending			
request_date	timestamp	No	CURRENT_TIMESTAMP			
approval_date	timestamp	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

collateral_types
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2	A	No	
collateral_workflow_logs
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
collateral_id	bigint	No				
from_status	varchar(191)	No				
to_status	varchar(191)	No				
reason	text	Yes	NULL			
user_id	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	8	A	No	
communication_campaigns
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
created_by_id	int	Yes	NULL			
type	enum('sms', 'email')	Yes	NULL			
name	text	Yes	NULL			
description	text	Yes	NULL			
report_start_date	date	Yes	NULL			
report_start_time	varchar(191)	Yes	NULL			
recurrence_type	enum('none', 'schedule')	Yes	NULL			
recur_frequency	enum('days', 'months', 'weeks', 'years')	Yes	NULL			
recur_interval	varchar(191)	Yes	NULL			
email_recipients	text	Yes	NULL			
email_subject	varchar(191)	Yes	NULL			
message	text	Yes	NULL			
email_attachment_file_format	enum('pdf', 'csv', 'xls')	Yes	NULL			
recipients_category	enum('all_clients', 'active_clients', 'prospective_clients', 'active_loans', 'loans_in_arrears', 'overdue_loans', 'happy_birthday')	Yes	NULL			
report_attachment	enum('loan_schedule', 'loan_statement', 'savings_statement', 'audit_report', 'group_indicator_report')	Yes	NULL			
from_day	varchar(191)	Yes	NULL			
to_day	varchar(191)	Yes	NULL			
office_id	varchar(191)	Yes	NULL			
loan_officer_id	varchar(191)	Yes	NULL			
gl_account_id	varchar(191)	Yes	NULL			
manual_entries	varchar(191)	Yes	NULL			
loan_status	varchar(191)	Yes	NULL			
loan_product_id	varchar(191)	Yes	NULL			
last_run_date	date	Yes	NULL			
next_run_date	date	Yes	NULL			
last_run_time	date	Yes	NULL			
next_run_time	date	Yes	NULL			
number_of_runs	int	No	0			
number_of_recipients	int	No	0			
active	tinyint	No	1			
sent	tinyint	No	0			
status	enum('pending', 'active', 'declined', 'inactive')	No	pending			
approved_by_id	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1	A	No	
compliance_screenings
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
client_id	bigint	No				
motor_vehicle_loan_id	bigint	Yes	NULL			
pep_result	varchar(191)	Yes	NULL			
sanctions_result	varchar(191)	Yes	NULL			
screening_date	date	Yes	NULL			
screening_officer_id	bigint	Yes	NULL			
match_level	varchar(191)	Yes	NULL			
comments	text	Yes	NULL			
supporting_evidence	varchar(191)	Yes	NULL			
status	varchar(191)	No	pending			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	15	A	No	
compliance_screenings_status_idx	BTREE	No	No	client_id	6	A	No	
motor_vehicle_loan_id	6	A	Yes
status	6	A	No
countries
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
sortname	varchar(191)	No				
name	varchar(191)	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	246	A	No	
course_categories
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
name	varchar(191)	No				
slug	varchar(191)	No				
description	text	Yes	NULL			
icon	varchar(191)	No	fa-folder			
color	varchar(191)	No	#4a90e2			
sort_order	int	No	0			
is_active	tinyint(1)	No	1			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	5	A	No	
course_categories_name_unique	BTREE	Yes	No	name	5	A	No	
course_categories_slug_unique	BTREE	Yes	No	slug	5	A	No	
course_category_training_material
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
course_category_id	bigint	No				
training_material_id	bigint	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	25	A	No	
course_category_training_material_course_category_id_foreign	BTREE	No	No	course_category_id	10	A	No	
course_category_training_material_training_material_id_foreign	BTREE	No	No	training_material_id	16	A	No	
course_topics
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
training_material_id	bigint	No		training_materials -> id		
topic_name	varchar(191)	No				
topic_type	varchar(191)	No				
file_path	varchar(191)	Yes	NULL			
video_file_path	varchar(191)	Yes	NULL			
audio_file_path	varchar(191)	Yes	NULL			
pdf_file_path	varchar(191)	Yes	NULL			
ppt_file_path	varchar(191)	Yes	NULL			
document_file_path	varchar(191)	Yes	NULL			
file_name	varchar(191)	Yes	NULL			
duration	varchar(191)	Yes	NULL			
sort_order	int	No	0			
is_active	tinyint(1)	No	1			
view_count	bigint	No	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	3	A	No	
course_topics_training_material_id_foreign	BTREE	No	No	training_material_id	2	A	No	
currencies
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
code	varchar(191)	Yes	NULL			
symbol	varchar(191)	Yes	NULL			
decimals	varchar(191)	Yes	2			
xrate	decimal(65,8)	Yes	NULL			
international_code	varchar(191)	Yes	NULL			
active	tinyint	No	1			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	37	A	No	
custom_fields
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
created_by_id	int	Yes	NULL			
category	varchar(191)	Yes	NULL			
name	varchar(191)	Yes	NULL			
field_type	enum('number', 'textfield', 'date', 'decimal', 'textarea', 'checkbox', 'radiobox', 'select')	No	textfield			
required	tinyint	No	0			
radio_box_values	text	Yes	NULL			
checkbox_values	text	Yes	NULL			
select_values	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
custom_fields_meta
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
created_by_id	int	Yes	NULL			
category	varchar(191)	Yes	NULL			
parent_id	int	Yes	NULL			
custom_field_id	int	Yes	NULL			
name	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
cycle_dates
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
loan_officer_id	int	Yes	NULL			
cycle_end_date	int	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	648	A	No	
deadlines
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
name	varchar(191)	No	Building Deposit			
countdown_date	timestamp	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2	A	No	
debt_balances
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
office_id	bigint	No				
deposit_type_id	bigint	No				
balance	bigint	No	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	43	A	No	
departments
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
name	varchar(191)	No				
head	varchar(191)	Yes	NULL			
capacity	int	No	0			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
active	tinyint(1)	No	1			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
deposits
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
deposit_type	int	No				
office	int	No				
amount	decimal(11,0)	No				
debt	varchar(12)	Yes	NULL			
date	date	No				
status	tinyint	Yes	NULL		0=declined, 1=approved, null=pending	
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2568	A	No	
deposit_month_exemptions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
office_id	bigint	No				
deposit_type_id	bigint	Yes	NULL			
no_months_exclude	int	No	0			
months	json	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	30	A	No	
deposit_month_exemptions_office_id_deposit_type_id_unique	BTREE	Yes	No	office_id	15	A	No	
deposit_type_id	30	A	Yes
deposit_types
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	No				
sort_order	int	No	0			
method	varchar(191)	Yes	NULL			
monthly_amount	decimal(8,2)	Yes	NULL			
bank	varchar(191)	No				
gl_account	int	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	6	A	No	
districts
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
name	varchar(191)	No				
province_id	bigint	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	116	A	No	
district_regionals
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
name	varchar(191)	No				
district_id	bigint	Yes	NULL			
province_id	bigint	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
documents
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
type	enum('client', 'loan', 'group', 'savings', 'identification', 'shares', 'repayment', 'collateral')	Yes	NULL			
record_id	int	Yes	NULL			
name	varchar(191)	Yes	NULL			
size	varchar(191)	Yes	NULL			
location	text	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	10132	A	No	
dual_role
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
user_id	int	No				
role_id	int	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	26	A	No	
employees
Column	Type	Null	Default	Links to	Comments	Media type
employee_id (Primary)	int	No				
user_id	int	No				
first_name	varchar(50)	No				
last_name	varchar(50)	No				
gender	varchar(20)	Yes	NULL			
date_of_birth	date	Yes	NULL			
nationality	varchar(50)	Yes	NULL			
nrc_number	varchar(50)	Yes	NULL			
email	varchar(100)	No				
phone	varchar(20)	Yes	NULL			
address	text	Yes	NULL			
job_title	varchar(100)	Yes	NULL			
department	varchar(50)	Yes	NULL			
branch	varchar(50)	Yes	NULL			
hire_date	date	Yes	NULL			
employment_type	varchar(30)	Yes	NULL			
reporting_manager	varchar(100)	Yes	NULL			
work_location	varchar(50)	Yes	NULL			
emergency_contact_name	varchar(100)	Yes	NULL			
emergency_contact_relation	varchar(50)	Yes	NULL			
emergency_contact_number	varchar(20)	Yes	NULL			
medical_conditions	text	Yes	NULL			
status	varchar(20)	Yes	Active			
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
updated_at	timestamp	Yes	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	employee_id	2	A	No	
email	BTREE	Yes	No	email	2	A	No	
employee_remuneration_assignments
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
user_id	int	No				
job_position_id	bigint	No				
remuneration_config_id	bigint	No				
acting_capacity	tinyint(1)	No	0			
effective_from	date	No				
effective_to	date	Yes	NULL			
approval_status	varchar(20)	No	pending			
approved_by	int	Yes	NULL			
approved_at	timestamp	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
enrollments
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
user_id	bigint	No				
training_material_id	bigint	No				
enrolled_at	timestamp	Yes	NULL			
completed_at	timestamp	Yes	NULL			
progress	int	No	0			
completed_topics	json	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	34	A	No	
enrollments_user_id_training_material_id_unique	BTREE	Yes	No	user_id	22	A	No	
training_material_id	34	A	No
expenses
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
office_id	int	Yes	NULL			
created_by_id	int	Yes	NULL			
expense_type_id	int	Yes	NULL			
gl_account_id	int	Yes	NULL			
is_attribution	tinyint	No	0			
name	varchar(191)	Yes	NULL			
amount	decimal(65,2)	No	0.00			
date	date	Yes	NULL			
year	varchar(191)	Yes	NULL			
month	varchar(191)	Yes	NULL			
recurring	tinyint	No	0			
recur_frequency	varchar(191)	No	31			
recur_start_date	date	Yes	NULL			
recur_end_date	date	Yes	NULL			
recur_next_date	date	Yes	NULL			
recur_type	enum('day', 'week', 'month', 'year')	No	month			
status	enum('pending', 'approved', 'declined')	No	approved			
approved_date	date	Yes	NULL			
approved_by_id	int	Yes	NULL			
declined_date	date	Yes	NULL			
declined_by_id	int	Yes	NULL			
notes	text	Yes	NULL			
files	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
expense_type	varchar(191)	Yes	NULL			
proof_of_payment	varchar(255)	Yes	NULL			
deposit_method	varchar(191)	No				
reference_number	varchar(191)	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	23441	A	No	
expense_budgets
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
created_by_id	int	Yes	NULL			
office_id	int	Yes	NULL			
expense_type_id	int	Yes	NULL			
name	varchar(191)	Yes	NULL			
year	varchar(191)	Yes	NULL			
month	varchar(191)	Yes	NULL			
date	date	Yes	NULL			
amount	decimal(65,2)	Yes	NULL			
notes	text	Yes	NULL			
status	enum('pending', 'approved', 'declined')	No	approved			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
expense_categories
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
name	varchar(191)	No				
type	varchar(191)	No			administration or bank_account	
gl_account_code	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
expense_types
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
gl_account_asset_id	int	Yes	NULL			
gl_account_expense_id	int	Yes	NULL			
gl_account_id	int	Yes	NULL			
notes	text	Yes	NULL			
distribution_cost	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	29	A	No	
idx_name	BTREE	No	No	name	29	A	Yes	
expense_types_old
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
gl_account_asset_id	int	Yes	NULL			
gl_account_expense_id	int	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	11	A	No	
id_index	BTREE	No	No	id	11	A	No	
idx_name	BTREE	No	No	name	11	A	Yes	
expense_type_gl_account
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
expense_type_id	bigint	No				
gl_account_id	bigint	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	132	A	No	
file_migration
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
file_name	varchar(1000)	Yes	NULL			
file_url	varchar(1000)	Yes	NULL			
created_at	timestamp	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	7590	A	No	
fleets
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
vehicle_id	varchar(191)	Yes	NULL			
vehicle_type	varchar(191)	Yes	NULL			
vehicle_model	varchar(191)	Yes	NULL			
assigned_to	varchar(191)	Yes	NULL			
office_id	bigint	Yes	NULL			
color	varchar(191)	Yes	NULL			
date_purchased	date	Yes	NULL			
insurance_expire_date	date	Yes	NULL			
last_service_date	date	Yes	NULL			
current_value	decimal(12,2)	No	0.00			
white_book	enum('available', 'none')	No	none			
vehicle_status	varchar(191)	Yes	NULL			
last_maintenance	date	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	34	A	No	
fleets_vehicle_id_index	BTREE	No	No	vehicle_id	34	A	Yes	
fleets_office_id_index	BTREE	No	No	office_id	32	A	Yes	
fleet_accidents
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
fleet_id	int	No				
accident_date	date	No				
driver	varchar(191)	Yes	NULL			
location	varchar(191)	Yes	NULL			
description	text	Yes	NULL			
police_report_number	varchar(191)	Yes	NULL			
insurance_claim_number	varchar(191)	Yes	NULL			
repair_details	text	Yes	NULL			
cost	decimal(12,2)	No	0.00			
document_path	varchar(191)	Yes	NULL			
recorded_by	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
fleet_expenses
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
fleet_id	int	No				
expense_date	date	No				
category	varchar(191)	No				
description	varchar(191)	Yes	NULL			
amount	decimal(12,2)	No	0.00			
reference_number	varchar(191)	Yes	NULL			
document_path	varchar(191)	Yes	NULL			
recorded_by	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
fleet_maintenance_schedules
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
fleet_id	bigint	No		fleets -> id		
maintenance_type	varchar(191)	No				
technician	varchar(191)	Yes	NULL			
due_date	date	Yes	NULL			
notes	text	Yes	NULL			
status	enum('pending', 'completed', 'cancelled')	No	pending			
completed_at	date	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
amount	decimal(10,2)	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
fleet_maintenance_schedules_fleet_id_foreign	BTREE	No	No	fleet_id	0	A	No	
fleet_service_records
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
fleet_id	int	No				
service_date	date	No				
service_type	varchar(191)	No				
description	text	Yes	NULL			
parts_replaced	text	Yes	NULL			
workshop	varchar(191)	Yes	NULL			
odometer_reading	int	Yes	NULL			
cost	decimal(12,2)	No	0.00			
document_path	varchar(191)	Yes	NULL			
recorded_by	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
funds
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	3	A	No	
fund_movements
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
office_id	bigint	No				
movement_type	enum('payment', 'transfer', 'bank_charge', 'withdrawal', 'refund')	No				
source_account	varchar(255)	No				
destination_account	varchar(255)	Yes	NULL			
payee_name	varchar(255)	Yes	NULL			
expense_category	varchar(150)	Yes	NULL			
title	varchar(255)	Yes	NULL			
amount	decimal(15,2)	No				
payment_method	enum('bank_transfer', 'cheque', 'cash', 'mobile_money', 'other')	Yes	NULL			
reference_no	varchar(150)	Yes	NULL			
transaction_date	date	No				
description	text	Yes	NULL			
remarks	text	Yes	NULL			
attachment	varchar(255)	Yes	NULL			
document_note	varchar(255)	Yes	NULL			
status	enum('draft', 'submitted', 'approved', 'rejected', 'pending')	Yes	pending			
requires_approval	tinyint(1)	Yes	1			
created_by	bigint	No				
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
updated_at	timestamp	Yes	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	79	A	No	
idx_office	BTREE	No	No	office_id	26	A	No	
idx_type	BTREE	No	No	movement_type	2	A	No	
idx_status	BTREE	No	No	status	3	A	Yes	
idx_date	BTREE	No	No	transaction_date	24	A	No	
general_ledger
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
user_id	int	Yes	NULL			
office_id	int	Yes	NULL			
cycle_dates	int	Yes	NULL			
total_income	decimal(10,2)	Yes	NULL			
cash_balance	decimal(10,2)	Yes	NULL			
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
updated_at	timestamp	Yes	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	54	A	No	
general_topics
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
name	varchar(191)	No				
description	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
poster	varchar(191)	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	36	A	No	
general_uploads
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
name	varchar(191)	No				
path	varchar(191)	No				
poster	varchar(191)	Yes	NULL			
type	enum('video', 'audio', 'book', 'paper', 'document', 'image', 'other')	No	other			
file_size	bigint	Yes	NULL			
mime_type	varchar(191)	Yes	NULL			
views_count	bigint	No	0			
likes_count	bigint	No	0			
category	varchar(191)	No	other			
uploaded_by	bigint	Yes	NULL			
general_topic_id	bigint	Yes	NULL	general_topics -> id		
position_id	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	151	A	No	
general_uploads_general_topic_id_foreign	BTREE	No	No	general_topic_id	42	A	Yes	
general_upload_likes
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
user_id	bigint	No				
general_upload_id	bigint	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
general_upload_likes_user_id_general_upload_id_unique	BTREE	Yes	No	user_id	0	A	No	
general_upload_id	0	A	No
general_upload_position
Column	Type	Null	Default	Links to	Comments	Media type
general_upload_id	bigint	No		general_uploads -> id		
position_id	int	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
general_upload_position_general_upload_id_foreign	BTREE	No	No	general_upload_id	0	A	No	
general_views
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
type	varchar(191)	No				
user_id	bigint	No				
item_id	bigint	No				
opened	tinyint(1)	No	0			
duration	int	No	0			
completion_status	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	256	A	No	
unique_view	BTREE	Yes	No	type	2	A	No	
item_id	123	A	No
user_id	256	A	No
general_views_type_item_id_index	BTREE	No	No	type	2	A	No	
item_id	123	A	No
general_views_user_id_index	BTREE	No	No	user_id	103	A	No	
gl_accounts
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
parent_id	int	Yes	NULL			
gl_code	varchar(191)	Yes	NULL			
account_type	enum('asset', 'liability', 'equity', 'income', 'expense')	No				
active	tinyint	No	1			
manual_entries	tinyint	No	1			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	301	A	No	
gl_closures
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
office_id	int	Yes	NULL			
created_by_id	int	Yes	NULL			
closing_date	date	No				
modified_by_id	int	Yes	NULL			
gl_reference	varchar(191)	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
gl_journal_entries
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
office_id	int	Yes	NULL			
gl_account_id	int	Yes	NULL			
currency_id	int	Yes	NULL			
transaction_type	enum('disbursement', 'accrual', 'deposit', 'withdrawal', 'manual_entry', 'pay_charge', 'transfer_fund', 'expense', 'payroll', 'income', 'fee', 'penalty', 'interest', 'dividend', 'guarantee', 'write_off', 'repayment', 'repayment_disbursement', 'repayment_recovery', 'interest_accrual', 'fee_accrual', 'savings', 'shares', 'asset', 'asset_income', 'asset_expense', 'asset_depreciation')	Yes	repayment			
transaction_sub_type	enum('overpayment', 'repayment_interest', 'repayment_principal', 'repayment_fees', 'repayment_penalty')	Yes	NULL			
debit	decimal(65,4)	Yes	NULL			
credit	decimal(65,4)	Yes	NULL			
reversed	tinyint	No	0			
name	text	Yes	NULL			
reference	varchar(191)	Yes	NULL			
loan_id	int	Yes	NULL			
loan_transaction_id	int	Yes	NULL			
savings_transaction_id	int	Yes	NULL			
savings_id	int	Yes	NULL			
shares_transaction_id	int	Yes	NULL			
payroll_transaction_id	int	Yes	NULL			
payment_detail_id	int	Yes	NULL			
transaction_id	int	Yes	NULL			
gl_closure_id	int	Yes	NULL			
date	date	Yes	NULL			
month	varchar(191)	Yes	NULL			
year	varchar(191)	Yes	NULL			
notes	text	Yes	NULL			
created_by_id	int	Yes	NULL			
modified_by_id	int	Yes	NULL			
reconciled	tinyint	No	0			
manual_entry	tinyint	No	0			
approved	tinyint	No	1			
approved_by_id	int	Yes	NULL			
approved_date	date	Yes	NULL			
approved_notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	973768	A	No	
groups
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
office_id	int	Yes	NULL			
name	varchar(191)	Yes	NULL			
account_no	varchar(191)	Yes	NULL			
external_id	varchar(191)	Yes	NULL			
staff_id	int	Yes	NULL			
joined_date	date	Yes	NULL			
activated_date	date	Yes	NULL			
reactivated_date	date	Yes	NULL			
declined_date	date	Yes	NULL			
declined_reason	text	Yes	NULL			
closed_reason	text	Yes	NULL			
closed_date	date	Yes	NULL			
created_by_id	int	Yes	NULL			
activated_by_id	int	Yes	NULL			
reactivated_by_id	int	Yes	NULL			
declined_by_id	int	Yes	NULL			
closed_by_id	int	Yes	NULL			
mobile	varchar(191)	Yes	NULL			
phone	varchar(191)	Yes	NULL			
email	varchar(191)	Yes	NULL			
street	varchar(191)	Yes	NULL			
ward	varchar(191)	Yes	NULL			
district	varchar(191)	Yes	NULL			
region	varchar(191)	Yes	NULL			
address	text	Yes	NULL			
notes	text	Yes	NULL			
status	enum('pending', 'active', 'inactive', 'declined', 'closed')	No	pending			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1	A	No	
group_clients
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
group_id	int	Yes	NULL			
client_id	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1	A	No	
group_loan_allocation
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
loan_id	int	Yes	NULL			
group_id	int	Yes	NULL			
client_id	int	Yes	NULL			
amount	decimal(65,4)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
group_users
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
created_by_id	int	Yes	NULL			
group_id	int	Yes	NULL			
user_id	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
guarantors
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
country_id	int	Yes	NULL			
client_id	int	Yes	NULL			
savings_id	int	Yes	NULL			
loan_id	int	Yes	NULL			
loan_application_id	int	Yes	NULL			
is_client	tinyint	No	0			
client_relationship_id	int	Yes	NULL			
amount	decimal(65,4)	Yes	NULL			
title	varchar(191)	Yes	NULL			
first_name	varchar(191)	Yes	NULL			
middle_name	varchar(191)	Yes	NULL			
last_name	varchar(191)	Yes	NULL			
gender	enum('male', 'female', 'other', 'unspecified')	Yes	NULL			
dob	date	Yes	NULL			
street	varchar(191)	Yes	NULL			
address	text	Yes	NULL			
mobile	varchar(191)	Yes	NULL			
phone	varchar(191)	Yes	NULL			
email	varchar(191)	Yes	NULL			
picture	text	Yes	NULL			
work	varchar(191)	Yes	NULL			
work_address	text	Yes	NULL			
lock_funds	tinyint	No	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	7	A	No	
induction_checklists
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
user_id	int	No				
item	varchar(191)	No				
completed	tinyint(1)	No	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	907	A	No	
job_positions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	No				
status	tinyint(1)	No	1			
job_description	varchar(191)	No				
date_added	datetime	No	CURRENT_TIMESTAMP			
is_vacant	tinyint(1)	No	0			
num_of_vacancies	int	No	0			
num_of_active	int	No	0			
approved	int	No	0		Approved headcount for this position	
department_id	bigint	Yes	NULL	departments -> id		
posted_date	date	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	21	A	No	
job_positions_department_id_foreign	BTREE	No	No	department_id	2	A	Yes	
leave_days
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
user_id	int	No				
office_id	int	No				
first_name	varchar(255)	No				
last_name	varchar(255)	No				
department	varchar(255)	No				
position	varchar(255)	No				
reason	enum('annual leave', 'compassionate leave', 'maternity leave', 'parental leave', 'sick')	No				
commencement_date	date	No				
return_date	date	No				
date_requested	date	No				
notes	varchar(255)	No				
date_approved	date	Yes	NULL			
approved_by_id	varchar(30)	Yes	NULL			
declined_by_id	varchar(30)	Yes	NULL			
status	enum('pending', 'approved', 'declined')	No	pending			
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
updated_at	timestamp	Yes	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1403	A	No	
ledger_income
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
office_id	int	No				
amount	decimal(10,2)	No				
date	date	No				
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
updated_at	timestamp	Yes	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
legal_filings
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
recovery_case_id	bigint	No				
created_by	bigint	No				
filing_type	varchar(191)	No				
reference_number	varchar(191)	Yes	NULL			
law_firm	varchar(191)	Yes	NULL			
filed_date	date	No				
hearing_date	date	Yes	NULL			
court_name	varchar(191)	Yes	NULL			
outcome	varchar(191)	Yes	NULL			
cost	decimal(15,2)	No	0.00			
amount_recovered	decimal(15,2)	No	0.00			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
loans
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
vehicle_id	bigint	Yes	NULL			
reloan_id	int	Yes	0			
client_type	enum('client', 'group')	No	client			
loan_product_id	int	Yes	NULL			
client_id	int	Yes	NULL			
office_id	int	Yes	NULL			
district_id	bigint	Yes	NULL			
district_regional_id	bigint	Yes	NULL			
group_id	int	Yes	NULL			
fund_id	int	Yes	NULL			
loan_purpose_id	int	Yes	NULL			
currency_id	int	Yes	NULL			
decimals	int	No	2			
account_number	varchar(191)	Yes	NULL			
external_id	varchar(191)	Yes	NULL			
loan_officer_id	int	Yes	NULL			
loan_consultant_id	bigint	Yes	NULL			
branch_assessor_id	bigint	Yes	NULL			
current_custodian_id	bigint	Yes	NULL			
vehicle_status	varchar(191)	Yes	NULL			
custody_status	varchar(191)	Yes	NULL			
current_storage_location	varchar(191)	Yes	NULL			
current_custodian_phone	varchar(191)	Yes	NULL			
current_custodian_nrc	varchar(191)	Yes	NULL			
current_custodian_alternative_contact	varchar(191)	Yes	NULL			
principal	decimal(65,4)	Yes	NULL			
applied_amount	decimal(65,4)	Yes	NULL			
approved_amount	decimal(65,4)	Yes	NULL			
vehicle_value	decimal(18,2)	Yes	NULL			
ltv_percent	decimal(5,2)	Yes	NULL			
requested_amount	decimal(18,2)	Yes	NULL			
principal_derived	decimal(65,4)	Yes	NULL			
interest_derived	decimal(65,4)	Yes	NULL			
fees_derived	decimal(65,4)	Yes	NULL			
penalty_derived	decimal(65,4)	Yes	NULL			
disbursement_fees	decimal(65,4)	Yes	NULL			
processing_fee	decimal(65,4)	Yes	NULL			
loan_term	int	Yes	NULL			
loan_term_type	enum('days', 'weeks', 'months', 'years')	Yes	NULL			
schedule_type	enum('new', 'old')	No	new			
repayment_frequency	int	Yes	NULL			
repayment_frequency_type	enum('days', 'weeks', 'months', 'years')	Yes	NULL			
override_interest	tinyint	Yes	0			
interest_rate	decimal(65,4)	Yes	NULL			
override_interest_rate	decimal(65,4)	Yes	NULL			
interest_rate_type	enum('day', 'week', 'month', 'year')	Yes	NULL			
expected_disbursement_date	date	Yes	NULL			
disbursement_date	datetime	Yes	NULL			
expected_maturity_date	date	Yes	NULL			
expected_first_repayment_date	date	Yes	NULL			
final_due_date	date	Yes	NULL			
repayments_number	int	Yes	NULL			
first_repayment_date	date	Yes	NULL			
interest_method	enum('flat', 'declining_balance')	Yes	NULL			
armotization_method	enum('equal_installment', 'equal_principal')	Yes	NULL			
grace_on_interest_charged	int	Yes	NULL			
grace_on_principal	int	Yes	NULL			
grace_on_interest_payment	int	Yes	NULL			
status	enum('new', 'pending', 'approved', 'need_changes', 'disbursed', 'declined', 'rejected', 'withdrawn', 'written_off', 'closed', 'pending_reschedule', 'rescheduled', 'paid')	No	pending			
restructured_at	timestamp	Yes	NULL			
dormant_recovery	int	No	0			
shared	int	No	0			
esc_recovered	int	No	0			
created_by_id	int	Yes	NULL			
modified_by_id	int	Yes	NULL			
approved_by_id	int	Yes	NULL			
need_changes_by_id	int	Yes	NULL			
withdrawn_by_id	int	Yes	NULL			
declined_by_id	int	Yes	NULL			
written_off_by_id	int	Yes	NULL			
disbursed_by_id	int	Yes	NULL			
rescheduled_by_id	int	Yes	NULL			
closed_by_id	int	Yes	NULL			
created_date	date	Yes	NULL			
modified_date	date	Yes	NULL			
approved_date	date	Yes	NULL			
need_changes_date	date	Yes	NULL			
withdrawn_date	date	Yes	NULL			
declined_date	date	Yes	NULL			
written_off_date	date	Yes	NULL			
rescheduled_date	date	Yes	NULL			
closed_date	date	Yes	NULL			
month	varchar(191)	Yes	NULL			
year	varchar(191)	Yes	NULL			
notes	text	Yes	NULL			
approved_notes	text	Yes	NULL			
declined_notes	text	Yes	NULL			
written_off_notes	text	Yes	NULL			
disbursed_notes	text	Yes	NULL			
withdrawn_notes	text	Yes	NULL			
rescheduled_notes	text	Yes	NULL			
closed_notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
defaulted	text	Yes	NULL			
vetted_by	int	Yes	NULL			
verified_by	int	Yes	NULL			
tag	int	Yes	NULL			
expected_amount	int	Yes	NULL			
reloaned	varchar(11)	Yes	NULL			
cycle_date	date	Yes	NULL			
parent_id	int	Yes	NULL			
phone_number	varchar(191)	Yes	NULL			
bank_account_number	varchar(191)	Yes	NULL			
bank_name	varchar(191)	Yes	NULL			
branch_name	varchar(191)	Yes	NULL			
branch_code	varchar(191)	Yes	NULL			
sort_code	varchar(191)	Yes	NULL			
referrer	int	Yes	NULL			
referrer_branch	int	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	167258	A	No	
idx_loans_loan_officer_id	BTREE	No	No	loan_officer_id	979	A	Yes	
loan_applications
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
client_type	enum('client', 'group')	No	client			
user_id	int	Yes	NULL			
staff_id	int	Yes	NULL			
loan_id	int	Yes	NULL			
loan_purpose_id	int	Yes	NULL			
currency_id	int	Yes	NULL			
office_id	int	Yes	NULL			
client_id	int	Yes	NULL			
group_id	int	Yes	NULL			
loan_product_id	int	No				
amount	decimal(65,4)	No	0.0000			
status	enum('approved', 'pending', 'declined')	No	pending			
guarantor_ids	text	Yes	NULL			
loan_term	int	Yes	NULL			
loan_term_type	enum('days', 'weeks', 'months', 'years')	Yes	NULL			
approved_by_id	int	Yes	NULL			
declined_by_id	int	Yes	NULL			
approved_notes	text	Yes	NULL			
declined_notes	text	Yes	NULL			
declined_date	date	Yes	NULL			
approved_date	date	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	7	A	No	
loan_charges
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
loan_id	int	Yes	NULL			
charge_id	int	Yes	NULL			
penalty	tinyint	No	0			
waived	tinyint	No	0			
charge_type	enum('disbursement', 'disbursement_repayment', 'specified_due_date', 'installment_fee', 'overdue_installment_fee', 'loan_rescheduling_fee', 'overdue_maturity')	No				
charge_option	enum('flat', 'percentage', 'installment_principal_due', 'installment_principal_interest_due', 'installment_interest_due', 'installment_total_due', 'total_due', 'original_principal')	No				
amount	decimal(65,2)	Yes	NULL			
amount_paid	decimal(65,2)	Yes	NULL			
due_date	date	Yes	NULL			
grace_period	int	No	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
loan_products
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
created_by_id	int	Yes	NULL			
name	varchar(191)	Yes	NULL			
is_motor_vehicle	tinyint(1)	No	0			
short_name	varchar(191)	Yes	NULL			
description	text	Yes	NULL			
fund_id	int	Yes	NULL			
currency_id	int	Yes	NULL			
decimals	int	No	2			
minimum_principal	decimal(65,4)	Yes	NULL			
default_principal	decimal(65,4)	Yes	NULL			
maximum_principal	decimal(65,4)	Yes	NULL			
service_fee	decimal(18,2)	Yes	NULL			
processing_fee	decimal(18,2)	Yes	NULL			
insurance_fee	decimal(18,2)	Yes	NULL			
valuation_fee	decimal(18,2)	Yes	NULL			
inspection_fee	decimal(18,2)	Yes	NULL			
penalty_rate	decimal(5,2)	Yes	NULL			
recovery_charges	decimal(18,2)	Yes	NULL			
effective_date	date	Yes	NULL			
version	varchar(191)	Yes	NULL			
is_active	tinyint(1)	No	0			
approved_by_id	bigint	Yes	NULL			
approved_at	timestamp	Yes	NULL			
minimum_loan_term	int	Yes	NULL			
default_loan_term	int	Yes	NULL			
maximum_loan_term	int	Yes	NULL			
repayment_frequency	int	Yes	NULL			
repayment_frequency_type	enum('days', 'weeks', 'months', 'years')	Yes	NULL			
minimum_interest_rate	decimal(65,4)	Yes	NULL			
default_interest_rate	decimal(65,4)	Yes	NULL			
maximum_interest_rate	decimal(65,4)	Yes	NULL			
interest_rate_type	enum('day', 'week', 'month', 'year')	Yes	NULL			
grace_on_interest_charged	int	Yes	NULL			
grace_on_principal	int	Yes	NULL			
grace_on_interest_payment	int	Yes	NULL			
allow_custom_grace	tinyint	No	0			
allow_standing_instuctions	tinyint	No	0			
interest_method	enum('flat', 'declining_balance')	Yes	NULL			
armotization_method	enum('equal_installment', 'equal_principal')	Yes	NULL			
interest_calculation_period_type	enum('daily', 'same')	No	same			
year_days	enum('actual', '360', '364', '365')	No	365			
month_days	enum('actual', '30', '31')	No	30			
loan_transaction_strategy	enum('penalty_fees_interest_principal', 'principal_interest_penalty_fees', 'interest_principal_penalty_fees')	No	interest_principal_penalty_fees			
include_in_cycle	tinyint	No	0			
lock_guarantee	tinyint	No	0			
allocate_overpayments	tinyint	No	0			
allow_additional_charges	tinyint	No	0			
accounting_rule	enum('none', 'cash', 'accrual_periodic', 'accrual_upfront')	No	cash			
npa_days	int	Yes	NULL			
arrears_grace_days	int	Yes	NULL			
npa_suspend_income	tinyint	No	0			
gl_account_fund_source_id	int	Yes	NULL			
gl_account_loan_portfolio_id	int	Yes	NULL			
gl_account_receivable_interest_id	int	Yes	NULL			
gl_account_receivable_fee_id	int	Yes	NULL			
gl_account_receivable_penalty_id	int	Yes	NULL			
gl_account_loan_over_payments_id	int	Yes	NULL			
gl_account_suspended_income_id	int	Yes	NULL			
gl_account_income_interest_id	int	Yes	NULL			
gl_account_income_fee_id	int	Yes	NULL			
gl_account_income_penalty_id	int	Yes	NULL			
gl_account_income_recovery_id	int	Yes	NULL			
gl_account_loans_written_off_id	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	3	A	No	
loan_products_is_motor_vehicle_is_active_index	BTREE	No	No	is_motor_vehicle	1	A	No	
is_active	1	A	No
loan_product_charges
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
loan_product_id	int	Yes	NULL			
charge_id	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
loan_provisioning_criteria
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
created_by_id	int	Yes	NULL			
name	text	Yes	NULL			
min	int	Yes	NULL			
max	int	Yes	NULL			
percentage	int	Yes	NULL			
gl_account_liability_id	int	Yes	NULL			
gl_account_expense_id	int	Yes	NULL			
notes	text	Yes	NULL			
active	tinyint	No	1			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	5	A	No	
loan_purposes
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	3	A	No	
loan_repayment_schedules
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
loan_id	int	Yes	NULL			
installment	int	Yes	NULL			
due_date	date	Yes	NULL			
from_date	date	Yes	NULL			
month	varchar(191)	Yes	NULL			
year	varchar(191)	Yes	NULL			
principal	decimal(65,4)	Yes	NULL			
principal_waived	decimal(65,4)	Yes	NULL			
principal_written_off	decimal(65,4)	Yes	NULL			
principal_paid	decimal(65,4)	Yes	NULL			
interest	decimal(65,4)	Yes	NULL			
interest_waived	decimal(65,4)	Yes	NULL			
interest_written_off	decimal(65,4)	Yes	NULL			
interest_paid	decimal(65,4)	Yes	NULL			
fees	decimal(65,4)	Yes	NULL			
fees_waived	decimal(65,4)	Yes	NULL			
fees_written_off	decimal(65,4)	Yes	NULL			
fees_paid	decimal(65,4)	Yes	NULL			
penalty	decimal(65,4)	Yes	NULL			
penalty_waived	decimal(65,4)	Yes	NULL			
penalty_written_off	decimal(65,4)	Yes	NULL			
penalty_paid	decimal(65,4)	Yes	NULL			
total_due	decimal(65,4)	Yes	NULL			
total_paid_advance	decimal(65,4)	Yes	NULL			
total_paid_late	decimal(65,4)	Yes	NULL			
paid	tinyint	No	0			
modified_by_id	int	Yes	NULL			
created_by_id	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	203338	A	No	
loan_reschedule_requests
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
loan_id	int	Yes	NULL			
principal	decimal(65,4)	Yes	NULL			
status	enum('pending', 'approved', 'rejected')	No	pending			
created_by_id	int	Yes	NULL			
modified_by_id	int	Yes	NULL			
approved_by_id	int	Yes	NULL			
rejected_by_id	int	Yes	NULL			
created_date	date	Yes	NULL			
modified_date	date	Yes	NULL			
approved_date	date	Yes	NULL			
rejected_date	date	Yes	NULL			
reschedule_from_date	date	Yes	NULL			
recalculate_interest	int	No	0			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
loan_topup
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
date	date	Yes	NULL			
loan_id	int	Yes	NULL			
office_id	int	Yes	NULL			
created_by	int	Yes	NULL			
amount	decimal(65,4)	Yes	NULL			
balance_bf	decimal(10,0)	Yes	NULL			
balance_new	decimal(10,0)	Yes	NULL			
status	varchar(191)	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1027	A	No	
loan_transactions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
is_recovery	varchar(191)	No	0			
loan_id	int	Yes	NULL			
office_id	int	Yes	NULL			
client_id	int	Yes	NULL			
payment_type_id	int	Yes	NULL			
transaction_type	enum('repayment', 'repayment_disbursement', 'write_off', 'write_off_recovery', 'disbursement', 'interest_accrual', 'fee_accrual', 'penalty_accrual', 'deposit', 'withdrawal', 'manual_entry', 'pay_charge', 'transfer_fund', 'interest', 'income', 'fee', 'disbursement_fee', 'installment_fee', 'specified_due_date_fee', 'overdue_maturity', 'overdue_installment_fee', 'loan_rescheduling_fee', 'penalty', 'interest_waiver', 'charge_waiver', 'interest_initial')	Yes	repayment			
created_by_id	int	Yes	NULL			
modified_by_id	int	Yes	NULL			
payment_detail_id	int	Yes	NULL			
charge_id	int	Yes	NULL			
loan_repayment_schedule_id	int	Yes	NULL			
debit	decimal(65,4)	Yes	NULL			
credit	decimal(65,4)	Yes	NULL			
balance	decimal(65,4)	Yes	NULL			
amount	decimal(65,4)	Yes	NULL			
reversible	tinyint	No	0			
reversed	tinyint	No	0			
reversal_type	enum('system', 'user', 'none')	No	none			
payment_apply_to	enum('full_payment', 'part_payment', 'reloan_payment')	Yes	full_payment			
status	enum('pending', 'approved', 'declined')	Yes	pending			
approved_by_id	int	Yes	NULL			
approved_date	date	Yes	NULL			
interest	decimal(65,4)	Yes	NULL			
principal	decimal(65,4)	Yes	NULL			
fee	decimal(65,4)	Yes	NULL			
penalty	decimal(65,4)	Yes	NULL			
overpayment	decimal(65,4)	Yes	NULL			
date	date	Yes	NULL			
month	varchar(191)	Yes	NULL			
year	varchar(191)	Yes	NULL			
receipt	text	Yes	NULL			
principal_derived	decimal(65,4)	Yes	NULL			
interest_derived	decimal(65,4)	Yes	NULL			
fees_derived	decimal(65,4)	Yes	NULL			
penalty_derived	decimal(65,4)	Yes	NULL			
overpayment_derived	decimal(65,4)	Yes	NULL			
unrecognized_income_derived	decimal(65,4)	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
balance_bf	decimal(65,4)	Yes	NULL			
temp_id	int	Yes	NULL			
cycle_date	date	Yes	NULL			
recovery	tinyint(1)	No	0			
client_app	varchar(191)	No	No			
is_collateral	tinyint	No	0			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	773941	A	No	
idx_loan_transactions_loan_id	BTREE	No	No	loan_id	157798	A	Yes	
idx_loan_transactions_date	BTREE	No	No	date	1110	A	Yes	
idx_loan_transactions_loan_date	BTREE	No	No	loan_id	152000	A	Yes	
date	490200	A	Yes
loan_transactions_pending
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
loan_id	int	Yes	NULL			
office_id	int	Yes	NULL			
client_id	int	Yes	NULL			
payment_type_id	int	Yes	NULL			
transaction_type	enum('repayment', 'repayment_disbursement', 'write_off', 'write_off_recovery', 'disbursement', 'interest_accrual', 'fee_accrual', 'penalty_accrual', 'deposit', 'withdrawal', 'manual_entry', 'pay_charge', 'transfer_fund', 'interest', 'income', 'fee', 'disbursement_fee', 'installment_fee', 'specified_due_date_fee', 'overdue_maturity', 'overdue_installment_fee', 'loan_rescheduling_fee', 'penalty', 'interest_waiver', 'charge_waiver', 'interest_initial')	Yes	repayment			
created_by_id	int	Yes	NULL			
modified_by_id	int	Yes	NULL			
payment_detail_id	int	Yes	NULL			
charge_id	int	Yes	NULL			
loan_repayment_schedule_id	int	Yes	NULL			
debit	decimal(65,4)	Yes	NULL			
credit	decimal(65,4)	Yes	NULL			
balance	decimal(65,4)	Yes	NULL			
amount	decimal(65,4)	Yes	NULL			
reversible	tinyint	No	0			
reversed	tinyint	No	0			
reversal_type	enum('system', 'user', 'none')	No	none			
payment_apply_to	enum('full_payment', 'part_payment', 'reloan_payment')	Yes	full_payment			
status	enum('pending', 'approved', 'declined')	Yes	pending			
approved_by_id	int	Yes	NULL			
approved_date	date	Yes	NULL			
interest	decimal(65,4)	Yes	NULL			
principal	decimal(65,4)	Yes	NULL			
fee	decimal(65,4)	Yes	NULL			
penalty	decimal(65,4)	Yes	NULL			
overpayment	decimal(65,4)	Yes	NULL			
date	date	Yes	NULL			
month	varchar(191)	Yes	NULL			
year	varchar(191)	Yes	NULL			
receipt	text	Yes	NULL			
principal_derived	decimal(65,4)	Yes	NULL			
interest_derived	decimal(65,4)	Yes	NULL			
fees_derived	decimal(65,4)	Yes	NULL			
penalty_derived	decimal(65,4)	Yes	NULL			
overpayment_derived	decimal(65,4)	Yes	NULL			
unrecognized_income_derived	decimal(65,4)	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
balance_bf	decimal(65,4)	Yes	NULL			
cycle_date	date	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
loan_transactions_pp_fp
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
is_recovery	varchar(191)	No	0			
loan_id	int	Yes	NULL			
office_id	int	Yes	NULL			
client_id	int	Yes	NULL			
payment_type_id	int	Yes	NULL			
transaction_type	enum('repayment', 'repayment_disbursement', 'write_off', 'write_off_recovery', 'disbursement', 'interest_accrual', 'fee_accrual', 'penalty_accrual', 'deposit', 'withdrawal', 'manual_entry', 'pay_charge', 'transfer_fund', 'interest', 'income', 'fee', 'disbursement_fee', 'installment_fee', 'specified_due_date_fee', 'overdue_maturity', 'overdue_installment_fee', 'loan_rescheduling_fee', 'penalty', 'interest_waiver', 'charge_waiver', 'interest_initial')	Yes	repayment			
created_by_id	int	Yes	NULL			
modified_by_id	int	Yes	NULL			
payment_detail_id	int	Yes	NULL			
charge_id	int	Yes	NULL			
loan_repayment_schedule_id	int	Yes	NULL			
debit	decimal(65,4)	Yes	NULL			
credit	decimal(65,4)	Yes	NULL			
balance	decimal(65,4)	Yes	NULL			
amount	decimal(65,4)	Yes	NULL			
reversible	tinyint	No	0			
reversed	tinyint	No	0			
reversal_type	enum('system', 'user', 'none')	No	none			
payment_apply_to	enum('full_payment', 'part_payment', 'reloan_payment', 'debt_recovery')	Yes	NULL			
status	enum('pending', 'approved', 'declined')	Yes	pending			
approved_by_id	int	Yes	NULL			
approved_date	date	Yes	NULL			
interest	decimal(65,4)	Yes	NULL			
principal	decimal(65,4)	Yes	NULL			
fee	decimal(65,4)	Yes	NULL			
penalty	decimal(65,4)	Yes	NULL			
overpayment	decimal(65,4)	Yes	NULL			
date	date	Yes	NULL			
month	varchar(191)	Yes	NULL			
year	varchar(191)	Yes	NULL			
receipt	text	Yes	NULL			
principal_derived	decimal(65,4)	Yes	NULL			
interest_derived	decimal(65,4)	Yes	NULL			
fees_derived	decimal(65,4)	Yes	NULL			
penalty_derived	decimal(65,4)	Yes	NULL			
overpayment_derived	decimal(65,4)	Yes	NULL			
unrecognized_income_derived	decimal(65,4)	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
balance_bf	decimal(65,4)	Yes	NULL			
payment_type_id_pd	int	Yes	NULL			
account_number	varchar(191)	Yes	NULL			
cheque_number	varchar(191)	Yes	NULL			
routing_code	varchar(191)	Yes	NULL			
receipt_number	varchar(191)	Yes	NULL			
bank	varchar(191)	Yes	NULL			
notes_pd	text	Yes	NULL			
request_id	int	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	39	A	No	
loan_transactions_requests
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
loan_id	int	Yes	NULL			
office_id	int	Yes	NULL			
client_id	int	Yes	NULL			
payment_type_id	int	Yes	NULL			
transaction_type	enum('repayment', 'repayment_disbursement', 'write_off', 'write_off_recovery', 'disbursement', 'interest_accrual', 'fee_accrual', 'penalty_accrual', 'deposit', 'withdrawal', 'manual_entry', 'pay_charge', 'transfer_fund', 'interest', 'income', 'fee', 'disbursement_fee', 'installment_fee', 'specified_due_date_fee', 'overdue_maturity', 'overdue_installment_fee', 'loan_rescheduling_fee', 'penalty', 'interest_waiver', 'charge_waiver', 'interest_initial')	Yes	repayment			
created_by_id	int	Yes	NULL			
modified_by_id	int	Yes	NULL			
payment_detail_id	int	Yes	NULL			
charge_id	int	Yes	NULL			
loan_repayment_schedule_id	int	Yes	NULL			
debit	decimal(65,4)	Yes	NULL			
credit	decimal(65,4)	Yes	NULL			
balance	decimal(65,4)	Yes	NULL			
amount	decimal(65,4)	Yes	NULL			
reversible	tinyint	No	0			
reversed	tinyint	No	0			
reversal_type	enum('system', 'user', 'none')	No	none			
payment_apply_to	enum('full_payment', 'part_payment', 'reloan_payment')	Yes	full_payment			
status	enum('pending', 'approved', 'declined')	Yes	pending			
approved_by_id	int	Yes	NULL			
approved_date	date	Yes	NULL			
interest	decimal(65,4)	Yes	NULL			
principal	decimal(65,4)	Yes	NULL			
fee	decimal(65,4)	Yes	NULL			
penalty	decimal(65,4)	Yes	NULL			
overpayment	decimal(65,4)	Yes	NULL			
date	date	Yes	NULL			
month	varchar(191)	Yes	NULL			
year	varchar(191)	Yes	NULL			
receipt	text	Yes	NULL			
principal_derived	decimal(65,4)	Yes	NULL			
interest_derived	decimal(65,4)	Yes	NULL			
fees_derived	decimal(65,4)	Yes	NULL			
penalty_derived	decimal(65,4)	Yes	NULL			
overpayment_derived	decimal(65,4)	Yes	NULL			
unrecognized_income_derived	decimal(65,4)	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
balance_bf	decimal(65,4)	Yes	NULL			
cycle_date	date	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	9	A	No	
loan_transaction_repayment_schedule_mappings
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
loan_repayment_schedule_id	int	Yes	NULL			
loan_transaction_id	int	Yes	NULL			
interest	decimal(65,4)	Yes	NULL			
principal	decimal(65,4)	Yes	NULL			
fee	decimal(65,4)	Yes	NULL			
penalty	decimal(65,4)	Yes	NULL			
overpayment	decimal(65,4)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
loan_transfer_requests
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
new_consultant_id	int	No				
done_by	int	No				
loan_id	int	No				
old_consultant_id	int	No				
reason	text	No				
created_at	datetime	No	CURRENT_TIMESTAMP			
office_id	int	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
migrations
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
migration	varchar(191)	No				
batch	int	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	181	A	No	
new_payroll
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
user_id	int	Yes	NULL			
basic_pay	decimal(10,2)	Yes	NULL			
charges	decimal(10,2)	Yes	NULL			
allowances	decimal(10,2)	Yes	NULL			
salary_deductions	decimal(10,2)	Yes	NULL			
created_at	datetime	Yes	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	208	A	No	
non_essential_expense_types
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
gl_account_asset_id	int	Yes	NULL			
gl_account_expense_id	int	Yes	NULL			
gl_account_id	int	Yes	NULL			
notes	text	Yes	NULL			
distribution_cost	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2	A	No	
idx_name	BTREE	No	No	name	2	A	Yes	
notes
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
reference_id	int	Yes	NULL			
type	enum('client', 'loan', 'group', 'savings', 'identification', 'shares', 'repayment')	Yes	NULL			
created_by_id	int	Yes	NULL			
modified_by_id	int	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	149	A	No	
notifix
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
user_id	bigint	No				
office_id	bigint	Yes	NULL			
district_id	bigint	Yes	NULL			
province_id	bigint	Yes	NULL			
to_id	bigint	Yes	NULL			
unread	tinyint(1)	No	1			
positions	json	Yes	NULL			
note	json	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1129	A	No	
notifix_user_id_unique	BTREE	Yes	No	user_id	1129	A	No	
offices
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
parent_id	int	Yes	NULL			
external_id	varchar(191)	Yes	NULL			
opening_date	date	Yes	NULL			
branch_capacity	int	Yes	NULL			
address	text	Yes	NULL			
phone	text	Yes	NULL			
email	text	Yes	NULL			
notes	text	Yes	NULL			
manager_id	int	Yes	NULL			
active	tinyint	Yes	1			
default_office	tinyint	Yes	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
province_id	int	Yes	NULL			
district_id	int	Yes	NULL			
district_regional_id	int	Yes	NULL			
withinhere_branch_id	varchar(191)	Yes	NULL			
withinhere_wallet_id	varchar(191)	Yes	NULL			
pscan	tinyint	No	0			
cscan	tinyint	No	0			
workstations	varchar(191)	Yes	NULL			
recruited	varchar(191)	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	59	A	No	
office_blocking_histories
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
office_id	int	No		offices -> id		
blocked_count	int	No	1			
reason	text	Yes	NULL			
last_blocked_at	timestamp	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	18	A	No	
office_blocking_histories_office_id_unique	BTREE	Yes	No	office_id	18	A	No	
office_debts
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
office_id	int	Yes	NULL	offices -> id		
deposit_type_id	bigint	Yes	NULL			
debt_status	varchar(30)	No	owing			
debt_month	tinyint	Yes	NULL			
debt_year	smallint	Yes	NULL			
is_setup_debt	enum('true', 'false')	No	false			
original_amount	bigint	No	0			
outstanding_amount	bigint	No	0			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	310	A	No	
od_unique_period	BTREE	Yes	No	office_id	46	A	Yes	
deposit_type_id	131	A	Yes
debt_month	310	A	Yes
debt_year	310	A	Yes
office_debts_office_id_index	BTREE	No	No	office_id	46	A	Yes	
office_debts_deposit_type_id_index	BTREE	No	No	deposit_type_id	3	A	Yes	
office_debts_debt_year_debt_month_index	BTREE	No	No	debt_year	1	A	Yes	
debt_month	5	A	Yes
office_loans
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
office_id	int	No		offices -> id		
staff_id	int	No		users -> id		
principal	decimal(15,2)	No	0.00			
interest	decimal(15,2)	No	0.00			
status	enum('pending', 'approved', 'disbursed', 'partially_paid', 'fully_paid', 'declined')	No	pending			
approved_at	timestamp	Yes	NULL			
disbursed_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	7	A	No	
office_loans_office_id_index	BTREE	No	No	office_id	7	A	No	
office_loans_staff_id_index	BTREE	No	No	staff_id	7	A	No	
office_loans_status_index	BTREE	No	No	status	1	A	No	
office_loan_transactions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
loan_id	int	No				
office_id	int	No				
debit	decimal(15,2)	No	0.00			
credit	decimal(15,2)	No	0.00			
approved_by	int	Yes	NULL			
status	enum('pending', 'approved', 'declined')	No	pending			
transaction_type	enum('disbursement', 'interest_initial', 'penalty', 'topup', 'waiver')	No	disbursement			
notes	text	Yes	NULL			
approved_at	timestamp	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	14	A	No	
office_transactions
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
from_office_id	int	Yes	NULL			
to_office_id	int	Yes	NULL			
currency_id	int	Yes	NULL			
amount	decimal(65,8)	Yes	NULL			
date	date	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

other_income
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
office_id	int	Yes	NULL			
created_by_id	int	Yes	NULL			
other_income_type_id	int	Yes	NULL			
name	varchar(191)	Yes	NULL			
amount	decimal(65,2)	No	0.00			
date	date	Yes	NULL			
year	varchar(191)	Yes	NULL			
month	varchar(191)	Yes	NULL			
notes	text	Yes	NULL			
files	text	Yes	NULL			
status	enum('pending', 'approved', 'declined')	No	approved			
approved_date	date	Yes	NULL			
approved_by_id	int	Yes	NULL			
declined_date	date	Yes	NULL			
declined_by_id	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

other_income_types
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
name	varchar(191)	Yes	NULL			
gl_account_asset_id	int	Yes	NULL			
gl_account_income_id	int	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

parents
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
name	varchar(255)	Yes	NULL			
parent	tinyint	Yes	0			
type	varchar(2)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

payment_details
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
payment_type_id	int	Yes	NULL			
account_number	varchar(191)	Yes	NULL			
cheque_number	varchar(191)	Yes	NULL			
routing_code	varchar(191)	Yes	NULL			
receipt_number	varchar(191)	Yes	NULL			
bank	varchar(191)	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	318427	A	No	
payment_types
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
name	varchar(191)	Yes	NULL			
notes	text	Yes	NULL			
is_cash	tinyint	No	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

payment_type_details
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
type	enum('loan', 'savings', 'share', 'client', 'journal')	Yes	NULL			
reference_id	int	No				
account_number	varchar(191)	Yes	NULL			
cheque_number	varchar(191)	Yes	NULL			
routing_code	varchar(191)	Yes	NULL			
receipt_number	varchar(191)	Yes	NULL			
bank	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

payroll
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
payroll_template_id	int	Yes	NULL			
gl_account_expense_id	int	Yes	NULL			
gl_account_asset_id	int	Yes	NULL			
user_id	int	Yes	NULL			
office_id	int	Yes	NULL			
employee_name	varchar(191)	Yes	NULL			
business_name	varchar(191)	Yes	NULL			
payment_method	varchar(191)	Yes	NULL			
payment_type_id	varchar(191)	Yes	NULL			
bank_name	varchar(191)	Yes	NULL			
account_number	varchar(191)	Yes	NULL			
description	varchar(191)	Yes	NULL			
comments	text	Yes	NULL			
paid_amount	decimal(10,2)	No	0.00			
date	date	Yes	NULL			
year	varchar(191)	Yes	NULL			
month	varchar(191)	Yes	NULL			
recurring	tinyint	No	0			
recur_frequency	varchar(191)	No	31			
recur_start_date	date	Yes	NULL			
recur_end_date	date	Yes	NULL			
recur_next_date	date	Yes	NULL			
recur_type	enum('days', 'weeks', 'months', 'years')	No	months			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
payroll_date	date	Yes	NULL			
status	varchar(191)	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	585	A	No	
payroll_applicant
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
client_name	varchar(191)	Yes	NULL			
nrc	varchar(191)	Yes	NULL			
dob	date	Yes	NULL			
gender	enum('male', 'female', 'other')	Yes	NULL			
email	varchar(191)	Yes	NULL			
phone	varchar(191)	Yes	NULL			
home_address	varchar(191)	Yes	NULL			
employer_name	varchar(191)	Yes	NULL			
employee_id	varchar(191)	Yes	NULL			
job_title	varchar(191)	Yes	NULL			
length_of_service	varchar(191)	Yes	NULL			
monthly_service	varchar(191)	Yes	NULL			
work_address	varchar(191)	Yes	NULL			
work_phone	varchar(191)	Yes	NULL			
amount	decimal(65,4)	Yes	NULL			
loan_term	varchar(191)	Yes	NULL			
purpose_of_loan	text	Yes	NULL			
deduction_amount	decimal(65,4)	Yes	NULL			
admin_fees	decimal(65,4)	Yes	NULL			
net_amount	decimal(65,4)	Yes	NULL			
repayment_date	date	Yes	NULL			
bank_name	varchar(191)	Yes	NULL			
bank_account	varchar(191)	Yes	NULL			
bank_short_code	varchar(191)	Yes	NULL			
branch_name	varchar(191)	Yes	NULL			
branch_code	varchar(191)	Yes	NULL			
nrc_file	varchar(191)	Yes	NULL			
payslip_file	varchar(191)	Yes	NULL			
bank_statement	varchar(191)	Yes	NULL			
status	enum('pending', 'approved', 'declined')	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	122	A	No	
payroll_loan_old_schedule
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
disbursement_amount	decimal(12,2)	No			Loan disbursement amount in Kwacha	
repayment_60_months	decimal(12,2)	Yes	NULL			
repayment_59_months	decimal(12,2)	Yes	NULL			
repayment_58_months	decimal(12,2)	Yes	NULL			
repayment_57_months	decimal(12,2)	Yes	NULL			
repayment_56_months	decimal(12,2)	Yes	NULL			
repayment_55_months	decimal(12,2)	Yes	NULL			
repayment_54_months	decimal(12,2)	Yes	NULL			
repayment_53_months	decimal(12,2)	Yes	NULL			
repayment_52_months	decimal(12,2)	Yes	NULL			
repayment_51_months	decimal(12,2)	Yes	NULL			
repayment_50_months	decimal(12,2)	Yes	NULL			
repayment_49_months	decimal(12,2)	Yes	NULL			
repayment_48_months	decimal(12,2)	Yes	NULL			
repayment_47_months	decimal(12,2)	Yes	NULL			
repayment_46_months	decimal(12,2)	Yes	NULL			
repayment_45_months	decimal(12,2)	Yes	NULL			
repayment_44_months	decimal(12,2)	Yes	NULL			
repayment_43_months	decimal(12,2)	Yes	NULL			
repayment_42_months	decimal(12,2)	Yes	NULL			
repayment_41_months	decimal(12,2)	Yes	NULL			
repayment_40_months	decimal(12,2)	Yes	NULL			
repayment_39_months	decimal(12,2)	Yes	NULL			
repayment_38_months	decimal(12,2)	Yes	NULL			
repayment_37_months	decimal(12,2)	Yes	NULL			
repayment_36_months	decimal(12,2)	Yes	NULL			
repayment_35_months	decimal(12,2)	Yes	NULL			
repayment_34_months	decimal(12,2)	Yes	NULL			
repayment_33_months	decimal(12,2)	Yes	NULL			
repayment_32_months	decimal(12,2)	Yes	NULL			
repayment_31_months	decimal(12,2)	Yes	NULL			
repayment_30_months	decimal(12,2)	Yes	NULL			
repayment_29_months	decimal(12,2)	Yes	NULL			
repayment_28_months	decimal(12,2)	Yes	NULL			
repayment_27_months	decimal(12,2)	Yes	NULL			
repayment_26_months	decimal(12,2)	Yes	NULL			
repayment_25_months	decimal(12,2)	Yes	NULL			
repayment_23_months	decimal(12,2)	Yes	NULL			
repayment_22_months	decimal(12,2)	Yes	NULL			
repayment_21_months	decimal(12,2)	Yes	NULL			
repayment_20_months	decimal(12,2)	Yes	NULL			
repayment_19_months	decimal(12,2)	Yes	NULL			
repayment_17_months	decimal(12,2)	Yes	NULL			
repayment_16_months	decimal(12,2)	Yes	NULL			
repayment_15_months	decimal(12,2)	Yes	NULL			
repayment_14_months	decimal(12,2)	Yes	NULL			
repayment_13_months	decimal(12,2)	Yes	NULL			
repayment_11_months	decimal(12,2)	Yes	NULL			
repayment_10_months	decimal(12,2)	Yes	NULL			
repayment_8_months	decimal(12,2)	Yes	NULL			
repayment_7_months	decimal(12,2)	Yes	NULL			
repayment_6_months	decimal(12,2)	Yes	NULL			
repayment_5_months	decimal(12,2)	Yes	NULL			
repayment_4_months	decimal(12,2)	Yes	NULL			
repayment_3_months	decimal(12,2)	Yes	NULL			
repayment_2_months	decimal(12,2)	Yes	NULL			
repayment_1_months	decimal(12,2)	Yes	NULL			
repayment_9_months	decimal(12,2)	Yes	NULL		Monthly repayment for 9-month term	
repayment_12_months	decimal(12,2)	Yes	NULL		Monthly repayment for 12-month term	
repayment_18_months	decimal(12,2)	Yes	NULL		Monthly repayment for 18-month term	
repayment_24_months	decimal(12,2)	Yes	NULL		Monthly repayment for 24-month term	
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	9	A	No	
payroll_loan_schedules
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
loan_amount	int	No				
months_60	int	Yes	NULL			
months_59	int	Yes	NULL			
months_58	int	Yes	NULL			
months_57	int	Yes	NULL			
months_56	int	Yes	NULL			
months_55	int	Yes	NULL			
months_54	int	Yes	NULL			
months_53	int	Yes	NULL			
months_52	int	Yes	NULL			
months_51	int	Yes	NULL			
months_50	int	Yes	NULL			
months_49	int	Yes	NULL			
months_48	int	Yes	NULL			
months_47	int	Yes	NULL			
months_46	int	Yes	NULL			
months_45	int	Yes	NULL			
months_44	int	Yes	NULL			
months_43	int	Yes	NULL			
months_42	int	Yes	NULL			
months_41	int	Yes	NULL			
months_40	int	Yes	NULL			
months_39	int	Yes	NULL			
months_38	int	Yes	NULL			
months_37	int	Yes	NULL			
months_36	int	Yes	NULL			
months_35	int	Yes	NULL			
months_34	int	Yes	NULL			
months_33	int	Yes	NULL			
months_32	int	Yes	NULL			
months_31	int	Yes	NULL			
months_30	int	Yes	NULL			
months_29	int	Yes	NULL			
months_28	int	Yes	NULL			
months_27	int	Yes	NULL			
months_26	int	Yes	NULL			
months_25	int	Yes	NULL			
months_23	int	Yes	NULL			
months_22	int	Yes	NULL			
months_21	int	Yes	NULL			
months_20	int	Yes	NULL			
months_19	int	Yes	NULL			
months_17	int	Yes	NULL			
months_16	int	Yes	NULL			
months_15	int	Yes	NULL			
months_14	int	Yes	NULL			
months_13	int	Yes	NULL			
months_11	int	Yes	NULL			
months_10	int	Yes	NULL			
months_8	int	Yes	NULL			
months_7	int	Yes	NULL			
months_5	int	Yes	NULL			
months_4	int	Yes	NULL			
months_2	int	Yes	NULL			
months_1	int	Yes	NULL			
months_3	int	No				
months_6	int	No				
months_9	int	No				
months_12	int	No				
months_18	int	No				
months_24	int	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
payroll_meta
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
payroll_id	int	No				
user_id	int	No				
payroll_template_meta_id	int	Yes	NULL			
value	decimal(65,2)	Yes	NULL			
is_tax	tinyint	Yes	0			
is_percentage	tinyint	Yes	0			
position	enum('top_left', 'top_right', 'bottom_left', 'bottom_right')	Yes	bottom_left			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	4215	A	No	
payroll_templates
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
name	varchar(191)	Yes	NULL			
notes	text	Yes	NULL			
picture	varchar(191)	Yes	NULL			
active	tinyint	Yes	1			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

payroll_template_meta
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
payroll_template_id	int	No				
name	varchar(191)	Yes	NULL			
position	enum('top_left', 'top_right', 'bottom_left', 'bottom_right', 'none')	Yes	bottom_left			
type	enum('addition', 'deduction')	Yes	addition			
is_default	tinyint	No	0			
is_tax	tinyint	No	0			
is_percentage	tinyint	No	0			
tax_on	enum('net', 'gross')	Yes	net			
default_value	decimal(65,2)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	6	A	No	
permissions
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
parent_id	int	Yes	0			
name	varchar(191)	No				
slug	varchar(191)	Yes	NULL			
description	text	Yes	NULL			
No index defined!

persistences
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
user_id	int	No				
code	varchar(191)	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

platform_settings
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
key	varchar(191)	No				
value	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	93	A	No	
platform_settings_key_unique	BTREE	Yes	No	key	93	A	No	
policies
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
category_id	bigint	Yes	NULL	policy_categories -> id		
access_level	enum('all', 'managerial')	No	all			
created_by	int	Yes	NULL			
title	varchar(255)	No				
description	text	Yes	NULL			
file_path	varchar(255)	Yes	NULL			
file_url	varchar(255)	Yes	NULL			
file_name	varchar(255)	Yes	NULL			
file_size	int	Yes	NULL			
file_type	varchar(100)	Yes	NULL			
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
updated_at	timestamp	Yes	CURRENT_TIMESTAMP			
policy_type	enum('all_staff', 'management', 'hr', 'finance', 'it', 'operations')	No	all_staff			
document_type	varchar(50)	Yes	company_policies			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	9	A	No	
policies_category_id_foreign	BTREE	No	No	category_id	3	A	Yes	
policy_categories
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
name	varchar(191)	No				
slug	varchar(191)	No				
description	text	Yes	NULL			
sort_order	int	No	0			
is_active	tinyint(1)	No	1			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	3	A	No	
policy_categories_slug_unique	BTREE	Yes	No	slug	3	A	No	
policy_of_the_day
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
title	varchar(191)	No				
content	text	No				
full_content	text	Yes	NULL			
policy_id	bigint	Yes	NULL			
created_by	bigint	No				
scheduled_date	date	Yes	NULL			
is_active	tinyint(1)	No	1			
is_random	tinyint(1)	No	0			
display_order	int	No	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	10	A	No	
policy_quizzes
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
title	varchar(255)	No				
description	text	Yes	NULL			
passing_threshold	int	No	80			
time_limit_minutes	int	No	10			
max_questions	int	No	50			
open_date	datetime	No				
close_date	datetime	No				
active	tinyint(1)	No	1			
created_by	bigint	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	4	A	No	
policy_quiz_attempts
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
policy_quiz_id	bigint	No				
user_id	bigint	No				
started_at	datetime	No				
completed_at	datetime	Yes	NULL			
score_percentage	decimal(5,2)	Yes	NULL			
passed	tinyint(1)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	173	A	No	
policy_quiz_attempts_policy_quiz_id_user_id_unique	BTREE	Yes	No	policy_quiz_id	3	A	No	
user_id	173	A	No
policy_quiz_questions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
policy_quiz_id	bigint	No				
question_text	text	No				
option_a	varchar(191)	No				
option_b	varchar(191)	No				
option_c	varchar(191)	No				
option_d	varchar(191)	No				
correct_answer	enum('A', 'B', 'C', 'D')	No				
policy_link	varchar(191)	Yes	NULL			
explanation	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	19	A	No	
policy_quiz_user_answers
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
attempt_id	bigint	No				
question_id	bigint	No				
selected_answer	enum('A', 'B', 'C', 'D')	No				
is_correct	tinyint(1)	No				
answered_at	timestamp	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	673	A	No	
policy_quiz_user_answers_attempt_id_question_id_unique	BTREE	Yes	No	attempt_id	91	A	No	
question_id	673	A	No
policy_violations
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
user_id	bigint	No				
policy_id	bigint	No				
reported_by	bigint	No				
description	text	No				
status	enum('pending', 'investigating', 'resolved', 'escalated')	No	pending			
evidence	json	Yes	NULL			
resolved_at	timestamp	Yes	NULL			
resolution_notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
position_remuneration_component_values
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
remuneration_config_id	bigint	No				
remuneration_component_id	bigint	No				
amount	decimal(12,2)	Yes	NULL			
percentage	decimal(7,4)	Yes	NULL			
calculation_base	varchar(50)	Yes	NULL			
is_included_in_gross	tinyint(1)	No	0			
is_included_in_company_cost	tinyint(1)	No	0			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	726	A	No	
prcv_cfg_comp_uq	BTREE	Yes	No	remuneration_config_id	66	A	No	
remuneration_component_id	726	A	No
position_remuneration_configs
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
job_position_id	bigint	No				
remuneration_tier_id	bigint	No				
gross_pay	decimal(12,2)	No				
target_net_pay	decimal(12,2)	Yes	NULL			
currency	char(3)	No	ZMW			
threshold_type	varchar(50)	Yes	NULL			
threshold_amount	decimal(14,2)	Yes	NULL			
threshold_operator	varchar(10)	Yes	NULL			
threshold_upper_amount	decimal(14,2)	Yes	NULL			
threshold_period	varchar(20)	Yes	NULL			
min_branches	int	Yes	NULL			
max_branches	int	Yes	NULL			
effective_from	date	No				
effective_to	date	Yes	NULL			
status	varchar(20)	No	draft			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	66	A	No	
prc_pos_tier_date_uq	BTREE	Yes	No	job_position_id	15	A	No	
remuneration_tier_id	66	A	No
effective_from	66	A	No
province
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	10	A	No	
provincial_transactions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
title	varchar(191)	No				
description	text	Yes	NULL			
amount	decimal(15,2)	No				
type	enum('income', 'expense')	No				
province_id	bigint	No				
office_id	bigint	Yes	NULL			
transaction_date	date	No				
reference_number	varchar(191)	Yes	NULL			
created_by	bigint	Yes	NULL			
payment_method	varchar(191)	Yes	NULL			
contribution	varchar(191)	Yes	NULL			
file_path	varchar(191)	Yes	NULL			
recorded_at	timestamp	Yes	NULL			
status	enum('pending', 'approved')	No	pending			
approved_by	bigint	Yes	NULL			
approved_at	timestamp	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	27	A	No	
quizzes
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
course_topic_id	bigint	No		course_topics -> id		
title	varchar(191)	No				
description	text	Yes	NULL			
passing_score	int	No	70			
time_limit	int	Yes	NULL		Time limit in minutes	
is_active	tinyint(1)	No	1			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
quizzes_course_topic_id_foreign	BTREE	No	No	course_topic_id	0	A	No	
quiz_attempts
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
quiz_id	bigint	No				
user_id	bigint	No				
score	int	No	0			
total_points	int	No	0			
percentage	int	No	0			
passed	tinyint(1)	No	0			
started_at	timestamp	Yes	NULL			
completed_at	timestamp	Yes	NULL			
answers	json	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2	A	No	
quiz_attempts_quiz_id_index	BTREE	No	No	quiz_id	1	A	No	
quiz_attempts_user_id_index	BTREE	No	No	user_id	1	A	No	
quiz_options
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
quiz_question_id	bigint	No		quiz_questions -> id		
option_text	text	No				
is_correct	tinyint(1)	No	0			
sort_order	int	No	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
quiz_options_quiz_question_id_foreign	BTREE	No	No	quiz_question_id	0	A	No	
quiz_questions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
quiz_id	bigint	No		quizzes -> id		
question	text	No				
question_type	varchar(191)	No	multiple_choice		multiple_choice, true_false, short_answer	
sort_order	int	No	0			
points	int	No	1			
explanation	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
quiz_questions_quiz_id_foreign	BTREE	No	No	quiz_id	0	A	No	
recoveries_dept_excalated_shares
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
recovery_case_id	bigint	No				
recovery_payment_id	bigint	Yes	NULL			
office_id	bigint	Yes	NULL			
dept_share_amount	decimal(12,2)	No				
notes	varchar(191)	Yes	NULL			
created_by	bigint	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
recoveries_tags
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
details	varchar(191)	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	5	A	No	
recovery_activities
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
recovery_case_id	bigint	No				
performed_by	bigint	No				
activity_type	enum('status_change', 'payment_received', 'field_visit', 'phone_call', 'sms_sent', 'whatsapp_sent', 'legal_filing', 'court_hearing', 'asset_seizure', 'skip_trace_attempt', 'guarantor_contact', 'payment_plan_negotiated', 'case_handover', 'note_added', 'document_uploaded', 'cost_incurred')	No				
description	varchar(191)	No				
status_before	varchar(191)	Yes	NULL			
status_after	varchar(191)	Yes	NULL			
amount_collected	decimal(15,2)	Yes	NULL			
cost_incurred	decimal(15,2)	Yes	NULL			
outcome	varchar(191)	Yes	NULL			
metadata	json	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1116	A	No	
recovery_activities_recovery_case_id_created_at_index	BTREE	No	No	recovery_case_id	1116	A	No	
created_at	1116	A	Yes
recovery_activities_performed_by_index	BTREE	No	No	performed_by	33	A	No	
recovery_cases
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
case_number	varchar(191)	No				
client_id	bigint	No				
origin_branch_id	bigint	No				
supporting_branch_id	bigint	Yes	NULL			
assigned_specialist_id	bigint	Yes	NULL			
loan_id	bigint	No				
category	enum('cross_branch', 'escalated', 'dormant', 'legal', 'skip_trace')	No				
status	enum('runaway_pending_confirmation', 'runaway_active_recovery', 'recovered_runaway', 'escalated_handover', 'escalated_in_review', 'escalated_active_recovery', 'recovered_post_escalation', 'dormant_for_revival', 'recovery_revived', 'pre_litigation_review', 'legal_filed', 'legal_active', 'legal_judgment_won', 'recovered_legal', 'skip_trace_required', 'skip_trace_digital_review', 'skip_trace_contact_reengagement', 'skip_trace_field_intel_active', 'located_for_recovery', 'closed', 'written_off')	No	escalated_handover			
loan_outstanding_amount	decimal(15,2)	No				
amount_recovered	decimal(15,2)	No	0.00			
recovery_costs	decimal(15,2)	No	0.00			
settlement_amount	decimal(15,2)	Yes	NULL			
escalated_by_user_id	bigint	Yes	NULL			
escalation_date	date	Yes	NULL			
days_past_due_at_escalation	int	Yes	NULL			
lc_contact_attempts	int	Yes	NULL			
recoveries_dept_attribution_pct	decimal(5,2)	No	100.00			
origin_branch_attribution_pct	decimal(5,2)	No	0.00			
supporting_branch_attribution_pct	decimal(5,2)	No	0.00			
legal_reference_number	varchar(191)	Yes	NULL			
lawyer_firm	varchar(191)	Yes	NULL			
legal_filed_date	date	Yes	NULL			
court_date	date	Yes	NULL			
legal_costs_incurred	decimal(15,2)	No	0.00			
enforcement_type	enum('garnishee_order', 'warrant_of_distress', 'writ_of_execution', 'charging_order', 'judgment_debtor_summons', 'none')	No	none			
skip_trace_tracking_code	varchar(191)	Yes	NULL			
client_located	tinyint(1)	No	0			
located_date	date	Yes	NULL			
skip_trace_costs	decimal(15,2)	No	0.00			
last_payment_date	date	Yes	NULL			
dormant_days	int	Yes	NULL			
revival_method	varchar(191)	Yes	NULL			
client_last_known_location	varchar(191)	Yes	NULL			
client_new_location	varchar(191)	Yes	NULL			
joint_field_visit_done	tinyint(1)	No	0			
notes	text	Yes	NULL			
target_resolution_date	date	Yes	NULL			
resolved_date	date	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
approved_date	date	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1111	A	No	
recovery_cases_case_number_unique	BTREE	Yes	No	case_number	1111	A	No	
recovery_cases_category_status_index	BTREE	No	No	category	5	A	No	
status	10	A	No
recovery_cases_assigned_specialist_id_status_index	BTREE	No	No	assigned_specialist_id	32	A	Yes	
status	39	A	No
recovery_cases_origin_branch_id_index	BTREE	No	No	origin_branch_id	30	A	No	
recovery_cases_case_number_index	BTREE	No	No	case_number	1111	A	No	
recovery_costs
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
name	varchar(191)	No				
description	text	Yes	NULL			
amount	decimal(15,2)	No				
case_id	bigint	Yes	NULL	recovery_cases -> id		
office_id	int	Yes	NULL	offices -> id		
recorded_by	int	Yes	NULL	users -> id		
cost_date	date	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
recovery_costs_case_id_foreign	BTREE	No	No	case_id	0	A	Yes	
recovery_costs_office_id_foreign	BTREE	No	No	office_id	0	A	Yes	
recovery_costs_recorded_by_foreign	BTREE	No	No	recorded_by	0	A	Yes	
recovery_documents
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
recovery_case_id	bigint	No				
uploaded_by	bigint	No				
document_type	varchar(191)	No				
title	varchar(191)	No				
file_path	varchar(191)	No				
file_name	varchar(191)	No				
mime_type	varchar(191)	No				
file_size	bigint	No				
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
recovery_funds
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
amount	decimal(15,2)	No	0.00			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
recovery_guarantors
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
recovery_case_id	bigint	No				
name	varchar(191)	No				
phone	varchar(191)	Yes	NULL			
alt_phone	varchar(191)	Yes	NULL			
id_number	varchar(191)	Yes	NULL			
address	text	Yes	NULL			
employer	varchar(191)	Yes	NULL			
relationship_to_client	varchar(191)	Yes	NULL			
contact_attempts	int	No	0			
last_contacted_at	timestamp	Yes	NULL			
last_outcome	varchar(191)	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
recovery_nudges
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
recovery_case_id	bigint	No				
sent_by	bigint	No				
channel	enum('sms', 'whatsapp')	No				
phone_number	varchar(191)	No				
message	text	No				
status	enum('queued', 'sent', 'delivered', 'failed')	No	queued			
gateway_response	json	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
recovery_nudges_recovery_case_id_created_at_index	BTREE	No	No	recovery_case_id	0	A	No	
created_at	0	A	Yes
recovery_nudges_sent_by_index	BTREE	No	No	sent_by	0	A	No	
recovery_payments
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
recovery_case_id	bigint	No				
transaction_id	bigint	Yes	NULL			
recorded_by	bigint	No				
receipt_number	varchar(191)	No				
amount	decimal(15,2)	No				
payment_method	enum('cash', 'mobile_money', 'bank_transfer', 'cheque', 'payroll_deduction')	No				
payment_date	date	No				
reference	varchar(191)	Yes	NULL			
payment_reference	varchar(191)	Yes	NULL			
bank_name	varchar(191)	Yes	NULL			
outstanding_before	decimal(15,2)	Yes	NULL			
outstanding_after	decimal(15,2)	Yes	NULL			
recoveries_dept_amount	decimal(15,2)	No	0.00			
origin_branch_amount	decimal(15,2)	No	0.00			
supporting_branch_amount	decimal(15,2)	No	0.00			
is_settlement	tinyint(1)	No	0			
is_full_payment	tinyint(1)	No	0			
notes	text	Yes	NULL			
status	tinyint	No	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	118	A	No	
recovery_payments_receipt_number_unique	BTREE	Yes	No	receipt_number	118	A	No	
recovery_payments_recovery_case_id_payment_date_index	BTREE	No	No	recovery_case_id	84	A	No	
payment_date	110	A	No
recovery_specialist_targets
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
specialist_id	bigint	No				
category	enum('cross_branch', 'escalated', 'dormant', 'legal', 'skip_trace')	No				
year	year	No				
month	tinyint	No				
target_amount	decimal(15,2)	No				
target_cases	int	No	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
rst_specialist_category_year_month_unique	BTREE	Yes	No	specialist_id	0	A	No	
category	0	A	No
year	0	A	No
month	0	A	No
reminders
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
user_id	int	No				
code	varchar(191)	No				
completed	tinyint(1)	No	0			
completed_at	timestamp	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

remuneration_assessments
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
employee_remuneration_assignment_id	bigint	No				
assessment_period	date	No				
actual_performance	json	Yes	NULL			
achievement_percentage	decimal(7,2)	Yes	NULL			
assessment_status	varchar(30)	No	pending			
corrective_plan	text	Yes	NULL			
reviewed_by	int	Yes	NULL			
reviewed_at	timestamp	Yes	NULL			
decision	varchar(30)	Yes	NULL			
decision_notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
remuneration_bonus_rules
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
job_position_id	bigint	Yes	NULL			
bonus_name	varchar(150)	No				
bonus_type	varchar(30)	No				
amount	decimal(12,2)	Yes	NULL			
percentage	decimal(7,4)	Yes	NULL			
performance_metric	varchar(100)	Yes	NULL			
minimum_target	decimal(12,2)	Yes	NULL			
period	varchar(20)	No				
effective_from	date	No				
effective_to	date	Yes	NULL			
status	varchar(20)	No	draft			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	3	A	No	
remuneration_components
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
name	varchar(100)	No				
code	varchar(50)	No				
component_type	varchar(30)	No				
payment_method	varchar(30)	Yes	NULL			
tax_treatment	varchar(30)	Yes	NULL			
paid_by	varchar(20)	No				
calculation_type	varchar(20)	No				
description	text	Yes	NULL			
is_active	tinyint(1)	No	1			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	12	A	No	
remuneration_components_code_unique	BTREE	Yes	No	code	12	A	No	
remuneration_criteria
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
remuneration_config_id	bigint	No				
criterion_name	varchar(150)	No				
criterion_code	varchar(60)	No				
measurement_type	varchar(40)	No				
operator	varchar(15)	No				
target_value	decimal(14,2)	Yes	NULL			
measurement_period	varchar(20)	No				
is_mandatory	tinyint(1)	No	1			
verification_source	varchar(100)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	66	A	No	
rc_cfg_code_uq	BTREE	Yes	No	remuneration_config_id	66	A	No	
criterion_code	66	A	No
remuneration_housing_bands
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
job_position_id	bigint	No				
remuneration_tier_id	bigint	No				
monthly_limit	decimal(12,2)	No				
effective_from	date	No				
effective_to	date	Yes	NULL			
status	varchar(20)	No	active			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	63	A	No	
remuneration_tiers
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
tier_number	tinyint	No				
name	varchar(100)	No				
description	text	Yes	NULL			
is_active	tinyint(1)	No	1			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	6	A	No	
report_scheduler
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
created_by_id	int	Yes	NULL			
description	text	Yes	NULL			
report_start_date	date	Yes	NULL			
report_start_time	varchar(191)	Yes	NULL			
recurrence_type	enum('none', 'schedule')	Yes	NULL			
recur_frequency	enum('daily', 'monthly', 'weekly', 'yearly')	Yes	NULL			
recur_interval	varchar(191)	Yes	NULL			
email_recipients	text	Yes	NULL			
email_subject	varchar(191)	Yes	NULL			
email_message	text	Yes	NULL			
email_attachment_file_format	enum('pdf', 'csv', 'xls')	Yes	NULL			
report_category	enum('client_report', 'loan_report', 'financial_report', 'group_report', 'savings_report', 'organisation_report')	Yes	NULL			
report_name	enum('disbursed_loans_report', 'loan_portfolio_report', 'expected_repayments_report', 'repayments_report', 'collection_report', 'arrears_report', 'balance_sheet', 'trial_balance', 'profit_and_loss', 'cash_flow', 'provisioning', 'historical_income_statement', 'journals_report', 'accrued_interest', 'client_numbers_report', 'clients_overview', 'top_clients_report', 'loan_sizes_report', 'group_report', 'group_breakdown', 'savings_account_report', 'savings_balance_report', 'savings_transaction_report', 'fixed_term_maturity_report', 'products_summary', 'individual_indicator_report', 'loan_officer_performance_report', 'audit_report', 'group_indicator_report')	Yes	NULL			
start_date_type	enum('date_picker', 'today', 'yesterday', 'tomorrow')	Yes	NULL			
start_date	date	Yes	NULL			
end_date_type	enum('date_picker', 'today', 'yesterday', 'tomorrow')	Yes	NULL			
end_date	date	Yes	NULL			
office_id	varchar(191)	Yes	NULL			
loan_officer_id	varchar(191)	Yes	NULL			
gl_account_id	varchar(191)	Yes	NULL			
manual_entries	varchar(191)	Yes	NULL			
loan_status	varchar(191)	Yes	NULL			
loan_product_id	varchar(191)	Yes	NULL			
last_run_date	date	Yes	NULL			
next_run_date	date	Yes	NULL			
last_run_time	date	Yes	NULL			
next_run_time	date	Yes	NULL			
number_of_runs	int	No	0			
active	tinyint	No	1			
status	enum('pending', 'approved', 'declined')	No	pending			
approved_by_id	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

report_scheduler_run_history
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
report_schedule_id	int	Yes	NULL			
report_start_date	date	Yes	NULL			
report_start_time	varchar(191)	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

resignation_letters
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
user_id	bigint	No				
resignation_date	date	No				
reason	text	No				
letter_path	varchar(191)	Yes	NULL			
status	enum('pending', 'manager_approved', 'admin_approved', 'declined')	No	pending			
manager_id	bigint	Yes	NULL			
manager_approved_at	timestamp	Yes	NULL			
admin_id	bigint	Yes	NULL			
admin_approved_at	timestamp	Yes	NULL			
manager_comment	text	Yes	NULL			
admin_comment	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
review_signoffs
Table comments: Stores performance review sign-off records

Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
position	varchar(191)	No			Position ID or name of the signer	
signature	text	No			Digital signature (base64 encoded or text)	
signed_at	datetime	No			Timestamp when the review was signed	
review_type	varchar(50)	No			Type of review: monthly, quarterly, annual, etc.	
user_id	int	Yes	NULL		User ID of the person signing	
office_id	int	Yes	NULL		Office/Branch ID	
notes	text	Yes	NULL		Additional notes or comments	
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
updated_at	timestamp	Yes	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
idx_user_id	BTREE	No	No	user_id	0	A	Yes	
idx_office_id	BTREE	No	No	office_id	0	A	Yes	
idx_position	BTREE	No	No	position	0	A	No	
idx_review_type	BTREE	No	No	review_type	0	A	No	
idx_signed_at	BTREE	No	No	signed_at	0	A	No	
idx_created_at	BTREE	No	No	created_at	0	A	Yes	
roles
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
slug	varchar(191)	No				
name	varchar(191)	No				
time_limit	tinyint	No	0			
from_time	varchar(191)	Yes	NULL			
to_time	varchar(191)	Yes	NULL			
access_days	text	Yes	NULL			
permissions	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	8	A	No	
role_users
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
user_id	int	No				
role_id	int	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1760	A	No	
saved_queries
Column	Type	Null	Default	Links to	Comments	Media type
name	varchar(30)	Yes	NULL			
description	varchar(300)	Yes	NULL			
query	varchar(3000)	Yes	NULL			
No index defined!

savings
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
client_type	enum('client', 'group')	No	client			
client_id	int	Yes	NULL			
group_id	int	Yes	NULL			
office_id	int	Yes	NULL			
field_officer_id	int	Yes	NULL			
savings_product_id	int	Yes	NULL			
external_id	varchar(191)	Yes	NULL			
account_number	varchar(191)	Yes	NULL			
currency_id	int	Yes	NULL			
decimals	int	No	2			
interest_rate	decimal(65,4)	Yes	NULL			
allow_overdraft	tinyint	No	0			
minimum_balance	decimal(65,4)	Yes	NULL			
overdraft_limit	decimal(65,4)	Yes	NULL			
interest_compounding_period	enum('daily', 'monthly', 'quarterly', 'biannual', 'annually')	Yes	NULL			
interest_posting_period	enum('monthly', 'quarterly', 'biannual', 'annually')	Yes	NULL			
allow_transfer_withdrawal_fee	tinyint	No	0			
opening_balance	decimal(65,4)	Yes	NULL			
allow_additional_charges	tinyint	No	0			
year_days	enum('360', '365')	No	365			
status	enum('pending', 'approved', 'closed', 'declined', 'withdrawn')	No	pending			
created_by_id	int	Yes	NULL			
modified_by_id	int	Yes	NULL			
approved_by_id	int	Yes	NULL			
closed_by_id	int	Yes	NULL			
declined_by_id	int	Yes	NULL			
created_date	date	Yes	NULL			
modified_date	date	Yes	NULL			
approved_date	date	Yes	NULL			
declined_date	date	Yes	NULL			
closed_date	date	Yes	NULL			
month	varchar(191)	Yes	NULL			
year	varchar(191)	Yes	NULL			
notes	text	Yes	NULL			
approved_notes	text	Yes	NULL			
declined_notes	text	Yes	NULL			
closed_notes	text	Yes	NULL			
balance	decimal(65,4)	Yes	NULL			
deposits	decimal(65,4)	Yes	NULL			
interest_earned	decimal(65,4)	Yes	NULL			
interest_posted	decimal(65,4)	Yes	NULL			
interest_overdraft	decimal(65,4)	Yes	NULL			
withdrawals	decimal(65,4)	Yes	NULL			
fees	decimal(65,4)	Yes	NULL			
penalty	decimal(65,4)	Yes	NULL			
start_interest_calculation_date	date	Yes	NULL			
last_interest_calculation_date	date	Yes	NULL			
next_interest_calculation_date	date	Yes	NULL			
next_interest_posting_date	date	Yes	NULL			
last_interest_posting_date	date	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

savings_charges
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
savings_id	int	Yes	NULL			
charge_id	int	Yes	NULL			
penalty	tinyint	No	0			
waived	tinyint	No	0			
charge_type	enum('savings_activation', 'withdrawal_fee', 'annual_fee', 'monthly_fee', 'specified_due_date')	No				
charge_option	enum('flat', 'percentage')	No				
amount	decimal(65,2)	Yes	NULL			
amount_paid	decimal(65,2)	Yes	NULL			
due_date	date	Yes	NULL			
grace_period	int	No	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

savings_products
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
created_by_id	int	Yes	NULL			
name	varchar(191)	Yes	NULL			
short_name	varchar(191)	Yes	NULL			
description	text	Yes	NULL			
currency_id	int	Yes	NULL			
decimals	int	No	2			
interest_rate	decimal(65,4)	Yes	NULL			
allow_overdraft	tinyint	No	0			
minimum_balance	decimal(65,4)	Yes	NULL			
interest_compounding_period	enum('daily', 'monthly', 'quarterly', 'biannual', 'annually')	Yes	NULL			
interest_posting_period	enum('monthly', 'quarterly', 'biannual', 'annually')	Yes	NULL			
interest_calculation_type	enum('daily', 'average')	Yes	NULL			
allow_transfer_withdrawal_fee	tinyint	No	0			
opening_balance	decimal(65,4)	Yes	NULL			
allow_additional_charges	tinyint	No	0			
year_days	enum('360', '365')	No	365			
accounting_rule	enum('none', 'cash')	No	cash			
gl_account_savings_reference_id	int	Yes	NULL			
gl_account_overdraft_portfolio_id	int	Yes	NULL			
gl_account_savings_control_id	int	Yes	NULL			
gl_account_interest_on_savings_id	int	Yes	NULL			
gl_account_savings_written_off_id	int	Yes	NULL			
gl_account_income_interest_id	int	Yes	NULL			
gl_account_income_fee_id	int	Yes	NULL			
gl_account_income_penalty_id	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

savings_product_charges
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
created_by_id	int	Yes	NULL			
charge_id	int	Yes	NULL			
savings_product_id	int	Yes	NULL			
amount	decimal(65,2)	Yes	NULL			
date	date	Yes	NULL			
grace_period	int	No	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

savings_transactions
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
created_by_id	int	Yes	NULL			
office_id	int	Yes	NULL			
modified_by_id	int	Yes	NULL			
payment_detail_id	int	Yes	NULL			
savings_id	int	Yes	NULL			
amount	decimal(10,2)	Yes	0.00			
debit	decimal(65,4)	Yes	NULL			
credit	decimal(65,4)	Yes	NULL			
balance	decimal(65,4)	Yes	NULL			
transaction_type	enum('deposit', 'withdrawal', 'bank_fees', 'interest', 'dividend', 'guarantee', 'guarantee_restored', 'fees_payment', 'transfer_loan', 'transfer_savings', 'specified_due_date_fee')	Yes	NULL			
reversible	tinyint	No	0			
reversed	tinyint	No	0			
reversal_type	enum('system', 'user', 'none')	No	none			
status	enum('pending', 'approved', 'declined')	Yes	pending			
approved_by_id	int	Yes	NULL			
approved_date	date	Yes	NULL			
system_interest	tinyint	No	0			
date	date	Yes	NULL			
time	varchar(191)	Yes	NULL			
year	varchar(191)	Yes	NULL			
month	varchar(191)	Yes	NULL			
notes	text	Yes	NULL			
balance_date	date	Yes	NULL			
balance_days	int	Yes	NULL			
cumulative_balance_days	int	Yes	NULL			
cumulative_balance	decimal(65,4)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

scheduled_reviews
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
position	varchar(191)	No				
review_type	varchar(50)	No				
title	varchar(255)	No				
description	text	Yes	NULL			
scheduled_date_time	datetime	No				
assignee	varchar(191)	No				
priority	enum('low', 'medium', 'high')	Yes	medium			
send_reminder	tinyint(1)	Yes	1			
reminder_days_before	int	Yes	1			
status	enum('scheduled', 'in-progress', 'completed', 'cancelled')	Yes	scheduled			
created_by	int	Yes	NULL			
user_id	int	Yes	NULL			
office_id	int	Yes	NULL			
kpi_id	int	Yes	NULL			
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
updated_at	timestamp	Yes	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
idx_position	BTREE	No	No	position	0	A	No	
idx_status	BTREE	No	No	status	0	A	Yes	
idx_scheduled_date	BTREE	No	No	scheduled_date_time	0	A	No	
idx_upcoming	BTREE	No	No	status	0	A	Yes	
scheduled_date_time	0	A	No
sent_messages
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
loan_id	bigint	No				
message_type	varchar(191)	No				
message	text	No				
sent_at	timestamp	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	7	A	No	
settings
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
setting_key	varchar(191)	No				
setting_value	text	Yes	NULL			
No index defined!

setup_debt_costs
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
office_id	bigint	No				
amount	decimal(15,2)	No	0.00			
description	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	33	A	No	
setup_debt_transactions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
setup_debt_cost_id	bigint	No				
office_id	bigint	No				
amount	decimal(15,2)	No	0.00			
transaction_date	date	No	2026-07-01			
reference_number	varchar(191)	Yes	NULL			
notes	text	Yes	NULL			
created_by	bigint	Yes	NULL			
status	tinyint	No	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
deleted_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	160	A	No	
skip_trace_leads
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
recovery_case_id	bigint	No				
created_by	bigint	No				
lead_type	varchar(191)	No				
description	text	No				
new_phone	varchar(191)	Yes	NULL			
new_address	text	Yes	NULL			
source	varchar(191)	Yes	NULL			
verified	tinyint(1)	No	0			
led_to_location	tinyint(1)	No	0			
cost_incurred	decimal(15,2)	No	0.00			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
slms_score_history
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
office_id	int	Yes	NULL			
score	decimal(9,2)	No				
created_at	date	No				
type	varchar(10)	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	4	A	No	
smart_alerts
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
type	enum('warning', 'info', 'success', 'error')	No	info			
priority	enum('low', 'medium', 'high', 'critical')	No	medium			
message	varchar(500)	No				
title	varchar(100)	Yes	NULL			
category	varchar(50)	Yes	NULL			
source	varchar(20)	Yes	system			
kpi_id	int	Yes	NULL			
position_id	int	Yes	NULL			
office_id	int	Yes	NULL			
province_id	int	Yes	NULL			
user_id	int	Yes	NULL			
is_read	tinyint(1)	Yes	0			
is_dismissed	tinyint(1)	Yes	0			
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
expires_at	timestamp	Yes	NULL			
action_url	varchar(255)	Yes	NULL			
action_label	varchar(50)	Yes	NULL			
metadata	json	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	4	A	No	
idx_user_id	BTREE	No	No	user_id	2	A	Yes	
idx_position_id	BTREE	No	No	position_id	2	A	Yes	
idx_office_id	BTREE	No	No	office_id	2	A	Yes	
idx_kpi_id	BTREE	No	No	kpi_id	1	A	Yes	
idx_type	BTREE	No	No	type	3	A	No	
idx_priority	BTREE	No	No	priority	3	A	No	
idx_category	BTREE	No	No	category	3	A	Yes	
idx_is_read	BTREE	No	No	is_read	1	A	Yes	
idx_created_at	BTREE	No	No	created_at	2	A	Yes	
idx_expires_at	BTREE	No	No	expires_at	1	A	Yes	
idx_user_unread	BTREE	No	No	user_id	2	A	Yes	
is_read	2	A	Yes
is_dismissed	2	A	Yes
idx_position_unread	BTREE	No	No	position_id	2	A	Yes	
is_read	2	A	Yes
is_dismissed	2	A	Yes
idx_office_unread	BTREE	No	No	office_id	2	A	Yes	
is_read	2	A	Yes
is_dismissed	2	A	Yes
smart_kpis
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
role	int	No				
position_id	int	No				
name	varchar(191)	No				
description	varchar(191)	No				
scoring	enum('percentage', 'numeric', 'yes_no', 'score_1_5')	No				
target	varchar(191)	No				
baseline	varchar(12)	Yes	NULL			
category	varchar(191)	No				
weight	varchar(191)	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	100	A	No	
smart_kpi_score
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
kpi_id	int	No				
user_id	int	No				
score	varchar(191)	No				
created_date	datetime	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	4	A	No	
smart_priority_actions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
actions	varchar(191)	No				
due	varchar(100)	No				
urgent	tinyint(1)	No	0			
status	int	No				
position_id	bigint	No				
user_id	int	Yes	NULL			
office_id	int	No				
created_date	datetime	No	CURRENT_TIMESTAMP			
updated_at	datetime	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
sms_gateways
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
created_by_id	int	Yes	NULL			
name	text	Yes	NULL			
from_name	text	Yes	NULL			
to_name	text	Yes	NULL			
url	text	Yes	NULL			
msg_name	text	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

specialists
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
user_id	bigint	No				
notes	text	Yes	NULL			
is_active	tinyint(1)	No	1			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	35	A	No	
specialists_user_id_unique	BTREE	Yes	No	user_id	35	A	No	
staff_surveys
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
user_id	int	No		users -> id		
branch	varchar(191)	No				
length_of_service	varchar(191)	No				
bmos_consistency	varchar(191)	No				
bmos_challenges	text	Yes	NULL			
branch_needs	text	Yes	NULL			
tools_resources	varchar(191)	No				
operational_challenges	text	Yes	NULL			
supervisor_support	varchar(191)	No				
manager_communication	varchar(191)	No				
manager_communication_comments	text	Yes	NULL			
leadership_challenges	text	Yes	NULL			
manager_effectiveness_rating	int	No				
workload_rating	text	Yes	NULL			
unethical_conduct	varchar(191)	No				
policy_violation_instructions	varchar(191)	No				
policy_violation_description	text	Yes	NULL			
top_issues	text	Yes	NULL			
pending_loans_entry	varchar(191)	No				
longest_pending_period	text	Yes	NULL			
missed_target_due_pending	varchar(191)	No				
pending_target_explanation	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	52	A	No	
staff_surveys_user_id_foreign	BTREE	No	No	user_id	52	A	No	
targets_met
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
user_id	int	Yes	NULL			
user_name	varchar(255)	Yes	NULL			
office_name	varchar(255)	Yes	NULL			
given_out	decimal(15,2)	Yes	NULL			
uncollected	decimal(15,2)	Yes	NULL			
target_level	decimal(15,2)	Yes	NULL			
date	date	Yes	NULL			
cycle_start	date	Yes	NULL			
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2343	A	No	
unique_user_cycle_target	BTREE	Yes	No	user_id	463	A	Yes	
target_level	647	A	Yes
cycle_start	2343	A	Yes
idx_targets_cycle	BTREE	No	No	user_id	463	A	Yes	
target_level	647	A	Yes
date	2343	A	Yes
target_reports
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
user_id	int	No				
name	varchar(191)	No				
office_id	int	No				
given_out	decimal(10,0)	No				
uncollected	decimal(10,0)	No				
date	datetime	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
target_tracker
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
user_id	int	No				
given_out	decimal(10,0)	No				
brought_f	decimal(10,0)	Yes	NULL			
target	int	No				
cycle_date	date	No				
status	varchar(191)	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	4262	A	No	
throttle
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
user_id	int	Yes	NULL			
type	varchar(191)	No				
ip	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
No index defined!

tickets
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	No				
description	text	Yes	NULL			
datetime_open	datetime	No				
date_raised	datetime	Yes	NULL			
datetime_close	datetime	Yes	NULL			
date_closed	datetime	Yes	NULL			
sla_met	tinyint(1)	No	0			
opened_by	int	Yes	NULL			
assigned_to	int	Yes	NULL			
assigned_by	int	Yes	NULL			
closed_by	int	Yes	NULL			
status	varchar(191)	No	open			
stage	varchar(191)	Yes	Not started			
priority	varchar(191)	No	medium			
sla_days	int	Yes	NULL			
due_date	datetime	Yes	NULL			
rating	tinyint	Yes	NULL			
remarks	text	Yes	NULL			
department	varchar(191)	Yes	NULL			
issue_category_id	bigint	Yes	NULL	ticket_categories -> id		
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
resolution_comment	text	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	311	A	No	
tickets_issue_category_id_foreign	BTREE	No	No	issue_category_id	5	A	Yes	
ticket_categories
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
name	varchar(191)	No				
priority_default	varchar(191)	Yes	NULL			
sla_days	int	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	5	A	No	
tier_benefits
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
tier_id	bigint	No				
benefit_type	varchar(50)	No				
description	text	No				
value	varchar(255)	Yes	NULL			
effective_from	datetime	No				
effective_to	datetime	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	8	A	No	
tier_id_idx	BTREE	No	No	tier_id	4	A	No	
tier_definitions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
name	varchar(50)	No				
description	text	Yes	NULL			
tier_range	varchar(20)	No				
minimum_portfolio_value	decimal(10,2)	No				
order_index	int	No				
badge_color	varchar(20)	Yes	gray			
text_color	varchar(20)	Yes	white			
effective_from	datetime	No				
effective_to	datetime	Yes	NULL			
is_active	tinyint(1)	Yes	1			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	4	A	No	
unique_tier_name	BTREE	Yes	No	name	4	A	No	
tier_requirements
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
tier_id	bigint	No				
requirement_type	varchar(50)	No				
minimum_value	decimal(10,2)	No				
description	text	Yes	NULL			
effective_from	datetime	No				
effective_to	datetime	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	4	A	No	
tier_id_idx	BTREE	No	No	tier_id	4	A	No	
training_materials
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
title	varchar(191)	No				
description	text	Yes	NULL			
material_type	enum('document', 'audio', 'video')	No	document			
file_path	varchar(191)	Yes	NULL			
poster	varchar(191)	Yes	NULL		Poster/thumbnail image for video playback	
file_name	varchar(191)	Yes	NULL			
file_size	varchar(191)	Yes	NULL			
mime_type	varchar(191)	Yes	NULL			
duration	int	Yes	NULL		Duration in seconds for audio/video	
department	enum('Operations', 'Recoveries', 'Administration', 'Finance', 'IT', 'HR', 'Legal', 'Compliance', 'General')	Yes	NULL			
category	varchar(191)	Yes	NULL			
target_role	enum('all', '1', '4', '6', '3', '5', '10')	No	all			
created_by	int	Yes	NULL			
is_active	tinyint(1)	No	1			
is_featured	tinyint(1)	No	0			
view_count	int	No	0			
download_count	int	No	0			
published_at	timestamp	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	3	A	No	
training_materials_material_type_index	BTREE	No	No	material_type	1	A	No	
training_materials_department_index	BTREE	No	No	department	3	A	Yes	
training_materials_category_index	BTREE	No	No	category	1	A	Yes	
training_materials_target_role_index	BTREE	No	No	target_role	2	A	No	
training_materials_is_active_index	BTREE	No	No	is_active	1	A	No	
training_materials_created_by_index	BTREE	No	No	created_by	3	A	Yes	
unit_shares
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
unit	varchar(191)	Yes	NULL			
amount	decimal(15,2)	No	0.00			
loan_id	bigint	Yes	NULL			
recovery_case_id	bigint	Yes	NULL			
loan_txn_id	bigint	Yes	NULL			
office_id	bigint	Yes	NULL			
user_id	bigint	Yes	NULL			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	8	A	No	
unit_shares_loan_id_index	BTREE	No	No	loan_id	6	A	Yes	
unit_shares_loan_txn_id_index	BTREE	No	No	loan_txn_id	1	A	Yes	
unit_shares_unit_index	BTREE	No	No	unit	1	A	Yes	
unit_shares_office_id_user_id_index	BTREE	No	No	office_id	5	A	Yes	
user_id	5	A	Yes
unit_shares_recovery_case_id_index	BTREE	No	No	recovery_case_id	1	A	Yes	
users
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
office_id	int	Yes	NULL			
email	varchar(191)	No				
password	varchar(191)	No				
permissions	text	Yes	NULL			
has_seen_induction	tinyint(1)	No	0			
has_seen_survey	tinyint(1)	No	0			
last_login	timestamp	Yes	NULL			
first_name	varchar(191)	Yes	NULL			
last_name	varchar(191)	Yes	NULL			
status	enum('Active', 'Inactive')	Yes	Active			
phone	varchar(191)	Yes	NULL			
date_of_birth	date	Yes	NULL			
date_of_joining	date	Yes	NULL			
marital_status	varchar(191)	Yes	NULL			
company	varchar(191)	Yes	NULL			
employee_number	varchar(191)	Yes	NULL			
department	varchar(191)	Yes	NULL			
designation	varchar(191)	Yes	NULL			
branch	varchar(191)	Yes	NULL			
salary_currency	varchar(10)	Yes	NULL			
salary_mode	varchar(191)	Yes	NULL			
bank_name	varchar(191)	Yes	NULL			
bank_account_number	varchar(191)	Yes	NULL			
mobile_money_number	varchar(191)	Yes	NULL			
receiver_name	varchar(191)	Yes	NULL			
health_details	text	Yes	NULL			
health_insurance_provider	varchar(191)	Yes	NULL			
health_insurance_number	varchar(191)	Yes	NULL			
external_company	varchar(191)	Yes	NULL			
external_designation	varchar(191)	Yes	NULL			
external_contact	varchar(191)	Yes	NULL			
external_total_experience	decimal(5,2)	Yes	NULL			
internal_branch	varchar(191)	Yes	NULL			
internal_designation	varchar(191)	Yes	NULL			
internal_from_date	date	Yes	NULL			
internal_to_date	date	Yes	NULL			
gender	enum('male', 'female', 'other', 'unspecified')	Yes	unspecified			
enable_google2fa	tinyint	No	0			
blocked	tinyint	No	0			
google2fa_secret	text	Yes	NULL			
address	text	Yes	NULL			
province_id	int	Yes	NULL			
notes	text	Yes	NULL			
time_limit	tinyint	No	0			
from_time	varchar(191)	Yes	NULL			
to_time	varchar(191)	Yes	NULL			
access_days	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
nrc_id	varchar(191)	Yes	NULL			
salutation	varchar(191)	Yes	NULL			
employment_type	varchar(191)	Yes	NULL			
mobile_number	varchar(191)	Yes	NULL			
personal_email	varchar(191)	Yes	NULL			
current_address	text	Yes	NULL			
emergency_contact_name	varchar(191)	Yes	NULL			
emergency_phone	varchar(191)	Yes	NULL			
relation_to_emergency	varchar(191)	Yes	NULL			
reports_to	bigint	Yes	NULL			
confirmation_date	date	Yes	NULL			
qualification	varchar(191)	Yes	NULL			
school_university	varchar(191)	Yes	NULL			
level_of_education	varchar(191)	Yes	NULL			
year_completed	year	Yes	NULL			
major	varchar(191)	Yes	NULL			
has_completed_profile	tinyint(1)	No	0			
job_position	int	No				
tier	int	Yes	NULL			
istrainer	tinyint(1)	No	0			
verified_numbers	varchar(191)	No	unverified			
position_id	bigint	Yes	NULL			
tpin	varchar(191)	Yes	NULL			
ssn	varchar(191)	Yes	NULL			
nhima	varchar(191)	Yes	NULL			
salary_details	tinyint	No	0			
deleted_at	timestamp	Yes	NULL			
daily_learning	varchar(191)	Yes	NULL			
esc_recovered	tinyint(1)	No	0			
other_role	int	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1774	A	No	
users_employee_number_unique	BTREE	Yes	No	employee_number	596	A	Yes	
user_policy_responses
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
user_id	bigint	No				
policy_id	bigint	No				
status	enum('accepted', 'declined')	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	4994	A	No	
user_policy_views
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
user_id	bigint	No				
policy_id	bigint	Yes	NULL			
policy_of_the_day_id	bigint	Yes	NULL			
engagement_time	int	No	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	86	A	No	
user_tiers
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
user_id	bigint	No				
tier_id	bigint	No				
effective_from	datetime	No				
effective_to	datetime	Yes	NULL			
current_portfolio_value	decimal(10,2)	No	0.00			
next_tier_requirement	decimal(10,2)	Yes	NULL			
progress_percentage	decimal(5,2)	Yes	0.00			
last_updated	datetime	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	16	A	No	
user_id_idx	BTREE	No	No	user_id	16	A	No	
tier_id_idx	BTREE	No	No	tier_id	1	A	No	
vacancies
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
office_id	bigint	Yes	NULL			
position_id	bigint	No				
num_of_vacancies	int	No	0			
date_arose	date	Yes	NULL			
reason	varchar(191)	Yes	NULL			
recruitment_status	varchar(191)	No	Open			
num_of_applicants	int	No	0			
num_of_shortlisted	int	No	0			
interview_status	varchar(191)	Yes	NULL			
selected_candidate	varchar(191)	Yes	NULL			
offer_status	varchar(191)	Yes	NULL			
expected_reporting_date	date	Yes	NULL			
actual_reporting_date	date	Yes	NULL			
status	varchar(191)	No	Open			
notes	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	21	A	No	
vehicles
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
vehicle_code	varchar(50)	Yes	NULL			
client_id	bigint	Yes	NULL			
loan_id	int	No				
make	varchar(100)	Yes	NULL			
model	varchar(100)	Yes	NULL			
year	int	Yes	NULL			
color	varchar(50)	Yes	NULL			
registration_number	varchar(50)	Yes	NULL			
engine_number	varchar(100)	Yes	NULL			
chassis_number	varchar(100)	Yes	NULL			
insurance_policy_number	varchar(191)	No				
mileage	int	Yes	NULL			
fuel_type	varchar(50)	Yes	NULL			
transmission	varchar(50)	Yes	NULL			
market_value	decimal(18,2)	Yes	NULL			
forced_sale_value	decimal(18,2)	Yes	NULL			
status	enum('available', 'pledged', 'repossessed', 'auctioned')	Yes	available			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
sold_at	datetime	Yes	NULL			
buyer_fullname	varchar(191)	Yes	NULL			
buyer_phone	varchar(191)	Yes	NULL			
buyer_nrc_number	varchar(191)	Yes	NULL			
buyer_sex	varchar(191)	Yes	NULL			
buyer_location	varchar(191)	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	23	A	No	
vehicle_code	BTREE	Yes	No	vehicle_code	23	A	Yes	
vehicles_registration_number_unique	BTREE	Yes	No	registration_number	23	A	Yes	
vehicles_engine_number_unique	BTREE	Yes	No	engine_number	8	A	Yes	
vehicles_chassis_number_unique	BTREE	Yes	No	chassis_number	8	A	Yes	
vehicle_custody
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
vehicle_id	bigint	No				
received_at	datetime	No				
received_by	bigint	No				
keys_received	int	Yes	NULL			
documents_received	tinyint(1)	No	0			
accessories_received	tinyint(1)	No	0			
fuel_level	int	Yes	NULL			
intake_photos	text	Yes	NULL			
signed_intake_form_path	varchar(191)	Yes	NULL			
storage_charges	decimal(15,2)	Yes	NULL			
key_tag_numbers	varchar(255)	Yes	NULL			
garage_name	varchar(255)	No				
garage_location	text	Yes	NULL			
garage_gps	varchar(100)	Yes	NULL			
gps_location	text	Yes	NULL			
location_description	text	Yes	NULL			
intake_date	timestamp	Yes	NULL			
parking_bay	varchar(100)	Yes	NULL			
garage_contact_person	varchar(255)	Yes	NULL			
garage_contact_phone	varchar(100)	Yes	NULL			
house_owner_name	varchar(191)	Yes	NULL			
house_owner_nrc	varchar(191)	Yes	NULL			
house_owner_phone	varchar(191)	Yes	NULL			
alternative_contact_name	varchar(191)	Yes	NULL			
alternative_contact_phone	varchar(191)	Yes	NULL			
storage_start_date	date	Yes	NULL			
storage_end_date	date	Yes	NULL			
remarks	text	Yes	NULL			
status	enum('in_custody', 'released', 'transferred')	Yes	in_custody			
custody_approved	tinyint	Yes	0			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	6	A	No	
vehicle_documents
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
vehicle_id	bigint	Yes	NULL			
document_type	varchar(100)	Yes	NULL			
document_file	varchar(255)	Yes	NULL			
uploaded_by	bigint	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	3	A	No	
vehicle_inspections
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
vehicle_id	bigint	Yes	NULL			
inspection_date	date	Yes	NULL			
inspector	varchar(255)	Yes	NULL			
notes	text	Yes	NULL			
inspection_type	varchar(191)	Yes	NULL			
fuel	varchar(191)	No				
mileage	varchar(191)	No				
condition_rating	varchar(191)	Yes	NULL			
condition_notes	text	Yes	NULL			
mechanical_condition	text	Yes	NULL			
interior_condition	text	Yes	NULL			
exterior_condition	text	Yes	NULL			
tyres_condition	text	Yes	NULL			
battery_condition	text	Yes	NULL			
accessories_condition	text	Yes	NULL			
report_file_path	varchar(191)	Yes	NULL			
inspection_photos	text	Yes	NULL			
condition_score	int	Yes	NULL			
result	enum('pending', 'passed', 'failed')	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1	A	No	
vehicle_inspection_photos
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
vehicle_inspection_id	bigint	No		vehicle_inspections -> id		
photo_url	varchar(191)	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
vehicle_inspection_photos_vehicle_inspection_id_foreign	BTREE	No	No	vehicle_inspection_id	0	A	No	
vehicle_insurance
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
vehicle_id	bigint	Yes	NULL			
insurer_name	varchar(255)	Yes	NULL			
policy_number	varchar(255)	Yes	NULL			
start_date	date	Yes	NULL			
expiry_date	date	Yes	NULL			
insured_value	decimal(18,2)	Yes	NULL			
premium	decimal(18,2)	Yes	NULL			
cover_type	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2	A	No	
vehicle_movements
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
vehicle_id	bigint	No				
previous_location	varchar(191)	Yes	NULL			
new_location	varchar(191)	Yes	NULL			
movement_date	date	Yes	NULL			
authorized_by_id	bigint	Yes	NULL			
moved_by_id	bigint	Yes	NULL			
reason	text	Yes	NULL			
condition	text	Yes	NULL			
photos	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
vehicle_movements_vehicle_id_movement_date_index	BTREE	No	No	vehicle_id	0	A	No	
movement_date	0	A	Yes
vehicle_notice_presales
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
vehicle_id	bigint	No				
notice_generated_date	date	Yes	NULL			
notice_served_date	date	Yes	NULL			
service_method	varchar(191)	No	SMS			
officer_issuing	varchar(191)	No	System Generated			
deadline_to_client	date	Yes	NULL			
client_settled	tinyint(1)	No	0			
client_presented_buyer	tinyint(1)	No	0			
buyer_details	text	Yes	NULL			
outcome_after_expiry	text	Yes	NULL			
created_by	bigint	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
vehicle_ownership_records
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
vehicle_id	bigint	No				
ownership_type	enum('individual', 'letter_of_sale', 'company')	No	individual			
registered_owner_name	varchar(191)	Yes	NULL			
seller_name	varchar(191)	Yes	NULL			
seller_nrc	varchar(191)	Yes	NULL			
seller_phone	varchar(191)	Yes	NULL			
witness_1_name	varchar(191)	Yes	NULL			
witness_1_nrc	varchar(191)	Yes	NULL			
witness_2_name	varchar(191)	Yes	NULL			
witness_2_nrc	varchar(191)	Yes	NULL			
company_name	varchar(191)	Yes	NULL			
company_registration_number	varchar(191)	Yes	NULL			
directors	text	Yes	NULL			
authorized_representative_name	varchar(191)	Yes	NULL			
authorized_representative_nrc	varchar(191)	Yes	NULL			
ownership_documents_path	varchar(191)	Yes	NULL			
verified	tinyint(1)	No	0			
verified_by_id	bigint	Yes	NULL			
verified_at	timestamp	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	3	A	No	
vehicle_ownership_records_vehicle_id_ownership_type_index	BTREE	No	No	vehicle_id	3	A	No	
ownership_type	3	A	No
vehicle_photos
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
vehicle_id	bigint	No				
photo_type	varchar(100)	Yes	NULL			
photo_url	text	No				
caption	varchar(255)	Yes	NULL			
uploaded_by	bigint	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	42	A	No	
vehicle_recoveries
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
loan_id	bigint	No				
vehicle_id	bigint	No				
recovery_actions	text	Yes	NULL			
communications	text	Yes	NULL			
promises_arrangements	text	Yes	NULL			
repossession_costs	decimal(15,2)	No	0.00			
legal_costs	decimal(15,2)	No	0.00			
other_expenses	decimal(15,2)	No	0.00			
penalties	decimal(15,2)	No	0.00			
valuation_costs	decimal(15,2)	No	0.00			
current_recovery_stage	varchar(191)	Yes	NULL			
created_by	bigint	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
vehicle_repossessions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
vehicle_id	bigint	Yes	NULL			
loan_id	bigint	Yes	NULL			
repossession_date	date	Yes	NULL			
location_found	text	Yes	NULL			
remarks	text	Yes	NULL			
status	enum('pending', 'completed')	Yes	pending			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
vehicle_roll_calls
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
vehicle_id	bigint	No				
verification_date	date	Yes	NULL			
officer_id	bigint	Yes	NULL			
location_confirmed	tinyint(1)	No	0			
vehicle_present	tinyint(1)	No	0			
condition	text	Yes	NULL			
current_mileage	int	Yes	NULL			
photos	text	Yes	NULL			
status	enum('verified', 'missing', 'damaged', 'relocated')	No	verified			
remarks	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
vehicle_roll_calls_vehicle_id_verification_date_status_index	BTREE	No	No	vehicle_id	0	A	No	
verification_date	0	A	Yes
status	0	A	No
vehicle_valuations
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	bigint	No				
vehicle_id	bigint	Yes	NULL			
valuator_id	bigint	Yes	NULL			
valuation_company	varchar(191)	Yes	NULL			
valuation_date	date	Yes	NULL			
market_value	decimal(18,2)	Yes	NULL			
forced_sale_value	decimal(18,2)	Yes	NULL			
valuation_cost	decimal(18,2)	Yes	NULL			
expiry_date	date	Yes	NULL			
valuator_name	varchar(255)	Yes	NULL			
report_file	varchar(255)	Yes	NULL			
report_file_path	varchar(191)	Yes	NULL			
photos	text	Yes	NULL			
supporting_documents	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1	A	No	
waiver_transactions_unapproved
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
created_by_id	int	No				
office_id	int	No				
loan_id	int	No				
transaction_type	varchar(50)	No				
date	date	No				
credit	decimal(15,2)	No				
status	enum('pending', 'approved', 'declined')	Yes	pending			
notes	text	Yes	NULL			
reversible	tinyint(1)	Yes	0			
created_at	timestamp	Yes	CURRENT_TIMESTAMP			
updated_at	timestamp	Yes	CURRENT_TIMESTAMP			
year	int	No				
month	int	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	4436	A	No	
websockets_statistics_entries
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
app_id	varchar(191)	No				
peak_connection_count	int	No				
websocket_message_count	int	No				
api_message_count	int	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
whatsapp_client
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	No				
phone_number	varchar(191)	No				
occupation	varchar(191)	No				
amount	varchar(191)	No				
status	varchar(191)	No				
date	datetime	No	CURRENT_TIMESTAMP			
location	varchar(191)	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	4	A	No	

