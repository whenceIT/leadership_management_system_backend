const express = require('express')
const app = express()
const cors = require("cors")
const pool = require("./db");
const http = require("http")
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

   
app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));


app.post("/sign-in",async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await pool.query(`SELECT * FROM users WHERE email = ? `,[email])
        const userPassword =  user[0][0].password
        console.log(userPassword)
        const finalPassword = userPassword.replace("$2y$", "$2b$")
      //  console.log(finalPassword)
        const isPasswordMatching = bcrypt.compareSync(password,finalPassword)
       // console.log(isPasswordMatching)
        if(isPasswordMatching){
          res.json(user[0][0])
        }else{
          res.json('incorrect password')
        }
    }catch(err){
        console.log(err)
    }
})



  app.get("/get-user/:email", async (req, res) => {
    try {
      const { email } = req.params;
  
      // Get the user by email
      const userResult = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
      const user = userResult[0][0];
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Get the role for this user
      const roleResult = await pool.query(`SELECT * FROM role_users WHERE user_id = ?`, [user.id]);
      const role = roleResult[0][0];
  
      const cycle_date =  await pool.query(`SELECT * FROM cycle_dates WHERE loan_officer_id = ? `,[user.id]);

      const office = await pool.query(`SELECT * FROM offices WHERE id = ? `,[user.office_id])
      const provinceResult = await pool.query(`SELECT * FROM province WHERE id = ? `,[office[0][0].province_id])
      const province = provinceResult[0][0]

      // Combine user info with role_id
      const userWithRole = {
        ...user,
        role_id: role ? role.role_id : null,
        cycle_date: cycle_date ? cycle_date.cycle_end_date : null, // handle case if no role is assigned
        province: province ? province.id:null
      };
  
      res.json(userWithRole);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  });



  app.get('/all-kpis',async(req,res)=>{
    try{
         const kpis = await pool.query('SELECT * FROM smart_kpis');
         res.json(kpis[0])
    }catch(err){
        console.log(err)
        res.status(500).json({ error: "Server error" });
    }
  })

  // Add a new smart KPI
app.post('/kpi', async (req, res) => {
  const { role, name, description, scoring, target, position_id,category,weight } = req.body;

  if (!role || !name || !scoring || !target) {
    return res.status(400).json({ error: 'role, name, scoring, and target are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO smart_kpis (role, name, description, scoring, target, position_id,category,weight ) VALUES (?, ?, ?, ?, ?,?,?,?)',
      [role, name, description || '', scoring, target,position_id,category,weight]
    );
    res.status(201).json({ message: 'KPI added', kpiId: result[0].insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single smart KPI by id
app.get('/kpi/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM smart_kpis WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'KPI not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all KPIs for a specific role
app.get('/kpis/role/:role', async (req, res) => {
  const { role } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM smart_kpis WHERE role = ?', [role]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a KPI by id
app.delete('/kpi/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM smart_kpis WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'KPI not found' });
    res.json({ message: 'KPI deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update/edit a KPI by id
app.put('/kpi/:id', async (req, res) => {
  const { id } = req.params;
  const { role, name, description, scoring, target,position_id,category,weight } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE smart_kpis SET role = ?, name = ?, description = ?, scoring = ?, target = ?,position_id = ?,category = ?, weight = ? WHERE id = ?',
      [role, name, description, scoring, target,position_id,category,weight ,id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'KPI not found' });
    res.json({ message: 'KPI updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/leadership-positions',async(req,res)=>{
  try{
    const leadership_positions = await pool.query("SELECT * FROM job_positions");
    res.json(leadership_positions[0])
  }catch(err){
    console.log(err)
    res.status(500).json({ error: "Server error" });
  }
})



app.get('/all-smart-kpi-scores', async (req, res) => {
  try {
    const scores = await pool.query('SELECT * FROM smart_kpi_score');
    res.json(scores[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});



// app.get('/smart-kpi-scores/:user_id', async (req, res) => {
//   try {
//     const { user_id } = req.params;

//     const scores = await pool.query(
//       'SELECT * FROM smart_kpi_score WHERE user_id = ?',
//       [user_id]
//     );

//     res.json(scores[0]);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

app.get('/smart-kpi-scores/:user_id/:position_id', async (req, res) => {
  try {
    const { user_id, position_id } = req.params;
    const scores = await pool.query(
      `SELECT 
          s.id AS score_id,
          k.id AS kpi_id,
          s.user_id,
          s.score,

          k.name,
          k.description,
          k.scoring,
          k.target,
          k.role,
          k.position_id,
          k.category,
          k.weight

      FROM smart_kpis k
      LEFT JOIN smart_kpi_score s 
          ON s.kpi_id = k.id 
          AND s.user_id = ?

      WHERE k.position_id = ?`,
      [user_id, position_id]
    );

    res.json(scores[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.get('/smart-loans', async (req, res) => {
  try {
    const { status, start_date, end_date } = req.query;

    if (!status) {
      return res.status(400).json({ error: "status is required" });
    }

    let query = `SELECT * FROM loans WHERE status = ?`;
    let values = [status];

    // If BOTH start and end dates exist
    if (start_date && end_date) {
      query += ` AND created_at BETWEEN ? AND ?`;
      values.push(start_date, end_date);
    }

    // If ONLY start_date exists
    else if (start_date && !end_date) {
      query += ` AND created_at >= ?`;
      values.push(start_date);
    }

    // If ONLY end_date exists
    else if (!start_date && end_date) {
      query += ` AND created_at <= ?`;
      values.push(end_date);
    }

    const [loans] = await pool.query(query, values);

    return res.json({
      success: true,
      count: loans.length,
      data: loans
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});



app.get("/loan/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        console.log(id)
        const loan =  await pool.query(`SELECT * FROM loans WHERE id = ? `,[id]);
        console.log(loan)

        res.json(loan)
    } catch(err){
        console.log(err)
    }
})


app.get("/offices",async(req,res)=>{
    try{
        const offices =  await pool.query(`SELECT * FROM offices`);
        res.json(offices[0])
    } catch(err){
        console.log(err)
    }
})


app.post('/create-smart-priority-actions', async (req, res) => {
  try {
    const { actions, due } = req.body;

    // Validation
    if (!actions || due === undefined || due === null) {
      return res.status(400).json({
        error: "actions and due are required"
      });
    }

    // Ensure due is numeric
    if (isNaN(due)) {
      return res.status(400).json({
        error: "due must be a valid number"
      });
    }

    const query = `
      INSERT INTO smart_priority_actions (actions, due)
      VALUES (?, ?)
    `;

    const [result] = await pool.query(query, [actions, due]);

    // Fetch the inserted row
    const [newRow] = await pool.query(
      `SELECT * FROM smart_priority_actions WHERE id = ?`,
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: "Smart priority action created successfully",
      data: newRow[0]
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server error"
    });
  }
});


//Branch Structure & Staffing Index (BSSI) Branches

//Normalized Score
app.get("/staff-adequacy/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(`
      SELECT COUNT(DISTINCT u.id) AS total
      FROM users u
      INNER JOIN user_roles ur ON ur.user_id = u.id
      WHERE ur.role_id = 3
      AND u.office_id = ?
    `, [id]);

    const ActualLCs = rows[0].total;

    // Normalized Score = (Actual LCs ÷ 10) × 100
    let normalized_score = (ActualLCs / 10) * 100;

    // Optional: Cap at 100%
    if (normalized_score > 100) {
      normalized_score = 100;
    }

    // Percentage Point (PP) = Normalized Score × 25%
    const PercentagePoint = normalized_score * 0.25;

    res.json({
      office_id: id,
      actual_lcs: ActualLCs,
      normalized_score,
      weight: "25%",
      percentage_point: PercentagePoint
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


app.post('/productivity-achievement/:id', async (req, res) => {
  try {

    const { office_id } = req.params;

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" });
    }

    // ===============================
    // Get Loan Consultants In Branch
    // ===============================

    const [consultants] = await pool.query(`
      SELECT 
        u.id,
        cd.cycle_end_date
      FROM users u
      JOIN role_users ru ON ru.user_id = u.id
      LEFT JOIN cycle_dates cd ON cd.loan_officer_id = u.id
      WHERE ru.role_id = 3
        AND u.office_id = ?
    `, [office_id]);

    if (!consultants.length) {
      return res.json({
        office_id,
        consultant_count: 0,
        average_disbursement: 0,
        percentage_point: 0
      });
    }

    let branch_total_given_out = 0;
    let consultant_count = 0;

    for (const user of consultants) {

      const cycleEndDay = user.cycle_end_date
        ? parseInt(user.cycle_end_date)
        : 24;

      const today = dayjs();

      let currentMonth = dayjs().startOf('month');
      let cycleDay = Math.min(cycleEndDay, currentMonth.daysInMonth());
      let cycleDate = currentMonth.date(cycleDay).add(1, 'day');

      if (today.isBefore(cycleDate)) {
        let prevMonth = dayjs().subtract(1, 'month').startOf('month');
        cycleDay = Math.min(cycleEndDay, prevMonth.daysInMonth());
        cycleDate = prevMonth.date(cycleDay).add(1, 'day');
      }

      const start_date = cycleDate.format('YYYY-MM-DD');
      const end_date = cycleDate.add(1, 'month').subtract(1, 'day').format('YYYY-MM-DD');

      const [loans] = await pool.query(
        `SELECT id FROM loans WHERE loan_officer_id = ?`,
        [user.id]
      );

      if (!loans.length) continue;

      const loanIds = loans.map(l => l.id);

      const [transactions] = await pool.query(`
        SELECT debit, credit, transaction_type, payment_apply_to, balance_bf
        FROM loan_transactions
        WHERE loan_id IN (?)
          AND date >= ?
          AND date <= ?
      `, [loanIds, start_date, end_date]);

      let given_out = 0;

      transactions.forEach(t => {

        if (t.transaction_type === 'disbursement') {
          given_out += Number(t.debit) || 0;
        }

        if (
          t.transaction_type === 'repayment' &&
          t.payment_apply_to === 'reloan_payment'
        ) {
          const reloan_amount =
            (Number(t.balance_bf) || 0) -
            (Number(t.credit) || 0);

          given_out += reloan_amount;
        }

      });

      const [carryOver] = await pool.query(`
        SELECT amount
        FROM carry_overs
        WHERE user_id = ?
          AND cycle_date = ?
          AND status = 'active'
      `, [user.id, start_date]);

      const carryOverAmount = carryOver.length
        ? Number(carryOver[0].amount)
        : 0;

      given_out += carryOverAmount;

      branch_total_given_out += given_out;
      consultant_count++;
    }

    const average =
      consultant_count > 0
        ? branch_total_given_out / consultant_count
        : 0;

    // ===============================
    // APPLY PRODUCTIVITY FORMULA
    // ===============================

    const normalized_score = (average / 40000) * 100;
    const percentage_point = normalized_score * 0.30;

    return res.json({
      office_id,
      consultant_count,
      average_disbursement: average.toFixed(2),
      normalized_score: normalized_score.toFixed(2),
      weight: "30%",
      percentage_point: percentage_point.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});


app.get("/vacancy-impact/:office_id", async (req, res) => {
  try {
    const { office_id } = req.params;

    const [rows] = await pool.query(`
      SELECT COUNT(DISTINCT u.id) AS total
      FROM users u
      INNER JOIN user_roles ur ON ur.user_id = u.id
      WHERE ur.role_id = 3
      AND u.office_id = ?
    `, [office_id]);

    const ActualLCs = rows[0].total;

    const AuthorizedPositions = 10;
    const Vacancies = AuthorizedPositions - ActualLCs;

    // Prevent negative vacancies (if overstaffed)
    const adjustedVacancies = Vacancies < 0 ? 0 : Vacancies;

    // Normalized Score
    let NormalizedScore = 1 - (adjustedVacancies / AuthorizedPositions);

    // Clamp between 0 and 1
    if (NormalizedScore < 0) NormalizedScore = 0;
    if (NormalizedScore > 1) NormalizedScore = 1;

    // Percentage Point (20% weight)
    const PercentagePoint = NormalizedScore * 0.20;

    res.json({
      office_id,
      actual_lcs: ActualLCs,
      authorized_positions: AuthorizedPositions,
      vacancies: adjustedVacancies,
      normalized_score: NormalizedScore,
      weight: "20%",
      percentage_point: PercentagePoint
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//portfolio-load-balance

app.get('/portfolio-load-balance/:office_id', async (req, res) => {
  try {
    const { office_id } = req.params;

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" });
    }

    // ===============================
    // 1️⃣ GET ALL ACTIVE LOANS FOR OFFICE
    // ===============================
    const [loans] = await pool.query(`
      SELECT 
        l.id,
        l.principal_amount
      FROM loans l
      JOIN users u ON u.id = l.loan_officer_id
      WHERE u.office_id = ?
      AND l.status = 'active'
    `, [office_id]);

    let total_outstanding = 0;

    for (let loan of loans) {

      // Get total repayments for this loan
      const [repayments] = await pool.query(`
        SELECT SUM(credit) as total_repaid
        FROM loan_transactions
        WHERE loan_id = ?
        AND transaction_type = 'repayment'
        AND payment_apply_to IN ('part_payment','full_payment','reloan_payment')
      `, [loan.id]);

      const total_repaid = Number(repayments[0].total_repaid) || 0;

      const outstanding = loan.principal_amount - total_repaid;

      if (outstanding > 0) {
        total_outstanding += outstanding;
      }
    }

    // ===============================
    // 2️⃣ GET LOAN CONSULTANTS (YOUR LOGIC)
    // ===============================
    const [consultants] = await pool.query(`
      SELECT 
        u.id,
        cd.cycle_end_date
      FROM users u
      JOIN role_users ru ON ru.user_id = u.id
      LEFT JOIN cycle_dates cd ON cd.loan_officer_id = u.id
      WHERE ru.role_id = 3
        AND u.office_id = ?
    `, [office_id]);

    const total_lcs = consultants.length;

    if (total_lcs === 0) {
      return res.json({
        office_id,
        message: "No loan consultants found",
        score: "0%",
        percentage_point: 0
      });
    }

    // ===============================
    // 3️⃣ PORTFOLIO PER LC
    // ===============================
    const portfolio_per_lc = total_outstanding / total_lcs;

    // ===============================
    // 4️⃣ SCORE CALCULATION
    // ===============================
    const lowerBound = 70000;
    const upperBound = 110000;

    let score = 100;

    if (portfolio_per_lc < lowerBound) {
      const deviationPercent =
        Math.abs(portfolio_per_lc - lowerBound) / lowerBound;
      score = 100 - (deviationPercent * 50);
    }

    if (portfolio_per_lc > upperBound) {
      const deviationPercent =
        Math.abs(portfolio_per_lc - upperBound) / upperBound;
      score = 100 - (deviationPercent * 50);
    }

    if (score < 0) score = 0;

    // ===============================
    // 5️⃣ PERCENTAGE POINT
    // ===============================
    const percentage_point = score * 0.25;

    return res.json({
      office_id,
      total_outstanding: total_outstanding.toFixed(2),
      total_lcs,
      portfolio_per_lc: portfolio_per_lc.toFixed(2),
      score: score.toFixed(2) + "%",
      weight: "25%",
      percentage_point: percentage_point.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});


// LOAN CONSULTANT PERFORMANCE INDEX (LCPI)

//Volume Achievement
app.post('/volume-achievement/:office_id', async (req, res) => {
  try {

    const { office_id } = req.params;

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" });
    }

    // ===============================
    // Get Loan Consultants In Branch
    // ===============================

    const [consultants] = await pool.query(`
      SELECT 
        u.id,
        cd.cycle_end_date
      FROM users u
      JOIN role_users ru ON ru.user_id = u.id
      LEFT JOIN cycle_dates cd ON cd.loan_officer_id = u.id
      WHERE ru.role_id = 3
        AND u.office_id = ?
    `, [office_id]);

    if (!consultants.length) {
      return res.json({
        office_id,
        consultant_count: 0,
        total_disbursement: 0,
        percentage_point: 0
      });
    }

    let branch_total_given_out = 0;
    let consultant_count = 0;

    for (const user of consultants) {

      const cycleEndDay = user.cycle_end_date
        ? parseInt(user.cycle_end_date)
        : 24;

      const today = dayjs();

      let currentMonth = dayjs().startOf('month');
      let cycleDay = Math.min(cycleEndDay, currentMonth.daysInMonth());
      let cycleDate = currentMonth.date(cycleDay).add(1, 'day');

      if (today.isBefore(cycleDate)) {
        let prevMonth = dayjs().subtract(1, 'month').startOf('month');
        cycleDay = Math.min(cycleEndDay, prevMonth.daysInMonth());
        cycleDate = prevMonth.date(cycleDay).add(1, 'day');
      }

      const start_date = cycleDate.format('YYYY-MM-DD');
      const end_date = cycleDate.add(1, 'month').subtract(1, 'day').format('YYYY-MM-DD');

      const [loans] = await pool.query(
        `SELECT id FROM loans WHERE loan_officer_id = ?`,
        [user.id]
      );

      if (!loans.length) continue;

      const loanIds = loans.map(l => l.id);

      const [transactions] = await pool.query(`
        SELECT debit, credit, transaction_type, payment_apply_to, balance_bf
        FROM loan_transactions
        WHERE loan_id IN (?)
          AND date >= ?
          AND date <= ?
      `, [loanIds, start_date, end_date]);

      let given_out = 0;

      transactions.forEach(t => {

        if (t.transaction_type === 'disbursement') {
          given_out += Number(t.debit) || 0;
        }

        if (
          t.transaction_type === 'repayment' &&
          t.payment_apply_to === 'reloan_payment'
        ) {
          const reloan_amount =
            (Number(t.balance_bf) || 0) -
            (Number(t.credit) || 0);

          given_out += reloan_amount;
        }

      });

      const [carryOver] = await pool.query(`
        SELECT amount
        FROM carry_overs
        WHERE user_id = ?
          AND cycle_date = ?
          AND status = 'active'
      `, [user.id, start_date]);

      const carryOverAmount = carryOver.length
        ? Number(carryOver[0].amount)
        : 0;

      given_out += carryOverAmount;

      branch_total_given_out += given_out;
      consultant_count++;
    }

    // ===============================
    // APPLY VOLUME FORMULA
    // ===============================

    const normalized_score = (branch_total_given_out / 420000) * 100;
    const percentage_point = normalized_score * 0.25;

    return res.json({
      office_id,
      consultant_count,
      total_disbursement: branch_total_given_out.toFixed(2),
      branch_target: "420000",
      normalized_score: normalized_score.toFixed(2),
      weight: "25%",
      percentage_point: percentage_point.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});


//porfolio quality

app.get('/portfolio-quality/:office_id', async (req, res) => {
  try {
    const { office_id } = req.params;

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" });
    }

    // ===============================
    // 1️⃣ GET ACTIVE LOANS FOR OFFICE
    // ===============================
    const [loans] = await pool.query(`
      SELECT 
        l.id,
        l.principal_amount,
        l.due_date
      FROM loans l
      JOIN users u ON u.id = l.loan_officer_id
      WHERE u.office_id = ?
      AND l.status = 'active'
    `, [office_id]);

    let total_outstanding = 0;
    let overdue_outstanding = 0;

    const today = new Date();

    for (let loan of loans) {

      // ===============================
      // 2️⃣ GET TOTAL REPAYMENTS
      // ===============================
      const [repayments] = await pool.query(`
        SELECT SUM(credit) as total_repaid
        FROM loan_transactions
        WHERE loan_id = ?
        AND payment_apply_to IN ('part_payment','full_payment','reloan_payment')
      `, [loan.id]);

      const total_repaid = Number(repayments[0].total_repaid) || 0;

      const outstanding = loan.principal_amount - total_repaid;

      if (outstanding > 0) {
        total_outstanding += outstanding;

        // ===============================
        // 3️⃣ CHECK IF >30 DAYS OVERDUE
        // ===============================
        const dueDate = new Date(loan.due_date);
        const diffTime = today - dueDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays > 30) {
          overdue_outstanding += outstanding;
        }
      }
    }

    if (total_outstanding === 0) {
      return res.json({
        office_id,
        message: "No outstanding loans",
        score: "100%",
        percentage_point: 35
      });
    }

    // ===============================
    // 4️⃣ PAR CALCULATION
    // ===============================
    const PAR = overdue_outstanding / total_outstanding;

    // ===============================
    // 5️⃣ SCORE CALCULATION
    // ===============================
    let score = 100;

    if (PAR > 0.08) {
      const excess = PAR - 0.08;
      score = 100 - (excess * 5 * 100); 
      // multiply by 100 because PAR is decimal (e.g. 0.10 = 10%)
    }

    if (score < 0) score = 0;

    // ===============================
    // 6️⃣ PP (35% Weight)
    // ===============================
    const percentage_point = score * 0.35;

    return res.json({
      office_id,
      total_outstanding: total_outstanding.toFixed(2),
      overdue_outstanding: overdue_outstanding.toFixed(2),
      PAR: (PAR * 100).toFixed(2) + "%",
      score: score.toFixed(2) + "%",
      weight: "35%",
      percentage_point: percentage_point.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

//Collection Effieciency

app.get('/collection-efficiency/:office_id', async (req, res) => {
  try {

    const { office_id } = req.params;

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" });
    }

    const [consultants] = await pool.query(`
      SELECT 
        u.id,
        cd.cycle_end_date
      FROM users u
      JOIN role_users ru ON ru.user_id = u.id
      LEFT JOIN cycle_dates cd ON cd.loan_officer_id = u.id
      WHERE ru.role_id = 3
        AND u.office_id = ?
    `, [office_id]);

    if (!consultants.length) {
      return res.json({
        office_id,
        consultant_count: 0,
        total_collections: 0,
        benchmark: "71.64%",
        weight: "30%",
        percentage_point: 0
      });
    }

    let branch_total_collections = 0;

    for (const user of consultants) {

      const cycleEndDay = user.cycle_end_date
        ? parseInt(user.cycle_end_date)
        : 24;

      const today = dayjs();

      let currentMonth = dayjs().startOf('month');
      let cycleDay = Math.min(cycleEndDay, currentMonth.daysInMonth());
      let cycleDate = currentMonth.date(cycleDay).add(1, 'day');

      if (today.isBefore(cycleDate)) {
        let prevMonth = dayjs().subtract(1, 'month').startOf('month');
        cycleDay = Math.min(cycleEndDay, prevMonth.daysInMonth());
        cycleDate = prevMonth.date(cycleDay).add(1, 'day');
      }

      const start_date = cycleDate.format('YYYY-MM-DD');
      const end_date = cycleDate.add(1, 'month').subtract(1, 'day').format('YYYY-MM-DD');

      const [loans] = await pool.query(
        `SELECT id FROM loans WHERE loan_officer_id = ?`,
        [user.id]
      );

      if (!loans.length) continue;

      const loanIds = loans.map(l => l.id);

      const [transactions] = await pool.query(`
        SELECT credit, transaction_type, payment_apply_to, balance_bf
        FROM loan_transactions
        WHERE loan_id IN (?)
          AND date >= ?
          AND date <= ?
      `, [loanIds, start_date, end_date]);

      let total_collected = 0;

      transactions.forEach(t => {

        if (t.transaction_type === 'repayment') {

          if (t.payment_apply_to === 'reloan_payment') {
            total_collected += Number(t.balance_bf) || 0;
          }

          if (['full_payment', 'part_payment'].includes(t.payment_apply_to)) {
            total_collected += Number(t.credit) || 0;
          }

        }

      });

      branch_total_collections += total_collected;
    }

    // ===============================
    // APPLY FORMULA
    // ===============================

    let score = (branch_total_collections / 0.7164) * 100;

    // Cap at 100%
    if (score > 100) {
      score = 100;
    }

    const percentage_point = score * 0.30;

    return res.json({
      office_id,
      consultant_count: consultants.length,
      total_collections: branch_total_collections.toFixed(2),
      benchmark: "71.64%",
      weight: "30%",
      percentage_point: percentage_point.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});



// LOAN PRODUCTS & INTEREST RATES INDEX (LPIRI)

// Yield Achievement
app.get('/yield-achievement/:office_id', async (req, res) => {
  try {

    const { office_id } = req.params;

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" });
    }

    const [consultants] = await pool.query(`
      SELECT 
        u.id,
        cd.cycle_end_date
      FROM users u
      JOIN role_users ru ON ru.user_id = u.id
      LEFT JOIN cycle_dates cd ON cd.loan_officer_id = u.id
      WHERE ru.role_id = 3
        AND u.office_id = ?
    `, [office_id]);

    if (!consultants.length) {
      return res.json({
        office_id,
        consultant_count: 0,
        total_principal_disbursed: 0,
        total_interest_earned: 0,
        effective_interest_rate: 0,
        percentage_point: 0
      });
    }

    let total_principal_disbursed = 0;
    let total_collected = 0;

    for (const user of consultants) {

      const cycleEndDay = user.cycle_end_date
        ? parseInt(user.cycle_end_date)
        : 24;

      const today = dayjs();

      let currentMonth = dayjs().startOf('month');
      let cycleDay = Math.min(cycleEndDay, currentMonth.daysInMonth());
      let cycleDate = currentMonth.date(cycleDay).add(1, 'day');

      if (today.isBefore(cycleDate)) {
        let prevMonth = dayjs().subtract(1, 'month').startOf('month');
        cycleDay = Math.min(cycleEndDay, prevMonth.daysInMonth());
        cycleDate = prevMonth.date(cycleDay).add(1, 'day');
      }

      const start_date = cycleDate.format('YYYY-MM-DD');
      const end_date = cycleDate.add(1, 'month').subtract(1, 'day').format('YYYY-MM-DD');

      const [loans] = await pool.query(
        `SELECT id FROM loans WHERE loan_officer_id = ?`,
        [user.id]
      );

      if (!loans.length) continue;

      const loanIds = loans.map(l => l.id);

      const [transactions] = await pool.query(`
        SELECT debit, credit, transaction_type, payment_apply_to
        FROM loan_transactions
        WHERE loan_id IN (?)
          AND date >= ?
          AND date <= ?
      `, [loanIds, start_date, end_date]);

      transactions.forEach(t => {

        // Principal Disbursed
        if (t.transaction_type === 'disbursement') {
          total_principal_disbursed += Number(t.debit) || 0;
        }

        // Collections (repayments)
        if (
          t.transaction_type === 'repayment' &&
          ['full_payment', 'part_payment', 'reloan_payment'].includes(t.payment_apply_to)
        ) {
          total_collected += Number(t.credit) || 0;
        }

      });

    }

    // ===============================
    // CALCULATE INTEREST
    // ===============================

    const total_interest_earned =
      total_collected - total_principal_disbursed;

    const effective_interest_rate =
      total_principal_disbursed > 0
        ? total_interest_earned / total_principal_disbursed
        : 0;

    // ===============================
    // APPLY TARGET FORMULA
    // ===============================

    const score = effective_interest_rate / 0.382;

    const percentage_point = score * 0.35;

    return res.json({
      office_id,
      consultant_count: consultants.length,
      total_principal_disbursed: total_principal_disbursed.toFixed(2),
      total_interest_earned: total_interest_earned.toFixed(2),
      effective_interest_rate: (effective_interest_rate * 100).toFixed(2) + "%",
      target: "38.2%",
      weight: "35%",
      percentage_point: percentage_point.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

//Product Diversification
app.get('/product-diversification/:office_id', async (req, res) => {
  try {

    const { office_id } = req.params;

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" });
    }

    // ===============================
    // Get all clients in the branch
    // ===============================
    const [clients] = await pool.query(`
      SELECT working_place
      FROM clients
      WHERE office_id = ?
    `, [office_id]);

    const total_clients = clients.length;

    if (total_clients === 0) {
      return res.json({
        office_id,
        total_clients: 0,
        HHI: 0,
        weight: "25%",
        percentage_point: 0
      });
    }

    // ===============================
    // Group by working_place and calculate HHI
    // ===============================

    const workingPlaceCounts = {};

    clients.forEach(client => {
      const place = client.working_place || 'Unknown';
      if (!workingPlaceCounts[place]) {
        workingPlaceCounts[place] = 0;
      }
      workingPlaceCounts[place]++;
    });

    // HHI = sum of (share)^2
    let hhi = 0;

    Object.values(workingPlaceCounts).forEach(count => {
      const share = count / total_clients;
      hhi += share * share;
    });

    // PP = HHI * 25%
    const percentage_point = hhi * 0.25;

    return res.json({
      office_id,
      total_clients,
      HHI: hhi.toFixed(4),
      weight: "25%",
      percentage_point: percentage_point.toFixed(4)
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});


// Product Risk Score
app.get('/product-risk-score/:office_id', async (req, res) => {
  try {
    const { office_id } = req.params;

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" });
    }

    const [consultants] = await pool.query(`
      SELECT u.id
      FROM users u
      JOIN role_users ru ON ru.user_id = u.id
      WHERE ru.role_id = 3
        AND u.office_id = ?
    `, [office_id]);

    if (!consultants.length) {
      return res.json({
        office_id,
        consultant_count: 0,
        total_disbursed: 0,
        total_defaulted: 0,
        defaulted_rate: 0,
        weight: "30%",
        percentage_point: 0
      });
    }

    let total_disbursed = 0;
    let total_defaulted = 0;
    const today = dayjs();

    for (const user of consultants) {
      const [loans] = await pool.query(
        `SELECT id, created_date FROM loans WHERE loan_officer_id = ?`,
        [user.id]
      );

      if (!loans.length) continue;

      const loanIds = loans.map(l => l.id);

      const [transactions] = await pool.query(`
        SELECT loan_id, debit, credit, transaction_type, payment_apply_to
        FROM loan_transactions
        WHERE loan_id IN (?)
      `, [loanIds]);

      // Map loan_id -> has_full_payment
      const loanPaymentsMap = {};
      const loanDisbursementMap = {};

      loans.forEach(l => {
        loanPaymentsMap[l.id] = false;
        loanDisbursementMap[l.id] = 0;
      });

      transactions.forEach(t => {
        if (t.transaction_type === 'disbursement') {
          loanDisbursementMap[t.loan_id] += Number(t.debit) || 0;
        }
        if (
          t.transaction_type === 'repayment' &&
          t.payment_apply_to === 'full_payment'
        ) {
          loanPaymentsMap[t.loan_id] = true;
        }
      });

      // Sum total disbursed
      total_disbursed += Object.values(loanDisbursementMap).reduce((a,b) => a+b, 0);

      // Identify defaulted loans (no full payment, >1 month old)
      loans.forEach(l => {
        const loanDate = dayjs(l.created_date);
        if (!loanPaymentsMap[l.id] && today.diff(loanDate, 'month') > 0) {
          total_defaulted += loanDisbursementMap[l.id];
        }
      });
    }

    // ===============================
    // Calculate Default Rate & PP
    // ===============================
    const defaulted_rate = total_disbursed > 0 ? total_defaulted / total_disbursed : 0;

    const score = defaulted_rate / 0.2836;

    const percentage_point = score * 0.30;

    return res.json({
      office_id,
      consultant_count: consultants.length,
      total_disbursed: total_disbursed.toFixed(2),
      total_defaulted: total_defaulted.toFixed(2),
      defaulted_rate: (defaulted_rate*100).toFixed(2) + "%",
      weight: "30%",
      percentage_point: percentage_point.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});


//Month-1 Default Performance

app.get('/month-1-default-performance/:office_id', async (req, res) => {
  try {
    const { office_id } = req.params;

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" });
    }

    const [consultants] = await pool.query(`
      SELECT u.id
      FROM users u
      JOIN role_users ru ON ru.user_id = u.id
      WHERE ru.role_id = 3
        AND u.office_id = ?
    `, [office_id]);

    if (!consultants.length) {
      return res.json({
        office_id,
        consultant_count: 0,
        total_disbursed: 0,
        month_1_defaulted: 0,
        month_1_default_rate: 0,
        weight: "40%",
        percentage_point: 0
      });
    }

    let total_disbursed = 0;
    let month_1_defaulted = 0;
    const today = dayjs();

    for (const user of consultants) {
      const [loans] = await pool.query(
        `SELECT id, created_date FROM loans WHERE loan_officer_id = ?`,
        [user.id]
      );

      if (!loans.length) continue;

      const loanIds = loans.map(l => l.id);

      const [transactions] = await pool.query(`
        SELECT loan_id, debit, transaction_type, payment_apply_to, date
        FROM loan_transactions
        WHERE loan_id IN (?)
      `, [loanIds]);

      const loanDisbursementMap = {};
      const loanMonth1PaymentMap = {};

      loans.forEach(l => {
        loanDisbursementMap[l.id] = 0;
        loanMonth1PaymentMap[l.id] = false;
      });

      transactions.forEach(t => {
        if (t.transaction_type === 'disbursement') {
          loanDisbursementMap[t.loan_id] += Number(t.debit) || 0;
        }

        if (
          t.transaction_type === 'repayment' &&
          t.payment_apply_to === 'full_payment'
        ) {
          const loanCreated = loans.find(l => l.id === t.loan_id).created_date;
          // Check if full payment occurred within first month
          if (dayjs(t.date).diff(dayjs(loanCreated), 'month') < 1) {
            loanMonth1PaymentMap[t.loan_id] = true;
          }
        }
      });

      // Sum total disbursed for all loans
      total_disbursed += Object.values(loanDisbursementMap).reduce((a,b) => a+b, 0);

      // Calculate month-1 defaulted amount
      loans.forEach(l => {
        const loanAgeInMonths = today.diff(dayjs(l.created_date), 'month');
        if (!loanMonth1PaymentMap[l.id] && loanAgeInMonths >= 1) {
          // Defaulted in month 1 → sum the disbursement
          month_1_defaulted += loanDisbursementMap[l.id];
        }
      });
    }

    const month_1_default_rate = total_disbursed > 0 ? month_1_defaulted / total_disbursed : 0;

    // ===============================
    // Calculate Score
    // ===============================
    let score = 0;
    const ratePercent = month_1_default_rate * 100;

    if (ratePercent <= 25) {
      score = 100;
    } else {
      score = 100 - ((ratePercent - 25) * 5);
      if (score < 0) score = 0;
    }

    const percentage_point = score * 0.40;

    return res.json({
      office_id,
      consultant_count: consultants.length,
      total_disbursed: total_disbursed.toFixed(2),
      month_1_defaulted: month_1_defaulted.toFixed(2),
      month_1_default_rate: (month_1_default_rate*100).toFixed(2) + "%",
      weight: "40%",
      percentage_point: percentage_point.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});


//3-Month Recovery Achievement
app.get('/3-month-recovery-achievement/:office_id', async (req, res) => {
  try {
    const { office_id } = req.params;

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" });
    }

    const [consultants] = await pool.query(`
      SELECT u.id
      FROM users u
      JOIN role_users ru ON ru.user_id = u.id
      WHERE ru.role_id = 3
        AND u.office_id = ?
    `, [office_id]);

    if (!consultants.length) {
      return res.json({
        office_id,
        consultant_count: 0,
        month_1_defaulted: 0,
        recovered_3_months: 0,
        recovery_rate_3_months: 0,
        weight: "30%",
        percentage_point: 0
      });
    }

    let month_1_defaulted = 0;
    let recovered_3_months = 0;
    const today = dayjs();

    for (const user of consultants) {
      const [loans] = await pool.query(
        `SELECT id, created_date FROM loans WHERE loan_officer_id = ?`,
        [user.id]
      );

      if (!loans.length) continue;

      const loanIds = loans.map(l => l.id);

      const [transactions] = await pool.query(`
        SELECT loan_id, debit, credit, transaction_type, payment_apply_to, date
        FROM loan_transactions
        WHERE loan_id IN (?)
      `, [loanIds]);

      // Map loan_id -> disbursement sum & month1 full payment
      const loanDisbursementMap = {};
      const loanMonth1PaymentMap = {};

      loans.forEach(l => {
        loanDisbursementMap[l.id] = 0;
        loanMonth1PaymentMap[l.id] = false;
      });

      transactions.forEach(t => {
        if (t.transaction_type === 'disbursement') {
          loanDisbursementMap[t.loan_id] += Number(t.debit) || 0;
        }

        if (
          t.transaction_type === 'repayment' &&
          t.payment_apply_to === 'full_payment'
        ) {
          const loanCreated = loans.find(l => l.id === t.loan_id).created_date;
          // Check if full payment occurred within first month
          if (dayjs(t.date).diff(dayjs(loanCreated), 'month') < 1) {
            loanMonth1PaymentMap[t.loan_id] = true;
          }
        }
      });

      // Identify month-1 defaulted loans
      const month1DefaultedLoans = loans.filter(l => {
        const loanAgeInMonths = today.diff(dayjs(l.created_date), 'month');
        return !loanMonth1PaymentMap[l.id] && loanAgeInMonths >= 1;
      });

      // Sum month-1 defaulted amount
      month1DefaultedLoans.forEach(l => {
        month_1_defaulted += loanDisbursementMap[l.id];
      });

      // Find recovery within 3 months
      month1DefaultedLoans.forEach(l => {
        transactions.forEach(t => {
          if (
            t.loan_id === l.id &&
            t.transaction_type === 'repayment' &&
            t.payment_apply_to === 'full_payment'
          ) {
            const loanCreated = dayjs(l.created_date);
            const paymentDate = dayjs(t.date);
            const monthsDiff = paymentDate.diff(loanCreated, 'month', true);
            if (monthsDiff <= 3) {
              recovered_3_months += Number(t.credit) || 0;
            }
          }
        });
      });

    }

    const recovery_rate_3_months = month_1_defaulted > 0
      ? recovered_3_months / month_1_defaulted
      : 0;

    let score = (recovery_rate_3_months / 0.5605) * 100;
    if (score > 100) score = 100;

    const percentage_point = score * 0.30;

    return res.json({
      office_id,
      consultant_count: consultants.length,
      month_1_defaulted: month_1_defaulted.toFixed(2),
      recovered_3_months: recovered_3_months.toFixed(2),
      recovery_rate_3_months: (recovery_rate_3_months*100).toFixed(2) + "%",
      weight: "30%",
      percentage_point: percentage_point.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

//roll rate  control
app.get('/roll-rate-control/:office_id', async (req, res) => {
  try {
    const { office_id } = req.params;

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" });
    }

    // ===============================
    // 1️⃣ GET DISBURSED LOANS
    // ===============================
    const [loans] = await pool.query(`
      SELECT l.id, l.due_date
      FROM loans l
      JOIN users u ON u.id = l.loan_officer_id
      WHERE u.office_id = ?
      AND l.status = 'disbursed'
    `, [office_id]);

    const total_loans = loans.length;

    if (total_loans === 0) {
      return res.json({
        office_id,
        message: "No disbursed loans found",
        score: "0%",
        percentage_point: 0
      });
    }

    let bucket_1_30 = 0;
    let bucket_31_60 = 0;
    let bucket_61_90 = 0;
    let bucket_90_plus = 0;

    const today = new Date();

    // ===============================
    // 2️⃣ CLASSIFY OVERDUE BUCKETS
    // ===============================
    for (let loan of loans) {

      const dueDate = new Date(loan.due_date);
      const diffTime = today - dueDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays > 0 && diffDays <= 30) {
        bucket_1_30++;
      } else if (diffDays > 30 && diffDays <= 60) {
        bucket_31_60++;
      } else if (diffDays > 60 && diffDays <= 90) {
        bucket_61_90++;
      } else if (diffDays > 90) {
        bucket_90_plus++;
      }
    }

    // ===============================
    // 3️⃣ CALCULATE ROLL RATES
    // ===============================
    const rr_1_30 = bucket_1_30 / total_loans;
    const rr_31_60 = bucket_31_60 / total_loans;
    const rr_61_90 = bucket_61_90 / total_loans;
    const rr_90_plus = bucket_90_plus / total_loans;

    // ===============================
    // 4️⃣ SCORE (AVERAGE OF ROLL RATES)
    // ===============================
    const score =
      ((rr_1_30 + rr_31_60 + rr_61_90 + rr_90_plus) / 4) * 100;

    // ===============================
    // 5️⃣ PP (20% WEIGHT)
    // ===============================
    const percentage_point = score * 0.20;

    return res.json({
      office_id,
      total_loans,
      buckets: {
        "1-30_days": bucket_1_30,
        "31-60_days": bucket_31_60,
        "61-90_days": bucket_61_90,
        "90+_days": bucket_90_plus
      },
      roll_rates: {
        "1-30_days": (rr_1_30 * 100).toFixed(2) + "%",
        "31-60_days": (rr_31_60 * 100).toFixed(2) + "%",
        "61-90_days": (rr_61_90 * 100).toFixed(2) + "%",
        "90+_days": (rr_90_plus * 100).toFixed(2) + "%"
      },
      score: score.toFixed(2) + "%",
      weight: "20%",
      percentage_point: percentage_point.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});


//Long term delinquency risk
app.get('/long-term-delinquency-risk/:office_id', async (req, res) => {
  try {
    const { office_id } = req.params;

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" });
    }

    const [consultants] = await pool.query(`
      SELECT u.id
      FROM users u
      JOIN role_users ru ON ru.user_id = u.id
      WHERE ru.role_id = 3
        AND u.office_id = ?
    `, [office_id]);

    if (!consultants.length) {
      return res.json({
        office_id,
        consultant_count: 0,
        month_1_default_loans: 0,
        long_term_delinquent_loans: 0,
        long_term_default_rate: 0,
        score: 0,
        weight: "10%",
        percentage_point: 0
      });
    }

    let month_1_default_loans = 0;
    let long_term_delinquent_loans = 0;
    const today = dayjs();

    for (const user of consultants) {

      const [loans] = await pool.query(
        `SELECT id, created_date FROM loans WHERE loan_officer_id = ?`,
        [user.id]
      );

      if (!loans.length) continue;

      const loanIds = loans.map(l => l.id);

      const [transactions] = await pool.query(`
        SELECT loan_id, transaction_type, payment_apply_to, date
        FROM loan_transactions
        WHERE loan_id IN (?)
      `, [loanIds]);

      const loanMonth1PaymentMap = {};
      const loanFullPaymentMap = {};

      loans.forEach(l => {
        loanMonth1PaymentMap[l.id] = false;
        loanFullPaymentMap[l.id] = false;
      });

      transactions.forEach(t => {
        if (
          t.transaction_type === 'repayment' &&
          t.payment_apply_to === 'full_payment'
        ) {
          loanFullPaymentMap[t.loan_id] = true;

          const loanCreated = loans.find(l => l.id === t.loan_id).created_date;

          // Full payment within 1 month?
          if (dayjs(t.date).diff(dayjs(loanCreated), 'month') < 1) {
            loanMonth1PaymentMap[t.loan_id] = true;
          }
        }
      });

      // Month-1 defaults
      const month1Defaults = loans.filter(l => {
        const ageInMonths = today.diff(dayjs(l.created_date), 'month');
        return !loanMonth1PaymentMap[l.id] && ageInMonths >= 1;
      });

      month_1_default_loans += month1Defaults.length;

      // Long-term delinquent (no full payment after 3 months)
      month1Defaults.forEach(l => {
        const ageInMonths = today.diff(dayjs(l.created_date), 'month');
        if (!loanFullPaymentMap[l.id] && ageInMonths >= 3) {
          long_term_delinquent_loans++;
        }
      });
    }

    const long_term_default_rate =
      month_1_default_loans > 0
        ? long_term_delinquent_loans / month_1_default_loans
        : 0;

    const ratePercent = long_term_default_rate * 100;

    // ===============================
    // SCORE CALCULATION
    // ===============================
    let score = 100;

    if (ratePercent > 43.95) {
      const excess = ratePercent - 43.95;
      score = 100 - (excess * 2);
      if (score < 0) score = 0;
    }

    // ===============================
    // PP = Score × 10%
    // ===============================
    const percentage_point = score * 0.10;

    return res.json({
      office_id,
      consultant_count: consultants.length,
      month_1_default_loans,
      long_term_delinquent_loans,
      long_term_default_rate: ratePercent.toFixed(2) + "%",
      target: "43.95%",
      score: score.toFixed(2),
      weight: "10%",
      percentage_point: percentage_point.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

//REVENUE & PERFORMANCE METRICS INDEX (RPMI)
//Revenue Achievement

app.get('/revenue-achievement/:office_id', async (req, res) => {
  try {
    const { office_id } = req.params;

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" });
    }

    const EXPECTED_REVENUE = 418600;

    const [consultants] = await pool.query(`
      SELECT u.id
      FROM users u
      JOIN role_users ru ON ru.user_id = u.id
      WHERE ru.role_id = 3
        AND u.office_id = ?
    `, [office_id]);

    if (!consultants.length) {
      return res.json({
        office_id,
        consultant_count: 0,
        actual_revenue: 0,
        expected_revenue: EXPECTED_REVENUE,
        score: 0,
        weight: "40%",
        percentage_point: 0
      });
    }

    let total_revenue = 0;

    // ✅ Use CURRENT CALENDAR MONTH
    const start_date = dayjs().startOf('month').format('YYYY-MM-DD');
    const end_date = dayjs().endOf('month').format('YYYY-MM-DD');

    for (const user of consultants) {

      const [loans] = await pool.query(
        `SELECT id FROM loans WHERE loan_officer_id = ?`,
        [user.id]
      );

      if (!loans.length) continue;

      const loanIds = loans.map(l => l.id);

      const [transactions] = await pool.query(`
        SELECT credit, transaction_type, payment_apply_to
        FROM loan_transactions
        WHERE loan_id IN (?)
          AND date >= ?
          AND date <= ?
      `, [loanIds, start_date, end_date]);

      transactions.forEach(t => {
        if (
          t.transaction_type === 'repayment' &&
          ['part_payment', 'full_payment', 'reloan_payment']
            .includes(t.payment_apply_to)
        ) {
          total_revenue += Number(t.credit) || 0;
        }
      });
    }

    // ===============================
    // SCORE CALCULATION
    // ===============================
    let score = EXPECTED_REVENUE > 0
      ? (total_revenue / EXPECTED_REVENUE) * 100
      : 0;

    if (score > 100) score = 100; // optional cap

    const percentage_point = score * 0.40;

    return res.json({
      office_id,
      consultant_count: consultants.length,
      period: `${start_date} to ${end_date}`,
      actual_revenue: total_revenue.toFixed(2),
      expected_revenue: EXPECTED_REVENUE,
      score: score.toFixed(2),
      weight: "40%",
      percentage_point: percentage_point.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});


//effiency ratio

app.get('/efficiency-ratio/:office_id', async (req, res) => {
  try {
    const { office_id } = req.params;

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" });
    }

    const start_date = dayjs().startOf('month').format('YYYY-MM-DD');
    const end_date = dayjs().endOf('month').format('YYYY-MM-DD');

    // ===============================
    // 1️⃣ OPERATING COSTS
    // ===============================
    const [expenses] = await pool.query(`
      SELECT amount
      FROM expenses
      WHERE office_id = ?
        AND date >= ?
        AND date <= ?
    `, [office_id, start_date, end_date]);

    const operating_costs = expenses.reduce(
      (sum, e) => sum + (Number(e.amount) || 0),
      0
    );

    // ===============================
    // 2️⃣ GET ALL LOANS IN OFFICE
    // ===============================
    const [consultants] = await pool.query(`
      SELECT u.id
      FROM users u
      JOIN role_users ru ON ru.user_id = u.id
      WHERE ru.role_id = 3
        AND u.office_id = ?
    `, [office_id]);

    let total_disbursed = 0;
    let total_repayments = 0;

    for (const user of consultants) {

      const [loans] = await pool.query(
        `SELECT id FROM loans WHERE loan_officer_id = ?`,
        [user.id]
      );

      if (!loans.length) continue;

      const loanIds = loans.map(l => l.id);

      const [transactions] = await pool.query(`
        SELECT debit, credit, transaction_type, payment_apply_to, date
        FROM loan_transactions
        WHERE loan_id IN (?)
      `, [loanIds]);

      transactions.forEach(t => {

        // Total disbursed (all-time principal)
        if (t.transaction_type === 'disbursement') {
          total_disbursed += Number(t.debit) || 0;
        }

        // Repayments this month
        if (
          t.transaction_type === 'repayment' &&
          t.date >= start_date &&
          t.date <= end_date &&
          ['part_payment', 'full_payment', 'reloan_payment']
            .includes(t.payment_apply_to)
        ) {
          total_repayments += Number(t.credit) || 0;
        }

      });
    }

    // ===============================
    // 3️⃣ CALCULATE INCOME
    // ===============================
    const income = total_repayments - total_disbursed;

    const CIR = income > 0
      ? operating_costs / income
      : 0;

    // ===============================
    // 4️⃣ SCORE & PP
    // ===============================
    let score = CIR > 0
      ? 0.55 / CIR
      : 0;

    if (score > 100) score = 100;

    const percentage_point = score * 0.30;

    return res.json({
      office_id,
      period: `${start_date} to ${end_date}`,
      operating_costs: operating_costs.toFixed(2),
      income: income.toFixed(2),
      CIR: CIR.toFixed(4),
      target: "55%",
      score: score.toFixed(2),
      weight: "30%",
      percentage_point: percentage_point.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});



//Profitability Contribution
app.get('/profitability-contribution/:office_id', async (req, res) => {
  try {
    const { office_id } = req.params;

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" });
    }

    const start_date = dayjs().startOf('month').format('YYYY-MM-DD');
    const end_date = dayjs().endOf('month').format('YYYY-MM-DD');

    // ===============================
    // 1️⃣ COMPANY OPERATING COSTS
    // ===============================
    const [companyExpenses] = await pool.query(`
      SELECT amount
      FROM expenses
      WHERE date >= ?
        AND date <= ?
    `, [start_date, end_date]);

    const company_operating_costs = companyExpenses.reduce(
      (sum, e) => sum + (Number(e.amount) || 0),
      0
    );

    // ===============================
    // 2️⃣ COMPANY REVENUE
    // ===============================
    const [companyRevenueTx] = await pool.query(`
      SELECT credit
      FROM loan_transactions
      WHERE transaction_type = 'repayment'
        AND payment_apply_to IN ('part_payment','full_payment','reloan_payment')
        AND date >= ?
        AND date <= ?
    `, [start_date, end_date]);

    const company_revenue = companyRevenueTx.reduce(
      (sum, t) => sum + (Number(t.credit) || 0),
      0
    );

    const company_net_contribution =
      company_revenue - company_operating_costs;

    // ===============================
    // 3️⃣ BRANCH OPERATING COSTS
    // ===============================
    const [branchExpenses] = await pool.query(`
      SELECT amount
      FROM expenses
      WHERE office_id = ?
        AND date >= ?
        AND date <= ?
    `, [office_id, start_date, end_date]);

    const branch_operating_costs = branchExpenses.reduce(
      (sum, e) => sum + (Number(e.amount) || 0),
      0
    );

    // ===============================
    // 4️⃣ BRANCH REVENUE
    // ===============================
    const [branchRevenueTx] = await pool.query(`
      SELECT lt.credit
      FROM loan_transactions lt
      JOIN loans l ON l.id = lt.loan_id
      JOIN users u ON u.id = l.loan_officer_id
      WHERE u.office_id = ?
        AND lt.transaction_type = 'repayment'
        AND lt.payment_apply_to IN ('part_payment','full_payment','reloan_payment')
        AND lt.date >= ?
        AND lt.date <= ?
    `, [office_id, start_date, end_date]);

    const branch_revenue = branchRevenueTx.reduce(
      (sum, t) => sum + (Number(t.credit) || 0),
      0
    );

    const branch_net_contribution =
      branch_revenue - branch_operating_costs;

    // ===============================
    // 5️⃣ SCORE & PP
    // ===============================
    let score = company_net_contribution !== 0
      ? branch_net_contribution / company_net_contribution
      : 0;

    if (score > 1.5) score = 1.5; // cap at 150%

    const percentage_point = score * 0.20;

    return res.json({
      office_id,
      period: `${start_date} to ${end_date}`,
      company_net_contribution: company_net_contribution.toFixed(2),
      branch_net_contribution: branch_net_contribution.toFixed(2),
      score: (score * 100).toFixed(2) + "%",
      weight: "20%",
      percentage_point: percentage_point.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});



//Groth Trajectory

app.get('/growth-trajectory/:office_id', async (req, res) => {
  try {
    const { office_id } = req.params;

    const currentStart = new Date();
    currentStart.setDate(1);
    currentStart.setHours(0, 0, 0, 0);

    const currentEnd = new Date();
    currentEnd.setMonth(currentEnd.getMonth() + 1);
    currentEnd.setDate(0);
    currentEnd.setHours(23, 59, 59, 999);

    const previousStart = new Date(currentStart);
    previousStart.setMonth(previousStart.getMonth() - 1);

    const previousEnd = new Date(currentStart);
    previousEnd.setDate(0);
    previousEnd.setHours(23, 59, 59, 999);

    // Function to calculate revenue for a period
    const calculateRevenue = async (startDate, endDate) => {
      const [transactions] = await pool.query(`
        SELECT 
          t.credit,
          l.principal_amount
        FROM transactions t
        JOIN loans l ON l.id = t.loan_id
        WHERE l.office_id = ?
        AND t.transaction_type IN ('part_payment','full_payment','reloan_payment')
        AND t.date BETWEEN ? AND ?
      `, [office_id, startDate, endDate]);

      let totalRevenue = 0;

      for (let tx of transactions) {
        const interest = tx.credit - tx.principal_amount;
        if (interest > 0) {
          totalRevenue += interest;
        }
      }

      return totalRevenue;
    };

    const currentRevenue = await calculateRevenue(currentStart, currentEnd);
    const previousRevenue = await calculateRevenue(previousStart, previousEnd);

    let momRevenue = 0;
    if (previousRevenue > 0) {
      momRevenue = (currentRevenue - previousRevenue) / previousRevenue;
    }

    // Score = (MoM / 2.5%) × 100
    let score = (momRevenue / 0.025) * 100;

    if (score > 100) score = 100;
    if (score < 0) score = 0;

    const PP = score * 1; // 100%

    res.json({
      office_id,
      current_month_revenue: currentRevenue,
      previous_month_revenue: previousRevenue,
      mom_revenue: momRevenue,
      score,
      PP
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(5000,()=>{
    console.log('Server is up and running');
})