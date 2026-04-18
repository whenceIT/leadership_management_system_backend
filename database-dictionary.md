
whence_loan
account_type
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(255) 	Yes 	NULL 			
parent 	tinyint 	Yes 	0 			
type 	varchar(2) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
activations
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
user_id 	int 	No 				
code 	varchar(191) 	No 				
completed 	tinyint(1) 	No 	0 			
completed_at 	timestamp 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1080 	A 	No 	
admin_income
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
date 	date 	No 				
amount 	int 	Yes 	NULL 			
description 	text 	No 				
from 	varchar(255) 	No 				
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
updated_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	2 	A 	No 	
advances
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
user_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
full_name 	varchar(255) 	Yes 	NULL 			
first_name 	varchar(255) 	Yes 	NULL 			
last_name 	varchar(255) 	Yes 	NULL 			
amount 	decimal(10,2) 	Yes 	NULL 			
installments 	int 	Yes 	NULL 			
installment_amount 	decimal(10,2) 	Yes 	NULL 			
status 	enum('pending', 'approved', 'declined', 'closed') 	Yes 	pending 			
mode_of_payment 	varchar(255) 	Yes 	NULL 			
purpose 	text 	Yes 	NULL 			
date_requested 	date 	Yes 	NULL 			
date_approved 	date 	Yes 	NULL 			
amount_paid 	decimal(10,2) 	Yes 	NULL 			
remaining_amount 	decimal(10,2) 	Yes 	NULL 			
expected_repayment_dates 	date 	Yes 	NULL 			
processed_today 	tinyint(1) 	Yes 	0 			
notes 	text 	Yes 	NULL 			
approved_by_id 	int 	Yes 	NULL 			
declined_by_id 	int 	Yes 	NULL 			
declined_notes 	text 	Yes 	NULL 			
last_update_date 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
updated_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	2075 	A 	No 	
advance_topups
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
office_id 	int 	Yes 	NULL 	offices -> id 		
first_name 	varchar(255) 	No 				
last_name 	varchar(255) 	No 				
advance_id 	int 	No 				
top_up_amount 	decimal(10,2) 	No 				
top_up_date 	date 	No 				
installments 	int 	No 				
status 	varchar(50) 	No 				
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
updated_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	173 	A 	No 	
fk_office_id 	BTREE 	No 	No 	office_id 	21 	A 	Yes 	
advance_transactions
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
advance_id 	int 	No 		advances -> id 		
amount_paid 	decimal(10,2) 	No 				
last_update_date 	date 	No 				
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
updated_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	2025 	A 	No 	
advance_id 	BTREE 	No 	No 	advance_id 	1198 	A 	No 	
announcements
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
title 	varchar(191) 	No 				
message 	text 	No 				
end_date 	date 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
appraisal_answer
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
question_id 	int 	No 				
section_id 	int 	No 				
form_id 	int 	No 				
unit 	int 	No 				
quater_date 	varchar(191) 	No 				
answer 	varchar(191) 	Yes 	NULL 			
user_id 	int 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	125775 	A 	No 	
appraisal_form
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
form_name 	varchar(191) 	No 				
role 	varchar(11) 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	5 	A 	No 	
appraisal_form_section
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
form_id 	int 	No 				
section_name 	varchar(191) 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	66 	A 	No 	
appraisal_question
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
form_id 	int 	No 				
section_id 	int 	No 				
question 	text 	No 				
unit 	enum('%', '[1-5]', 'K', 'number', 'p_r', 'text', '[I,S,D]', 'subop1', 'subop2', 'subop3', 'subop4', 'yes/no', 'info', 'sb_r', 'p_r_dm', 'rr_r', 'rh_r', 'ma_r') 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	218 	A 	No 	
appraisal_suboptions
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
question_id 	int 	No 				
section_id 	int 	No 				
info 	varchar(191) 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
assets
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
created_by_id 	int 	Yes 	NULL 			
asset_type_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
name 	varchar(191) 	Yes 	NULL 			
purchase_date 	date 	Yes 	NULL 			
purchase_price 	decimal(65,2) 	Yes 	NULL 			
value 	decimal(65,2) 	Yes 	NULL 			
life_span 	int 	Yes 	NULL 			
salvage_value 	decimal(65,2) 	Yes 	NULL 			
serial_number 	text 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
files 	text 	Yes 	NULL 			
purchase_year 	text 	Yes 	NULL 			
status 	enum('active', 'inactive', 'sold', 'damaged', 'written_off') 	Yes 	NULL 			
active 	tinyint 	Yes 	0 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1 	A 	No 	
asset_depreciation
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
asset_id 	int 	Yes 	NULL 			
year 	varchar(191) 	Yes 	NULL 			
beginning_value 	decimal(65,2) 	Yes 	NULL 			
depreciation_value 	decimal(65,2) 	Yes 	NULL 			
rate 	decimal(65,2) 	Yes 	NULL 			
cost 	decimal(65,2) 	Yes 	NULL 			
accumulated 	decimal(65,2) 	Yes 	NULL 			
ending_value 	decimal(65,2) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
asset_types
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
gl_account_fixed_asset_id 	int 	Yes 	NULL 			
gl_account_asset_id 	int 	Yes 	NULL 			
gl_account_contra_asset_id 	int 	Yes 	NULL 			
gl_account_expense_id 	int 	Yes 	NULL 			
gl_account_liability_id 	int 	Yes 	NULL 			
gl_account_income_id 	int 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
type 	varchar(191) 	Yes 	NULL 			
currrent_type 	varchar(191) 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	5 	A 	No 	
audit_log
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
module 	int 	No 				
action 	varchar(191) 	No 				
done_by 	varchar(191) 	No 				
details 	text 	No 				
date 	datetime 	No 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1491 	A 	No 	
audit_modules
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	No 				
date 	datetime 	No 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	2 	A 	No 	
audit_trail
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
user_id 	int 	Yes 	NULL 			
name 	varchar(191) 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
module 	varchar(191) 	Yes 	NULL 			
action 	varchar(191) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	720444 	A 	No 	
balance_type
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
bank_accounts
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	No 				
account_number 	int 	No 				
date 	datetime 	No 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	4 	A 	No 	
bank_deposit_log
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
deposit_type 	int 	No 				
office_id 	int 	No 				
user_id 	int 	No 				
amount 	decimal(65,4) 	No 				
deposit_method 	varchar(191) 	No 				
reference_number 	varchar(191) 	No 				
created_date 	datetime 	No 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	724 	A 	No 	
blacklist_history
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
client_id 	bigint 	No 				
created_by_id 	bigint 	Yes 	NULL 			
office_id 	bigint 	Yes 	NULL 			
blacklist_reason_id 	bigint 	Yes 	NULL 			
date 	date 	Yes 	NULL 			
description 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
blacklist_reasons
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
name 	varchar(191) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
carry_overs
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
office_id 	int 	No 				
user_id 	int 	No 				
amount 	decimal(10,0) 	No 				
cycle_date 	date 	No 				
status 	varchar(191) 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1423 	A 	No 	
category_material
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
course_category_id 	bigint 	No 		course_categories -> id 		
training_material_id 	bigint 	No 		training_materials -> id 		
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
cat_mat_unique 	BTREE 	Yes 	No 	course_category_id 	0 	A 	No 	
training_material_id 	0 	A 	No
category_material_training_material_id_foreign 	BTREE 	No 	No 	training_material_id 	0 	A 	No 	
charges
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
created_by_id 	int 	Yes 	NULL 			
name 	varchar(191) 	Yes 	NULL 			
currency_id 	int 	Yes 	NULL 			
product 	enum('loan', 'savings', 'shares', 'client') 	No 				
charge_type 	enum('disbursement', 'disbursement_repayment', 'specified_due_date', 'installment_fee', 'overdue_installment_fee', 'loan_rescheduling_fee', 'overdue_maturity', 'savings_activation', 'withdrawal_fee', 'annual_fee', 'monthly_fee', 'activation', 'shares_purchase', 'shares_redeem') 	No 				
charge_option 	enum('flat', 'percentage', 'installment_principal_due', 'installment_principal_interest_due', 'installment_interest_due', 'installment_total_due', 'total_due', 'principal_due', 'interest_due', 'total_outstanding', 'original_principal') 	No 				
charge_frequency 	tinyint 	No 	0 			
charge_frequency_type 	enum('days', 'weeks', 'months', 'years') 	No 	days 			
charge_frequency_amount 	int 	No 	0 			
amount 	decimal(65,2) 	Yes 	NULL 			
minimum_amount 	decimal(65,2) 	Yes 	NULL 			
maximum_amount 	decimal(65,2) 	Yes 	NULL 			
charge_payment_mode 	enum('regular', 'account_transfer') 	No 	regular 			
active 	tinyint 	No 	1 			
penalty 	tinyint 	No 	0 			
override 	tinyint 	No 	0 			
gl_account_income_id 	int 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1 	A 	No 	
charge_transactions_unapproved
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
created_by_id 	int 	No 				
office_id 	int 	No 				
loan_id 	int 	No 				
transaction_type 	varchar(50) 	No 				
debit 	decimal(15,2) 	No 				
date 	date 	No 				
status 	enum('pending', 'approved', 'declined') 	Yes 	pending 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
updated_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1650 	A 	No 	
clients
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
country_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
user_id 	int 	Yes 	NULL 			
staff_id 	int 	Yes 	NULL 			
referred_by_id 	int 	Yes 	NULL 			
account_no 	varchar(191) 	Yes 	NULL 			
external_id 	varchar(191) 	Yes 	NULL 			
title 	varchar(191) 	Yes 	NULL 			
first_name 	varchar(191) 	Yes 	NULL 			
middle_name 	varchar(191) 	Yes 	NULL 			
last_name 	varchar(191) 	Yes 	NULL 			
full_name 	varchar(191) 	Yes 	NULL 			
incorporation_number 	varchar(191) 	Yes 	NULL 			
display_name 	varchar(191) 	Yes 	NULL 			
picture 	varchar(191) 	Yes 	NULL 			
mobile 	varchar(191) 	Yes 	NULL 			
phone 	varchar(191) 	Yes 	NULL 			
email 	varchar(191) 	Yes 	NULL 			
gender 	enum('male', 'female', 'other', 'unspecified') 	Yes 	NULL 			
client_type 	enum('individual', 'business', 'ngo', 'other') 	Yes 	NULL 			
status 	enum('pending', 'active', 'inactive', 'declined', 'closed', 'blacklisted') 	No 	pending 			
marital_status 	enum('married', 'single', 'divorced', 'widowed', 'unspecified') 	Yes 	NULL 			
dob 	date 	Yes 	NULL 			
street 	varchar(191) 	Yes 	NULL 			
ward 	varchar(191) 	Yes 	NULL 			
district 	varchar(191) 	Yes 	NULL 			
region 	varchar(191) 	Yes 	NULL 			
address 	text 	Yes 	NULL 			
joined_date 	date 	Yes 	NULL 			
activated_date 	date 	Yes 	NULL 			
reactivated_date 	date 	Yes 	NULL 			
declined_date 	date 	Yes 	NULL 			
declined_reason 	text 	Yes 	NULL 			
closed_reason 	text 	Yes 	NULL 			
closed_date 	date 	Yes 	NULL 			
created_by_id 	int 	Yes 	NULL 			
inactive_reason 	text 	Yes 	NULL 			
inactive_date 	date 	Yes 	NULL 			
inactive_by_id 	int 	Yes 	NULL 			
activated_by_id 	int 	Yes 	NULL 			
reactivated_by_id 	int 	Yes 	NULL 			
declined_by_id 	int 	Yes 	NULL 			
closed_by_id 	int 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
deleted_at 	timestamp 	Yes 	NULL 			
isclient 	int 	No 	1 			
working_place 	varchar(191) 	Yes 	NULL 			
working_position 	varchar(191) 	Yes 	NULL 			
salary 	varchar(191) 	Yes 	NULL 			
nrc_number 	varchar(191) 	Yes 	NULL 			
blacklisted 	tinyint 	No 	0 			
date_blacklisted 	date 	Yes 	NULL 			
key_contact_person 	varchar(191) 	Yes 	NULL 			
key_contact_person_nrc_number 	varchar(191) 	Yes 	NULL 			
number_of_shareholders 	varchar(191) 	Yes 	NULL 			
company_registration_date 	varchar(191) 	Yes 	NULL 			
type_of_business 	varchar(191) 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	32495 	A 	No 	
clients_app_otp
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
identifier 	varchar(255) 	No 				
otp 	varchar(255) 	No 				
expires_at 	datetime 	No 				
created_date 	datetime 	No 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
client_identifications
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
client_id 	int 	Yes 	NULL 			
client_identification_type_id 	int 	Yes 	NULL 			
name 	varchar(191) 	Yes 	NULL 			
active 	tinyint 	No 	1 			
notes 	text 	Yes 	NULL 			
attachment 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	4644 	A 	No 	
client_identification_types
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	3 	A 	No 	
client_location
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	No 				
client_id 	int 	No 				
map_link 	varchar(191) 	No 				
description 	text 	No 				
created_date 	datetime 	No 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	2 	A 	No 	
client_next_of_kin
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
client_id 	int 	Yes 	NULL 			
client_relationship_id 	int 	Yes 	NULL 			
qualification 	varchar(191) 	Yes 	NULL 			
first_name 	varchar(191) 	Yes 	NULL 			
middle_name 	varchar(191) 	Yes 	NULL 			
last_name 	varchar(191) 	Yes 	NULL 			
ward 	varchar(191) 	Yes 	NULL 			
street 	varchar(191) 	Yes 	NULL 			
district 	varchar(191) 	Yes 	NULL 			
region 	varchar(191) 	Yes 	NULL 			
address 	text 	Yes 	NULL 			
picture 	varchar(191) 	Yes 	NULL 			
mobile 	varchar(191) 	Yes 	NULL 			
phone 	varchar(191) 	Yes 	NULL 			
email 	varchar(191) 	Yes 	NULL 			
gender 	enum('male', 'female', 'other', 'unspecified') 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	13812 	A 	No 	
client_profession
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
client_relationships
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	5 	A 	No 	
client_transfer_log
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
client_id 	int 	No 				
old_loan_officer_id 	int 	No 				
new_loan_officer_id 	int 	No 				
transferred_by 	int 	No 				
transferred_at 	datetime 	No 	CURRENT_TIMESTAMP 			
created_at 	datetime 	No 	CURRENT_TIMESTAMP 			
updated_at 	datetime 	No 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	585 	A 	No 	
client_users
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
created_by_id 	int 	Yes 	NULL 			
client_id 	int 	Yes 	NULL 			
user_id 	int 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	18 	A 	No 	
collaterals
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
loan_id 	int 	Yes 	NULL 			
client_id 	int 	Yes 	NULL 			
collateral_type_id 	int 	Yes 	NULL 			
name 	varchar(255) 	Yes 	NULL 			
serial 	varchar(255) 	Yes 	NULL 			
value 	decimal(65,4) 	Yes 	NULL 			
initial_price 	decimal(65,4) 	Yes 	NULL 			
current_worth 	decimal(65,4) 	Yes 	NULL 			
sold_price 	decimal(15,2) 	Yes 	NULL 			
penalty 	decimal(15,2) 	Yes 	NULL 			
status 	varchar(255) 	Yes 	NULL 			
condition 	varchar(255) 	Yes 	NULL 			
date_purchased 	date 	Yes 	NULL 			
date_resold 	date 	Yes 	NULL 			
created_by_id 	int 	Yes 	NULL 			
description 	text 	Yes 	NULL 			
picture 	text 	Yes 	NULL 			
gallery 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
province_id 	bigint 	Yes 	NULL 			
district_id 	bigint 	Yes 	NULL 			
office_id 	bigint 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
collateral_status_change_requests
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	bigint 	No 				
collateral_id 	int 	No 				
requested_by_id 	int 	No 				
approved_by_id 	int 	Yes 	NULL 			
old_status 	enum('active', 'sold', 'defaulted', 'repossessed') 	No 				
new_status 	enum('active', 'sold', 'defaulted', 'repossessed') 	No 				
reason 	text 	No 				
sold_price 	decimal(15,2) 	Yes 	NULL 			
penalty 	decimal(15,2) 	Yes 	NULL 			
approval_status 	enum('pending', 'approved', 'rejected') 	No 	pending 			
request_date 	timestamp 	No 	CURRENT_TIMESTAMP 			
approval_date 	timestamp 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
collateral_types
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	2 	A 	No 	
communication_campaigns
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
created_by_id 	int 	Yes 	NULL 			
type 	enum('sms', 'email') 	Yes 	NULL 			
name 	text 	Yes 	NULL 			
description 	text 	Yes 	NULL 			
report_start_date 	date 	Yes 	NULL 			
report_start_time 	varchar(191) 	Yes 	NULL 			
recurrence_type 	enum('none', 'schedule') 	Yes 	NULL 			
recur_frequency 	enum('days', 'months', 'weeks', 'years') 	Yes 	NULL 			
recur_interval 	varchar(191) 	Yes 	NULL 			
email_recipients 	text 	Yes 	NULL 			
email_subject 	varchar(191) 	Yes 	NULL 			
message 	text 	Yes 	NULL 			
email_attachment_file_format 	enum('pdf', 'csv', 'xls') 	Yes 	NULL 			
recipients_category 	enum('all_clients', 'active_clients', 'prospective_clients', 'active_loans', 'loans_in_arrears', 'overdue_loans', 'happy_birthday') 	Yes 	NULL 			
report_attachment 	enum('loan_schedule', 'loan_statement', 'savings_statement', 'audit_report', 'group_indicator_report') 	Yes 	NULL 			
from_day 	varchar(191) 	Yes 	NULL 			
to_day 	varchar(191) 	Yes 	NULL 			
office_id 	varchar(191) 	Yes 	NULL 			
loan_officer_id 	varchar(191) 	Yes 	NULL 			
gl_account_id 	varchar(191) 	Yes 	NULL 			
manual_entries 	varchar(191) 	Yes 	NULL 			
loan_status 	varchar(191) 	Yes 	NULL 			
loan_product_id 	varchar(191) 	Yes 	NULL 			
last_run_date 	date 	Yes 	NULL 			
next_run_date 	date 	Yes 	NULL 			
last_run_time 	date 	Yes 	NULL 			
next_run_time 	date 	Yes 	NULL 			
number_of_runs 	int 	No 	0 			
number_of_recipients 	int 	No 	0 			
active 	tinyint 	No 	1 			
sent 	tinyint 	No 	0 			
status 	enum('pending', 'active', 'declined', 'inactive') 	No 	pending 			
approved_by_id 	int 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1 	A 	No 	
countries
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
sortname 	varchar(191) 	No 				
name 	varchar(191) 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	246 	A 	No 	
course_categories
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
name 	varchar(191) 	No 				
slug 	varchar(191) 	No 				
description 	text 	Yes 	NULL 			
icon 	varchar(191) 	No 	fa-folder 			
color 	varchar(191) 	No 	#4a90e2 			
sort_order 	int 	No 	0 			
is_active 	tinyint(1) 	No 	1 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	3 	A 	No 	
course_categories_name_unique 	BTREE 	Yes 	No 	name 	3 	A 	No 	
course_categories_slug_unique 	BTREE 	Yes 	No 	slug 	3 	A 	No 	
course_category_training_material
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
course_category_id 	bigint 	No 				
training_material_id 	bigint 	No 				
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	25 	A 	No 	
course_category_training_material_course_category_id_foreign 	BTREE 	No 	No 	course_category_id 	10 	A 	No 	
course_category_training_material_training_material_id_foreign 	BTREE 	No 	No 	training_material_id 	16 	A 	No 	
course_topics
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
training_material_id 	bigint 	No 		training_materials -> id 		
topic_name 	varchar(191) 	No 				
topic_type 	varchar(191) 	No 				
file_path 	varchar(191) 	Yes 	NULL 			
video_file_path 	varchar(191) 	Yes 	NULL 			
audio_file_path 	varchar(191) 	Yes 	NULL 			
pdf_file_path 	varchar(191) 	Yes 	NULL 			
ppt_file_path 	varchar(191) 	Yes 	NULL 			
document_file_path 	varchar(191) 	Yes 	NULL 			
file_name 	varchar(191) 	Yes 	NULL 			
duration 	varchar(191) 	Yes 	NULL 			
sort_order 	int 	No 	0 			
is_active 	tinyint(1) 	No 	1 			
view_count 	bigint 	No 	0 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	3 	A 	No 	
course_topics_training_material_id_foreign 	BTREE 	No 	No 	training_material_id 	2 	A 	No 	
currencies
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
code 	varchar(191) 	Yes 	NULL 			
symbol 	varchar(191) 	Yes 	NULL 			
decimals 	varchar(191) 	Yes 	2 			
xrate 	decimal(65,8) 	Yes 	NULL 			
international_code 	varchar(191) 	Yes 	NULL 			
active 	tinyint 	No 	1 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	37 	A 	No 	
custom_fields
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
created_by_id 	int 	Yes 	NULL 			
category 	varchar(191) 	Yes 	NULL 			
name 	varchar(191) 	Yes 	NULL 			
field_type 	enum('number', 'textfield', 'date', 'decimal', 'textarea', 'checkbox', 'radiobox', 'select') 	No 	textfield 			
required 	tinyint 	No 	0 			
radio_box_values 	text 	Yes 	NULL 			
checkbox_values 	text 	Yes 	NULL 			
select_values 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
custom_fields_meta
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
created_by_id 	int 	Yes 	NULL 			
category 	varchar(191) 	Yes 	NULL 			
parent_id 	int 	Yes 	NULL 			
custom_field_id 	int 	Yes 	NULL 			
name 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
cycle_dates
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
loan_officer_id 	int 	Yes 	NULL 			
cycle_end_date 	int 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	582 	A 	No 	
deposits
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
deposit_type 	int 	No 				
office 	int 	No 				
amount 	decimal(11,0) 	No 				
date 	date 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	507 	A 	No 	
deposit_types
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	No 				
bank 	varchar(191) 	No 				
gl_account 	int 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	6 	A 	No 	
districts
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
name 	varchar(191) 	No 				
province_id 	bigint 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	116 	A 	No 	
district_regionals
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
name 	varchar(191) 	No 				
district_id 	bigint 	Yes 	NULL 			
province_id 	bigint 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
documents
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
type 	enum('client', 'loan', 'group', 'savings', 'identification', 'shares', 'repayment', 'collateral') 	Yes 	NULL 			
record_id 	int 	Yes 	NULL 			
name 	varchar(191) 	Yes 	NULL 			
size 	varchar(191) 	Yes 	NULL 			
location 	text 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	10132 	A 	No 	
dual_role
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
user_id 	int 	No 				
role_id 	int 	No 				
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	26 	A 	No 	
employees
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
employee_id (Primary) 	int 	No 				
user_id 	int 	No 				
first_name 	varchar(50) 	No 				
last_name 	varchar(50) 	No 				
gender 	varchar(20) 	Yes 	NULL 			
date_of_birth 	date 	Yes 	NULL 			
nationality 	varchar(50) 	Yes 	NULL 			
nrc_number 	varchar(50) 	Yes 	NULL 			
email 	varchar(100) 	No 				
phone 	varchar(20) 	Yes 	NULL 			
address 	text 	Yes 	NULL 			
job_title 	varchar(100) 	Yes 	NULL 			
department 	varchar(50) 	Yes 	NULL 			
branch 	varchar(50) 	Yes 	NULL 			
hire_date 	date 	Yes 	NULL 			
employment_type 	varchar(30) 	Yes 	NULL 			
reporting_manager 	varchar(100) 	Yes 	NULL 			
work_location 	varchar(50) 	Yes 	NULL 			
emergency_contact_name 	varchar(100) 	Yes 	NULL 			
emergency_contact_relation 	varchar(50) 	Yes 	NULL 			
emergency_contact_number 	varchar(20) 	Yes 	NULL 			
medical_conditions 	text 	Yes 	NULL 			
status 	varchar(20) 	Yes 	Active 			
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
updated_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	employee_id 	2 	A 	No 	
email 	BTREE 	Yes 	No 	email 	2 	A 	No 	
enrollments
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
user_id 	bigint 	No 				
training_material_id 	bigint 	No 				
enrolled_at 	timestamp 	Yes 	NULL 			
completed_at 	timestamp 	Yes 	NULL 			
progress 	int 	No 	0 			
completed_topics 	json 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	11 	A 	No 	
enrollments_user_id_training_material_id_unique 	BTREE 	Yes 	No 	user_id 	7 	A 	No 	
training_material_id 	11 	A 	No
expenses
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
office_id 	int 	Yes 	NULL 			
created_by_id 	int 	Yes 	NULL 			
expense_type_id 	int 	Yes 	NULL 			
gl_account_id 	int 	Yes 	NULL 			
is_attribution 	tinyint 	No 	0 			
name 	varchar(191) 	Yes 	NULL 			
amount 	decimal(65,2) 	No 	0.00 			
date 	date 	Yes 	NULL 			
year 	varchar(191) 	Yes 	NULL 			
month 	varchar(191) 	Yes 	NULL 			
recurring 	tinyint 	No 	0 			
recur_frequency 	varchar(191) 	No 	31 			
recur_start_date 	date 	Yes 	NULL 			
recur_end_date 	date 	Yes 	NULL 			
recur_next_date 	date 	Yes 	NULL 			
recur_type 	enum('day', 'week', 'month', 'year') 	No 	month 			
status 	enum('pending', 'approved', 'declined') 	No 	approved 			
approved_date 	date 	Yes 	NULL 			
approved_by_id 	int 	Yes 	NULL 			
declined_date 	date 	Yes 	NULL 			
declined_by_id 	int 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
files 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
expense_type 	varchar(191) 	Yes 	NULL 			
proof_of_payment 	varchar(255) 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	20126 	A 	No 	
expense_budgets
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
created_by_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
expense_type_id 	int 	Yes 	NULL 			
name 	varchar(191) 	Yes 	NULL 			
year 	varchar(191) 	Yes 	NULL 			
month 	varchar(191) 	Yes 	NULL 			
date 	date 	Yes 	NULL 			
amount 	decimal(65,2) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
status 	enum('pending', 'approved', 'declined') 	No 	approved 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
expense_types
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
gl_account_asset_id 	int 	Yes 	NULL 			
gl_account_expense_id 	int 	Yes 	NULL 			
gl_account_id 	int 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
distribution_cost 	int 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	29 	A 	No 	
idx_name 	BTREE 	No 	No 	name 	29 	A 	Yes 	
expense_types_old
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
gl_account_asset_id 	int 	Yes 	NULL 			
gl_account_expense_id 	int 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	11 	A 	No 	
id_index 	BTREE 	No 	No 	id 	11 	A 	No 	
idx_name 	BTREE 	No 	No 	name 	11 	A 	Yes 	
expense_type_gl_account
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
expense_type_id 	bigint 	No 				
gl_account_id 	bigint 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	132 	A 	No 	
file_migration
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
file_name 	varchar(1000) 	Yes 	NULL 			
file_url 	varchar(1000) 	Yes 	NULL 			
created_at 	timestamp 	No 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	7590 	A 	No 	
funds
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	3 	A 	No 	
fund_movements
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
office_id 	bigint 	No 				
movement_type 	enum('payment', 'transfer', 'bank_charge', 'withdrawal', 'refund') 	No 				
source_account 	varchar(255) 	No 				
destination_account 	varchar(255) 	Yes 	NULL 			
payee_name 	varchar(255) 	Yes 	NULL 			
expense_category 	varchar(150) 	Yes 	NULL 			
title 	varchar(255) 	Yes 	NULL 			
amount 	decimal(15,2) 	No 				
payment_method 	enum('bank_transfer', 'cheque', 'cash', 'mobile_money', 'other') 	Yes 	NULL 			
reference_no 	varchar(150) 	Yes 	NULL 			
transaction_date 	date 	No 				
description 	text 	Yes 	NULL 			
remarks 	text 	Yes 	NULL 			
attachment 	varchar(255) 	Yes 	NULL 			
document_note 	varchar(255) 	Yes 	NULL 			
status 	enum('draft', 'submitted', 'approved', 'rejected') 	Yes 	draft 			
requires_approval 	tinyint(1) 	Yes 	1 			
created_by 	bigint 	No 				
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
updated_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1 	A 	No 	
idx_office 	BTREE 	No 	No 	office_id 	1 	A 	No 	
idx_type 	BTREE 	No 	No 	movement_type 	1 	A 	No 	
idx_status 	BTREE 	No 	No 	status 	1 	A 	Yes 	
idx_date 	BTREE 	No 	No 	transaction_date 	1 	A 	No 	
general_ledger
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
user_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
cycle_dates 	int 	Yes 	NULL 			
total_income 	decimal(10,2) 	Yes 	NULL 			
cash_balance 	decimal(10,2) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
updated_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	51 	A 	No 	
general_topics
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
name 	varchar(191) 	No 				
description 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
poster 	varchar(191) 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	36 	A 	No 	
general_uploads
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
name 	varchar(191) 	No 				
path 	varchar(191) 	No 				
poster 	varchar(191) 	Yes 	NULL 			
type 	enum('video', 'audio', 'book', 'paper', 'document', 'image', 'other') 	No 	other 			
file_size 	bigint 	Yes 	NULL 			
mime_type 	varchar(191) 	Yes 	NULL 			
views_count 	bigint 	No 	0 			
likes_count 	bigint 	No 	0 			
category 	varchar(191) 	No 	other 			
uploaded_by 	bigint 	Yes 	NULL 			
general_topic_id 	bigint 	Yes 	NULL 	general_topics -> id 		
position_id 	int 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	134 	A 	No 	
general_uploads_general_topic_id_foreign 	BTREE 	No 	No 	general_topic_id 	36 	A 	Yes 	
general_upload_likes
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
user_id 	bigint 	No 				
general_upload_id 	bigint 	No 				
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
general_upload_likes_user_id_general_upload_id_unique 	BTREE 	Yes 	No 	user_id 	0 	A 	No 	
general_upload_id 	0 	A 	No
general_upload_position
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
general_upload_id 	bigint 	No 		general_uploads -> id 		
position_id 	int 	No 				
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
general_upload_position_general_upload_id_foreign 	BTREE 	No 	No 	general_upload_id 	0 	A 	No 	
general_views
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
type 	varchar(191) 	No 				
user_id 	bigint 	No 				
item_id 	bigint 	No 				
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	14 	A 	No 	
unique_view 	BTREE 	Yes 	No 	type 	2 	A 	No 	
item_id 	14 	A 	No
user_id 	14 	A 	No
general_views_type_item_id_index 	BTREE 	No 	No 	type 	2 	A 	No 	
item_id 	14 	A 	No
general_views_user_id_index 	BTREE 	No 	No 	user_id 	8 	A 	No 	
gl_accounts
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
parent_id 	int 	Yes 	NULL 			
gl_code 	varchar(191) 	Yes 	NULL 			
account_type 	enum('asset', 'liability', 'equity', 'income', 'expense') 	No 				
active 	tinyint 	No 	1 			
manual_entries 	tinyint 	No 	1 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	301 	A 	No 	
gl_closures
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
office_id 	int 	Yes 	NULL 			
created_by_id 	int 	Yes 	NULL 			
closing_date 	date 	No 				
modified_by_id 	int 	Yes 	NULL 			
gl_reference 	varchar(191) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
gl_journal_entries
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
office_id 	int 	Yes 	NULL 			
gl_account_id 	int 	Yes 	NULL 			
currency_id 	int 	Yes 	NULL 			
transaction_type 	enum('disbursement', 'accrual', 'deposit', 'withdrawal', 'manual_entry', 'pay_charge', 'transfer_fund', 'expense', 'payroll', 'income', 'fee', 'penalty', 'interest', 'dividend', 'guarantee', 'write_off', 'repayment', 'repayment_disbursement', 'repayment_recovery', 'interest_accrual', 'fee_accrual', 'savings', 'shares', 'asset', 'asset_income', 'asset_expense', 'asset_depreciation') 	Yes 	repayment 			
transaction_sub_type 	enum('overpayment', 'repayment_interest', 'repayment_principal', 'repayment_fees', 'repayment_penalty') 	Yes 	NULL 			
debit 	decimal(65,4) 	Yes 	NULL 			
credit 	decimal(65,4) 	Yes 	NULL 			
reversed 	tinyint 	No 	0 			
name 	text 	Yes 	NULL 			
reference 	varchar(191) 	Yes 	NULL 			
loan_id 	int 	Yes 	NULL 			
loan_transaction_id 	int 	Yes 	NULL 			
savings_transaction_id 	int 	Yes 	NULL 			
savings_id 	int 	Yes 	NULL 			
shares_transaction_id 	int 	Yes 	NULL 			
payroll_transaction_id 	int 	Yes 	NULL 			
payment_detail_id 	int 	Yes 	NULL 			
transaction_id 	int 	Yes 	NULL 			
gl_closure_id 	int 	Yes 	NULL 			
date 	date 	Yes 	NULL 			
month 	varchar(191) 	Yes 	NULL 			
year 	varchar(191) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_by_id 	int 	Yes 	NULL 			
modified_by_id 	int 	Yes 	NULL 			
reconciled 	tinyint 	No 	0 			
manual_entry 	tinyint 	No 	0 			
approved 	tinyint 	No 	1 			
approved_by_id 	int 	Yes 	NULL 			
approved_date 	date 	Yes 	NULL 			
approved_notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	826191 	A 	No 	
groups
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
office_id 	int 	Yes 	NULL 			
name 	varchar(191) 	Yes 	NULL 			
account_no 	varchar(191) 	Yes 	NULL 			
external_id 	varchar(191) 	Yes 	NULL 			
staff_id 	int 	Yes 	NULL 			
joined_date 	date 	Yes 	NULL 			
activated_date 	date 	Yes 	NULL 			
reactivated_date 	date 	Yes 	NULL 			
declined_date 	date 	Yes 	NULL 			
declined_reason 	text 	Yes 	NULL 			
closed_reason 	text 	Yes 	NULL 			
closed_date 	date 	Yes 	NULL 			
created_by_id 	int 	Yes 	NULL 			
activated_by_id 	int 	Yes 	NULL 			
reactivated_by_id 	int 	Yes 	NULL 			
declined_by_id 	int 	Yes 	NULL 			
closed_by_id 	int 	Yes 	NULL 			
mobile 	varchar(191) 	Yes 	NULL 			
phone 	varchar(191) 	Yes 	NULL 			
email 	varchar(191) 	Yes 	NULL 			
street 	varchar(191) 	Yes 	NULL 			
ward 	varchar(191) 	Yes 	NULL 			
district 	varchar(191) 	Yes 	NULL 			
region 	varchar(191) 	Yes 	NULL 			
address 	text 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
status 	enum('pending', 'active', 'inactive', 'declined', 'closed') 	No 	pending 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1 	A 	No 	
group_clients
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
group_id 	int 	Yes 	NULL 			
client_id 	int 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1 	A 	No 	
group_loan_allocation
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
loan_id 	int 	Yes 	NULL 			
group_id 	int 	Yes 	NULL 			
client_id 	int 	Yes 	NULL 			
amount 	decimal(65,4) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
group_users
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
created_by_id 	int 	Yes 	NULL 			
group_id 	int 	Yes 	NULL 			
user_id 	int 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
guarantors
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
country_id 	int 	Yes 	NULL 			
client_id 	int 	Yes 	NULL 			
savings_id 	int 	Yes 	NULL 			
loan_id 	int 	Yes 	NULL 			
loan_application_id 	int 	Yes 	NULL 			
is_client 	tinyint 	No 	0 			
client_relationship_id 	int 	Yes 	NULL 			
amount 	decimal(65,4) 	Yes 	NULL 			
title 	varchar(191) 	Yes 	NULL 			
first_name 	varchar(191) 	Yes 	NULL 			
middle_name 	varchar(191) 	Yes 	NULL 			
last_name 	varchar(191) 	Yes 	NULL 			
gender 	enum('male', 'female', 'other', 'unspecified') 	Yes 	NULL 			
dob 	date 	Yes 	NULL 			
street 	varchar(191) 	Yes 	NULL 			
address 	text 	Yes 	NULL 			
mobile 	varchar(191) 	Yes 	NULL 			
phone 	varchar(191) 	Yes 	NULL 			
email 	varchar(191) 	Yes 	NULL 			
picture 	text 	Yes 	NULL 			
work 	varchar(191) 	Yes 	NULL 			
work_address 	text 	Yes 	NULL 			
lock_funds 	tinyint 	No 	0 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	7 	A 	No 	
induction_checklists
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
user_id 	int 	No 				
item 	varchar(191) 	No 				
completed 	tinyint(1) 	No 	0 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	378 	A 	No 	
job_positions
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	No 				
status 	tinyint(1) 	No 	1 			
job_description 	varchar(191) 	No 				
date_added 	datetime 	No 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	19 	A 	No 	
leave_days
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
user_id 	int 	No 				
office_id 	int 	No 				
first_name 	varchar(255) 	No 				
last_name 	varchar(255) 	No 				
department 	varchar(255) 	No 				
position 	varchar(255) 	No 				
reason 	enum('annual leave', 'compassionate leave', 'maternity leave', 'parental leave', 'sick') 	No 				
commencement_date 	date 	No 				
return_date 	date 	No 				
date_requested 	date 	No 				
notes 	varchar(255) 	No 				
date_approved 	date 	Yes 	NULL 			
approved_by_id 	varchar(30) 	Yes 	NULL 			
declined_by_id 	varchar(30) 	Yes 	NULL 			
status 	enum('pending', 'approved', 'declined') 	No 	pending 			
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
updated_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1403 	A 	No 	
ledger_income
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
office_id 	int 	No 				
amount 	decimal(10,2) 	No 				
date 	date 	No 				
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
updated_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
legal_filings
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
recovery_case_id 	bigint 	No 				
created_by 	bigint 	No 				
filing_type 	varchar(191) 	No 				
reference_number 	varchar(191) 	Yes 	NULL 			
law_firm 	varchar(191) 	Yes 	NULL 			
filed_date 	date 	No 				
hearing_date 	date 	Yes 	NULL 			
court_name 	varchar(191) 	Yes 	NULL 			
outcome 	varchar(191) 	Yes 	NULL 			
cost 	decimal(15,2) 	No 	0.00 			
amount_recovered 	decimal(15,2) 	No 	0.00 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
loans
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
reloan_id 	int 	Yes 	0 			
client_type 	enum('client', 'group') 	No 	client 			
loan_product_id 	int 	Yes 	NULL 			
client_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
district_id 	bigint 	Yes 	NULL 			
district_regional_id 	bigint 	Yes 	NULL 			
group_id 	int 	Yes 	NULL 			
fund_id 	int 	Yes 	NULL 			
loan_purpose_id 	int 	Yes 	NULL 			
currency_id 	int 	Yes 	NULL 			
decimals 	int 	No 	2 			
account_number 	varchar(191) 	Yes 	NULL 			
external_id 	varchar(191) 	Yes 	NULL 			
loan_officer_id 	int 	Yes 	NULL 			
principal 	decimal(65,4) 	Yes 	NULL 			
applied_amount 	decimal(65,4) 	Yes 	NULL 			
approved_amount 	decimal(65,4) 	Yes 	NULL 			
principal_derived 	decimal(65,4) 	Yes 	NULL 			
interest_derived 	decimal(65,4) 	Yes 	NULL 			
fees_derived 	decimal(65,4) 	Yes 	NULL 			
penalty_derived 	decimal(65,4) 	Yes 	NULL 			
disbursement_fees 	decimal(65,4) 	Yes 	NULL 			
processing_fee 	decimal(65,4) 	Yes 	NULL 			
loan_term 	int 	Yes 	NULL 			
loan_term_type 	enum('days', 'weeks', 'months', 'years') 	Yes 	NULL 			
repayment_frequency 	int 	Yes 	NULL 			
repayment_frequency_type 	enum('days', 'weeks', 'months', 'years') 	Yes 	NULL 			
override_interest 	tinyint 	Yes 	0 			
interest_rate 	decimal(65,4) 	Yes 	NULL 			
override_interest_rate 	decimal(65,4) 	Yes 	NULL 			
interest_rate_type 	enum('day', 'week', 'month', 'year') 	Yes 	NULL 			
expected_disbursement_date 	date 	Yes 	NULL 			
disbursement_date 	date 	Yes 	NULL 			
expected_maturity_date 	date 	Yes 	NULL 			
expected_first_repayment_date 	date 	Yes 	NULL 			
repayments_number 	int 	Yes 	NULL 			
first_repayment_date 	date 	Yes 	NULL 			
interest_method 	enum('flat', 'declining_balance') 	Yes 	NULL 			
armotization_method 	enum('equal_installment', 'equal_principal') 	Yes 	NULL 			
grace_on_interest_charged 	int 	Yes 	NULL 			
grace_on_principal 	int 	Yes 	NULL 			
grace_on_interest_payment 	int 	Yes 	NULL 			
status 	enum('new', 'pending', 'approved', 'need_changes', 'disbursed', 'declined', 'rejected', 'withdrawn', 'written_off', 'closed', 'pending_reschedule', 'rescheduled', 'paid') 	No 	pending 			
created_by_id 	int 	Yes 	NULL 			
modified_by_id 	int 	Yes 	NULL 			
approved_by_id 	int 	Yes 	NULL 			
need_changes_by_id 	int 	Yes 	NULL 			
withdrawn_by_id 	int 	Yes 	NULL 			
declined_by_id 	int 	Yes 	NULL 			
written_off_by_id 	int 	Yes 	NULL 			
disbursed_by_id 	int 	Yes 	NULL 			
rescheduled_by_id 	int 	Yes 	NULL 			
closed_by_id 	int 	Yes 	NULL 			
created_date 	date 	Yes 	NULL 			
modified_date 	date 	Yes 	NULL 			
approved_date 	date 	Yes 	NULL 			
need_changes_date 	date 	Yes 	NULL 			
withdrawn_date 	date 	Yes 	NULL 			
declined_date 	date 	Yes 	NULL 			
written_off_date 	date 	Yes 	NULL 			
rescheduled_date 	date 	Yes 	NULL 			
closed_date 	date 	Yes 	NULL 			
month 	varchar(191) 	Yes 	NULL 			
year 	varchar(191) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
approved_notes 	text 	Yes 	NULL 			
declined_notes 	text 	Yes 	NULL 			
written_off_notes 	text 	Yes 	NULL 			
disbursed_notes 	text 	Yes 	NULL 			
withdrawn_notes 	text 	Yes 	NULL 			
rescheduled_notes 	text 	Yes 	NULL 			
closed_notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
deleted_at 	timestamp 	Yes 	NULL 			
defaulted 	text 	Yes 	NULL 			
vetted_by 	int 	Yes 	NULL 			
verified_by 	int 	Yes 	NULL 			
tag 	int 	Yes 	NULL 			
expected_amount 	int 	Yes 	NULL 			
reloaned 	varchar(11) 	Yes 	NULL 			
cycle_date 	date 	Yes 	NULL 			
parent_id 	int 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	116545 	A 	No 	
loan_applications
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
client_type 	enum('client', 'group') 	No 	client 			
user_id 	int 	Yes 	NULL 			
staff_id 	int 	Yes 	NULL 			
loan_id 	int 	Yes 	NULL 			
loan_purpose_id 	int 	Yes 	NULL 			
currency_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
client_id 	int 	Yes 	NULL 			
group_id 	int 	Yes 	NULL 			
loan_product_id 	int 	No 				
amount 	decimal(65,4) 	No 	0.0000 			
status 	enum('approved', 'pending', 'declined') 	No 	pending 			
guarantor_ids 	text 	Yes 	NULL 			
loan_term 	int 	Yes 	NULL 			
loan_term_type 	enum('days', 'weeks', 'months', 'years') 	Yes 	NULL 			
approved_by_id 	int 	Yes 	NULL 			
declined_by_id 	int 	Yes 	NULL 			
approved_notes 	text 	Yes 	NULL 			
declined_notes 	text 	Yes 	NULL 			
declined_date 	date 	Yes 	NULL 			
approved_date 	date 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	7 	A 	No 	
loan_charges
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
loan_id 	int 	Yes 	NULL 			
charge_id 	int 	Yes 	NULL 			
penalty 	tinyint 	No 	0 			
waived 	tinyint 	No 	0 			
charge_type 	enum('disbursement', 'disbursement_repayment', 'specified_due_date', 'installment_fee', 'overdue_installment_fee', 'loan_rescheduling_fee', 'overdue_maturity') 	No 				
charge_option 	enum('flat', 'percentage', 'installment_principal_due', 'installment_principal_interest_due', 'installment_interest_due', 'installment_total_due', 'total_due', 'original_principal') 	No 				
amount 	decimal(65,2) 	Yes 	NULL 			
amount_paid 	decimal(65,2) 	Yes 	NULL 			
due_date 	date 	Yes 	NULL 			
grace_period 	int 	No 	0 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
loan_products
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
created_by_id 	int 	Yes 	NULL 			
name 	varchar(191) 	Yes 	NULL 			
short_name 	varchar(191) 	Yes 	NULL 			
description 	text 	Yes 	NULL 			
fund_id 	int 	Yes 	NULL 			
currency_id 	int 	Yes 	NULL 			
decimals 	int 	No 	2 			
minimum_principal 	decimal(65,4) 	Yes 	NULL 			
default_principal 	decimal(65,4) 	Yes 	NULL 			
maximum_principal 	decimal(65,4) 	Yes 	NULL 			
minimum_loan_term 	int 	Yes 	NULL 			
default_loan_term 	int 	Yes 	NULL 			
maximum_loan_term 	int 	Yes 	NULL 			
repayment_frequency 	int 	Yes 	NULL 			
repayment_frequency_type 	enum('days', 'weeks', 'months', 'years') 	Yes 	NULL 			
minimum_interest_rate 	decimal(65,4) 	Yes 	NULL 			
default_interest_rate 	decimal(65,4) 	Yes 	NULL 			
maximum_interest_rate 	decimal(65,4) 	Yes 	NULL 			
interest_rate_type 	enum('day', 'week', 'month', 'year') 	Yes 	NULL 			
grace_on_interest_charged 	int 	Yes 	NULL 			
grace_on_principal 	int 	Yes 	NULL 			
grace_on_interest_payment 	int 	Yes 	NULL 			
allow_custom_grace 	tinyint 	No 	0 			
allow_standing_instuctions 	tinyint 	No 	0 			
interest_method 	enum('flat', 'declining_balance') 	Yes 	NULL 			
armotization_method 	enum('equal_installment', 'equal_principal') 	Yes 	NULL 			
interest_calculation_period_type 	enum('daily', 'same') 	No 	same 			
year_days 	enum('actual', '360', '364', '365') 	No 	365 			
month_days 	enum('actual', '30', '31') 	No 	30 			
loan_transaction_strategy 	enum('penalty_fees_interest_principal', 'principal_interest_penalty_fees', 'interest_principal_penalty_fees') 	No 	interest_principal_penalty_fees 			
include_in_cycle 	tinyint 	No 	0 			
lock_guarantee 	tinyint 	No 	0 			
allocate_overpayments 	tinyint 	No 	0 			
allow_additional_charges 	tinyint 	No 	0 			
accounting_rule 	enum('none', 'cash', 'accrual_periodic', 'accrual_upfront') 	No 	cash 			
npa_days 	int 	Yes 	NULL 			
arrears_grace_days 	int 	Yes 	NULL 			
npa_suspend_income 	tinyint 	No 	0 			
gl_account_fund_source_id 	int 	Yes 	NULL 			
gl_account_loan_portfolio_id 	int 	Yes 	NULL 			
gl_account_receivable_interest_id 	int 	Yes 	NULL 			
gl_account_receivable_fee_id 	int 	Yes 	NULL 			
gl_account_receivable_penalty_id 	int 	Yes 	NULL 			
gl_account_loan_over_payments_id 	int 	Yes 	NULL 			
gl_account_suspended_income_id 	int 	Yes 	NULL 			
gl_account_income_interest_id 	int 	Yes 	NULL 			
gl_account_income_fee_id 	int 	Yes 	NULL 			
gl_account_income_penalty_id 	int 	Yes 	NULL 			
gl_account_income_recovery_id 	int 	Yes 	NULL 			
gl_account_loans_written_off_id 	int 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	3 	A 	No 	
loan_product_charges
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
loan_product_id 	int 	Yes 	NULL 			
charge_id 	int 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
loan_provisioning_criteria
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
created_by_id 	int 	Yes 	NULL 			
name 	text 	Yes 	NULL 			
min 	int 	Yes 	NULL 			
max 	int 	Yes 	NULL 			
percentage 	int 	Yes 	NULL 			
gl_account_liability_id 	int 	Yes 	NULL 			
gl_account_expense_id 	int 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
active 	tinyint 	No 	1 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	5 	A 	No 	
loan_purposes
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	3 	A 	No 	
loan_repayment_schedules
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
loan_id 	int 	Yes 	NULL 			
installment 	int 	Yes 	NULL 			
due_date 	date 	Yes 	NULL 			
from_date 	date 	Yes 	NULL 			
month 	varchar(191) 	Yes 	NULL 			
year 	varchar(191) 	Yes 	NULL 			
principal 	decimal(65,4) 	Yes 	NULL 			
principal_waived 	decimal(65,4) 	Yes 	NULL 			
principal_written_off 	decimal(65,4) 	Yes 	NULL 			
principal_paid 	decimal(65,4) 	Yes 	NULL 			
interest 	decimal(65,4) 	Yes 	NULL 			
interest_waived 	decimal(65,4) 	Yes 	NULL 			
interest_written_off 	decimal(65,4) 	Yes 	NULL 			
interest_paid 	decimal(65,4) 	Yes 	NULL 			
fees 	decimal(65,4) 	Yes 	NULL 			
fees_waived 	decimal(65,4) 	Yes 	NULL 			
fees_written_off 	decimal(65,4) 	Yes 	NULL 			
fees_paid 	decimal(65,4) 	Yes 	NULL 			
penalty 	decimal(65,4) 	Yes 	NULL 			
penalty_waived 	decimal(65,4) 	Yes 	NULL 			
penalty_written_off 	decimal(65,4) 	Yes 	NULL 			
penalty_paid 	decimal(65,4) 	Yes 	NULL 			
total_due 	decimal(65,4) 	Yes 	NULL 			
total_paid_advance 	decimal(65,4) 	Yes 	NULL 			
total_paid_late 	decimal(65,4) 	Yes 	NULL 			
paid 	tinyint 	No 	0 			
modified_by_id 	int 	Yes 	NULL 			
created_by_id 	int 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	175760 	A 	No 	
loan_reschedule_requests
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
loan_id 	int 	Yes 	NULL 			
principal 	decimal(65,4) 	Yes 	NULL 			
status 	enum('pending', 'approved', 'rejected') 	No 	pending 			
created_by_id 	int 	Yes 	NULL 			
modified_by_id 	int 	Yes 	NULL 			
approved_by_id 	int 	Yes 	NULL 			
rejected_by_id 	int 	Yes 	NULL 			
created_date 	date 	Yes 	NULL 			
modified_date 	date 	Yes 	NULL 			
approved_date 	date 	Yes 	NULL 			
rejected_date 	date 	Yes 	NULL 			
reschedule_from_date 	date 	Yes 	NULL 			
recalculate_interest 	int 	No 	0 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
loan_topup
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
date 	date 	Yes 	NULL 			
loan_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
created_by 	int 	Yes 	NULL 			
amount 	decimal(65,4) 	Yes 	NULL 			
balance_bf 	decimal(10,0) 	Yes 	NULL 			
balance_new 	decimal(10,0) 	Yes 	NULL 			
status 	varchar(191) 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1027 	A 	No 	
loan_transactions
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
is_recovery 	varchar(191) 	No 	0 			
loan_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
client_id 	int 	Yes 	NULL 			
payment_type_id 	int 	Yes 	NULL 			
transaction_type 	enum('repayment', 'repayment_disbursement', 'write_off', 'write_off_recovery', 'disbursement', 'interest_accrual', 'fee_accrual', 'penalty_accrual', 'deposit', 'withdrawal', 'manual_entry', 'pay_charge', 'transfer_fund', 'interest', 'income', 'fee', 'disbursement_fee', 'installment_fee', 'specified_due_date_fee', 'overdue_maturity', 'overdue_installment_fee', 'loan_rescheduling_fee', 'penalty', 'interest_waiver', 'charge_waiver', 'interest_initial') 	Yes 	repayment 			
created_by_id 	int 	Yes 	NULL 			
modified_by_id 	int 	Yes 	NULL 			
payment_detail_id 	int 	Yes 	NULL 			
charge_id 	int 	Yes 	NULL 			
loan_repayment_schedule_id 	int 	Yes 	NULL 			
debit 	decimal(65,4) 	Yes 	NULL 			
credit 	decimal(65,4) 	Yes 	NULL 			
balance 	decimal(65,4) 	Yes 	NULL 			
amount 	decimal(65,4) 	Yes 	NULL 			
reversible 	tinyint 	No 	0 			
reversed 	tinyint 	No 	0 			
reversal_type 	enum('system', 'user', 'none') 	No 	none 			
payment_apply_to 	enum('full_payment', 'part_payment', 'reloan_payment') 	Yes 	full_payment 			
status 	enum('pending', 'approved', 'declined') 	Yes 	pending 			
approved_by_id 	int 	Yes 	NULL 			
approved_date 	date 	Yes 	NULL 			
interest 	decimal(65,4) 	Yes 	NULL 			
principal 	decimal(65,4) 	Yes 	NULL 			
fee 	decimal(65,4) 	Yes 	NULL 			
penalty 	decimal(65,4) 	Yes 	NULL 			
overpayment 	decimal(65,4) 	Yes 	NULL 			
date 	date 	Yes 	NULL 			
month 	varchar(191) 	Yes 	NULL 			
year 	varchar(191) 	Yes 	NULL 			
receipt 	text 	Yes 	NULL 			
principal_derived 	decimal(65,4) 	Yes 	NULL 			
interest_derived 	decimal(65,4) 	Yes 	NULL 			
fees_derived 	decimal(65,4) 	Yes 	NULL 			
penalty_derived 	decimal(65,4) 	Yes 	NULL 			
overpayment_derived 	decimal(65,4) 	Yes 	NULL 			
unrecognized_income_derived 	decimal(65,4) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
deleted_at 	timestamp 	Yes 	NULL 			
balance_bf 	decimal(65,4) 	Yes 	NULL 			
temp_id 	int 	Yes 	NULL 			
cycle_date 	date 	Yes 	NULL 			
recovery 	tinyint(1) 	No 	0 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	613686 	A 	No 	
idx_loan_transactions_loan_id 	BTREE 	No 	No 	loan_id 	120932 	A 	Yes 	
idx_loan_transactions_date 	BTREE 	No 	No 	date 	1047 	A 	Yes 	
idx_loan_transactions_loan_date 	BTREE 	No 	No 	loan_id 	125936 	A 	Yes 	
date 	392255 	A 	Yes
loan_transactions_pending
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
loan_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
client_id 	int 	Yes 	NULL 			
payment_type_id 	int 	Yes 	NULL 			
transaction_type 	enum('repayment', 'repayment_disbursement', 'write_off', 'write_off_recovery', 'disbursement', 'interest_accrual', 'fee_accrual', 'penalty_accrual', 'deposit', 'withdrawal', 'manual_entry', 'pay_charge', 'transfer_fund', 'interest', 'income', 'fee', 'disbursement_fee', 'installment_fee', 'specified_due_date_fee', 'overdue_maturity', 'overdue_installment_fee', 'loan_rescheduling_fee', 'penalty', 'interest_waiver', 'charge_waiver', 'interest_initial') 	Yes 	repayment 			
created_by_id 	int 	Yes 	NULL 			
modified_by_id 	int 	Yes 	NULL 			
payment_detail_id 	int 	Yes 	NULL 			
charge_id 	int 	Yes 	NULL 			
loan_repayment_schedule_id 	int 	Yes 	NULL 			
debit 	decimal(65,4) 	Yes 	NULL 			
credit 	decimal(65,4) 	Yes 	NULL 			
balance 	decimal(65,4) 	Yes 	NULL 			
amount 	decimal(65,4) 	Yes 	NULL 			
reversible 	tinyint 	No 	0 			
reversed 	tinyint 	No 	0 			
reversal_type 	enum('system', 'user', 'none') 	No 	none 			
payment_apply_to 	enum('full_payment', 'part_payment', 'reloan_payment') 	Yes 	full_payment 			
status 	enum('pending', 'approved', 'declined') 	Yes 	pending 			
approved_by_id 	int 	Yes 	NULL 			
approved_date 	date 	Yes 	NULL 			
interest 	decimal(65,4) 	Yes 	NULL 			
principal 	decimal(65,4) 	Yes 	NULL 			
fee 	decimal(65,4) 	Yes 	NULL 			
penalty 	decimal(65,4) 	Yes 	NULL 			
overpayment 	decimal(65,4) 	Yes 	NULL 			
date 	date 	Yes 	NULL 			
month 	varchar(191) 	Yes 	NULL 			
year 	varchar(191) 	Yes 	NULL 			
receipt 	text 	Yes 	NULL 			
principal_derived 	decimal(65,4) 	Yes 	NULL 			
interest_derived 	decimal(65,4) 	Yes 	NULL 			
fees_derived 	decimal(65,4) 	Yes 	NULL 			
penalty_derived 	decimal(65,4) 	Yes 	NULL 			
overpayment_derived 	decimal(65,4) 	Yes 	NULL 			
unrecognized_income_derived 	decimal(65,4) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
deleted_at 	timestamp 	Yes 	NULL 			
balance_bf 	decimal(65,4) 	Yes 	NULL 			
cycle_date 	date 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
loan_transactions_pp_fp
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
is_recovery 	varchar(191) 	No 	0 			
loan_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
client_id 	int 	Yes 	NULL 			
payment_type_id 	int 	Yes 	NULL 			
transaction_type 	enum('repayment', 'repayment_disbursement', 'write_off', 'write_off_recovery', 'disbursement', 'interest_accrual', 'fee_accrual', 'penalty_accrual', 'deposit', 'withdrawal', 'manual_entry', 'pay_charge', 'transfer_fund', 'interest', 'income', 'fee', 'disbursement_fee', 'installment_fee', 'specified_due_date_fee', 'overdue_maturity', 'overdue_installment_fee', 'loan_rescheduling_fee', 'penalty', 'interest_waiver', 'charge_waiver', 'interest_initial') 	Yes 	repayment 			
created_by_id 	int 	Yes 	NULL 			
modified_by_id 	int 	Yes 	NULL 			
payment_detail_id 	int 	Yes 	NULL 			
charge_id 	int 	Yes 	NULL 			
loan_repayment_schedule_id 	int 	Yes 	NULL 			
debit 	decimal(65,4) 	Yes 	NULL 			
credit 	decimal(65,4) 	Yes 	NULL 			
balance 	decimal(65,4) 	Yes 	NULL 			
amount 	decimal(65,4) 	Yes 	NULL 			
reversible 	tinyint 	No 	0 			
reversed 	tinyint 	No 	0 			
reversal_type 	enum('system', 'user', 'none') 	No 	none 			
payment_apply_to 	enum('full_payment', 'part_payment', 'reloan_payment', 'debt_recovery') 	Yes 	NULL 			
status 	enum('pending', 'approved', 'declined') 	Yes 	pending 			
approved_by_id 	int 	Yes 	NULL 			
approved_date 	date 	Yes 	NULL 			
interest 	decimal(65,4) 	Yes 	NULL 			
principal 	decimal(65,4) 	Yes 	NULL 			
fee 	decimal(65,4) 	Yes 	NULL 			
penalty 	decimal(65,4) 	Yes 	NULL 			
overpayment 	decimal(65,4) 	Yes 	NULL 			
date 	date 	Yes 	NULL 			
month 	varchar(191) 	Yes 	NULL 			
year 	varchar(191) 	Yes 	NULL 			
receipt 	text 	Yes 	NULL 			
principal_derived 	decimal(65,4) 	Yes 	NULL 			
interest_derived 	decimal(65,4) 	Yes 	NULL 			
fees_derived 	decimal(65,4) 	Yes 	NULL 			
penalty_derived 	decimal(65,4) 	Yes 	NULL 			
overpayment_derived 	decimal(65,4) 	Yes 	NULL 			
unrecognized_income_derived 	decimal(65,4) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
deleted_at 	timestamp 	Yes 	NULL 			
balance_bf 	decimal(65,4) 	Yes 	NULL 			
payment_type_id_pd 	int 	Yes 	NULL 			
account_number 	varchar(191) 	Yes 	NULL 			
cheque_number 	varchar(191) 	Yes 	NULL 			
routing_code 	varchar(191) 	Yes 	NULL 			
receipt_number 	varchar(191) 	Yes 	NULL 			
bank 	varchar(191) 	Yes 	NULL 			
notes_pd 	text 	Yes 	NULL 			
request_id 	int 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	55 	A 	No 	
loan_transactions_requests
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
loan_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
client_id 	int 	Yes 	NULL 			
payment_type_id 	int 	Yes 	NULL 			
transaction_type 	enum('repayment', 'repayment_disbursement', 'write_off', 'write_off_recovery', 'disbursement', 'interest_accrual', 'fee_accrual', 'penalty_accrual', 'deposit', 'withdrawal', 'manual_entry', 'pay_charge', 'transfer_fund', 'interest', 'income', 'fee', 'disbursement_fee', 'installment_fee', 'specified_due_date_fee', 'overdue_maturity', 'overdue_installment_fee', 'loan_rescheduling_fee', 'penalty', 'interest_waiver', 'charge_waiver', 'interest_initial') 	Yes 	repayment 			
created_by_id 	int 	Yes 	NULL 			
modified_by_id 	int 	Yes 	NULL 			
payment_detail_id 	int 	Yes 	NULL 			
charge_id 	int 	Yes 	NULL 			
loan_repayment_schedule_id 	int 	Yes 	NULL 			
debit 	decimal(65,4) 	Yes 	NULL 			
credit 	decimal(65,4) 	Yes 	NULL 			
balance 	decimal(65,4) 	Yes 	NULL 			
amount 	decimal(65,4) 	Yes 	NULL 			
reversible 	tinyint 	No 	0 			
reversed 	tinyint 	No 	0 			
reversal_type 	enum('system', 'user', 'none') 	No 	none 			
payment_apply_to 	enum('full_payment', 'part_payment', 'reloan_payment') 	Yes 	full_payment 			
status 	enum('pending', 'approved', 'declined') 	Yes 	pending 			
approved_by_id 	int 	Yes 	NULL 			
approved_date 	date 	Yes 	NULL 			
interest 	decimal(65,4) 	Yes 	NULL 			
principal 	decimal(65,4) 	Yes 	NULL 			
fee 	decimal(65,4) 	Yes 	NULL 			
penalty 	decimal(65,4) 	Yes 	NULL 			
overpayment 	decimal(65,4) 	Yes 	NULL 			
date 	date 	Yes 	NULL 			
month 	varchar(191) 	Yes 	NULL 			
year 	varchar(191) 	Yes 	NULL 			
receipt 	text 	Yes 	NULL 			
principal_derived 	decimal(65,4) 	Yes 	NULL 			
interest_derived 	decimal(65,4) 	Yes 	NULL 			
fees_derived 	decimal(65,4) 	Yes 	NULL 			
penalty_derived 	decimal(65,4) 	Yes 	NULL 			
overpayment_derived 	decimal(65,4) 	Yes 	NULL 			
unrecognized_income_derived 	decimal(65,4) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
deleted_at 	timestamp 	Yes 	NULL 			
balance_bf 	decimal(65,4) 	Yes 	NULL 			
cycle_date 	date 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	21 	A 	No 	
loan_transaction_repayment_schedule_mappings
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
loan_repayment_schedule_id 	int 	Yes 	NULL 			
loan_transaction_id 	int 	Yes 	NULL 			
interest 	decimal(65,4) 	Yes 	NULL 			
principal 	decimal(65,4) 	Yes 	NULL 			
fee 	decimal(65,4) 	Yes 	NULL 			
penalty 	decimal(65,4) 	Yes 	NULL 			
overpayment 	decimal(65,4) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
migrations
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
migration 	varchar(191) 	No 				
batch 	int 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	143 	A 	No 	
new_payroll
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
user_id 	int 	Yes 	NULL 			
basic_pay 	decimal(10,2) 	Yes 	NULL 			
charges 	decimal(10,2) 	Yes 	NULL 			
allowances 	decimal(10,2) 	Yes 	NULL 			
salary_deductions 	decimal(10,2) 	Yes 	NULL 			
created_at 	datetime 	Yes 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	208 	A 	No 	
notes
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
reference_id 	int 	Yes 	NULL 			
type 	enum('client', 'loan', 'group', 'savings', 'identification', 'shares', 'repayment') 	Yes 	NULL 			
created_by_id 	int 	Yes 	NULL 			
modified_by_id 	int 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	149 	A 	No 	
notifix
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
user_id 	bigint 	No 				
office_id 	bigint 	Yes 	NULL 			
district_id 	bigint 	Yes 	NULL 			
province_id 	bigint 	Yes 	NULL 			
to_id 	bigint 	Yes 	NULL 			
unread 	tinyint(1) 	No 	1 			
positions 	json 	Yes 	NULL 			
note 	json 	No 				
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	144 	A 	No 	
notifix_user_id_unique 	BTREE 	Yes 	No 	user_id 	152 	A 	No 	
offices
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
parent_id 	int 	Yes 	NULL 			
external_id 	varchar(191) 	Yes 	NULL 			
opening_date 	date 	Yes 	NULL 			
branch_capacity 	int 	Yes 	NULL 			
address 	text 	Yes 	NULL 			
phone 	text 	Yes 	NULL 			
email 	text 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
manager_id 	int 	Yes 	NULL 			
active 	tinyint 	Yes 	1 			
default_office 	tinyint 	Yes 	0 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
deleted_at 	timestamp 	Yes 	NULL 			
province_id 	int 	Yes 	NULL 			
district_id 	int 	Yes 	NULL 			
district_regional_id 	int 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	46 	A 	No 	
office_transactions
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
from_office_id 	int 	Yes 	NULL 			
to_office_id 	int 	Yes 	NULL 			
currency_id 	int 	Yes 	NULL 			
amount 	decimal(65,8) 	Yes 	NULL 			
date 	date 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
other_income
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
office_id 	int 	Yes 	NULL 			
created_by_id 	int 	Yes 	NULL 			
other_income_type_id 	int 	Yes 	NULL 			
name 	varchar(191) 	Yes 	NULL 			
amount 	decimal(65,2) 	No 	0.00 			
date 	date 	Yes 	NULL 			
year 	varchar(191) 	Yes 	NULL 			
month 	varchar(191) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
files 	text 	Yes 	NULL 			
status 	enum('pending', 'approved', 'declined') 	No 	approved 			
approved_date 	date 	Yes 	NULL 			
approved_by_id 	int 	Yes 	NULL 			
declined_date 	date 	Yes 	NULL 			
declined_by_id 	int 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
other_income_types
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
gl_account_asset_id 	int 	Yes 	NULL 			
gl_account_income_id 	int 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
parents
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
name 	varchar(255) 	Yes 	NULL 			
parent 	tinyint 	Yes 	0 			
type 	varchar(2) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
payment_details
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
payment_type_id 	int 	Yes 	NULL 			
account_number 	varchar(191) 	Yes 	NULL 			
cheque_number 	varchar(191) 	Yes 	NULL 			
routing_code 	varchar(191) 	Yes 	NULL 			
receipt_number 	varchar(191) 	Yes 	NULL 			
bank 	varchar(191) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	269173 	A 	No 	
payment_types
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
is_cash 	tinyint 	No 	0 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
payment_type_details
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
type 	enum('loan', 'savings', 'share', 'client', 'journal') 	Yes 	NULL 			
reference_id 	int 	No 				
account_number 	varchar(191) 	Yes 	NULL 			
cheque_number 	varchar(191) 	Yes 	NULL 			
routing_code 	varchar(191) 	Yes 	NULL 			
receipt_number 	varchar(191) 	Yes 	NULL 			
bank 	varchar(191) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
payroll
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
payroll_template_id 	int 	Yes 	NULL 			
gl_account_expense_id 	int 	Yes 	NULL 			
gl_account_asset_id 	int 	Yes 	NULL 			
user_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
employee_name 	varchar(191) 	Yes 	NULL 			
business_name 	varchar(191) 	Yes 	NULL 			
payment_method 	varchar(191) 	Yes 	NULL 			
payment_type_id 	varchar(191) 	Yes 	NULL 			
bank_name 	varchar(191) 	Yes 	NULL 			
account_number 	varchar(191) 	Yes 	NULL 			
description 	varchar(191) 	Yes 	NULL 			
comments 	text 	Yes 	NULL 			
paid_amount 	decimal(10,2) 	No 	0.00 			
date 	date 	Yes 	NULL 			
year 	varchar(191) 	Yes 	NULL 			
month 	varchar(191) 	Yes 	NULL 			
recurring 	tinyint 	No 	0 			
recur_frequency 	varchar(191) 	No 	31 			
recur_start_date 	date 	Yes 	NULL 			
recur_end_date 	date 	Yes 	NULL 			
recur_next_date 	date 	Yes 	NULL 			
recur_type 	enum('days', 'weeks', 'months', 'years') 	No 	months 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
payroll_date 	date 	Yes 	NULL 			
status 	varchar(191) 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	163 	A 	No 	
payroll_applicant
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
client_name 	varchar(191) 	Yes 	NULL 			
nrc 	varchar(191) 	Yes 	NULL 			
dob 	date 	Yes 	NULL 			
gender 	enum('male', 'female', 'other') 	Yes 	NULL 			
email 	varchar(191) 	Yes 	NULL 			
phone 	varchar(191) 	Yes 	NULL 			
home_address 	varchar(191) 	Yes 	NULL 			
employer_name 	varchar(191) 	Yes 	NULL 			
employee_id 	varchar(191) 	Yes 	NULL 			
job_title 	varchar(191) 	Yes 	NULL 			
length_of_service 	varchar(191) 	Yes 	NULL 			
monthly_service 	varchar(191) 	Yes 	NULL 			
work_address 	varchar(191) 	Yes 	NULL 			
work_phone 	varchar(191) 	Yes 	NULL 			
amount 	decimal(65,4) 	Yes 	NULL 			
loan_term 	varchar(191) 	Yes 	NULL 			
purpose_of_loan 	text 	Yes 	NULL 			
deduction_amount 	decimal(65,4) 	Yes 	NULL 			
admin_fees 	decimal(65,4) 	Yes 	NULL 			
net_amount 	decimal(65,4) 	Yes 	NULL 			
repayment_date 	date 	Yes 	NULL 			
bank_name 	varchar(191) 	Yes 	NULL 			
bank_account 	varchar(191) 	Yes 	NULL 			
bank_short_code 	varchar(191) 	Yes 	NULL 			
branch_name 	varchar(191) 	Yes 	NULL 			
branch_code 	varchar(191) 	Yes 	NULL 			
nrc_file 	varchar(191) 	Yes 	NULL 			
payslip_file 	varchar(191) 	Yes 	NULL 			
bank_statement 	varchar(191) 	Yes 	NULL 			
status 	enum('pending', 'approved', 'declined') 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	122 	A 	No 	
payroll_meta
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
payroll_id 	int 	No 				
user_id 	int 	No 				
payroll_template_meta_id 	int 	Yes 	NULL 			
value 	decimal(65,2) 	Yes 	NULL 			
is_tax 	tinyint 	Yes 	0 			
is_percentage 	tinyint 	Yes 	0 			
position 	enum('top_left', 'top_right', 'bottom_left', 'bottom_right') 	Yes 	bottom_left 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1182 	A 	No 	
payroll_templates
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
picture 	varchar(191) 	Yes 	NULL 			
active 	tinyint 	Yes 	1 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
payroll_template_meta
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
payroll_template_id 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
position 	enum('top_left', 'top_right', 'bottom_left', 'bottom_right', 'none') 	Yes 	bottom_left 			
type 	enum('addition', 'deduction') 	Yes 	addition 			
is_default 	tinyint 	No 	0 			
is_tax 	tinyint 	No 	0 			
is_percentage 	tinyint 	No 	0 			
tax_on 	enum('net', 'gross') 	Yes 	net 			
default_value 	decimal(65,2) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	6 	A 	No 	
permissions
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
parent_id 	int 	Yes 	0 			
name 	varchar(191) 	No 				
slug 	varchar(191) 	Yes 	NULL 			
description 	text 	Yes 	NULL 			

No index defined!
persistences
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
user_id 	int 	No 				
code 	varchar(191) 	No 				
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
policies
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
category_id 	bigint 	Yes 	NULL 	policy_categories -> id 		
access_level 	enum('all', 'managerial') 	No 	all 			
created_by 	int 	Yes 	NULL 			
title 	varchar(255) 	No 				
description 	text 	Yes 	NULL 			
file_path 	varchar(255) 	Yes 	NULL 			
file_url 	varchar(255) 	Yes 	NULL 			
file_name 	varchar(255) 	Yes 	NULL 			
file_size 	int 	Yes 	NULL 			
file_type 	varchar(100) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
updated_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
policy_type 	enum('all_staff', 'management', 'hr', 'finance', 'it', 'operations') 	No 	all_staff 			
document_type 	varchar(50) 	Yes 	company_policies 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	7 	A 	No 	
policies_category_id_foreign 	BTREE 	No 	No 	category_id 	3 	A 	Yes 	
policy_categories
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
name 	varchar(191) 	No 				
slug 	varchar(191) 	No 				
description 	text 	Yes 	NULL 			
sort_order 	int 	No 	0 			
is_active 	tinyint(1) 	No 	1 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	3 	A 	No 	
policy_categories_slug_unique 	BTREE 	Yes 	No 	slug 	3 	A 	No 	
province
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	10 	A 	No 	
quizzes
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
course_topic_id 	bigint 	No 		course_topics -> id 		
title 	varchar(191) 	No 				
description 	text 	Yes 	NULL 			
passing_score 	int 	No 	70 			
time_limit 	int 	Yes 	NULL 		Time limit in minutes 	
is_active 	tinyint(1) 	No 	1 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
quizzes_course_topic_id_foreign 	BTREE 	No 	No 	course_topic_id 	0 	A 	No 	
quiz_attempts
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
quiz_id 	bigint 	No 				
user_id 	bigint 	No 				
score 	int 	No 	0 			
total_points 	int 	No 	0 			
percentage 	int 	No 	0 			
passed 	tinyint(1) 	No 	0 			
started_at 	timestamp 	Yes 	NULL 			
completed_at 	timestamp 	Yes 	NULL 			
answers 	json 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	2 	A 	No 	
quiz_attempts_quiz_id_index 	BTREE 	No 	No 	quiz_id 	1 	A 	No 	
quiz_attempts_user_id_index 	BTREE 	No 	No 	user_id 	1 	A 	No 	
quiz_options
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
quiz_question_id 	bigint 	No 		quiz_questions -> id 		
option_text 	text 	No 				
is_correct 	tinyint(1) 	No 	0 			
sort_order 	int 	No 	0 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
quiz_options_quiz_question_id_foreign 	BTREE 	No 	No 	quiz_question_id 	0 	A 	No 	
quiz_questions
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
quiz_id 	bigint 	No 		quizzes -> id 		
question 	text 	No 				
question_type 	varchar(191) 	No 	multiple_choice 		multiple_choice, true_false, short_answer 	
sort_order 	int 	No 	0 			
points 	int 	No 	1 			
explanation 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
quiz_questions_quiz_id_foreign 	BTREE 	No 	No 	quiz_id 	0 	A 	No 	
recoveries_tags
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	Yes 	NULL 			
details 	varchar(191) 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	5 	A 	No 	
recovery_activities
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
recovery_case_id 	bigint 	No 				
performed_by 	bigint 	No 				
activity_type 	enum('status_change', 'payment_received', 'field_visit', 'phone_call', 'sms_sent', 'whatsapp_sent', 'legal_filing', 'court_hearing', 'asset_seizure', 'skip_trace_attempt', 'guarantor_contact', 'payment_plan_negotiated', 'case_handover', 'note_added', 'document_uploaded', 'cost_incurred') 	No 				
description 	varchar(191) 	No 				
status_before 	varchar(191) 	Yes 	NULL 			
status_after 	varchar(191) 	Yes 	NULL 			
amount_collected 	decimal(15,2) 	Yes 	NULL 			
cost_incurred 	decimal(15,2) 	Yes 	NULL 			
outcome 	varchar(191) 	Yes 	NULL 			
metadata 	json 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	812 	A 	No 	
recovery_activities_recovery_case_id_created_at_index 	BTREE 	No 	No 	recovery_case_id 	812 	A 	No 	
created_at 	812 	A 	Yes
recovery_activities_performed_by_index 	BTREE 	No 	No 	performed_by 	23 	A 	No 	
recovery_cases
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
case_number 	varchar(191) 	No 				
client_id 	bigint 	No 				
origin_branch_id 	bigint 	No 				
supporting_branch_id 	bigint 	Yes 	NULL 			
assigned_specialist_id 	bigint 	Yes 	NULL 			
loan_id 	bigint 	No 				
category 	enum('cross_branch', 'escalated', 'dormant', 'legal', 'skip_trace') 	No 				
status 	enum('runaway_pending_confirmation', 'runaway_active_recovery', 'recovered_runaway', 'escalated_handover', 'escalated_in_review', 'escalated_active_recovery', 'recovered_post_escalation', 'dormant_for_revival', 'recovery_revived', 'pre_litigation_review', 'legal_filed', 'legal_active', 'legal_judgment_won', 'recovered_legal', 'skip_trace_required', 'skip_trace_digital_review', 'skip_trace_contact_reengagement', 'skip_trace_field_intel_active', 'located_for_recovery', 'closed', 'written_off') 	No 	escalated_handover 			
loan_outstanding_amount 	decimal(15,2) 	No 				
amount_recovered 	decimal(15,2) 	No 	0.00 			
recovery_costs 	decimal(15,2) 	No 	0.00 			
settlement_amount 	decimal(15,2) 	Yes 	NULL 			
escalated_by_user_id 	bigint 	Yes 	NULL 			
escalation_date 	date 	Yes 	NULL 			
days_past_due_at_escalation 	int 	Yes 	NULL 			
lc_contact_attempts 	int 	Yes 	NULL 			
recoveries_dept_attribution_pct 	decimal(5,2) 	No 	100.00 			
origin_branch_attribution_pct 	decimal(5,2) 	No 	0.00 			
supporting_branch_attribution_pct 	decimal(5,2) 	No 	0.00 			
legal_reference_number 	varchar(191) 	Yes 	NULL 			
lawyer_firm 	varchar(191) 	Yes 	NULL 			
legal_filed_date 	date 	Yes 	NULL 			
court_date 	date 	Yes 	NULL 			
legal_costs_incurred 	decimal(15,2) 	No 	0.00 			
enforcement_type 	enum('garnishee_order', 'warrant_of_distress', 'writ_of_execution', 'charging_order', 'judgment_debtor_summons', 'none') 	No 	none 			
skip_trace_tracking_code 	varchar(191) 	Yes 	NULL 			
client_located 	tinyint(1) 	No 	0 			
located_date 	date 	Yes 	NULL 			
skip_trace_costs 	decimal(15,2) 	No 	0.00 			
last_payment_date 	date 	Yes 	NULL 			
dormant_days 	int 	Yes 	NULL 			
revival_method 	varchar(191) 	Yes 	NULL 			
client_last_known_location 	varchar(191) 	Yes 	NULL 			
client_new_location 	varchar(191) 	Yes 	NULL 			
joint_field_visit_done 	tinyint(1) 	No 	0 			
notes 	text 	Yes 	NULL 			
target_resolution_date 	date 	Yes 	NULL 			
resolved_date 	date 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
deleted_at 	timestamp 	Yes 	NULL 			
approved_date 	date 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	819 	A 	No 	
recovery_cases_case_number_unique 	BTREE 	Yes 	No 	case_number 	819 	A 	No 	
recovery_cases_category_status_index 	BTREE 	No 	No 	category 	5 	A 	No 	
status 	5 	A 	No
recovery_cases_assigned_specialist_id_status_index 	BTREE 	No 	No 	assigned_specialist_id 	23 	A 	Yes 	
status 	23 	A 	No
recovery_cases_origin_branch_id_index 	BTREE 	No 	No 	origin_branch_id 	23 	A 	No 	
recovery_cases_case_number_index 	BTREE 	No 	No 	case_number 	819 	A 	No 	
recovery_documents
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
recovery_case_id 	bigint 	No 				
uploaded_by 	bigint 	No 				
document_type 	varchar(191) 	No 				
title 	varchar(191) 	No 				
file_path 	varchar(191) 	No 				
file_name 	varchar(191) 	No 				
mime_type 	varchar(191) 	No 				
file_size 	bigint 	No 				
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
deleted_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
recovery_guarantors
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
recovery_case_id 	bigint 	No 				
name 	varchar(191) 	No 				
phone 	varchar(191) 	Yes 	NULL 			
alt_phone 	varchar(191) 	Yes 	NULL 			
id_number 	varchar(191) 	Yes 	NULL 			
address 	text 	Yes 	NULL 			
employer 	varchar(191) 	Yes 	NULL 			
relationship_to_client 	varchar(191) 	Yes 	NULL 			
contact_attempts 	int 	No 	0 			
last_contacted_at 	timestamp 	Yes 	NULL 			
last_outcome 	varchar(191) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
recovery_nudges
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
recovery_case_id 	bigint 	No 				
sent_by 	bigint 	No 				
channel 	enum('sms', 'whatsapp') 	No 				
phone_number 	varchar(191) 	No 				
message 	text 	No 				
status 	enum('queued', 'sent', 'delivered', 'failed') 	No 	queued 			
gateway_response 	json 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
recovery_nudges_recovery_case_id_created_at_index 	BTREE 	No 	No 	recovery_case_id 	0 	A 	No 	
created_at 	0 	A 	Yes
recovery_nudges_sent_by_index 	BTREE 	No 	No 	sent_by 	0 	A 	No 	
recovery_payments
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
recovery_case_id 	bigint 	No 				
transaction_id 	bigint 	Yes 	NULL 			
recorded_by 	bigint 	No 				
receipt_number 	varchar(191) 	No 				
amount 	decimal(15,2) 	No 				
payment_method 	enum('cash', 'mobile_money', 'bank_transfer', 'cheque', 'payroll_deduction') 	No 				
payment_date 	date 	No 				
reference 	varchar(191) 	Yes 	NULL 			
payment_reference 	varchar(191) 	Yes 	NULL 			
bank_name 	varchar(191) 	Yes 	NULL 			
outstanding_before 	decimal(15,2) 	Yes 	NULL 			
outstanding_after 	decimal(15,2) 	Yes 	NULL 			
recoveries_dept_amount 	decimal(15,2) 	No 	0.00 			
origin_branch_amount 	decimal(15,2) 	No 	0.00 			
supporting_branch_amount 	decimal(15,2) 	No 	0.00 			
is_settlement 	tinyint(1) 	No 	0 			
is_full_payment 	tinyint(1) 	No 	0 			
notes 	text 	Yes 	NULL 			
status 	tinyint 	No 	0 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	12 	A 	No 	
recovery_payments_receipt_number_unique 	BTREE 	Yes 	No 	receipt_number 	12 	A 	No 	
recovery_payments_recovery_case_id_payment_date_index 	BTREE 	No 	No 	recovery_case_id 	7 	A 	No 	
payment_date 	9 	A 	No
recovery_specialist_targets
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
specialist_id 	bigint 	No 				
category 	enum('cross_branch', 'escalated', 'dormant', 'legal', 'skip_trace') 	No 				
year 	year 	No 				
month 	tinyint 	No 				
target_amount 	decimal(15,2) 	No 				
target_cases 	int 	No 	0 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
rst_specialist_category_year_month_unique 	BTREE 	Yes 	No 	specialist_id 	0 	A 	No 	
category 	0 	A 	No
year 	0 	A 	No
month 	0 	A 	No
reminders
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
user_id 	int 	No 				
code 	varchar(191) 	No 				
completed 	tinyint(1) 	No 	0 			
completed_at 	timestamp 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
report_scheduler
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
created_by_id 	int 	Yes 	NULL 			
description 	text 	Yes 	NULL 			
report_start_date 	date 	Yes 	NULL 			
report_start_time 	varchar(191) 	Yes 	NULL 			
recurrence_type 	enum('none', 'schedule') 	Yes 	NULL 			
recur_frequency 	enum('daily', 'monthly', 'weekly', 'yearly') 	Yes 	NULL 			
recur_interval 	varchar(191) 	Yes 	NULL 			
email_recipients 	text 	Yes 	NULL 			
email_subject 	varchar(191) 	Yes 	NULL 			
email_message 	text 	Yes 	NULL 			
email_attachment_file_format 	enum('pdf', 'csv', 'xls') 	Yes 	NULL 			
report_category 	enum('client_report', 'loan_report', 'financial_report', 'group_report', 'savings_report', 'organisation_report') 	Yes 	NULL 			
report_name 	enum('disbursed_loans_report', 'loan_portfolio_report', 'expected_repayments_report', 'repayments_report', 'collection_report', 'arrears_report', 'balance_sheet', 'trial_balance', 'profit_and_loss', 'cash_flow', 'provisioning', 'historical_income_statement', 'journals_report', 'accrued_interest', 'client_numbers_report', 'clients_overview', 'top_clients_report', 'loan_sizes_report', 'group_report', 'group_breakdown', 'savings_account_report', 'savings_balance_report', 'savings_transaction_report', 'fixed_term_maturity_report', 'products_summary', 'individual_indicator_report', 'loan_officer_performance_report', 'audit_report', 'group_indicator_report') 	Yes 	NULL 			
start_date_type 	enum('date_picker', 'today', 'yesterday', 'tomorrow') 	Yes 	NULL 			
start_date 	date 	Yes 	NULL 			
end_date_type 	enum('date_picker', 'today', 'yesterday', 'tomorrow') 	Yes 	NULL 			
end_date 	date 	Yes 	NULL 			
office_id 	varchar(191) 	Yes 	NULL 			
loan_officer_id 	varchar(191) 	Yes 	NULL 			
gl_account_id 	varchar(191) 	Yes 	NULL 			
manual_entries 	varchar(191) 	Yes 	NULL 			
loan_status 	varchar(191) 	Yes 	NULL 			
loan_product_id 	varchar(191) 	Yes 	NULL 			
last_run_date 	date 	Yes 	NULL 			
next_run_date 	date 	Yes 	NULL 			
last_run_time 	date 	Yes 	NULL 			
next_run_time 	date 	Yes 	NULL 			
number_of_runs 	int 	No 	0 			
active 	tinyint 	No 	1 			
status 	enum('pending', 'approved', 'declined') 	No 	pending 			
approved_by_id 	int 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
report_scheduler_run_history
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
report_schedule_id 	int 	Yes 	NULL 			
report_start_date 	date 	Yes 	NULL 			
report_start_time 	varchar(191) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
resignation_letters
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
user_id 	bigint 	No 				
resignation_date 	date 	No 				
reason 	text 	No 				
letter_path 	varchar(191) 	Yes 	NULL 			
status 	enum('pending', 'manager_approved', 'admin_approved', 'declined') 	No 	pending 			
manager_id 	bigint 	Yes 	NULL 			
manager_approved_at 	timestamp 	Yes 	NULL 			
admin_id 	bigint 	Yes 	NULL 			
admin_approved_at 	timestamp 	Yes 	NULL 			
manager_comment 	text 	Yes 	NULL 			
admin_comment 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
review_signoffs

Table comments: Stores performance review sign-off records
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
position 	varchar(191) 	No 			Position ID or name of the signer 	
signature 	text 	No 			Digital signature (base64 encoded or text) 	
signed_at 	datetime 	No 			Timestamp when the review was signed 	
review_type 	varchar(50) 	No 			Type of review: monthly, quarterly, annual, etc. 	
user_id 	int 	Yes 	NULL 		User ID of the person signing 	
office_id 	int 	Yes 	NULL 		Office/Branch ID 	
notes 	text 	Yes 	NULL 		Additional notes or comments 	
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
updated_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
idx_user_id 	BTREE 	No 	No 	user_id 	0 	A 	Yes 	
idx_office_id 	BTREE 	No 	No 	office_id 	0 	A 	Yes 	
idx_position 	BTREE 	No 	No 	position 	0 	A 	No 	
idx_review_type 	BTREE 	No 	No 	review_type 	0 	A 	No 	
idx_signed_at 	BTREE 	No 	No 	signed_at 	0 	A 	No 	
idx_created_at 	BTREE 	No 	No 	created_at 	0 	A 	Yes 	
roles
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
slug 	varchar(191) 	No 				
name 	varchar(191) 	No 				
time_limit 	tinyint 	No 	0 			
from_time 	varchar(191) 	Yes 	NULL 			
to_time 	varchar(191) 	Yes 	NULL 			
access_days 	text 	Yes 	NULL 			
permissions 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	8 	A 	No 	
role_users
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
user_id 	int 	No 				
role_id 	int 	No 				
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1633 	A 	No 	
saved_queries
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
name 	varchar(30) 	Yes 	NULL 			
description 	varchar(300) 	Yes 	NULL 			
query 	varchar(3000) 	Yes 	NULL 			

No index defined!
savings
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
client_type 	enum('client', 'group') 	No 	client 			
client_id 	int 	Yes 	NULL 			
group_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
field_officer_id 	int 	Yes 	NULL 			
savings_product_id 	int 	Yes 	NULL 			
external_id 	varchar(191) 	Yes 	NULL 			
account_number 	varchar(191) 	Yes 	NULL 			
currency_id 	int 	Yes 	NULL 			
decimals 	int 	No 	2 			
interest_rate 	decimal(65,4) 	Yes 	NULL 			
allow_overdraft 	tinyint 	No 	0 			
minimum_balance 	decimal(65,4) 	Yes 	NULL 			
overdraft_limit 	decimal(65,4) 	Yes 	NULL 			
interest_compounding_period 	enum('daily', 'monthly', 'quarterly', 'biannual', 'annually') 	Yes 	NULL 			
interest_posting_period 	enum('monthly', 'quarterly', 'biannual', 'annually') 	Yes 	NULL 			
allow_transfer_withdrawal_fee 	tinyint 	No 	0 			
opening_balance 	decimal(65,4) 	Yes 	NULL 			
allow_additional_charges 	tinyint 	No 	0 			
year_days 	enum('360', '365') 	No 	365 			
status 	enum('pending', 'approved', 'closed', 'declined', 'withdrawn') 	No 	pending 			
created_by_id 	int 	Yes 	NULL 			
modified_by_id 	int 	Yes 	NULL 			
approved_by_id 	int 	Yes 	NULL 			
closed_by_id 	int 	Yes 	NULL 			
declined_by_id 	int 	Yes 	NULL 			
created_date 	date 	Yes 	NULL 			
modified_date 	date 	Yes 	NULL 			
approved_date 	date 	Yes 	NULL 			
declined_date 	date 	Yes 	NULL 			
closed_date 	date 	Yes 	NULL 			
month 	varchar(191) 	Yes 	NULL 			
year 	varchar(191) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
approved_notes 	text 	Yes 	NULL 			
declined_notes 	text 	Yes 	NULL 			
closed_notes 	text 	Yes 	NULL 			
balance 	decimal(65,4) 	Yes 	NULL 			
deposits 	decimal(65,4) 	Yes 	NULL 			
interest_earned 	decimal(65,4) 	Yes 	NULL 			
interest_posted 	decimal(65,4) 	Yes 	NULL 			
interest_overdraft 	decimal(65,4) 	Yes 	NULL 			
withdrawals 	decimal(65,4) 	Yes 	NULL 			
fees 	decimal(65,4) 	Yes 	NULL 			
penalty 	decimal(65,4) 	Yes 	NULL 			
start_interest_calculation_date 	date 	Yes 	NULL 			
last_interest_calculation_date 	date 	Yes 	NULL 			
next_interest_calculation_date 	date 	Yes 	NULL 			
next_interest_posting_date 	date 	Yes 	NULL 			
last_interest_posting_date 	date 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
savings_charges
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
savings_id 	int 	Yes 	NULL 			
charge_id 	int 	Yes 	NULL 			
penalty 	tinyint 	No 	0 			
waived 	tinyint 	No 	0 			
charge_type 	enum('savings_activation', 'withdrawal_fee', 'annual_fee', 'monthly_fee', 'specified_due_date') 	No 				
charge_option 	enum('flat', 'percentage') 	No 				
amount 	decimal(65,2) 	Yes 	NULL 			
amount_paid 	decimal(65,2) 	Yes 	NULL 			
due_date 	date 	Yes 	NULL 			
grace_period 	int 	No 	0 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
savings_products
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
created_by_id 	int 	Yes 	NULL 			
name 	varchar(191) 	Yes 	NULL 			
short_name 	varchar(191) 	Yes 	NULL 			
description 	text 	Yes 	NULL 			
currency_id 	int 	Yes 	NULL 			
decimals 	int 	No 	2 			
interest_rate 	decimal(65,4) 	Yes 	NULL 			
allow_overdraft 	tinyint 	No 	0 			
minimum_balance 	decimal(65,4) 	Yes 	NULL 			
interest_compounding_period 	enum('daily', 'monthly', 'quarterly', 'biannual', 'annually') 	Yes 	NULL 			
interest_posting_period 	enum('monthly', 'quarterly', 'biannual', 'annually') 	Yes 	NULL 			
interest_calculation_type 	enum('daily', 'average') 	Yes 	NULL 			
allow_transfer_withdrawal_fee 	tinyint 	No 	0 			
opening_balance 	decimal(65,4) 	Yes 	NULL 			
allow_additional_charges 	tinyint 	No 	0 			
year_days 	enum('360', '365') 	No 	365 			
accounting_rule 	enum('none', 'cash') 	No 	cash 			
gl_account_savings_reference_id 	int 	Yes 	NULL 			
gl_account_overdraft_portfolio_id 	int 	Yes 	NULL 			
gl_account_savings_control_id 	int 	Yes 	NULL 			
gl_account_interest_on_savings_id 	int 	Yes 	NULL 			
gl_account_savings_written_off_id 	int 	Yes 	NULL 			
gl_account_income_interest_id 	int 	Yes 	NULL 			
gl_account_income_fee_id 	int 	Yes 	NULL 			
gl_account_income_penalty_id 	int 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
savings_product_charges
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
created_by_id 	int 	Yes 	NULL 			
charge_id 	int 	Yes 	NULL 			
savings_product_id 	int 	Yes 	NULL 			
amount 	decimal(65,2) 	Yes 	NULL 			
date 	date 	Yes 	NULL 			
grace_period 	int 	No 	0 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
savings_transactions
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
created_by_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
modified_by_id 	int 	Yes 	NULL 			
payment_detail_id 	int 	Yes 	NULL 			
savings_id 	int 	Yes 	NULL 			
amount 	decimal(10,2) 	Yes 	0.00 			
debit 	decimal(65,4) 	Yes 	NULL 			
credit 	decimal(65,4) 	Yes 	NULL 			
balance 	decimal(65,4) 	Yes 	NULL 			
transaction_type 	enum('deposit', 'withdrawal', 'bank_fees', 'interest', 'dividend', 'guarantee', 'guarantee_restored', 'fees_payment', 'transfer_loan', 'transfer_savings', 'specified_due_date_fee') 	Yes 	NULL 			
reversible 	tinyint 	No 	0 			
reversed 	tinyint 	No 	0 			
reversal_type 	enum('system', 'user', 'none') 	No 	none 			
status 	enum('pending', 'approved', 'declined') 	Yes 	pending 			
approved_by_id 	int 	Yes 	NULL 			
approved_date 	date 	Yes 	NULL 			
system_interest 	tinyint 	No 	0 			
date 	date 	Yes 	NULL 			
time 	varchar(191) 	Yes 	NULL 			
year 	varchar(191) 	Yes 	NULL 			
month 	varchar(191) 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
balance_date 	date 	Yes 	NULL 			
balance_days 	int 	Yes 	NULL 			
cumulative_balance_days 	int 	Yes 	NULL 			
cumulative_balance 	decimal(65,4) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
scheduled_reviews
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
position 	varchar(191) 	No 				
review_type 	varchar(50) 	No 				
title 	varchar(255) 	No 				
description 	text 	Yes 	NULL 			
scheduled_date_time 	datetime 	No 				
assignee 	varchar(191) 	No 				
priority 	enum('low', 'medium', 'high') 	Yes 	medium 			
send_reminder 	tinyint(1) 	Yes 	1 			
reminder_days_before 	int 	Yes 	1 			
status 	enum('scheduled', 'in-progress', 'completed', 'cancelled') 	Yes 	scheduled 			
created_by 	int 	Yes 	NULL 			
user_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
kpi_id 	int 	Yes 	NULL 			
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
updated_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
idx_position 	BTREE 	No 	No 	position 	0 	A 	No 	
idx_status 	BTREE 	No 	No 	status 	0 	A 	Yes 	
idx_scheduled_date 	BTREE 	No 	No 	scheduled_date_time 	0 	A 	No 	
idx_upcoming 	BTREE 	No 	No 	status 	0 	A 	Yes 	
scheduled_date_time 	0 	A 	No
settings
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
setting_key 	varchar(191) 	No 				
setting_value 	text 	Yes 	NULL 			

No index defined!
skip_trace_leads
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
recovery_case_id 	bigint 	No 				
created_by 	bigint 	No 				
lead_type 	varchar(191) 	No 				
description 	text 	No 				
new_phone 	varchar(191) 	Yes 	NULL 			
new_address 	text 	Yes 	NULL 			
source 	varchar(191) 	Yes 	NULL 			
verified 	tinyint(1) 	No 	0 			
led_to_location 	tinyint(1) 	No 	0 			
cost_incurred 	decimal(15,2) 	No 	0.00 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
smart_alerts
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
type 	enum('warning', 'info', 'success', 'error') 	No 	info 			
priority 	enum('low', 'medium', 'high', 'critical') 	No 	medium 			
message 	varchar(500) 	No 				
title 	varchar(100) 	Yes 	NULL 			
category 	varchar(50) 	Yes 	NULL 			
source 	varchar(20) 	Yes 	system 			
kpi_id 	int 	Yes 	NULL 			
position_id 	int 	Yes 	NULL 			
office_id 	int 	Yes 	NULL 			
province_id 	int 	Yes 	NULL 			
user_id 	int 	Yes 	NULL 			
is_read 	tinyint(1) 	Yes 	0 			
is_dismissed 	tinyint(1) 	Yes 	0 			
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
expires_at 	timestamp 	Yes 	NULL 			
action_url 	varchar(255) 	Yes 	NULL 			
action_label 	varchar(50) 	Yes 	NULL 			
metadata 	json 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	4 	A 	No 	
idx_user_id 	BTREE 	No 	No 	user_id 	2 	A 	Yes 	
idx_position_id 	BTREE 	No 	No 	position_id 	2 	A 	Yes 	
idx_office_id 	BTREE 	No 	No 	office_id 	2 	A 	Yes 	
idx_kpi_id 	BTREE 	No 	No 	kpi_id 	1 	A 	Yes 	
idx_type 	BTREE 	No 	No 	type 	3 	A 	No 	
idx_priority 	BTREE 	No 	No 	priority 	3 	A 	No 	
idx_category 	BTREE 	No 	No 	category 	3 	A 	Yes 	
idx_is_read 	BTREE 	No 	No 	is_read 	1 	A 	Yes 	
idx_created_at 	BTREE 	No 	No 	created_at 	2 	A 	Yes 	
idx_expires_at 	BTREE 	No 	No 	expires_at 	1 	A 	Yes 	
idx_user_unread 	BTREE 	No 	No 	user_id 	2 	A 	Yes 	
is_read 	2 	A 	Yes
is_dismissed 	2 	A 	Yes
idx_position_unread 	BTREE 	No 	No 	position_id 	2 	A 	Yes 	
is_read 	2 	A 	Yes
is_dismissed 	2 	A 	Yes
idx_office_unread 	BTREE 	No 	No 	office_id 	2 	A 	Yes 	
is_read 	2 	A 	Yes
is_dismissed 	2 	A 	Yes
smart_kpis
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
role 	int 	No 				
position_id 	int 	No 				
name 	varchar(191) 	No 				
description 	varchar(191) 	No 				
scoring 	enum('percentage', 'numeric', 'yes_no', 'score_1_5') 	No 				
target 	varchar(191) 	No 				
baseline 	varchar(12) 	Yes 	NULL 			
category 	varchar(191) 	No 				
weight 	varchar(191) 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	100 	A 	No 	
smart_kpi_score
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
kpi_id 	int 	No 				
user_id 	int 	No 				
score 	varchar(191) 	No 				
created_date 	datetime 	No 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	4 	A 	No 	
smart_priority_actions
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
actions 	varchar(191) 	No 				
due 	varchar(100) 	No 				
urgent 	tinyint(1) 	No 	0 			
status 	int 	No 				
position_id 	bigint 	No 				
user_id 	int 	Yes 	NULL 			
office_id 	int 	No 				
created_date 	datetime 	No 	CURRENT_TIMESTAMP 			
updated_at 	datetime 	No 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
sms_gateways
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
created_by_id 	int 	Yes 	NULL 			
name 	text 	Yes 	NULL 			
from_name 	text 	Yes 	NULL 			
to_name 	text 	Yes 	NULL 			
url 	text 	Yes 	NULL 			
msg_name 	text 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
specialists
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
user_id 	bigint 	No 				
notes 	text 	Yes 	NULL 			
is_active 	tinyint(1) 	No 	1 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	29 	A 	No 	
specialists_user_id_unique 	BTREE 	Yes 	No 	user_id 	29 	A 	No 	
staff_surveys
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
user_id 	int 	No 		users -> id 		
branch 	varchar(191) 	No 				
length_of_service 	varchar(191) 	No 				
bmos_consistency 	varchar(191) 	No 				
bmos_challenges 	text 	Yes 	NULL 			
branch_needs 	text 	Yes 	NULL 			
tools_resources 	varchar(191) 	No 				
operational_challenges 	text 	Yes 	NULL 			
supervisor_support 	varchar(191) 	No 				
manager_communication 	varchar(191) 	No 				
manager_communication_comments 	text 	Yes 	NULL 			
leadership_challenges 	text 	Yes 	NULL 			
manager_effectiveness_rating 	int 	No 				
workload_rating 	text 	Yes 	NULL 			
unethical_conduct 	varchar(191) 	No 				
policy_violation_instructions 	varchar(191) 	No 				
policy_violation_description 	text 	Yes 	NULL 			
top_issues 	text 	Yes 	NULL 			
pending_loans_entry 	varchar(191) 	No 				
longest_pending_period 	text 	Yes 	NULL 			
missed_target_due_pending 	varchar(191) 	No 				
pending_target_explanation 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	52 	A 	No 	
staff_surveys_user_id_foreign 	BTREE 	No 	No 	user_id 	52 	A 	No 	
targets_met
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
user_id 	int 	Yes 	NULL 			
user_name 	varchar(255) 	Yes 	NULL 			
office_name 	varchar(255) 	Yes 	NULL 			
given_out 	decimal(15,2) 	Yes 	NULL 			
uncollected 	decimal(15,2) 	Yes 	NULL 			
target_level 	decimal(15,2) 	Yes 	NULL 			
date 	date 	Yes 	NULL 			
cycle_start 	date 	Yes 	NULL 			
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	285 	A 	No 	
unique_user_cycle_target 	BTREE 	Yes 	No 	user_id 	211 	A 	Yes 	
target_level 	262 	A 	Yes
cycle_start 	285 	A 	Yes
idx_targets_cycle 	BTREE 	No 	No 	user_id 	211 	A 	Yes 	
target_level 	262 	A 	Yes
date 	285 	A 	Yes
target_reports
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
user_id 	int 	No 				
name 	varchar(191) 	No 				
office_id 	int 	No 				
given_out 	decimal(10,0) 	No 				
uncollected 	decimal(10,0) 	No 				
date 	datetime 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
target_tracker
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
user_id 	int 	No 				
given_out 	decimal(10,0) 	No 				
brought_f 	decimal(10,0) 	Yes 	NULL 			
target 	int 	No 				
cycle_date 	date 	No 				
status 	varchar(191) 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1343 	A 	No 	
throttle
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id 	int 	No 				
user_id 	int 	Yes 	NULL 			
type 	varchar(191) 	No 				
ip 	varchar(191) 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			

No index defined!
tickets
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	No 				
description 	text 	Yes 	NULL 			
datetime_open 	datetime 	No 				
date_raised 	datetime 	Yes 	NULL 			
datetime_close 	datetime 	Yes 	NULL 			
date_closed 	datetime 	Yes 	NULL 			
sla_met 	tinyint(1) 	No 	0 			
opened_by 	int 	Yes 	NULL 			
assigned_to 	int 	Yes 	NULL 			
assigned_by 	int 	Yes 	NULL 			
closed_by 	int 	Yes 	NULL 			
status 	varchar(191) 	No 	open 			
stage 	varchar(191) 	Yes 	Not started 			
priority 	varchar(191) 	No 	medium 			
sla_days 	int 	Yes 	NULL 			
due_date 	datetime 	Yes 	NULL 			
rating 	tinyint 	Yes 	NULL 			
remarks 	text 	Yes 	NULL 			
department 	varchar(191) 	Yes 	NULL 			
issue_category_id 	bigint 	Yes 	NULL 	ticket_categories -> id 		
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
resolution_comment 	text 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	311 	A 	No 	
tickets_issue_category_id_foreign 	BTREE 	No 	No 	issue_category_id 	5 	A 	Yes 	
ticket_categories
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
name 	varchar(191) 	No 				
priority_default 	varchar(191) 	Yes 	NULL 			
sla_days 	int 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	5 	A 	No 	
tier_benefits
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
tier_id 	bigint 	No 				
benefit_type 	varchar(50) 	No 				
description 	text 	No 				
value 	varchar(255) 	Yes 	NULL 			
effective_from 	datetime 	No 				
effective_to 	datetime 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	8 	A 	No 	
tier_id_idx 	BTREE 	No 	No 	tier_id 	4 	A 	No 	
tier_definitions
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
name 	varchar(50) 	No 				
description 	text 	Yes 	NULL 			
tier_range 	varchar(20) 	No 				
minimum_portfolio_value 	decimal(10,2) 	No 				
order_index 	int 	No 				
badge_color 	varchar(20) 	Yes 	gray 			
text_color 	varchar(20) 	Yes 	white 			
effective_from 	datetime 	No 				
effective_to 	datetime 	Yes 	NULL 			
is_active 	tinyint(1) 	Yes 	1 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	4 	A 	No 	
unique_tier_name 	BTREE 	Yes 	No 	name 	4 	A 	No 	
tier_requirements
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
tier_id 	bigint 	No 				
requirement_type 	varchar(50) 	No 				
minimum_value 	decimal(10,2) 	No 				
description 	text 	Yes 	NULL 			
effective_from 	datetime 	No 				
effective_to 	datetime 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	4 	A 	No 	
tier_id_idx 	BTREE 	No 	No 	tier_id 	4 	A 	No 	
training_materials
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
title 	varchar(191) 	No 				
description 	text 	Yes 	NULL 			
material_type 	enum('document', 'audio', 'video') 	No 	document 			
file_path 	varchar(191) 	Yes 	NULL 			
poster 	varchar(191) 	Yes 	NULL 		Poster/thumbnail image for video playback 	
file_name 	varchar(191) 	Yes 	NULL 			
file_size 	varchar(191) 	Yes 	NULL 			
mime_type 	varchar(191) 	Yes 	NULL 			
duration 	int 	Yes 	NULL 		Duration in seconds for audio/video 	
department 	enum('Operations', 'Recoveries', 'Administration', 'Finance', 'IT', 'HR', 'Legal', 'Compliance', 'General') 	Yes 	NULL 			
category 	varchar(191) 	Yes 	NULL 			
target_role 	enum('all', '1', '4', '6', '3', '5', '10') 	No 	all 			
created_by 	int 	Yes 	NULL 			
is_active 	tinyint(1) 	No 	1 			
is_featured 	tinyint(1) 	No 	0 			
view_count 	int 	No 	0 			
download_count 	int 	No 	0 			
published_at 	timestamp 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	3 	A 	No 	
training_materials_material_type_index 	BTREE 	No 	No 	material_type 	1 	A 	No 	
training_materials_department_index 	BTREE 	No 	No 	department 	3 	A 	Yes 	
training_materials_category_index 	BTREE 	No 	No 	category 	1 	A 	Yes 	
training_materials_target_role_index 	BTREE 	No 	No 	target_role 	2 	A 	No 	
training_materials_is_active_index 	BTREE 	No 	No 	is_active 	1 	A 	No 	
training_materials_created_by_index 	BTREE 	No 	No 	created_by 	3 	A 	Yes 	
users
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
office_id 	int 	Yes 	NULL 			
email 	varchar(191) 	No 				
password 	varchar(191) 	No 				
permissions 	text 	Yes 	NULL 			
has_seen_induction 	tinyint(1) 	No 	0 			
has_seen_survey 	tinyint(1) 	No 	0 			
last_login 	timestamp 	Yes 	NULL 			
first_name 	varchar(191) 	Yes 	NULL 			
last_name 	varchar(191) 	Yes 	NULL 			
status 	enum('Active', 'Inactive') 	Yes 	Active 			
phone 	varchar(191) 	Yes 	NULL 			
date_of_birth 	date 	Yes 	NULL 			
date_of_joining 	date 	Yes 	NULL 			
marital_status 	varchar(191) 	Yes 	NULL 			
company 	varchar(191) 	Yes 	NULL 			
employee_number 	varchar(191) 	Yes 	NULL 			
department 	varchar(191) 	Yes 	NULL 			
designation 	varchar(191) 	Yes 	NULL 			
branch 	varchar(191) 	Yes 	NULL 			
salary_currency 	varchar(10) 	Yes 	NULL 			
salary_mode 	varchar(191) 	Yes 	NULL 			
bank_name 	varchar(191) 	Yes 	NULL 			
bank_account_number 	varchar(191) 	Yes 	NULL 			
health_details 	text 	Yes 	NULL 			
health_insurance_provider 	varchar(191) 	Yes 	NULL 			
health_insurance_number 	varchar(191) 	Yes 	NULL 			
external_company 	varchar(191) 	Yes 	NULL 			
external_designation 	varchar(191) 	Yes 	NULL 			
external_contact 	varchar(191) 	Yes 	NULL 			
external_total_experience 	decimal(5,2) 	Yes 	NULL 			
internal_branch 	varchar(191) 	Yes 	NULL 			
internal_designation 	varchar(191) 	Yes 	NULL 			
internal_from_date 	date 	Yes 	NULL 			
internal_to_date 	date 	Yes 	NULL 			
gender 	enum('male', 'female', 'other', 'unspecified') 	Yes 	unspecified 			
enable_google2fa 	tinyint 	No 	0 			
blocked 	tinyint 	No 	0 			
google2fa_secret 	text 	Yes 	NULL 			
address 	text 	Yes 	NULL 			
province_id 	int 	Yes 	NULL 			
notes 	text 	Yes 	NULL 			
time_limit 	tinyint 	No 	0 			
from_time 	varchar(191) 	Yes 	NULL 			
to_time 	varchar(191) 	Yes 	NULL 			
access_days 	text 	Yes 	NULL 			
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
nrc_id 	varchar(191) 	Yes 	NULL 			
salutation 	varchar(191) 	Yes 	NULL 			
employment_type 	varchar(191) 	Yes 	NULL 			
mobile_number 	varchar(191) 	Yes 	NULL 			
personal_email 	varchar(191) 	Yes 	NULL 			
current_address 	text 	Yes 	NULL 			
emergency_contact_name 	varchar(191) 	Yes 	NULL 			
emergency_phone 	varchar(191) 	Yes 	NULL 			
relation_to_emergency 	varchar(191) 	Yes 	NULL 			
reports_to 	bigint 	Yes 	NULL 			
confirmation_date 	date 	Yes 	NULL 			
qualification 	varchar(191) 	Yes 	NULL 			
school_university 	varchar(191) 	Yes 	NULL 			
level_of_education 	varchar(191) 	Yes 	NULL 			
year_completed 	year 	Yes 	NULL 			
major 	varchar(191) 	Yes 	NULL 			
has_completed_profile 	tinyint(1) 	No 	0 			
job_position 	int 	No 				
tier 	int 	Yes 	NULL 			
istrainer 	tinyint(1) 	No 	0 			
verified_numbers 	varchar(191) 	No 	unverified 			
position_id 	bigint 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	1444 	A 	No 	
users_employee_number_unique 	BTREE 	Yes 	No 	employee_number 	423 	A 	Yes 	
user_policy_responses
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
user_id 	bigint 	No 				
policy_id 	bigint 	No 				
status 	enum('accepted', 'declined') 	No 				
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	4994 	A 	No 	
user_tiers
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	bigint 	No 				
user_id 	bigint 	No 				
tier_id 	bigint 	No 				
effective_from 	datetime 	No 				
effective_to 	datetime 	Yes 	NULL 			
current_portfolio_value 	decimal(10,2) 	No 	0.00 			
next_tier_requirement 	decimal(10,2) 	Yes 	NULL 			
progress_percentage 	decimal(5,2) 	Yes 	0.00 			
last_updated 	datetime 	No 	CURRENT_TIMESTAMP 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	11 	A 	No 	
user_id_idx 	BTREE 	No 	No 	user_id 	11 	A 	No 	
tier_id_idx 	BTREE 	No 	No 	tier_id 	1 	A 	No 	
waiver_transactions_unapproved
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
created_by_id 	int 	No 				
office_id 	int 	No 				
loan_id 	int 	No 				
transaction_type 	varchar(50) 	No 				
date 	date 	No 				
credit 	decimal(15,2) 	No 				
status 	enum('pending', 'approved', 'declined') 	Yes 	pending 			
notes 	text 	Yes 	NULL 			
reversible 	tinyint(1) 	Yes 	0 			
created_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
updated_at 	timestamp 	Yes 	CURRENT_TIMESTAMP 			
year 	int 	No 				
month 	int 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	2301 	A 	No 	
websockets_statistics_entries
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
app_id 	varchar(191) 	No 				
peak_connection_count 	int 	No 				
websocket_message_count 	int 	No 				
api_message_count 	int 	No 				
created_at 	timestamp 	Yes 	NULL 			
updated_at 	timestamp 	Yes 	NULL 			
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	0 	A 	No 	
whatsapp_client
Column 	Type 	Null 	Default 	Links to 	Comments 	Media type
id (Primary) 	int 	No 				
name 	varchar(191) 	No 				
phone_number 	varchar(191) 	No 				
occupation 	varchar(191) 	No 				
amount 	varchar(191) 	No 				
status 	varchar(191) 	No 				
date 	datetime 	No 	CURRENT_TIMESTAMP 			
location 	varchar(191) 	No 				
Indexes
Keyname 	Type 	Unique 	Packed 	Column 	Cardinality 	Collation 	Null 	Comment
PRIMARY 	BTREE 	Yes 	No 	id 	4 	A 	No 	


