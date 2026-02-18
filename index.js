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

// Health check endpoint to test DB connection
app.get("/health", async (req, res) => {
    try {
        const [result] = await pool.query("SELECT 1 as status");
        res.json({ status: "ok", message: "Database connection is working", data: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Database connection failed", error: err.message });
    }
});


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
    const { status, start_date, end_date, office_id, province_id } = req.query;

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

    // Filter by office_id if provided
    if (office_id) {
      query += ` AND office_id = ?`;
      values.push(office_id);
    }

    // Filter by province_id if provided
    if (province_id) {
      query += ` AND province_id = ?`;
      values.push(province_id);
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



app.get("/loan/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [loan] = await pool.query(`SELECT * FROM loans WHERE id = ?`, [id]);

        if (loan.length === 0) {
            return res.status(404).json({ error: "Loan not found" });
        }

        res.json(loan[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch loan" });
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
    const { actions, due, urgent, position_id, user_id, office_id } = req.body;

    // Validation
    if (!actions || due === undefined || due === null) {
      return res.status(400).json({
        error: "actions and due are required"
      });
    }

    // Ensure due is numeric
    if (!due) {
      return res.status(400).json({
        error: "due must be a valid number"
      });
    }

    const query = `
      INSERT INTO smart_priority_actions (actions, due, urgent, status, position_id, user_id, office_id, created_date, updated_at)
      VALUES (?, ?, ?, 0, ?, ?, ?, NOW(), NOW())
    `;

    const [result] = await pool.query(query, [actions, due, urgent || 0, position_id || null, user_id || null, office_id || null]);

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

app.get("/smart-priority-actions", async (req, res) => {
  try {
    const { start_date, end_date, user_id, office_id, position_id, status } = req.query;

    // Get today's date as default
    const today = new Date().toISOString().split('T')[0];

    // Use provided dates or default to today
    const startDate = start_date || today;
    const endDate = end_date || today;

    let query = `
      SELECT * 
      FROM smart_priority_actions 
      WHERE status = 0 
      AND created_date BETWEEN ? AND ?
    `;

    let values = [startDate, endDate];


    // Add optional filters
    if (user_id) {
      query += ` AND user_id = ?`;
      values.push(user_id);
    }

    if (office_id) {
      query += ` AND office_id = ?`;
      values.push(office_id);
    }

    if (position_id) {
      query += ` AND position_id = ?`;
      values.push(position_id);
    }

    if (status !== undefined) {
      query += ` AND status = ?`;
      values.push(status);
    }

    query += ` ORDER BY created_date DESC`;

    const [actions] = await pool.query(query, values);

    return res.json({
      success: true,
      count: actions.length,
      data: actions
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch smart priority actions" });
  }
});


// Get all staff active users, byOffice, byProvince
app.get("/staff", async (req, res) => {
    try {
        const { office_id, province_id } = req.query;

        let query = `SELECT * FROM users WHERE status = 'Active'`;
        let values = [];

        // Filter by office_id if provided
        if (office_id) {
            query += ` AND office_id = ?`;
            values.push(office_id);
        }

        // Filter by province_id if provided
        if (province_id) {
            query += ` AND province_id = ?`;
            values.push(province_id);
        }

        const [staff] = await pool.query(query, values);
        res.json(staff);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch staff" });
    }
});


app.get("/staffbyPosition", async (req, res) => {
    try {
        const { position_id, office_id, province_id } = req.query;

        let query = `SELECT * FROM users WHERE status = 'Active'`;
        let values = [];

        // Filter by position_id if provided
        if (position_id) {
            query += ` AND job_position = ?`;
            values.push(position_id);
        }

        // Filter by office_id if provided
        if (office_id) {
            query += ` AND office_id = ?`;
            values.push(office_id);
        }

        // Filter by province_id if provided
        if (province_id) {
            query += ` AND province_id = ?`;
            values.push(province_id);
        }

        const [staff] = await pool.query(query, values);
        res.json(staff);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch staff" });
    }
});





app.listen(5000,()=>{
    console.log('Server is up and running');
})