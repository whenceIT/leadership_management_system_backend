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
PRIMARY	BTREE	Yes	No	id	2	A	No	
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
PRIMARY	BTREE	Yes	No	id	1582	A	No	
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
PRIMARY	BTREE	Yes	No	id	1534	A	No	
advance_id	BTREE	No	No	advance_id	920	A	No	
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
PRIMARY	BTREE	Yes	No	id	593472	A	No	
balance_type
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	0	A	No	
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
PRIMARY	BTREE	Yes	No	id	471	A	No	
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
PRIMARY	BTREE	Yes	No	id	1330	A	No	
clients
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
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
phone	varchar(191)	Yes	NULL			
email	varchar(191)	Yes	NULL			
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
nrc_number	varchar(191)	Yes	NULL			
blacklisted	tinyint	No	0			
date_blacklisted	date	Yes	NULL			
key_contact_person	varchar(191)	Yes	NULL			
key_contact_person_nrc_number	varchar(191)	Yes	NULL			
number_of_shareholders	varchar(191)	Yes	NULL			
company_registration_date	varchar(191)	Yes	NULL			
type_of_business	varchar(191)	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	32495	A	No	
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
collateral
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
loan_id	int	Yes	NULL			
client_id	int	Yes	NULL			
collateral_type_id	int	Yes	NULL			
name	varchar(191)	Yes	NULL			
serial	varchar(191)	Yes	NULL			
value	decimal(65,4)	Yes	NULL			
description	text	Yes	NULL			
picture	text	Yes	NULL			
gallery	text	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	109	A	No	
collateral_types
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	2	A	No	
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
countries
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
sortname	varchar(191)	No				
name	varchar(191)	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	246	A	No	
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
PRIMARY	BTREE	Yes	No	id	352	A	No	
deposits
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
deposit_type	int	No				
office	int	No				
amount	decimal(11,0)	No				
date	date	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	31	A	No	
deposit_types
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	No				
bank	varchar(191)	No				
gl_account	int	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	6	A	No	
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
expenses
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
office_id	int	Yes	NULL			
created_by_id	int	Yes	NULL			
expense_type_id	int	Yes	NULL			
gl_account_id	int	Yes	NULL			
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
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	16036	A	No	
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
funds
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	3	A	No	
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
PRIMARY	BTREE	Yes	No	id	38	A	No	
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
PRIMARY	BTREE	Yes	No	id	826191	A	No	
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
PRIMARY	BTREE	Yes	No	id	96	A	No	
job_positions
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	No				
date_added	datetime	No	CURRENT_TIMESTAMP			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1	A	No	
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
PRIMARY	BTREE	Yes	No	id	1112	A	No	
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
loans
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
reloan_id	int	Yes	0			
client_type	enum('client', 'group')	No	client			
loan_product_id	int	Yes	NULL			
client_id	int	Yes	NULL			
office_id	int	Yes	NULL			
group_id	int	Yes	NULL			
fund_id	int	Yes	NULL			
loan_purpose_id	int	Yes	NULL			
currency_id	int	Yes	NULL			
decimals	int	No	2			
account_number	varchar(191)	Yes	NULL			
external_id	varchar(191)	Yes	NULL			
loan_officer_id	int	Yes	NULL			
principal	decimal(65,4)	Yes	NULL			
applied_amount	decimal(65,4)	Yes	NULL			
approved_amount	decimal(65,4)	Yes	NULL			
principal_derived	decimal(65,4)	Yes	NULL			
interest_derived	decimal(65,4)	Yes	NULL			
fees_derived	decimal(65,4)	Yes	NULL			
penalty_derived	decimal(65,4)	Yes	NULL			
disbursement_fees	decimal(65,4)	Yes	NULL			
processing_fee	decimal(65,4)	Yes	NULL			
loan_term	int	Yes	NULL			
loan_term_type	enum('days', 'weeks', 'months', 'years')	Yes	NULL			
repayment_frequency	int	Yes	NULL			
repayment_frequency_type	enum('days', 'weeks', 'months', 'years')	Yes	NULL			
override_interest	tinyint	Yes	0			
interest_rate	decimal(65,4)	Yes	NULL			
override_interest_rate	decimal(65,4)	Yes	NULL			
interest_rate_type	enum('day', 'week', 'month', 'year')	Yes	NULL			
expected_disbursement_date	date	Yes	NULL			
disbursement_date	date	Yes	NULL			
expected_maturity_date	date	Yes	NULL			
expected_first_repayment_date	date	Yes	NULL			
repayments_number	int	Yes	NULL			
first_repayment_date	date	Yes	NULL			
interest_method	enum('flat', 'declining_balance')	Yes	NULL			
armotization_method	enum('equal_installment', 'equal_principal')	Yes	NULL			
grace_on_interest_charged	int	Yes	NULL			
grace_on_principal	int	Yes	NULL			
grace_on_interest_payment	int	Yes	NULL			
status	enum('new', 'pending', 'approved', 'need_changes', 'disbursed', 'declined', 'rejected', 'withdrawn', 'written_off', 'closed', 'pending_reschedule', 'rescheduled', 'paid')	No	pending			
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
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	101859	A	No	
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
short_name	varchar(191)	Yes	NULL			
description	text	Yes	NULL			
fund_id	int	Yes	NULL			
currency_id	int	Yes	NULL			
decimals	int	No	2			
minimum_principal	decimal(65,4)	Yes	NULL			
default_principal	decimal(65,4)	Yes	NULL			
maximum_principal	decimal(65,4)	Yes	NULL			
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
PRIMARY	BTREE	Yes	No	id	2	A	No	
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
PRIMARY	BTREE	Yes	No	id	175760	A	No	
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
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	536002	A	No	
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
PRIMARY	BTREE	Yes	No	id	35	A	No	
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
PRIMARY	BTREE	Yes	No	id	34	A	No	
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
migrations
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
migration	varchar(191)	No				
batch	int	No				
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	87	A	No	
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
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	42	A	No	
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
PRIMARY	BTREE	Yes	No	id	269173	A	No	
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
PRIMARY	BTREE	Yes	No	id	106	A	No	
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
PRIMARY	BTREE	Yes	No	id	761	A	No	
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

policies
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
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
province
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
created_at	timestamp	Yes	NULL			
updated_at	timestamp	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	10	A	No	
recoveries_tags
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
name	varchar(191)	Yes	NULL			
details	varchar(191)	Yes	NULL			
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	5	A	No	
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
PRIMARY	BTREE	Yes	No	id	1633	A	No	
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

settings
Column	Type	Null	Default	Links to	Comments	Media type
id	int	No				
setting_key	varchar(191)	No				
setting_value	text	Yes	NULL			
No index defined!

smart_kpis
Column	Type	Null	Default	Links to	Comments	Media type
id (Primary)	int	No				
role	int	No				
position_id	int	No				
name	varchar(191)	No				
description	varchar(191)	No				
scoring	enum('percentage', 'numeric', 'yes_no', 'score_1_5')	No				
target	varchar(191)	No				
category	varchar(191)	No				
weight	varchar(191)	No				
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
PRIMARY	BTREE	Yes	No	id	35	A	No	
staff_surveys_user_id_foreign	BTREE	No	No	user_id	35	A	No	
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
PRIMARY	BTREE	Yes	No	id	491	A	No	
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
PRIMARY	BTREE	Yes	No	id	95	A	No	
tickets_issue_category_id_foreign	BTREE	No	No	issue_category_id	4	A	Yes	
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
Indexes
Keyname	Type	Unique	Packed	Column	Cardinality	Collation	Null	Comment
PRIMARY	BTREE	Yes	No	id	1471	A	No	
users_employee_number_unique	BTREE	Yes	No	employee_number	386	A	Yes	
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
PRIMARY	BTREE	Yes	No	id	3837	A	No	
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
PRIMARY	BTREE	Yes	No	id	1979	A	No	
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


smart_priority_actions table
id	actions	due	urgent	created_date	updated_at	
