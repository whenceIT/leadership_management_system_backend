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



app.get('/smart-kpi-scores/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const scores = await pool.query(
      'SELECT * FROM smart_kpi_score WHERE user_id = ?',
      [user_id]
    );

    res.json(scores[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});




app.listen(5000,()=>{
    console.log('Server is up and running');
})