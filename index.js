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


// KPI Scores APIs
const kpiScoresRouter = require('./api/kpi_scores');
app.use('/api/kpi-scores', kpiScoresRouter);

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

// Get branch stats by office_id
app.get("/branch-stats", async (req, res) => {
    try {
        const { office_id } = req.query;

        if (!office_id) {
            return res.status(400).json({ error: "office_id is required" });
        }

        // Total staff (active users)
        const [totalStaffResult] = await pool.query(
            `SELECT COUNT(*) as count FROM users WHERE office_id = ? AND status = 'Active'`,
            [office_id]
        );

        // Total staff on leave (approved leave_days)
        const [staffOnLeaveResult] = await pool.query(
            `SELECT COUNT(DISTINCT user_id) as count FROM leave_days WHERE office_id = ? AND status = 'approved'`,
            [office_id]
        );

        // Total pending loans
        const [pendingLoansResult] = await pool.query(
            `SELECT COUNT(*) as count FROM loans WHERE office_id = ? AND status = 'pending'`,
            [office_id]
        );

        // Total disbursed loans
        const [disbursedLoansResult] = await pool.query(
            `SELECT COUNT(*) as count FROM loans WHERE office_id = ? AND status = 'disbursed'`,
            [office_id]
        );

        // Total active clients
        const [activeClientsResult] = await pool.query(
            `SELECT COUNT(*) as count FROM clients WHERE office_id = ? AND status = 'active'`,
            [office_id]
        );

        // Total pending advances
        const [pendingAdvancesResult] = await pool.query(
            `SELECT COUNT(*) as count FROM advances WHERE office_id = ? AND status = 'pending'`,
            [office_id]
        );

        // Total approved advances
        const [approvedAdvancesResult] = await pool.query(
            `SELECT COUNT(*) as count FROM advances WHERE office_id = ? AND status = 'approved'`,
            [office_id]
        );

        // Total pending expenses
        const [pendingExpensesResult] = await pool.query(
            `SELECT COUNT(*) as count FROM expenses WHERE office_id = ? AND status = 'pending'`,
            [office_id]
        );

        // Total tickets open
        const [openTicketsResult] = await pool.query(
            `SELECT COUNT(*) as count FROM tickets WHERE status = 'open'`,
            []
        );

        // Total loan portfolio (sum of principal for disbursed loans)
        const [loanPortfolioResult] = await pool.query(
            `SELECT COALESCE(SUM(principal), 0) as total FROM loans WHERE office_id = ? AND status = 'disbursed'`,
            [office_id]
        );

        // Total pending loan transactions
        const [pendingTransactionsResult] = await pool.query(
            `SELECT COUNT(*) as count FROM loan_transactions WHERE office_id = ?`,
            [office_id]
        );

        return res.json({
            success: true,
            data: {
                office_id: parseInt(office_id),
                total_staff: totalStaffResult[0].count,
                staff_on_leave: staffOnLeaveResult[0].count,
                pending_loans: pendingLoansResult[0].count,
                disbursed_loans: disbursedLoansResult[0].count,
                active_clients: activeClientsResult[0].count,
                pending_advances: pendingAdvancesResult[0].count,
                approved_advances: approvedAdvancesResult[0].count,
                pending_expenses: pendingExpensesResult[0].count,
                open_tickets: openTicketsResult[0].count,
                loan_portfolio: loanPortfolioResult[0].total,
                pending_transactions: pendingTransactionsResult[0].count
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch branch stats" });
    }
});

/**
 * GET /smart-alerts
 * Fetch alerts with filtering support
 */
app.get('/smart-alerts', async (req, res) => {
  try {
    const {
      user_id,
      position_id,
      office_id,
      kpi_id,
      type,
      priority,
      category,
      unread_only = 'true',
      limit = 50
    } = req.query;

    // Build the query
    let sql = `
      SELECT * FROM smart_alerts 
      WHERE is_dismissed = 0 
        AND (expires_at IS NULL OR expires_at > NOW())
    `;
    const params = [];

    // Add filters
    if (user_id || position_id || office_id) {
      sql += ` AND (`;
      const orConditions = [];
      
      if (user_id) {
        orConditions.push(`user_id = ?`);
        params.push(parseInt(user_id));
      }
      if (position_id) {
        orConditions.push(`position_id = ?`);
        params.push(parseInt(position_id));
      }
      if (office_id) {
        orConditions.push(`office_id = ?`);
        params.push(parseInt(office_id));
      }
      
      sql += orConditions.join(' OR ') + `)`;
    }

    if (kpi_id) {
      sql += ` AND kpi_id = ?`;
      params.push(parseInt(kpi_id));
    }

    if (type) {
      sql += ` AND type = ?`;
      params.push(type);
    }

    if (priority) {
      sql += ` AND priority = ?`;
      params.push(priority);
    }

    if (category) {
      sql += ` AND category = ?`;
      params.push(category);
    }

    if (unread_only === 'true') {
      sql += ` AND is_read = 0`;
    }

    // Order by priority and date
    sql += `
      ORDER BY 
        FIELD(priority, 'critical', 'high', 'medium', 'low'),
        created_at DESC
      LIMIT ?
    `;
    params.push(parseInt(limit));

    const [alerts] = await pool.query(sql, params);

    res.json({
      success: true,
      data: alerts,
      count: alerts.length
    });

  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch alerts'
    });
  }
});

/**
 * POST /smart-alerts
 * Create a new alert
 */
app.post('/smart-alerts', async (req, res) => {
  try {
    const {
      type = 'info',
      priority = 'medium',
      message,
      title,
      category,
      source = 'system',
      kpi_id,
      position_id,
      office_id,
      province_id,
      user_id,
      action_url,
      action_label,
      expires_at,
      metadata
    } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const [result] = await pool.query(
      `INSERT INTO smart_alerts 
        (type, priority, message, title, category, source, kpi_id, position_id, office_id, 
         province_id, user_id, action_url, action_label, expires_at, metadata)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [type, priority, message, title, category, source, kpi_id, position_id, office_id,
       province_id, user_id, action_url, action_label, expires_at, 
       metadata ? JSON.stringify(metadata) : null]
    );

    // Fetch the inserted row
    const [newAlert] = await pool.query(
      `SELECT * FROM smart_alerts WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      data: newAlert[0],
      message: 'Alert created successfully'
    });

  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create alert'
    });
  }
});

/**
 * GET /smart-alerts/:id
 * Get a single alert by id
 */
app.get('/smart-alerts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [alerts] = await pool.query(
      `SELECT * FROM smart_alerts WHERE id = ?`,
      [id]
    );

    if (alerts.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found'
      });
    }

    res.json({
      success: true,
      data: alerts[0]
    });

  } catch (error) {
    console.error('Error fetching alert:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch alert'
    });
  }
});

/**
 * PATCH /smart-alerts/:id
 * Update alert status (mark as read, dismiss, etc.)
 */
app.patch('/smart-alerts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { is_read, is_dismissed, type, priority, message, title, category } = req.body;

    const updates = [];
    const params = [];

    if (typeof is_read !== 'undefined') {
      updates.push('is_read = ?');
      params.push(is_read ? 1 : 0);
    }

    if (typeof is_dismissed !== 'undefined') {
      updates.push('is_dismissed = ?');
      params.push(is_dismissed ? 1 : 0);
    }

    if (type) {
      updates.push('type = ?');
      params.push(type);
    }

    if (priority) {
      updates.push('priority = ?');
      params.push(priority);
    }

    if (message) {
      updates.push('message = ?');
      params.push(message);
    }

    if (title) {
      updates.push('title = ?');
      params.push(title);
    }

    if (category) {
      updates.push('category = ?');
      params.push(category);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid update fields provided'
      });
    }

    params.push(id);

    const [result] = await pool.query(
      `UPDATE smart_alerts SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found'
      });
    }

    // Fetch the updated alert
    const [updatedAlert] = await pool.query(
      `SELECT * FROM smart_alerts WHERE id = ?`,
      [id]
    );

    res.json({
      success: true,
      data: updatedAlert[0],
      message: 'Alert updated successfully'
    });

  } catch (error) {
    console.error('Error updating alert:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update alert'
    });
  }
});

/**
 * DELETE /smart-alerts/:id
 * Delete an alert
 */
app.delete('/smart-alerts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query('DELETE FROM smart_alerts WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found'
      });
    }

    res.json({
      success: true,
      message: 'Alert deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting alert:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete alert'
    });
  }
});

// Get loan consultant stats
app.get("/loan-consultant-stats", async (req, res) => {
    try {
        const { start_date, end_date, office_id, province_id, user_id } = req.query;

        // Build base WHERE clause
        let baseWhere = "WHERE 1=1";
        const params = [];

        // Date range filter
        if (start_date && end_date) {
            baseWhere += ` AND l.created_at BETWEEN ? AND ?`;
            params.push(start_date, end_date);
        } else if (start_date) {
            baseWhere += ` AND l.created_at >= ?`;
            params.push(start_date);
        } else if (end_date) {
            baseWhere += ` AND l.created_at <= ?`;
            params.push(end_date);
        }

        // Office filter
        if (office_id) {
            baseWhere += ` AND l.office_id = ?`;
            params.push(office_id);
        }

        // Province filter (join with offices table)
        let provinceJoin = '';
        if (province_id) {
            provinceJoin = ` JOIN offices o ON l.office_id = o.id`;
            baseWhere += ` AND o.province_id = ?`;
            params.push(province_id);
        }

        // User/Loan Officer filter
        if (user_id) {
            baseWhere += ` AND l.loan_officer_id = ?`;
            params.push(user_id);
        }

        // New Applications (status = 'pending')
        const [newApplicationsResult] = await pool.query(
            `SELECT COUNT(*) as count FROM loans l ${provinceJoin} ${baseWhere} AND l.status = 'pending'`,
            params
        );

        // Under Review (status = 'under_review' and created_at > 3 days)
        const [underReviewResult] = await pool.query(
            `SELECT COUNT(*) as count FROM loans l ${provinceJoin} ${baseWhere} AND l.status = 'pending' AND l.created_at < DATE_SUB(NOW(), INTERVAL 3 DAY)`,
            params
        );

        // Approved (status = 'approved')
        const [approvedResult] = await pool.query(
            `SELECT COUNT(*) as count FROM loans l ${provinceJoin} ${baseWhere} AND l.status = 'approved'`,
            params
        );

        // Disbursed (status = 'disbursed')
        const [disbursedResult] = await pool.query(
            `SELECT COUNT(*) as count FROM loans l ${provinceJoin} ${baseWhere} AND l.status = 'disbursed'`,
            params
        );

        // Total Loans
        const [totalLoansResult] = await pool.query(
            `SELECT COUNT(*) as count FROM loans l ${provinceJoin} ${baseWhere}`,
            params
        );

        // Pending Loans (status = 'pending' or 'new' or 'under_review')
        const [pendingLoansResult] = await pool.query(
            `SELECT COUNT(*) as count FROM loans l ${provinceJoin} ${baseWhere} AND l.status IN ('pending', 'new', 'under_review')`,
            params
        );

        // Declined (status = 'declined' or 'rejected')
        const [declinedResult] = await pool.query(
            `SELECT COUNT(*) as count FROM loans l ${provinceJoin} ${baseWhere} AND l.status IN ('declined', 'rejected')`,
            params
        );

        return res.json({
            success: true,
            data: {
                new_applications: newApplicationsResult[0].count,
                under_review: underReviewResult[0].count,
                approved: approvedResult[0].count,
                disbursed: disbursedResult[0].count,
                total_loans: totalLoansResult[0].count,
                pending_loans: pendingLoansResult[0].count,
                declined: declinedResult[0].count
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch loan consultant stats" });
    }
});

/**
 * POST /smart-alerts/mark-all-read
 * Mark all alerts as read for a user/position
 */
app.post('/smart-alerts/mark-all-read', async (req, res) => {
  try {
    const { user_id, position_id, office_id } = req.body;

    let sql = `UPDATE smart_alerts SET is_read = 1 WHERE is_read = 0`;
    const params = [];

    if (user_id || position_id || office_id) {
      sql += ` AND (`;
      const orConditions = [];
      
      if (user_id) {
        orConditions.push(`user_id = ?`);
        params.push(user_id);
      }
      if (position_id) {
        orConditions.push(`position_id = ?`);
        params.push(position_id);
      }
      if (office_id) {
        orConditions.push(`office_id = ?`);
        params.push(office_id);
      }
      
      sql += orConditions.join(' OR ') + `)`;
    }

    const [result] = await pool.query(sql, params);

    res.json({
      success: true,
      message: `${result.affectedRows} alerts marked as read`
    });

  } catch (error) {
    console.error('Error marking all alerts as read:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark all alerts as read'
    });
  }
});



// Helper function to format currency
function formatCurrency(value) {
    if (value >= 1000000) {
        return `K${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
        return `K${(value / 1000).toFixed(0)}K`;
    } else {
        return `K${value}`;
    }
}

/**
 * GET /user-tiers/:userId
 * Get user tier information including current tier, next tier, benefits, and historical tiers
 */
app.get('/user-tiers/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Get current user tier from user_tiers table
        const [userTierResult] = await pool.query(`
            SELECT ut.*, td.* 
            FROM user_tiers ut
            JOIN tier_definitions td ON ut.tier_id = td.id
            WHERE ut.user_id = ?
                AND ut.effective_to IS NULL
                AND td.is_active = 1
            ORDER BY ut.effective_from DESC
            LIMIT 1
        `, [userId]);

        // If user has no tier assigned, assign initial tier
        if (userTierResult.length === 0) {
            return await assignInitialTier(userId, res);
        }

        const currentUserTier = userTierResult[0];
        const tierId = currentUserTier.tier_id;

        // Get next tier
        const [nextTierResult] = await pool.query(`
            SELECT * 
            FROM tier_definitions 
            WHERE minimum_portfolio_value > ?
                AND is_active = 1
            ORDER BY minimum_portfolio_value ASC
            LIMIT 1
        `, [currentUserTier.minimum_portfolio_value]);

        // Get benefits for current tier
        const [benefitsResult] = await pool.query(`
            SELECT * 
            FROM tier_benefits 
            WHERE tier_id = ?
                AND (effective_to IS NULL OR effective_to > NOW())
            ORDER BY benefit_type
        `, [tierId]);

        // Get historical tiers
        const [historicalTiersResult] = await pool.query(`
            SELECT ut.tier_id, td.name as tier_name, ut.effective_from, ut.effective_to
            FROM user_tiers ut
            JOIN tier_definitions td ON ut.tier_id = td.id
            WHERE ut.user_id = ?
            ORDER BY ut.effective_from DESC
        `, [userId]);

        // Calculate progress to next tier
        let progressPercentage = 0;
        let nextTierRequirement = null;
        
        if (nextTierResult.length > 0) {
            const nextTier = nextTierResult[0];
            nextTierRequirement = nextTier.minimum_portfolio_value;
            
            // Calculate progress percentage towards next tier
            const currentTierMin = currentUserTier.minimum_portfolio_value;
            const portfolioValue = currentUserTier.current_portfolio_value;
            
            if (nextTier.minimum_portfolio_value > 0) {
                progressPercentage = Math.min(
                    100,
                    Math.round((portfolioValue / nextTier.minimum_portfolio_value) * 100)
                );
            }
        }

        // Prepare response data
        const responseData = {
            user_id: parseInt(userId),
            current_tier: {
                id: currentUserTier.tier_id,
                name: currentUserTier.name,
                description: currentUserTier.description,
                tier_range: currentUserTier.tier_range,
                minimum_portfolio_value: parseFloat(currentUserTier.minimum_portfolio_value),
                badge_color: currentUserTier.badge_color,
                text_color: currentUserTier.text_color
            },
            next_tier: nextTierResult.length > 0 ? {
                id: nextTierResult[0].id,
                name: nextTierResult[0].name,
                minimum_portfolio_value: parseFloat(nextTierResult[0].minimum_portfolio_value)
            } : null,
            portfolio_summary: {
                current_value: parseFloat(currentUserTier.current_portfolio_value),
                current_formatted: formatCurrency(currentUserTier.current_portfolio_value),
                required_for_next_tier: nextTierRequirement ? parseFloat(nextTierRequirement) : null,
                required_formatted: nextTierRequirement ? formatCurrency(nextTierRequirement) : null,
                progress_percentage: progressPercentage
            },
            benefits: benefitsResult.map(benefit => ({
                benefit_type: benefit.benefit_type,
                description: benefit.description,
                value: benefit.value
            })),
            historical_tiers: historicalTiersResult.map(tier => ({
                tier_id: tier.tier_id,
                tier_name: tier.tier_name,
                effective_from: tier.effective_from ? tier.effective_from.toISOString().split('T')[0] : null,
                effective_to: tier.effective_to ? tier.effective_to.toISOString().split('T')[0] : null
            }))
        };

        return res.json({
            success: true,
            data: responseData
        });

    } catch (error) {
        console.error('Error fetching user tier:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch user tier data'
        });
    }
});

/**
 * Helper function to assign initial tier to a user
 */
async function assignInitialTier(userId, res) {
    try {
        // Check if user exists
        const [userResult] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
        
        if (userResult.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Get the base tier (minimum_portfolio_value = 0)
        const [baseTierResult] = await pool.query(`
            SELECT * FROM tier_definitions 
            WHERE minimum_portfolio_value = 0 
                AND is_active = 1
            LIMIT 1
        `);

        if (baseTierResult.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No active base tier found'
            });
        }

        const baseTier = baseTierResult[0];

        // Create user_tier record
        await pool.query(`
            INSERT INTO user_tiers 
            (user_id, tier_id, effective_from, current_portfolio_value, progress_percentage)
            VALUES (?, ?, NOW(), 0, 0)
        `, [userId, baseTier.id]);

        // Get benefits for base tier
        const [benefitsResult] = await pool.query(`
            SELECT * 
            FROM tier_benefits 
            WHERE tier_id = ?
                AND (effective_to IS NULL OR effective_to > NOW())
            ORDER BY benefit_type
        `, [baseTier.id]);

        // Get next tier after base
        const [nextTierResult] = await pool.query(`
            SELECT * 
            FROM tier_definitions 
            WHERE minimum_portfolio_value > ?
                AND is_active = 1
            ORDER BY minimum_portfolio_value ASC
            LIMIT 1
        `, [baseTier.minimum_portfolio_value]);

        return res.json({
            success: true,
            data: {
                user_id: parseInt(userId),
                current_tier: {
                    id: baseTier.id,
                    name: baseTier.name,
                    description: baseTier.description,
                    tier_range: baseTier.tier_range,
                    minimum_portfolio_value: parseFloat(baseTier.minimum_portfolio_value),
                    badge_color: baseTier.badge_color,
                    text_color: baseTier.text_color
                },
                next_tier: nextTierResult.length > 0 ? {
                    id: nextTierResult[0].id,
                    name: nextTierResult[0].name,
                    minimum_portfolio_value: parseFloat(nextTierResult[0].minimum_portfolio_value)
                } : null,
                portfolio_summary: {
                    current_value: 0,
                    current_formatted: 'K0',
                    required_for_next_tier: nextTierResult.length > 0 ? parseFloat(nextTierResult[0].minimum_portfolio_value) : null,
                    required_formatted: nextTierResult.length > 0 ? formatCurrency(nextTierResult[0].minimum_portfolio_value) : null,
                    progress_percentage: 0
                },
                benefits: benefitsResult.map(benefit => ({
                    benefit_type: benefit.benefit_type,
                    description: benefit.description,
                    value: benefit.value
                })),
                historical_tiers: []
            }
        });
    } catch (error) {
        console.error('Error assigning initial tier:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to assign initial tier'
        });
    }
}

/**
 * PUT /user-tiers/:userId/portfolio
 * Update user portfolio value and check for tier upgrade
 */
app.put('/user-tiers/:userId/portfolio', async (req, res) => {
    try {
        const { userId } = req.params;
        const { portfolio_value } = req.body;

        // Validation
        if (portfolio_value === undefined || portfolio_value === null) {
            return res.status(400).json({
                success: false,
                message: 'portfolio_value is required'
            });
        }

        const newPortfolioValue = parseFloat(portfolio_value);

        // Get current user tier
        const [currentUserTierResult] = await pool.query(`
            SELECT ut.*, td.name, td.minimum_portfolio_value, td.order_index
            FROM user_tiers ut
            JOIN tier_definitions td ON ut.tier_id = td.id
            WHERE ut.user_id = ?
                AND ut.effective_to IS NULL
                AND td.is_active = 1
            ORDER BY ut.effective_from DESC
            LIMIT 1
        `, [userId]);

        if (currentUserTierResult.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User has no tier assigned'
            });
        }

        const currentUserTier = currentUserTierResult[0];
        const oldPortfolioValue = parseFloat(currentUserTier.current_portfolio_value);

        // Find appropriate tier for new portfolio value
        const [appropriateTierResult] = await pool.query(`
            SELECT * 
            FROM tier_definitions 
            WHERE minimum_portfolio_value <= ?
                AND is_active = 1
            ORDER BY minimum_portfolio_value DESC
            LIMIT 1
        `, [newPortfolioValue]);

        const appropriateTier = appropriateTierResult[0];

        // Get next tier for progress calculation
        const [nextTierResult] = await pool.query(`
            SELECT * 
            FROM tier_definitions 
            WHERE minimum_portfolio_value > ?
                AND is_active = 1
            ORDER BY minimum_portfolio_value ASC
            LIMIT 1
        `, [appropriateTier.minimum_portfolio_value]);

        // Calculate progress percentage
        let progressPercentage = 0;
        let nextTierRequirement = null;
        
        if (nextTierResult.length > 0) {
            nextTierRequirement = nextTierResult[0].minimum_portfolio_value;
            progressPercentage = Math.min(
                100,
                Math.round((newPortfolioValue / nextTierRequirement) * 100)
            );
        }

        // Check if tier upgrade is needed
        let tierUpgraded = false;
        let newTierId = currentUserTier.tier_id;

        if (appropriateTier.id !== currentUserTier.tier_id) {
            tierUpgraded = true;
            newTierId = appropriateTier.id;

            // Close current tier record
            await pool.query(`
                UPDATE user_tiers 
                SET effective_to = NOW() 
                WHERE user_id = ? 
                    AND tier_id = ? 
                    AND effective_to IS NULL
            `, [userId, currentUserTier.tier_id]);

            // Create new tier record
            await pool.query(`
                INSERT INTO user_tiers 
                (user_id, tier_id, effective_from, current_portfolio_value, next_tier_requirement, progress_percentage)
                VALUES (?, ?, NOW(), ?, ?, ?)
            `, [userId, appropriateTier.id, newPortfolioValue, nextTierRequirement, progressPercentage]);
        } else {
            // Just update portfolio value
            await pool.query(`
                UPDATE user_tiers 
                SET current_portfolio_value = ?, 
                    next_tier_requirement = ?, 
                    progress_percentage = ?,
                    last_updated = NOW()
                WHERE user_id = ? 
                    AND tier_id = ? 
                    AND effective_to IS NULL
            `, [newPortfolioValue, nextTierRequirement, progressPercentage, userId, currentUserTier.tier_id]);
        }

        return res.json({
            success: true,
            message: 'Portfolio value updated successfully',
            data: {
                user_id: parseInt(userId),
                old_portfolio_value: oldPortfolioValue,
                new_portfolio_value: newPortfolioValue,
                tier_upgraded: tierUpgraded,
                current_tier: {
                    id: appropriateTier.id,
                    name: appropriateTier.name,
                    minimum_portfolio_value: parseFloat(appropriateTier.minimum_portfolio_value),
                    progress_percentage: progressPercentage
                },
                next_tier: nextTierResult.length > 0 ? {
                    id: nextTierResult[0].id,
                    name: nextTierResult[0].name,
                    minimum_portfolio_value: parseFloat(nextTierResult[0].minimum_portfolio_value),
                    remaining_to_next_tier: Math.max(0, parseFloat(nextTierResult[0].minimum_portfolio_value) - newPortfolioValue)
                } : null
            }
        });

    } catch (error) {
        console.error('Error updating portfolio value:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update portfolio value'
        });
    }
});


// API endpoint to get audit logs with loan and client information
app.get('/audit-logs/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        
        // Query to join audit logs with loans, clients and loan transactions
        const query = `
            SELECT 
                al.id as audit_log_id,
                al.name as audit_name,
                al.module as audit_module,
                al.action as audit_action,
                
                l.id as loan_id,
                l.client_id as loan_client_id,
                l.office_id as loan_office_id,
                l.principal as loan_principal,
                l.status as loan_status,
                l.created_at as loan_created_at,
                
                c.id as client_id,
                c.first_name as client_first_name,
                c.last_name as client_last_name,
                
                lt.id as loan_transaction_id,
                lt.transaction_type as loan_transaction_type,
                lt.credit as loan_transaction_amount,
                lt.created_at as loan_transaction_created_at
            
            FROM audit_trail al
              LEFT JOIN loans l ON al.user_id = l.loan_officer_id
              LEFT JOIN clients c ON l.client_id = c.id
              LEFT JOIN loan_transactions lt ON l.id = lt.loan_id
            WHERE al.user_id = ?
            ORDER BY al.created_at DESC
        `;
        
        const [results] = await pool.query(query, [user_id]);
        
        // Convert to array
        const auditLogsArray = Object.values(results);
        
        res.json({
            success: true,
            user_id: parseInt(user_id),
            total_audit_logs: auditLogsArray.length,
            data: auditLogsArray
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ 
            error: "Failed to fetch audit logs", 
            message: err.message 
        });
    }
});

/**
 * GET /month1-default-rate
 * Calculate Month-1 Default Rate for a branch/office
 * 
 * Query Parameters:
 * - office_id (required): Branch office ID
 * - period_start (optional): Start date for the period (YYYY-MM-DD)
 * - period_end (optional): End date for the period (YYYY-MM-DD)
 * 
 * Formula: (Number of Loans Defaulted in Month 1 / Total Loans Disbursed in the Period) × 100
 */
app.get('/month1-default-rate', async (req, res) => {
    try {
        const { office_id, period_start, period_end } = req.query;

        // Validation
        if (!office_id) {
            return res.status(400).json({
                success: false,
                error: "office_id is required"
            });
        }

        // Set default period to current month if not provided
        const today = new Date();
        const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        const startDate = period_start || currentMonthStart.toISOString().split('T')[0];
        const endDate = period_end || currentMonthEnd.toISOString().split('T')[0];

        // Calculate previous month for trend comparison
        const prevMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const prevMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        const prevStartDate = prevMonthStart.toISOString().split('T')[0];
        const prevEndDate = prevMonthEnd.toISOString().split('T')[0];

        // Query for current period - Loans that defaulted within 30 days of disbursement
        // A loan is considered "Month-1 Default" if:
        // 1. Status is 'written_off' and was written off within 30 days of disbursement, OR
        // 2. Status is 'disbursed' but has arrears >= 30 days (calculated from repayment schedule)
        const [currentPeriodResult] = await pool.query(`
            SELECT 
                COUNT(*) AS total_disbursed,
                SUM(CASE 
                    WHEN l.status = 'written_off' 
                         AND DATEDIFF(l.written_off_date, l.disbursement_date) <= 30 
                    THEN 1 
                    WHEN l.status = 'disbursed' 
                         AND EXISTS (
                             SELECT 1 FROM loan_repayment_schedules lrs 
                             WHERE lrs.loan_id = l.id 
                               AND lrs.paid = 0 
                               AND DATEDIFF(CURDATE(), lrs.due_date) >= 30
                         )
                    THEN 1
                    ELSE 0 
                END) AS defaulted_in_month1
            FROM loans l
            WHERE l.office_id = ?
              AND l.disbursement_date BETWEEN ? AND ?
              AND l.status IN ('disbursed', 'written_off', 'closed', 'paid')
        `, [office_id, startDate, endDate]);

        // Query for previous period (for trend comparison)
        const [prevPeriodResult] = await pool.query(`
            SELECT 
                COUNT(*) AS total_disbursed,
                SUM(CASE 
                    WHEN l.status = 'written_off' 
                         AND DATEDIFF(l.written_off_date, l.disbursement_date) <= 30 
                    THEN 1 
                    WHEN l.status = 'disbursed' 
                         AND EXISTS (
                             SELECT 1 FROM loan_repayment_schedules lrs 
                             WHERE lrs.loan_id = l.id 
                               AND lrs.paid = 0 
                               AND DATEDIFF(CURDATE(), lrs.due_date) >= 30
                         )
                    THEN 1
                    ELSE 0 
                END) AS defaulted_in_month1
            FROM loans l
            WHERE l.office_id = ?
              AND l.disbursement_date BETWEEN ? AND ?
              AND l.status IN ('disbursed', 'written_off', 'closed', 'paid')
        `, [office_id, prevStartDate, prevEndDate]);

        // Calculate rates
        const currentTotal = currentPeriodResult[0].total_disbursed || 0;
        const currentDefaults = currentPeriodResult[0].defaulted_in_month1 || 0;
        const currentRate = currentTotal > 0 ? ((currentDefaults / currentTotal) * 100).toFixed(2) : 0;

        const prevTotal = prevPeriodResult[0].total_disbursed || 0;
        const prevDefaults = prevPeriodResult[0].defaulted_in_month1 || 0;
        const prevRate = prevTotal > 0 ? ((prevDefaults / prevTotal) * 100).toFixed(2) : 0;

        // Calculate change from last month
        const changeFromLastMonth = (parseFloat(currentRate) - parseFloat(prevRate)).toFixed(2);
        const trendDirection = parseFloat(changeFromLastMonth) < 0 ? 'decrease' : 
                               parseFloat(changeFromLastMonth) > 0 ? 'increase' : 'no_change';

        // Get detailed breakdown of defaulted loans
        const [defaultedLoansDetails] = await pool.query(`
            SELECT 
                l.id AS loan_id,
                l.account_number,
                l.principal,
                l.disbursement_date,
                l.status,
                c.first_name AS client_first_name,
                c.last_name AS client_last_name,
                c.mobile AS client_mobile,
                DATEDIFF(CURDATE(), l.disbursement_date) AS days_since_disbursement,
                CASE 
                    WHEN l.status = 'written_off' THEN DATEDIFF(l.written_off_date, l.disbursement_date)
                    ELSE (SELECT MIN(DATEDIFF(CURDATE(), lrs.due_date)) 
                          FROM loan_repayment_schedules lrs 
                          WHERE lrs.loan_id = l.id AND lrs.paid = 0 AND DATEDIFF(CURDATE(), lrs.due_date) >= 30)
                END AS days_to_default
            FROM loans l
            LEFT JOIN clients c ON l.client_id = c.id
            WHERE l.office_id = ?
              AND l.disbursement_date BETWEEN ? AND ?
              AND (
                  (l.status = 'written_off' AND DATEDIFF(l.written_off_date, l.disbursement_date) <= 30)
                  OR (l.status = 'disbursed' AND EXISTS (
                      SELECT 1 FROM loan_repayment_schedules lrs 
                      WHERE lrs.loan_id = l.id 
                        AND lrs.paid = 0 
                        AND DATEDIFF(CURDATE(), lrs.due_date) >= 30
                  ))
              )
            ORDER BY l.disbursement_date DESC
        `, [office_id, startDate, endDate]);

        // Response
        return res.json({
            success: true,
            data: {
                metric: "Month-1 Default Rate",
                office_id: parseInt(office_id),
                period: {
                    start_date: startDate,
                    end_date: endDate
                },
                current_period: {
                    total_disbursed: currentTotal,
                    defaulted_in_month1: currentDefaults,
                    default_rate: parseFloat(currentRate),
                    formatted_rate: `${currentRate}%`
                },
                previous_period: {
                    start_date: prevStartDate,
                    end_date: prevEndDate,
                    total_disbursed: prevTotal,
                    defaulted_in_month1: prevDefaults,
                    default_rate: parseFloat(prevRate),
                    formatted_rate: `${prevRate}%`
                },
                trend: {
                    change_from_last_month: parseFloat(changeFromLastMonth),
                    direction: trendDirection,
                    formatted_change: `${changeFromLastMonth > 0 ? '+' : ''}${changeFromLastMonth}% from last month`,
                    improvement: parseFloat(changeFromLastMonth) < 0
                },
                benchmark: {
                    target_rate: 3.0,
                    status: parseFloat(currentRate) <= 3.0 ? 'on_target' : 'above_target',
                    variance_from_target: (parseFloat(currentRate) - 3.0).toFixed(2)
                },
                defaulted_loans: defaultedLoansDetails
            }
        });

    } catch (err) {
        console.error('Error calculating Month-1 Default Rate:', err);
        return res.status(500).json({
            success: false,
            error: "Failed to calculate Month-1 Default Rate",
            message: err.message
        });
    }
});

/**
 * GET /collections-rate
 * Calculate Collections Rate for a branch/office
 * 
 * Query Parameters:
 * - office_id (required): Branch office ID
 * - period_start (optional): Start date for the period (YYYY-MM-DD)
 * - period_end (optional): End date for the period (YYYY-MM-DD)
 * - target_rate (optional): Target collections rate (default: 93.0)
 * 
 * Formula: Collections Rate = (Total Amount Collected / Total Amount Due for Collection) × 100
 */
app.get('/collections-rate', async (req, res) => {
    try {
        const { office_id, period_start, period_end, target_rate } = req.query;

        // Validation
        if (!office_id) {
            return res.status(400).json({
                success: false,
                error: "office_id is required"
            });
        }

        // Set default period to current month if not provided
        const today = new Date();
        const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        const startDate = period_start || currentMonthStart.toISOString().split('T')[0];
        const endDate = period_end || currentMonthEnd.toISOString().split('T')[0];
        const targetRate = parseFloat(target_rate) || 93.0;

        // Calculate previous period for trend comparison
        const prevMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const prevMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        const prevStartDate = prevMonthStart.toISOString().split('T')[0];
        const prevEndDate = prevMonthEnd.toISOString().split('T')[0];

        // Get collected amounts - separate query to avoid GROUP BY issues
        const [collectedResult] = await pool.query(`
            SELECT 
                COALESCE(SUM(lt.principal + lt.interest + lt.fee + lt.penalty), 0) AS total_collected,
                COUNT(DISTINCT lt.loan_id) AS loans_with_payments
            FROM loan_transactions lt
            JOIN loans l ON lt.loan_id = l.id
            WHERE l.office_id = ?
              AND lt.transaction_type = 'repayment'
              AND lt.created_at BETWEEN ? AND ?
              AND lt.reversed = 0
              AND lt.status = 'approved'
              AND l.status IN ('disbursed', 'closed', 'paid')
        `, [office_id, startDate, endDate]);

        // Get expected amounts - separate query
        const [expectedResultMain] = await pool.query(`
            SELECT 
                COALESCE(SUM(lrs.total_due), 0) AS total_expected,
                COUNT(DISTINCT lrs.loan_id) AS loans_with_due
            FROM loan_repayment_schedules lrs
            JOIN loans l ON lrs.loan_id = l.id
            WHERE l.office_id = ?
              AND lrs.due_date BETWEEN ? AND ?
              AND l.status IN ('disbursed', 'closed', 'paid')
        `, [office_id, startDate, endDate]);

        // Query for previous period (for trend comparison)
        const [prevCollectedResult] = await pool.query(`
            SELECT 
                COALESCE(SUM(lt.principal + lt.interest + lt.fee + lt.penalty), 0) AS total_collected
            FROM loan_transactions lt
            JOIN loans l ON lt.loan_id = l.id
            WHERE l.office_id = ?
              AND lt.transaction_type = 'repayment'
              AND lt.created_at BETWEEN ? AND ?
              AND lt.reversed = 0
              AND lt.status = 'approved'
              AND l.status IN ('disbursed', 'closed', 'paid')
        `, [office_id, prevStartDate, prevEndDate]);

        const [prevExpectedResult] = await pool.query(`
            SELECT 
                COALESCE(SUM(lrs.total_due), 0) AS total_expected
            FROM loan_repayment_schedules lrs
            JOIN loans l ON lrs.loan_id = l.id
            WHERE l.office_id = ?
              AND lrs.due_date BETWEEN ? AND ?
              AND l.status IN ('disbursed', 'closed', 'paid')
        `, [office_id, prevStartDate, prevEndDate]);

        // Alternative calculation using derived fields (more accurate)
        const [derivedResult] = await pool.query(`
            SELECT 
                COALESCE(SUM(
                    lt.principal_derived + lt.interest_derived + lt.fees_derived + lt.penalty_derived
                ), 0) AS total_collected_derived,
                COUNT(DISTINCT lt.id) AS transaction_count
            FROM loan_transactions lt
            JOIN loans l ON lt.loan_id = l.id
            WHERE l.office_id = ?
              AND lt.transaction_type = 'repayment'
              AND lt.date BETWEEN ? AND ?
              AND lt.reversed = 0
              AND lt.status = 'approved'
        `, [office_id, startDate, endDate]);

        // Get expected collections from repayment schedules
        const [expectedResult] = await pool.query(`
            SELECT 
                COALESCE(SUM(lrs.total_due), 0) AS total_expected,
                COALESCE(SUM(lrs.principal), 0) AS principal_expected,
                COALESCE(SUM(lrs.interest), 0) AS interest_expected,
                COALESCE(SUM(lrs.fees), 0) AS fees_expected,
                COALESCE(SUM(lrs.penalty), 0) AS penalty_expected,
                COUNT(DISTINCT lrs.loan_id) AS loans_with_due,
                COUNT(*) AS total_installments
            FROM loan_repayment_schedules lrs
            JOIN loans l ON lrs.loan_id = l.id
            WHERE l.office_id = ?
              AND lrs.due_date BETWEEN ? AND ?
        `, [office_id, startDate, endDate]);

        // Get collected amounts breakdown
        const [collectedBreakdown] = await pool.query(`
            SELECT 
                COALESCE(SUM(lt.principal), 0) AS principal_collected,
                COALESCE(SUM(lt.interest), 0) AS interest_collected,
                COALESCE(SUM(lt.fee), 0) AS fees_collected,
                COALESCE(SUM(lt.penalty), 0) AS penalty_collected,
                COUNT(DISTINCT lt.loan_id) AS loans_collected,
                COUNT(*) AS payment_count
            FROM loan_transactions lt
            JOIN loans l ON lt.loan_id = l.id
            WHERE l.office_id = ?
              AND lt.transaction_type = 'repayment'
              AND lt.date BETWEEN ? AND ?
              AND lt.reversed = 0
              AND lt.status = 'approved'
        `, [office_id, startDate, endDate]);

        // Calculate rates using the separate query results
        const currentCollected = parseFloat(collectedResult[0].total_collected) || 0;
        const currentExpected = parseFloat(expectedResultMain[0].total_expected) || 0;
        const currentRate = currentExpected > 0 ? ((currentCollected / currentExpected) * 100).toFixed(2) : 0;

        const prevCollected = parseFloat(prevCollectedResult[0].total_collected) || 0;
        const prevExpected = parseFloat(prevExpectedResult[0].total_expected) || 0;
        const prevRate = prevExpected > 0 ? ((prevCollected / prevExpected) * 100).toFixed(2) : 0;

        // Calculate change from target
        const changeFromTarget = (parseFloat(currentRate) - targetRate).toFixed(2);
        const changeFromLastMonth = (parseFloat(currentRate) - parseFloat(prevRate)).toFixed(2);

        // Determine performance status
        let performanceStatus = 'on_target';
        if (parseFloat(currentRate) >= targetRate + 2) {
            performanceStatus = 'exceeding_target';
        } else if (parseFloat(currentRate) < targetRate - 5) {
            performanceStatus = 'below_target';
        } else if (parseFloat(currentRate) < targetRate) {
            performanceStatus = 'near_target';
        }

        // Get daily collections trend for the period
        const [dailyTrend] = await pool.query(`
            SELECT 
                lt.date,
                SUM(lt.principal + lt.interest + lt.fee + lt.penalty) AS daily_collected,
                COUNT(*) AS payment_count
            FROM loan_transactions lt
            JOIN loans l ON lt.loan_id = l.id
            WHERE l.office_id = ?
              AND lt.transaction_type = 'repayment'
              AND lt.date BETWEEN ? AND ?
              AND lt.reversed = 0
              AND lt.status = 'approved'
            GROUP BY lt.date
            ORDER BY lt.date DESC
        `, [office_id, startDate, endDate]);

        // Get top performing loan officers for collections
        const [officerPerformance] = await pool.query(`
            SELECT 
                u.id AS officer_id,
                CONCAT(u.first_name, ' ', u.last_name) AS officer_name,
                COUNT(DISTINCT lt.loan_id) AS loans_collected,
                SUM(lt.principal + lt.interest + lt.fee + lt.penalty) AS total_collected,
                SUM(lrs.total_due) AS total_expected,
                CASE 
                    WHEN SUM(lrs.total_due) > 0 
                    THEN ROUND((SUM(lt.principal + lt.interest + lt.fee + lt.penalty) / SUM(lrs.total_due)) * 100, 2)
                    ELSE 0 
                END AS collection_rate
            FROM loan_transactions lt
            JOIN loans l ON lt.loan_id = l.id
            JOIN users u ON l.loan_officer_id = u.id
            LEFT JOIN loan_repayment_schedules lrs ON lrs.loan_id = l.id 
                AND lrs.due_date BETWEEN ? AND ?
            WHERE l.office_id = ?
              AND lt.transaction_type = 'repayment'
              AND lt.date BETWEEN ? AND ?
              AND lt.reversed = 0
              AND lt.status = 'approved'
            GROUP BY u.id, u.first_name, u.last_name
            ORDER BY total_collected DESC
            LIMIT 10
        `, [startDate, endDate, office_id, startDate, endDate]);

        // Response
        return res.json({
            success: true,
            data: {
                metric: "Collections Rate",
                office_id: parseInt(office_id),
                period: {
                    start_date: startDate,
                    end_date: endDate
                },
                current_period: {
                    total_collected: currentCollected,
                    total_expected: currentExpected,
                    collection_rate: parseFloat(currentRate),
                    formatted_rate: `${currentRate}%`,
                    loans_with_payments: collectedResult[0].loans_with_payments,
                    loans_with_due: expectedResultMain[0].loans_with_due
                },
                previous_period: {
                    start_date: prevStartDate,
                    end_date: prevEndDate,
                    total_collected: prevCollected,
                    total_expected: prevExpected,
                    collection_rate: parseFloat(prevRate),
                    formatted_rate: `${prevRate}%`
                },
                breakdown: {
                    principal: {
                        collected: parseFloat(collectedBreakdown[0].principal_collected) || 0,
                        expected: parseFloat(expectedResult[0].principal_expected) || 0
                    },
                    interest: {
                        collected: parseFloat(collectedBreakdown[0].interest_collected) || 0,
                        expected: parseFloat(expectedResult[0].interest_expected) || 0
                    },
                    fees: {
                        collected: parseFloat(collectedBreakdown[0].fees_collected) || 0,
                        expected: parseFloat(expectedResult[0].fees_expected) || 0
                    },
                    penalty: {
                        collected: parseFloat(collectedBreakdown[0].penalty_collected) || 0,
                        expected: parseFloat(expectedResult[0].penalty_expected) || 0
                    }
                },
                trend: {
                    change_from_last_month: parseFloat(changeFromLastMonth),
                    change_from_target: parseFloat(changeFromTarget),
                    formatted_change: `${changeFromTarget > 0 ? '+' : ''}${changeFromTarget}% from target`,
                    direction: parseFloat(changeFromLastMonth) >= 0 ? 'improving' : 'declining'
                },
                target: {
                    rate: targetRate,
                    status: performanceStatus,
                    variance: parseFloat(changeFromTarget),
                    formatted_variance: `${changeFromTarget > 0 ? '+' : ''}${changeFromTarget}%`
                },
                summary: {
                    total_loans_collected: collectedBreakdown[0].loans_collected,
                    total_payment_count: collectedBreakdown[0].payment_count,
                    total_installments_due: expectedResult[0].total_installments,
                    average_payment_amount: collectedBreakdown[0].payment_count > 0 
                        ? (currentCollected / collectedBreakdown[0].payment_count).toFixed(2) 
                        : 0
                },
                daily_trend: dailyTrend,
                officer_performance: officerPerformance
            }
        });

    } catch (err) {
        console.error('Error calculating Collections Rate:', err);
        return res.status(500).json({
            success: false,
            error: "Failed to calculate Collections Rate",
            message: err.message
        });
    }
});

/**
 * GET /active-loans
 * Get Active Loans count and details for a branch/office
 * 
 * Query Parameters:
 * - office_id (required): Branch office ID
 * - include_details (optional): Include detailed loan list (default: false)
 * - loan_officer_id (optional): Filter by specific loan officer
 * 
 * Formula: Active Loans Count = COUNT(loans WHERE status = 'disbursed' AND office_id = :branch_id)
 */
app.get('/active-loans', async (req, res) => {
    try {
        const { office_id, include_details, loan_officer_id } = req.query;

        // Validation
        if (!office_id) {
            return res.status(400).json({
                success: false,
                error: "office_id is required"
            });
        }

        // Get current active loans count
        const [activeLoansResult] = await pool.query(`
            SELECT COUNT(*) AS active_loans_count
            FROM loans
            WHERE office_id = ?
              AND status = 'disbursed'
              ${loan_officer_id ? 'AND loan_officer_id = ?' : ''}
        `, loan_officer_id ? [office_id, loan_officer_id] : [office_id]);

        // Get active loans count from last week for comparison
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const oneWeekAgoStr = oneWeekAgo.toISOString().split('T')[0];

        // Calculate weekly change (new disbursements - closed/written_off in the week)
        const [weeklyChangeResult] = await pool.query(`
            SELECT 
                COUNT(CASE WHEN disbursement_date >= ? AND status = 'disbursed' THEN 1 END) AS new_disbursements,
                COUNT(CASE WHEN (closed_date >= ? AND status IN ('closed', 'paid')) 
                           OR (written_off_date >= ? AND status = 'written_off') THEN 1 END) AS closed_loans
            FROM loans
            WHERE office_id = ?
              ${loan_officer_id ? 'AND loan_officer_id = ?' : ''}
        `, loan_officer_id ? [oneWeekAgoStr, oneWeekAgoStr, oneWeekAgoStr, office_id, loan_officer_id] : 
            [oneWeekAgoStr, oneWeekAgoStr, oneWeekAgoStr, office_id]);

        const weeklyChange = (weeklyChangeResult[0].new_disbursements || 0) - (weeklyChangeResult[0].closed_loans || 0);

        // Get total outstanding balance for active loans
        const [outstandingResult] = await pool.query(`
            SELECT 
                COALESCE(SUM(l.principal_derived), 0) AS total_principal,
                COALESCE(SUM(l.interest_derived), 0) AS total_interest,
                COALESCE(SUM(l.fees_derived), 0) AS total_fees,
                COALESCE(SUM(l.penalty_derived), 0) AS total_penalty,
                COALESCE(SUM(
                    COALESCE(l.principal_derived, 0) + 
                    COALESCE(l.interest_derived, 0) + 
                    COALESCE(l.fees_derived, 0) + 
                    COALESCE(l.penalty_derived, 0)
                ), 0) AS total_outstanding
            FROM loans l
            WHERE l.office_id = ?
              AND l.status = 'disbursed'
              ${loan_officer_id ? 'AND l.loan_officer_id = ?' : ''}
        `, loan_officer_id ? [office_id, loan_officer_id] : [office_id]);

        // Get outstanding balance from repayment schedules (more accurate)
        const [scheduleOutstandingResult] = await pool.query(`
            SELECT 
                COALESCE(SUM(lrs.total_due), 0) AS total_due,
                COALESCE(SUM(lrs.principal), 0) AS principal_due,
                COALESCE(SUM(lrs.interest), 0) AS interest_due,
                COALESCE(SUM(lrs.fees), 0) AS fees_due,
                COALESCE(SUM(lrs.penalty), 0) AS penalty_due,
                COALESCE(SUM(lrs.principal_paid), 0) AS principal_paid,
                COALESCE(SUM(lrs.interest_paid), 0) AS interest_paid,
                COALESCE(SUM(lrs.fees_paid), 0) AS fees_paid,
                COALESCE(SUM(lrs.penalty_paid), 0) AS penalty_paid,
                COALESCE(SUM(
                    COALESCE(lrs.total_due, 0) - 
                    COALESCE(lrs.principal_paid, 0) - 
                    COALESCE(lrs.interest_paid, 0) - 
                    COALESCE(lrs.fees_paid, 0) - 
                    COALESCE(lrs.penalty_paid, 0)
                ), 0) AS outstanding_balance
            FROM loan_repayment_schedules lrs
            JOIN loans l ON lrs.loan_id = l.id
            WHERE l.office_id = ?
              AND l.status = 'disbursed'
              ${loan_officer_id ? 'AND l.loan_officer_id = ?' : ''}
        `, loan_officer_id ? [office_id, loan_officer_id] : [office_id]);

        // Get loan status breakdown
        const [statusBreakdownResult] = await pool.query(`
            SELECT 
                status,
                COUNT(*) AS count,
                SUM(principal) AS total_principal
            FROM loans
            WHERE office_id = ?
              ${loan_officer_id ? 'AND loan_officer_id = ?' : ''}
            GROUP BY status
        `, loan_officer_id ? [office_id, loan_officer_id] : [office_id]);

        // Get loans by loan product
        const [productBreakdownResult] = await pool.query(`
            SELECT 
                lp.id AS product_id,
                lp.name AS product_name,
                COUNT(l.id) AS loan_count,
                SUM(l.principal) AS total_principal
            FROM loans l
            LEFT JOIN loan_products lp ON l.loan_product_id = lp.id
            WHERE l.office_id = ?
              AND l.status = 'disbursed'
              ${loan_officer_id ? 'AND l.loan_officer_id = ?' : ''}
            GROUP BY lp.id, lp.name
            ORDER BY loan_count DESC
        `, loan_officer_id ? [office_id, loan_officer_id] : [office_id]);

        // Get loans by loan officer
        const [officerBreakdownResult] = await pool.query(`
            SELECT 
                u.id AS officer_id,
                CONCAT(u.first_name, ' ', u.last_name) AS officer_name,
                COUNT(l.id) AS loan_count,
                SUM(l.principal) AS total_principal,
                AVG(l.principal) AS avg_loan_size
            FROM loans l
            JOIN users u ON l.loan_officer_id = u.id
            WHERE l.office_id = ?
              AND l.status = 'disbursed'
            GROUP BY u.id, u.first_name, u.last_name
            ORDER BY loan_count DESC
        `, [office_id]);

        // Get branch capacity info
        const [branchInfoResult] = await pool.query(`
            SELECT 
                id, name, branch_capacity
            FROM offices
            WHERE id = ?
        `, [office_id]);

        const branchCapacity = branchInfoResult[0]?.branch_capacity || 0;
        const activeLoansCount = activeLoansResult[0].active_loans_count || 0;
        const capacityUtilization = branchCapacity > 0 ? ((activeLoansCount / branchCapacity) * 100).toFixed(1) : null;

        // Build response object
        let responseData = {
            metric: "Active Loans",
            office_id: parseInt(office_id),
            office_name: branchInfoResult[0]?.name || null,
            current_period: {
                active_loans_count: activeLoansCount,
                formatted_count: activeLoansCount.toLocaleString(),
                weekly_change: weeklyChange,
                formatted_weekly_change: `${weeklyChange >= 0 ? '+' : ''}${weeklyChange} this week`,
                trend_direction: weeklyChange >= 0 ? 'growth' : 'decline'
            },
            outstanding_balance: {
                total_outstanding: parseFloat(scheduleOutstandingResult[0].outstanding_balance) || 0,
                principal_outstanding: parseFloat(scheduleOutstandingResult[0].principal_due) - parseFloat(scheduleOutstandingResult[0].principal_paid) || 0,
                interest_outstanding: parseFloat(scheduleOutstandingResult[0].interest_due) - parseFloat(scheduleOutstandingResult[0].interest_paid) || 0,
                fees_outstanding: parseFloat(scheduleOutstandingResult[0].fees_due) - parseFloat(scheduleOutstandingResult[0].fees_paid) || 0,
                penalty_outstanding: parseFloat(scheduleOutstandingResult[0].penalty_due) - parseFloat(scheduleOutstandingResult[0].penalty_paid) || 0,
                formatted_outstanding: formatCurrency(parseFloat(scheduleOutstandingResult[0].outstanding_balance) || 0)
            },
            capacity: {
                branch_capacity: branchCapacity,
                utilization_percentage: capacityUtilization ? parseFloat(capacityUtilization) : null,
                remaining_capacity: branchCapacity > 0 ? Math.max(0, branchCapacity - activeLoansCount) : null,
                status: capacityUtilization ? (parseFloat(capacityUtilization) >= 90 ? 'at_capacity' : 
                        parseFloat(capacityUtilization) >= 75 ? 'near_capacity' : 'available') : 'unknown'
            },
            status_breakdown: statusBreakdownResult.map(row => ({
                status: row.status,
                count: row.count,
                total_principal: parseFloat(row.total_principal) || 0
            })),
            product_breakdown: productBreakdownResult.map(row => ({
                product_id: row.product_id,
                product_name: row.product_name || 'Unknown',
                loan_count: row.loan_count,
                total_principal: parseFloat(row.total_principal) || 0
            })),
            officer_breakdown: officerBreakdownResult.map(row => ({
                officer_id: row.officer_id,
                officer_name: row.officer_name,
                loan_count: row.loan_count,
                total_principal: parseFloat(row.total_principal) || 0,
                avg_loan_size: parseFloat(row.avg_loan_size) || 0
            }))
        };

        // Include detailed loan list if requested
        if (include_details === 'true') {
            const [loanDetails] = await pool.query(`
                SELECT 
                    l.id AS loan_id,
                    l.account_number,
                    l.principal,
                    l.interest_rate,
                    l.disbursement_date,
                    l.expected_maturity_date,
                    l.loan_term,
                    l.loan_term_type,
                    DATEDIFF(CURDATE(), l.disbursement_date) AS days_since_disbursement,
                    c.id AS client_id,
                    CONCAT(c.first_name, ' ', c.last_name) AS client_name,
                    c.mobile AS client_mobile,
                    u.id AS officer_id,
                    CONCAT(u.first_name, ' ', u.last_name) AS officer_name,
                    lp.name AS product_name,
                    (SELECT COALESCE(SUM(lrs.total_due - lrs.principal_paid - lrs.interest_paid - lrs.fees_paid - lrs.penalty_paid), 0)
                     FROM loan_repayment_schedules lrs WHERE lrs.loan_id = l.id) AS outstanding_balance,
                    (SELECT MIN(DATEDIFF(CURDATE(), lrs2.due_date))
                     FROM loan_repayment_schedules lrs2 
                     WHERE lrs2.loan_id = l.id AND lrs2.paid = 0 AND lrs2.due_date < CURDATE()) AS days_in_arrears
                FROM loans l
                LEFT JOIN clients c ON l.client_id = c.id
                LEFT JOIN users u ON l.loan_officer_id = u.id
                LEFT JOIN loan_products lp ON l.loan_product_id = lp.id
                WHERE l.office_id = ?
                  AND l.status = 'disbursed'
                  ${loan_officer_id ? 'AND l.loan_officer_id = ?' : ''}
                ORDER BY l.disbursement_date DESC
            `, loan_officer_id ? [office_id, loan_officer_id] : [office_id]);

            responseData.loan_details = loanDetails.map(loan => ({
                ...loan,
                principal: parseFloat(loan.principal) || 0,
                interest_rate: parseFloat(loan.interest_rate) || 0,
                outstanding_balance: parseFloat(loan.outstanding_balance) || 0,
                days_in_arrears: loan.days_in_arrears || 0,
                arrears_status: loan.days_in_arrears > 30 ? 'in_arrears' : 
                               loan.days_in_arrears > 0 ? 'overdue' : 'current'
            }));
        }

        // Response
        return res.json({
            success: true,
            data: responseData
        });

    } catch (err) {
        console.error('Error fetching Active Loans:', err);
        return res.status(500).json({
            success: false,
            error: "Failed to fetch Active Loans",
            message: err.message
        });
    }
});

/**
 * GET /staff-productivity
 * Calculate Staff Productivity for a branch/office
 * 
 * Query Parameters:
 * - office_id (required): Branch office ID
 * - period_start (optional): Start date for the period (YYYY-MM-DD)
 * - period_end (optional): End date for the period (YYYY-MM-DD)
 * - include_officers (optional): Include individual officer breakdown (default: true)
 * 
 * Formula: Staff Productivity = (Weighted Score of Individual KPIs) × 100
 * Weights:
 * - Disbursement Target Achievement: 40%
 * - Collections Rate: 30%
 * - Portfolio Quality / PAR: 20%
 * - Client Acquisition: 10%
 */
app.get('/staff-productivity', async (req, res) => {
    try {
        const { office_id, period_start, period_end, include_officers } = req.query;

        // Validation
        if (!office_id) {
            return res.status(400).json({
                success: false,
                error: "office_id is required"
            });
        }

        // Set default period to current month if not provided
        const today = new Date();
        const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        const startDate = period_start || currentMonthStart.toISOString().split('T')[0];
        const endDate = period_end || currentMonthEnd.toISOString().split('T')[0];

        // Calculate previous period for trend comparison
        const prevMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const prevMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        const prevStartDate = prevMonthStart.toISOString().split('T')[0];
        const prevEndDate = prevMonthEnd.toISOString().split('T')[0];

        // Get all active loan officers for the branch
        const [loanOfficers] = await pool.query(`
            SELECT 
                u.id AS officer_id,
                u.first_name,
                u.last_name,
                CONCAT(u.first_name, ' ', u.last_name) AS officer_name,
                u.email
            FROM users u
            WHERE u.office_id = ?
              AND u.status = 'Active'
        `, [office_id]);

        // Get disbursement targets from target_tracker
        const [disbursementTargets] = await pool.query(`
            SELECT 
                tt.user_id,
                tt.given_out AS actual_disbursement,
                tt.target AS target_disbursement,
                tt.cycle_date,
                CASE 
                    WHEN tt.target > 0 THEN ROUND((tt.given_out / tt.target) * 100, 2)
                    ELSE 0 
                END AS achievement_rate
            FROM target_tracker tt
            JOIN users u ON tt.user_id = u.id
            WHERE u.office_id = ?
              AND tt.cycle_date BETWEEN ? AND ?
        `, [office_id, startDate, endDate]);

        // Create a map of officer targets
        const targetMap = {};
        disbursementTargets.forEach(t => {
            targetMap[t.user_id] = t;
        });

        // Get collections performance per officer
        const [collectionsPerformance] = await pool.query(`
            SELECT 
                l.loan_officer_id,
                COALESCE(SUM(lt.principal + lt.interest + lt.fee + lt.penalty), 0) AS total_collected,
                COALESCE(SUM(lrs.total_due), 0) AS total_expected,
                CASE 
                    WHEN SUM(lrs.total_due) > 0 
                    THEN ROUND((SUM(lt.principal + lt.interest + lt.fee + lt.penalty) / SUM(lrs.total_due)) * 100, 2)
                    ELSE 0 
                END AS collection_rate
            FROM loans l
            LEFT JOIN loan_transactions lt ON lt.loan_id = l.id
                AND lt.transaction_type = 'repayment'
                AND lt.date BETWEEN ? AND ?
                AND lt.reversed = 0
                AND lt.status = 'approved'
            LEFT JOIN loan_repayment_schedules lrs ON lrs.loan_id = l.id
                AND lrs.due_date BETWEEN ? AND ?
            WHERE l.office_id = ?
              AND l.status IN ('disbursed', 'closed', 'paid')
            GROUP BY l.loan_officer_id
        `, [startDate, endDate, startDate, endDate, office_id]);

        // Create a map of collections performance
        const collectionsMap = {};
        collectionsPerformance.forEach(c => {
            collectionsMap[c.loan_officer_id] = c;
        });

        // Get Portfolio at Risk (PAR) per officer - using SUM aggregation to comply with GROUP BY
        const [parPerformance] = await pool.query(`
            SELECT 
                l.loan_officer_id,
                SUM(CASE WHEN arrears_days > 30 THEN outstanding_balance ELSE 0 END) AS par_balance,
                SUM(outstanding_balance) AS total_portfolio,
                CASE 
                    WHEN SUM(outstanding_balance) > 0 
                    THEN ROUND((SUM(CASE WHEN arrears_days > 30 THEN outstanding_balance ELSE 0 END) / SUM(outstanding_balance)) * 100, 2)
                    ELSE 0 
                END AS par_30_rate
            FROM (
                SELECT 
                    l.loan_officer_id,
                    l.id,
                    DATEDIFF(CURRENT_DATE, MIN(lrs.due_date)) AS arrears_days,
                    SUM(lrs.total_due - COALESCE(lrs.principal_paid, 0) - COALESCE(lrs.interest_paid, 0) - COALESCE(lrs.fees_paid, 0) - COALESCE(lrs.penalty_paid, 0)) AS outstanding_balance
                FROM loans l
                JOIN loan_repayment_schedules lrs ON lrs.loan_id = l.id
                WHERE l.status = 'disbursed'
                  AND l.office_id = ?
                  AND lrs.paid = 0
                GROUP BY l.id, l.loan_officer_id
            ) portfolio
            GROUP BY loan_officer_id
        `, [office_id]);

        // Create a map of PAR performance
        const parMap = {};
        parPerformance.forEach(p => {
            parMap[p.loan_officer_id] = p;
        });

        // Get client acquisition per officer
        const [clientAcquisition] = await pool.query(`
            SELECT 
                c.staff_id AS officer_id,
                COUNT(*) AS new_clients
            FROM clients c
            WHERE c.office_id = ?
              AND c.status = 'active'
              AND c.joined_date BETWEEN ? AND ?
            GROUP BY c.staff_id
        `, [office_id, startDate, endDate]);

        // Create a map of client acquisition
        const clientMap = {};
        clientAcquisition.forEach(c => {
            clientMap[c.officer_id] = c.new_clients;
        });

        // Get total active clients per officer for client target calculation
        const [activeClientsPerOfficer] = await pool.query(`
            SELECT 
                c.staff_id AS officer_id,
                COUNT(*) AS total_active_clients
            FROM clients c
            WHERE c.office_id = ?
              AND c.status = 'active'
            GROUP BY c.staff_id
        `, [office_id]);

        const activeClientsMap = {};
        activeClientsPerOfficer.forEach(c => {
            activeClientsMap[c.officer_id] = c.total_active_clients;
        });

        // Get previous period productivity for trend
        const [prevDisbursementTargets] = await pool.query(`
            SELECT 
                tt.user_id,
                tt.given_out AS actual_disbursement,
                tt.target AS target_disbursement,
                CASE 
                    WHEN tt.target > 0 THEN ROUND((tt.given_out / tt.target) * 100, 2)
                    ELSE 0 
                END AS achievement_rate
            FROM target_tracker tt
            JOIN users u ON tt.user_id = u.id
            WHERE u.office_id = ?
              AND tt.cycle_date BETWEEN ? AND ?
        `, [office_id, prevStartDate, prevEndDate]);

        const prevTargetMap = {};
        prevDisbursementTargets.forEach(t => {
            prevTargetMap[t.user_id] = t;
        });

        // Get previous collections
        const [prevCollections] = await pool.query(`
            SELECT 
                l.loan_officer_id,
                COALESCE(SUM(lt.principal + lt.interest + lt.fee + lt.penalty), 0) AS total_collected,
                COALESCE(SUM(lrs.total_due), 0) AS total_expected,
                CASE 
                    WHEN SUM(lrs.total_due) > 0 
                    THEN ROUND((SUM(lt.principal + lt.interest + lt.fee + lt.penalty) / SUM(lrs.total_due)) * 100, 2)
                    ELSE 0 
                END AS collection_rate
            FROM loans l
            LEFT JOIN loan_transactions lt ON lt.loan_id = l.id
                AND lt.transaction_type = 'repayment'
                AND lt.date BETWEEN ? AND ?
                AND lt.reversed = 0
                AND lt.status = 'approved'
            LEFT JOIN loan_repayment_schedules lrs ON lrs.loan_id = l.id
                AND lrs.due_date BETWEEN ? AND ?
            WHERE l.office_id = ?
              AND l.status IN ('disbursed', 'closed', 'paid')
            GROUP BY l.loan_officer_id
        `, [prevStartDate, prevEndDate, prevStartDate, prevEndDate, office_id]);

        const prevCollectionsMap = {};
        prevCollections.forEach(c => {
            prevCollectionsMap[c.loan_officer_id] = c;
        });

        // Calculate individual officer productivity scores
        const officerScores = loanOfficers.map(officer => {
            const officerId = officer.officer_id;
            
            // 1. Disbursement Target Achievement (40% weight)
            const targetData = targetMap[officerId] || { achievement_rate: 0 };
            const disbursementScore = Math.min(100, parseFloat(targetData.achievement_rate) || 0) * 0.40;
            
            // 2. Collections Rate (30% weight)
            const collectionData = collectionsMap[officerId] || { collection_rate: 0 };
            const collectionScore = Math.min(100, parseFloat(collectionData.collection_rate) || 0) * 0.30;
            
            // 3. Portfolio Quality / PAR (20% weight) - Lower PAR is better
            const parData = parMap[officerId] || { par_30_rate: 0 };
            const qualityScore = Math.max(0, (100 - (parseFloat(parData.par_30_rate) || 0))) * 0.20;
            
            // 4. Client Acquisition (10% weight)
            const newClients = clientMap[officerId] || 0;
            const totalActiveClients = activeClientsMap[officerId] || 0;
            // Assume target is 10 new clients per month or based on existing client base
            const clientTarget = Math.max(10, Math.ceil(totalActiveClients * 0.1));
            const clientAcquisitionRate = Math.min(100, (newClients / clientTarget) * 100);
            const acquisitionScore = clientAcquisitionRate * 0.10;
            
            // Total productivity score
            const totalScore = disbursementScore + collectionScore + qualityScore + acquisitionScore;
            
            // Previous period scores
            const prevTargetData = prevTargetMap[officerId] || { achievement_rate: 0 };
            const prevDisbursementScore = Math.min(100, parseFloat(prevTargetData.achievement_rate) || 0) * 0.40;
            
            const prevCollectionData = prevCollectionsMap[officerId] || { collection_rate: 0 };
            const prevCollectionScore = Math.min(100, parseFloat(prevCollectionData.collection_rate) || 0) * 0.30;
            
            const prevTotalScore = prevDisbursementScore + prevCollectionScore + qualityScore + acquisitionScore;
            
            return {
                officer_id: officerId,
                officer_name: officer.officer_name,
                email: officer.email,
                scores: {
                    disbursement: {
                        achievement_rate: parseFloat(targetData.achievement_rate) || 0,
                        actual: parseFloat(targetData.actual_disbursement) || 0,
                        target: parseFloat(targetData.target_disbursement) || 0,
                        weighted_score: parseFloat(disbursementScore.toFixed(2)),
                        weight: '40%'
                    },
                    collections: {
                        rate: parseFloat(collectionData.collection_rate) || 0,
                        collected: parseFloat(collectionData.total_collected) || 0,
                        expected: parseFloat(collectionData.total_expected) || 0,
                        weighted_score: parseFloat(collectionScore.toFixed(2)),
                        weight: '30%'
                    },
                    portfolio_quality: {
                        par_30_rate: parseFloat(parData.par_30_rate) || 0,
                        par_balance: parseFloat(parData.par_balance) || 0,
                        total_portfolio: parseFloat(parData.total_portfolio) || 0,
                        weighted_score: parseFloat(qualityScore.toFixed(2)),
                        weight: '20%'
                    },
                    client_acquisition: {
                        new_clients: newClients,
                        target: clientTarget,
                        achievement_rate: parseFloat(clientAcquisitionRate.toFixed(2)),
                        weighted_score: parseFloat(acquisitionScore.toFixed(2)),
                        weight: '10%'
                    }
                },
                total_score: parseFloat(totalScore.toFixed(2)),
                previous_score: parseFloat(prevTotalScore.toFixed(2)),
                change: parseFloat((totalScore - prevTotalScore).toFixed(2)),
                rating: totalScore >= 90 ? 'Excellent' : 
                        totalScore >= 80 ? 'Good' : 
                        totalScore >= 70 ? 'Average' : 'Needs Improvement'
            };
        });

        // Calculate branch average productivity
        const totalProductivity = officerScores.reduce((sum, o) => sum + o.total_score, 0);
        const avgProductivity = officerScores.length > 0 ? totalProductivity / officerScores.length : 0;
        
        // Calculate previous period average
        const prevTotalProductivity = officerScores.reduce((sum, o) => sum + o.previous_score, 0);
        const prevAvgProductivity = officerScores.length > 0 ? prevTotalProductivity / officerScores.length : 0;
        
        // Calculate improvement
        const improvement = avgProductivity - prevAvgProductivity;

        // Get branch info
        const [branchInfoResult] = await pool.query(`
            SELECT id, name FROM offices WHERE id = ?
        `, [office_id]);

        // Categorize officers by performance
        const performanceCategories = {
            excellent: officerScores.filter(o => o.total_score >= 90).length,
            good: officerScores.filter(o => o.total_score >= 80 && o.total_score < 90).length,
            average: officerScores.filter(o => o.total_score >= 70 && o.total_score < 80).length,
            needs_improvement: officerScores.filter(o => o.total_score < 70).length
        };

        // Build response
        const responseData = {
            metric: "Staff Productivity",
            office_id: parseInt(office_id),
            office_name: branchInfoResult[0]?.name || null,
            period: {
                start_date: startDate,
                end_date: endDate
            },
            current_period: {
                productivity_score: parseFloat(avgProductivity.toFixed(2)),
                formatted_score: `${avgProductivity.toFixed(1)}%`,
                total_officers: officerScores.length,
                improvement: parseFloat(improvement.toFixed(2)),
                formatted_improvement: `${improvement >= 0 ? '+' : ''}${improvement.toFixed(1)}% improvement`,
                trend_direction: improvement >= 0 ? 'improving' : 'declining'
            },
            previous_period: {
                start_date: prevStartDate,
                end_date: prevEndDate,
                productivity_score: parseFloat(prevAvgProductivity.toFixed(2)),
                formatted_score: `${prevAvgProductivity.toFixed(1)}%`
            },
            kpi_weights: {
                disbursement_target: { weight: '40%', description: 'Disbursement Target Achievement' },
                collections_rate: { weight: '30%', description: 'Collections Rate Performance' },
                portfolio_quality: { weight: '20%', description: 'Portfolio Quality (Low PAR)' },
                client_acquisition: { weight: '10%', description: 'New Client Acquisition' }
            },
            performance_summary: {
                average_disbursement_rate: parseFloat((officerScores.reduce((sum, o) => sum + o.scores.disbursement.achievement_rate, 0) / (officerScores.length || 1)).toFixed(2)),
                average_collection_rate: parseFloat((officerScores.reduce((sum, o) => sum + o.scores.collections.rate, 0) / (officerScores.length || 1)).toFixed(2)),
                average_par_rate: parseFloat((officerScores.reduce((sum, o) => sum + o.scores.portfolio_quality.par_30_rate, 0) / (officerScores.length || 1)).toFixed(2)),
                total_new_clients: officerScores.reduce((sum, o) => sum + o.scores.client_acquisition.new_clients, 0)
            },
            performance_categories: performanceCategories,
            benchmark: {
                target_score: 80,
                status: avgProductivity >= 80 ? 'on_target' : 
                        avgProductivity >= 70 ? 'near_target' : 'below_target',
                variance_from_target: parseFloat((avgProductivity - 80).toFixed(2))
            }
        };

        // Include individual officer breakdown if requested (default: true)
        if (include_officers !== 'false') {
            responseData.officer_breakdown = officerScores.sort((a, b) => b.total_score - a.total_score);
            
            // Add top performers
            responseData.top_performers = officerScores
                .sort((a, b) => b.total_score - a.total_score)
                .slice(0, 5)
                .map(o => ({
                    officer_id: o.officer_id,
                    officer_name: o.officer_name,
                    score: o.total_score,
                    rating: o.rating
                }));
            
            // Add officers needing attention
            responseData.needs_attention = officerScores
                .filter(o => o.total_score < 70)
                .map(o => ({
                    officer_id: o.officer_id,
                    officer_name: o.officer_name,
                    score: o.total_score,
                    primary_issue: o.scores.disbursement.achievement_rate < 50 ? 'Low Disbursement' :
                                   o.scores.collections.rate < 70 ? 'Low Collections' :
                                   o.scores.portfolio_quality.par_30_rate > 20 ? 'High PAR' : 'Multiple Areas'
                }));
        }

        // Response
        return res.json({
            success: true,
            data: responseData
        });

    } catch (err) {
        console.error('Error calculating Staff Productivity:', err);
        return res.status(500).json({
            success: false,
            error: "Failed to calculate Staff Productivity",
            message: err.message
        });
    }
});

/**
 * GET /province-branches-performance
 * Get Branch Performance Overview for Provincial Managers
 * 
 * Query Parameters:
 * - province_id (required): Province ID to filter branches
 * - period_start (optional): Start date for the period (YYYY-MM-DD)
 * - period_end (optional): End date for the period (YYYY-MM-DD)
 * - include_details (optional): Include detailed breakdown (default: false)
 * 
 * Returns: List of branches with net contribution and performance metrics
 */
app.get('/province-branches-performance', async (req, res) => {
    try {
        const { province_id, period_start, period_end, include_details } = req.query;

        // Validation
        if (!province_id) {
            return res.status(400).json({
                success: false,
                error: "province_id is required"
            });
        }

        // Set default period to current month if not provided
        const today = new Date();
        const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        const startDate = period_start || currentMonthStart.toISOString().split('T')[0];
        const endDate = period_end || currentMonthEnd.toISOString().split('T')[0];

        // Get province info
        const [provinceInfo] = await pool.query(`
            SELECT id, name FROM province WHERE id = ?
        `, [province_id]);

        if (provinceInfo.length === 0) {
            return res.status(404).json({
                success: false,
                error: "Province not found"
            });
        }

        // Get all branches in the province
        const [branches] = await pool.query(`
            SELECT 
                o.id AS branch_id,
                o.name AS branch_name,
                o.branch_capacity,
                o.manager_id,
                CONCAT(u.first_name, ' ', u.last_name) AS manager_name,
                o.active,
                (SELECT COUNT(*) FROM users WHERE office_id = o.id AND status = 'Active') AS staff_count
            FROM offices o
            LEFT JOIN users u ON o.manager_id = u.id
            WHERE o.province_id = ?
            ORDER BY o.name
        `, [province_id]);

        // Calculate performance metrics for each branch
        const branchPerformance = await Promise.all(branches.map(async (branch) => {
            const branchId = branch.branch_id;

            // Net Contribution = Total Income - Total Expenses
            // Income: Interest collected + Fees collected + Penalties collected
            // From loan_transactions where transaction_type = 'repayment'
            const [incomeResult] = await pool.query(`
                SELECT 
                    COALESCE(SUM(lt.interest), 0) AS interest_income,
                    COALESCE(SUM(lt.fee), 0) AS fee_income,
                    COALESCE(SUM(lt.penalty), 0) AS penalty_income,
                    COALESCE(SUM(lt.interest + lt.fee + lt.penalty), 0) AS total_income,
                    COALESCE(SUM(lt.principal), 0) AS principal_collected,
                    COUNT(DISTINCT lt.id) AS transaction_count
                FROM loan_transactions lt
                JOIN loans l ON lt.loan_id = l.id
                WHERE l.office_id = ?
                  AND lt.transaction_type = 'repayment'
                  AND lt.date BETWEEN ? AND ?
                  AND lt.status = 'approved'
            `, [branchId, startDate, endDate]);

            // Get expenses for the branch
            const [expenseResult] = await pool.query(`
                SELECT 
                    COALESCE(SUM(amount), 0) AS total_expenses,
                    COUNT(*) AS expense_count
                FROM expenses
                WHERE office_id = ?
                  AND date BETWEEN ? AND ?
                  AND status = 'approved'
            `, [branchId, startDate, endDate]);

            // Get other income
            const [otherIncomeResult] = await pool.query(`
                SELECT 
                    COALESCE(SUM(amount), 0) AS other_income
                FROM other_income
                WHERE office_id = ?
                  AND date BETWEEN ? AND ?
                  AND status = 'approved'
            `, [branchId, startDate, endDate]);

            // Get ledger income
            const [ledgerIncomeResult] = await pool.query(`
                SELECT 
                    COALESCE(SUM(amount), 0) AS ledger_income
                FROM ledger_income
                WHERE office_id = ?
                  AND date BETWEEN ? AND ?
            `, [branchId, startDate, endDate]);

            // Calculate net contribution
            const interestIncome = parseFloat(incomeResult[0].interest_income) || 0;
            const feeIncome = parseFloat(incomeResult[0].fee_income) || 0;
            const penaltyIncome = parseFloat(incomeResult[0].penalty_income) || 0;
            const totalLoanIncome = parseFloat(incomeResult[0].total_income) || 0;
            const otherIncome = parseFloat(otherIncomeResult[0].other_income) || 0;
            const ledgerIncome = parseFloat(ledgerIncomeResult[0].ledger_income) || 0;
            const totalExpenses = parseFloat(expenseResult[0].total_expenses) || 0;
            
            const totalIncome = totalLoanIncome + otherIncome + ledgerIncome;
            const netContribution = totalIncome - totalExpenses;

            // Get active loans count
            const [activeLoansResult] = await pool.query(`
                SELECT COUNT(*) AS active_loans
                FROM loans
                WHERE office_id = ?
                  AND status = 'disbursed'
            `, [branchId]);

            // Get active clients count
            const [activeClientsResult] = await pool.query(`
                SELECT COUNT(*) AS active_clients
                FROM clients
                WHERE office_id = ?
                  AND status = 'active'
            `, [branchId]);

            // Get portfolio value (outstanding balance)
            const [portfolioResult] = await pool.query(`
                SELECT 
                    COALESCE(SUM(l.principal_derived), 0) AS total_principal,
                    COALESCE(SUM(l.interest_derived), 0) AS total_interest,
                    COALESCE(SUM(l.principal_derived + l.interest_derived + l.fees_derived + l.penalty_derived), 0) AS total_portfolio
                FROM loans l
                WHERE l.office_id = ?
                  AND l.status = 'disbursed'
            `, [branchId]);

            // Get disbursements for the period
            const [disbursementsResult] = await pool.query(`
                SELECT 
                    COUNT(*) AS disbursement_count,
                    COALESCE(SUM(principal), 0) AS total_disbursed
                FROM loans
                WHERE office_id = ?
                  AND status = 'disbursed'
                  AND disbursement_date BETWEEN ? AND ?
            `, [branchId, startDate, endDate]);

            // Get PAR (Portfolio at Risk) - using SUM aggregation to comply with GROUP BY
            const [parResult] = await pool.query(`
                SELECT 
                    COALESCE(SUM(CASE WHEN arrears_days > 30 THEN outstanding_balance ELSE 0 END), 0) AS par_balance,
                    COALESCE(SUM(outstanding_balance), 0) AS total_portfolio,
                    CASE 
                        WHEN SUM(outstanding_balance) > 0 
                        THEN ROUND((SUM(CASE WHEN arrears_days > 30 THEN outstanding_balance ELSE 0 END) / SUM(outstanding_balance)) * 100, 2)
                        ELSE 0 
                    END AS par_rate
                FROM (
                    SELECT 
                        l.id,
                        DATEDIFF(CURDATE(), MIN(lrs.due_date)) AS arrears_days,
                        SUM(lrs.total_due - COALESCE(lrs.principal_paid, 0) - COALESCE(lrs.interest_paid, 0) - COALESCE(lrs.fees_paid, 0) - COALESCE(lrs.penalty_paid, 0)) AS outstanding_balance
                    FROM loans l
                    JOIN loan_repayment_schedules lrs ON lrs.loan_id = l.id
                    WHERE l.office_id = ?
                      AND l.status = 'disbursed'
                      AND lrs.paid = 0
                    GROUP BY l.id
                ) portfolio
            `, [branchId]);

            // Get collections - use separate queries to avoid GROUP BY issues
            const [collectedResult] = await pool.query(`
                SELECT 
                    COALESCE(SUM(lt.principal + lt.interest + lt.fee + lt.penalty), 0) AS total_collected
                FROM loan_transactions lt
                JOIN loans l ON lt.loan_id = l.id
                WHERE l.office_id = ?
                  AND lt.transaction_type = 'repayment'
                  AND lt.date BETWEEN ? AND ?
                  AND lt.reversed = 0
                  AND lt.status = 'approved'
                  AND l.status IN ('disbursed', 'closed', 'paid')
            `, [branchId, startDate, endDate]);

            const [expectedResult] = await pool.query(`
                SELECT 
                    COALESCE(SUM(lrs.total_due), 0) AS total_expected
                FROM loan_repayment_schedules lrs
                JOIN loans l ON lrs.loan_id = l.id
                WHERE l.office_id = ?
                  AND lrs.due_date BETWEEN ? AND ?
                  AND l.status IN ('disbursed', 'closed', 'paid')
            `, [branchId, startDate, endDate]);

            const totalCollected = parseFloat(collectedResult[0].total_collected) || 0;
            const totalExpected = parseFloat(expectedResult[0].total_expected) || 0;
            const collectionRate = totalExpected > 0 ? ((totalCollected / totalExpected) * 100).toFixed(2) : 0;

            return {
                branch_id: branchId,
                branch_name: branch.branch_name,
                manager_name: branch.manager_name,
                staff_count: branch.staff_count,
                branch_capacity: branch.branch_capacity,
                is_active: branch.active === 1,
                net_contribution: {
                    total: netContribution,
                    formatted: formatCurrency(netContribution),
                    income: {
                        interest: interestIncome,
                        fees: feeIncome,
                        penalties: penaltyIncome,
                        loan_income: totalLoanIncome,
                        other_income: otherIncome,
                        ledger_income: ledgerIncome,
                        total: totalIncome
                    },
                    expenses: totalExpenses
                },
                portfolio: {
                    active_loans: activeLoansResult[0].active_loans,
                    active_clients: activeClientsResult[0].active_clients,
                    total_portfolio: parseFloat(portfolioResult[0].total_portfolio) || 0,
                    formatted_portfolio: formatCurrency(parseFloat(portfolioResult[0].total_portfolio) || 0)
                },
                disbursements: {
                    count: disbursementsResult[0].disbursement_count,
                    total: parseFloat(disbursementsResult[0].total_disbursed) || 0,
                    formatted: formatCurrency(parseFloat(disbursementsResult[0].total_disbursed) || 0)
                },
                par: {
                    rate: parseFloat(parResult[0].par_rate) || 0,
                    par_balance: parseFloat(parResult[0].par_balance) || 0
                },
                collections: {
                    rate: parseFloat(collectionRate) || 0,
                    collected: totalCollected,
                    expected: totalExpected
                }
            };
        }));

        // Sort branches by net contribution (highest first)
        branchPerformance.sort((a, b) => b.net_contribution.total - a.net_contribution.total);

        // Calculate province totals
        const provinceTotals = {
            total_branches: branches.length,
            active_branches: branches.filter(b => b.active === 1).length,
            total_staff: branches.reduce((sum, b) => sum + b.staff_count, 0),
            total_net_contribution: branchPerformance.reduce((sum, b) => sum + b.net_contribution.total, 0),
            total_portfolio: branchPerformance.reduce((sum, b) => sum + b.portfolio.total_portfolio, 0),
            total_active_loans: branchPerformance.reduce((sum, b) => sum + b.portfolio.active_loans, 0),
            total_active_clients: branchPerformance.reduce((sum, b) => sum + b.portfolio.active_clients, 0),
            average_par_rate: branchPerformance.reduce((sum, b) => sum + b.par.rate, 0) / (branches.length || 1),
            average_collection_rate: branchPerformance.reduce((sum, b) => sum + b.collections.rate, 0) / (branches.length || 1)
        };

        // Build response
        const responseData = {
            metric: "Branch Performance Overview",
            province: {
                id: parseInt(province_id),
                name: provinceInfo[0].name
            },
            period: {
                start_date: startDate,
                end_date: endDate
            },
            province_summary: {
                total_branches: provinceTotals.total_branches,
                active_branches: provinceTotals.active_branches,
                total_staff: provinceTotals.total_staff,
                total_net_contribution: provinceTotals.total_net_contribution,
                formatted_net_contribution: formatCurrency(provinceTotals.total_net_contribution),
                total_portfolio: provinceTotals.total_portfolio,
                formatted_portfolio: formatCurrency(provinceTotals.total_portfolio),
                total_active_loans: provinceTotals.total_active_loans,
                total_active_clients: provinceTotals.total_active_clients,
                average_par_rate: parseFloat(provinceTotals.average_par_rate.toFixed(2)),
                average_collection_rate: parseFloat(provinceTotals.average_collection_rate.toFixed(2))
            },
            branches: branchPerformance.map((branch, index) => ({
                rank: index + 1,
                branch_id: branch.branch_id,
                branch_name: branch.branch_name,
                manager_name: branch.manager_name,
                net_contribution: branch.net_contribution.formatted,
                net_contribution_value: branch.net_contribution.total,
                portfolio: branch.portfolio,
                disbursements: branch.disbursements,
                par: branch.par,
                collections: branch.collections,
                staff_count: branch.staff_count
            }))
        };

        // Include detailed breakdown if requested
        if (include_details === 'true') {
            responseData.detailed_breakdown = branchPerformance;
        }

        // Response
        return res.json({
            success: true,
            data: responseData
        });

    } catch (err) {
        console.error('Error fetching Province Branches Performance:', err);
        return res.status(500).json({
            success: false,
            error: "Failed to fetch Province Branches Performance",
            message: err.message
        });
    }
});

/**
 * GET /monthly-disbursement
 * Calculate Monthly Disbursement for a branch/office
 * 
 * Query Parameters:
 * - user_id (required): User ID (branch manager)
 * - office_id (required): Branch office ID
 * - period_start (optional): Start date for the period (YYYY-MM-DD)
 * - period_end (optional): End date for the period (YYYY-MM-DD)
 * - target (optional): Target amount (default: 450000)
 * 
 * Formula: Monthly Disbursement = SUM(loans.approved_amount)
 * WHERE loans.office_id = {branch_id}
 *   AND loans.status = 'disbursed'
 *   AND loans.disbursement_date BETWEEN {month_start} AND {month_end}
 * 
 * Status Indicators:
 * - ✓ On Track: ≥ Target (K450,000+)
 * - ⚠ At Risk: 70-99% of Target
 * - ✗ Below Target: < 70% of Target
 */
app.get('/monthly-disbursement', async (req, res) => {
    try {
        const { user_id, office_id, period_start, period_end, target } = req.query;

        // Validation
        if (!user_id && !office_id) {
            return res.status(400).json({
                success: false,
                error: "user_id or office_id is required"
            });
        }

        // Determine the office_id to use
        let targetOfficeId = office_id;
        
        // If only user_id is provided, get the user's office_id
        if (!office_id && user_id) {
            const [userResult] = await pool.query(`
                SELECT office_id FROM users WHERE id = ?
            `, [user_id]);
            
            if (userResult.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: "User not found"
                });
            }
            
            targetOfficeId = userResult[0].office_id;
        }

        // Set default period to current month if not provided
        const today = new Date();
        const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        const startDate = period_start || currentMonthStart.toISOString().split('T')[0];
        const endDate = period_end || currentMonthEnd.toISOString().split('T')[0];
        const targetAmount = parseFloat(target) || 450000;

        // Calculate previous month for trend comparison
        const prevMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const prevMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        const prevStartDate = prevMonthStart.toISOString().split('T')[0];
        const prevEndDate = prevMonthEnd.toISOString().split('T')[0];

        // Main query for current period disbursement
        const [currentPeriodResult] = await pool.query(`
            SELECT 
                COALESCE(SUM(approved_amount), 0) AS monthly_disbursement,
                COUNT(*) AS disbursement_count,
                AVG(approved_amount) AS avg_loan_size,
                MIN(approved_amount) AS min_loan,
                MAX(approved_amount) AS max_loan
            FROM loans
            WHERE office_id = ?
              AND status = 'disbursed'
              AND disbursement_date BETWEEN ? AND ?
        `, [targetOfficeId, startDate, endDate]);

        // Query for previous period (for trend comparison)
        const [prevPeriodResult] = await pool.query(`
            SELECT 
                COALESCE(SUM(approved_amount), 0) AS monthly_disbursement,
                COUNT(*) AS disbursement_count
            FROM loans
            WHERE office_id = ?
              AND status = 'disbursed'
              AND disbursement_date BETWEEN ? AND ?
        `, [targetOfficeId, prevStartDate, prevEndDate]);

        // Get disbursements by loan product
        const [productBreakdownResult] = await pool.query(`
            SELECT 
                lp.id AS product_id,
                lp.name AS product_name,
                COUNT(l.id) AS loan_count,
                SUM(l.approved_amount) AS total_disbursed,
                AVG(l.approved_amount) AS avg_loan_size
            FROM loans l
            LEFT JOIN loan_products lp ON l.loan_product_id = lp.id
            WHERE l.office_id = ?
              AND l.status = 'disbursed'
              AND l.disbursement_date BETWEEN ? AND ?
            GROUP BY lp.id, lp.name
            ORDER BY total_disbursed DESC
        `, [targetOfficeId, startDate, endDate]);

        // Get disbursements by loan officer
        const [officerBreakdownResult] = await pool.query(`
            SELECT 
                u.id AS officer_id,
                CONCAT(u.first_name, ' ', u.last_name) AS officer_name,
                COUNT(l.id) AS loan_count,
                SUM(l.approved_amount) AS total_disbursed,
                AVG(l.approved_amount) AS avg_loan_size
            FROM loans l
            JOIN users u ON l.loan_officer_id = u.id
            WHERE l.office_id = ?
              AND l.status = 'disbursed'
              AND l.disbursement_date BETWEEN ? AND ?
            GROUP BY u.id, u.first_name, u.last_name
            ORDER BY total_disbursed DESC
        `, [targetOfficeId, startDate, endDate]);

        // Get daily disbursement trend
        const [dailyTrendResult] = await pool.query(`
            SELECT 
                disbursement_date AS date,
                COUNT(*) AS loan_count,
                SUM(approved_amount) AS daily_total
            FROM loans
            WHERE office_id = ?
              AND status = 'disbursed'
              AND disbursement_date BETWEEN ? AND ?
            GROUP BY disbursement_date
            ORDER BY disbursement_date DESC
        `, [targetOfficeId, startDate, endDate]);

        // Calculate values
        const currentDisbursement = parseFloat(currentPeriodResult[0].monthly_disbursement) || 0;
        const prevDisbursement = parseFloat(prevPeriodResult[0].monthly_disbursement) || 0;
        const achievementPercentage = targetAmount > 0 ? (currentDisbursement / targetAmount) * 100 : 0;
        const changeFromLastMonth = prevDisbursement > 0 ? ((currentDisbursement - prevDisbursement) / prevDisbursement) * 100 : 0;

        // Determine status
        let status = 'on_track';
        let statusIcon = '✓';
        let statusLabel = 'On Track';
        
        if (achievementPercentage >= 100) {
            status = 'on_track';
            statusIcon = '✓';
            statusLabel = 'On Track';
        } else if (achievementPercentage >= 70) {
            status = 'at_risk';
            statusIcon = '⚠';
            statusLabel = 'At Risk';
        } else {
            status = 'below_target';
            statusIcon = '✗';
            statusLabel = 'Below Target';
        }

        // Get branch info
        const [branchInfoResult] = await pool.query(`
            SELECT id, name FROM offices WHERE id = ?
        `, [targetOfficeId]);

        // Calculate remaining days and required daily rate
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        const daysRemaining = daysInMonth - today.getDate();
        const remainingTarget = Math.max(0, targetAmount - currentDisbursement);
        const requiredDailyRate = daysRemaining > 0 ? remainingTarget / daysRemaining : 0;

        // Build response
        const responseData = {
            metric: "Monthly Disbursement",
            user_id: user_id ? parseInt(user_id) : null,
            office_id: parseInt(targetOfficeId),
            office_name: branchInfoResult[0]?.name || null,
            period: {
                start_date: startDate,
                end_date: endDate
            },
            current_period: {
                total_disbursement: currentDisbursement,
                formatted: formatCurrency(currentDisbursement),
                disbursement_count: currentPeriodResult[0].disbursement_count || 0,
                avg_loan_size: parseFloat(currentPeriodResult[0].avg_loan_size) || 0,
                min_loan: parseFloat(currentPeriodResult[0].min_loan) || 0,
                max_loan: parseFloat(currentPeriodResult[0].max_loan) || 0
            },
            previous_period: {
                start_date: prevStartDate,
                end_date: prevEndDate,
                total_disbursement: prevDisbursement,
                formatted: formatCurrency(prevDisbursement),
                disbursement_count: prevPeriodResult[0].disbursement_count || 0
            },
            target: {
                amount: targetAmount,
                formatted: formatCurrency(targetAmount),
                achievement_percentage: parseFloat(achievementPercentage.toFixed(2)),
                remaining: remainingTarget,
                remaining_formatted: formatCurrency(remainingTarget)
            },
            status: {
                code: status,
                icon: statusIcon,
                label: statusLabel,
                achievement_percentage: parseFloat(achievementPercentage.toFixed(2)),
                formatted_percentage: `${achievementPercentage.toFixed(1)}%`
            },
            trend: {
                change_from_last_month: parseFloat(changeFromLastMonth.toFixed(2)),
                direction: changeFromLastMonth >= 0 ? 'increase' : 'decrease',
                formatted_change: `${changeFromLastMonth >= 0 ? '+' : ''}${changeFromLastMonth.toFixed(1)}% from last month`
            },
            projection: {
                days_remaining: daysRemaining,
                required_daily_rate: parseFloat(requiredDailyRate.toFixed(2)),
                required_daily_formatted: formatCurrency(requiredDailyRate),
                on_track_to_meet_target: currentDisbursement >= targetAmount || (daysRemaining > 0 && requiredDailyRate <= currentDisbursement / today.getDate())
            },
            breakdown: {
                by_product: productBreakdownResult.map(row => ({
                    product_id: row.product_id,
                    product_name: row.product_name || 'Unknown',
                    loan_count: row.loan_count,
                    total_disbursed: parseFloat(row.total_disbursed) || 0,
                    formatted: formatCurrency(parseFloat(row.total_disbursed) || 0),
                    avg_loan_size: parseFloat(row.avg_loan_size) || 0
                })),
                by_officer: officerBreakdownResult.map(row => ({
                    officer_id: row.officer_id,
                    officer_name: row.officer_name,
                    loan_count: row.loan_count,
                    total_disbursed: parseFloat(row.total_disbursed) || 0,
                    formatted: formatCurrency(parseFloat(row.total_disbursed) || 0),
                    avg_loan_size: parseFloat(row.avg_loan_size) || 0
                }))
            },
            daily_trend: dailyTrendResult.map(row => ({
                date: row.date,
                loan_count: row.loan_count,
                daily_total: parseFloat(row.daily_total) || 0,
                formatted: formatCurrency(parseFloat(row.daily_total) || 0)
            }))
        };

        // Response
        return res.json({
            success: true,
            data: responseData
        });

    } catch (err) {
        console.error('Error calculating Monthly Disbursement:', err);
        return res.status(500).json({
            success: false,
            error: "Failed to calculate Monthly Disbursement",
            message: err.message
        });
    }
});

/**
 * POST /api/reviews/signoff
 * Create a performance review sign-off record
 */
app.post('/api/reviews/signoff', async (req, res) => {
    try {
        const { 
            position, 
            signature, 
            signedAt, 
            reviewType, 
            user_id, 
            office_id, 
            notes 
        } = req.body;

        // Validation
        if (!position) {
            return res.status(400).json({
                success: false,
                error: 'position is required'
            });
        }

        if (!signature) {
            return res.status(400).json({
                success: false,
                error: 'signature is required'
            });
        }

        if (!signedAt) {
            return res.status(400).json({
                success: false,
                error: 'signedAt is required'
            });
        }

        if (!reviewType) {
            return res.status(400).json({
                success: false,
                error: 'reviewType is required'
            });
        }

        // Validate signedAt is a valid date
        const signedAtDate = new Date(signedAt);
        if (isNaN(signedAtDate.getTime())) {
            return res.status(400).json({
                success: false,
                error: 'signedAt must be a valid ISO timestamp'
            });
        }

        // Insert the sign-off record
        const [result] = await pool.query(`
            INSERT INTO review_signoffs 
            (position, signature, signed_at, review_type, user_id, office_id, notes, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `, [position, signature, signedAtDate, reviewType, user_id || null, office_id || null, notes || null]);

        // Fetch the inserted record
        const [newSignoff] = await pool.query(`
            SELECT * FROM review_signoffs WHERE id = ?
        `, [result.insertId]);

        res.status(201).json({
            success: true,
            message: 'Review sign-off recorded successfully',
            data: newSignoff[0]
        });

    } catch (error) {
        console.error('Error creating review sign-off:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create review sign-off'
        });
    }
});

/**
 * GET /api/reviews/signoffs
 * Get all review sign-offs with optional filtering
 */
app.get('/api/reviews/signoffs', async (req, res) => {
    try {
        const { 
            user_id, 
            office_id, 
            position, 
            reviewType, 
            start_date, 
            end_date,
            limit = 50
        } = req.query;

        let sql = 'SELECT * FROM review_signoffs WHERE 1=1';
        const params = [];

        if (user_id) {
            sql += ' AND user_id = ?';
            params.push(parseInt(user_id));
        }

        if (office_id) {
            sql += ' AND office_id = ?';
            params.push(parseInt(office_id));
        }

        if (position) {
            sql += ' AND position = ?';
            params.push(position);
        }

        if (reviewType) {
            sql += ' AND review_type = ?';
            params.push(reviewType);
        }

        if (start_date) {
            sql += ' AND signed_at >= ?';
            params.push(start_date);
        }

        if (end_date) {
            sql += ' AND signed_at <= ?';
            params.push(end_date);
        }

        sql += ' ORDER BY created_at DESC LIMIT ?';
        params.push(parseInt(limit));

        const [signoffs] = await pool.query(sql, params);

        res.json({
            success: true,
            count: signoffs.length,
            data: signoffs
        });

    } catch (error) {
        console.error('Error fetching review sign-offs:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch review sign-offs'
        });
    }
});

/**
 * GET /api/reviews/signoffs/:id
 * Get a single review sign-off by ID
 */
app.get('/api/reviews/signoffs/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [signoffs] = await pool.query(`
            SELECT * FROM review_signoffs WHERE id = ?
        `, [id]);

        if (signoffs.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Review sign-off not found'
            });
        }

        res.json({
            success: true,
            data: signoffs[0]
        });

    } catch (error) {
        console.error('Error fetching review sign-off:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch review sign-off'
        });
    }
});

/**
 * POST /api/reviews/schedule
 * Schedule a new performance review
 */
app.post('/api/reviews/schedule', async (req, res) => {
    try {
        const {
            position,
            reviewType,
            title,
            description,
            scheduledDate,
            scheduledTime,
            assignee,
            priority,
            sendReminder,
            reminderDaysBefore,
            user_id,
            office_id
        } = req.body;

        // Validate required fields
        if (!position || !reviewType || !title || !scheduledDate) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: position, reviewType, title, and scheduledDate are required.'
            });
        }

        // Validate title length
        if (title.trim().length < 3) {
            return res.status(400).json({
                success: false,
                error: 'Review title must be at least 3 characters long.'
            });
        }

        // Combine date and time
        const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime || '09:00'}`);
        const now = new Date();

        // Validate scheduled date is in the future
        if (scheduledDateTime <= now) {
            return res.status(400).json({
                success: false,
                error: 'Scheduled date and time must be in the future.'
            });
        }

        // Validate reminder days
        const reminderDays = reminderDaysBefore || 1;
        if (sendReminder && (reminderDays < 1 || reminderDays > 30)) {
            return res.status(400).json({
                success: false,
                error: 'Reminder days must be between 1 and 30.'
            });
        }

        // Insert the scheduled review
        const [result] = await pool.query(`
            INSERT INTO scheduled_reviews 
            (position, review_type, title, description, scheduled_date_time, assignee, 
             priority, send_reminder, reminder_days_before, status, created_by, user_id, office_id, 
             created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'scheduled', ?, ?, ?, NOW(), NOW())
        `, [
            position,
            reviewType,
            title.trim(),
            description?.trim() || null,
            scheduledDateTime,
            assignee || position,
            priority || 'medium',
            sendReminder !== false ? 1 : 0,
            reminderDays,
            user_id || null,
            user_id || null,
            office_id || null
        ]);

        // Fetch the inserted record
        const [newReview] = await pool.query(`
            SELECT * FROM scheduled_reviews WHERE id = ?
        `, [result.insertId]);

        res.status(201).json({
            success: true,
            message: 'Review scheduled successfully',
            data: {
                id: newReview[0].id,
                position: newReview[0].position,
                reviewType: newReview[0].review_type,
                title: newReview[0].title,
                description: newReview[0].description,
                scheduledDateTime: newReview[0].scheduled_date_time,
                assignee: newReview[0].assignee,
                priority: newReview[0].priority,
                status: newReview[0].status,
                sendReminder: newReview[0].send_reminder === 1,
                reminderDaysBefore: newReview[0].reminder_days_before,
                createdAt: newReview[0].created_at
            }
        });

    } catch (error) {
        console.error('Error scheduling review:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to schedule review'
        });
    }
});

/**
 * GET /api/reviews/schedule
 * Get all scheduled reviews with optional filtering
 */
app.get('/api/reviews/schedule', async (req, res) => {
    try {
        const {
            position,
            status,
            upcoming,
            user_id,
            office_id,
            start_date,
            end_date,
            limit = 50
        } = req.query;

        let sql = 'SELECT * FROM scheduled_reviews WHERE 1=1';
        const params = [];

        // Filter by position
        if (position) {
            sql += ' AND position = ?';
            params.push(position);
        }

        // Filter by status
        if (status) {
            sql += ' AND status = ?';
            params.push(status);
        }

        // Filter by user_id
        if (user_id) {
            sql += ' AND (user_id = ? OR created_by = ?)';
            params.push(parseInt(user_id), parseInt(user_id));
        }

        // Filter by office_id
        if (office_id) {
            sql += ' AND office_id = ?';
            params.push(parseInt(office_id));
        }

        // Filter by date range
        if (start_date) {
            sql += ' AND scheduled_date_time >= ?';
            params.push(start_date);
        }

        if (end_date) {
            sql += ' AND scheduled_date_time <= ?';
            params.push(end_date);
        }

        // Filter for upcoming reviews
        if (upcoming === 'true') {
            sql += ' AND scheduled_date_time > NOW() AND status = ?';
            params.push('scheduled');
        }

        sql += ' ORDER BY scheduled_date_time ASC LIMIT ?';
        params.push(parseInt(limit));

        const [reviews] = await pool.query(sql, params);

        res.json({
            success: true,
            count: reviews.length,
            data: reviews.map(review => ({
                id: review.id,
                position: review.position,
                reviewType: review.review_type,
                title: review.title,
                description: review.description,
                scheduledDateTime: review.scheduled_date_time,
                assignee: review.assignee,
                priority: review.priority,
                status: review.status,
                sendReminder: review.send_reminder === 1,
                reminderDaysBefore: review.reminder_days_before,
                createdBy: review.created_by,
                createdAt: review.created_at,
                updatedAt: review.updated_at
            }))
        });

    } catch (error) {
        console.error('Error fetching scheduled reviews:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch scheduled reviews'
        });
    }
});

/**
 * GET /api/reviews/schedule/:id
 * Get a single scheduled review by ID
 */
app.get('/api/reviews/schedule/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [reviews] = await pool.query(`
            SELECT * FROM scheduled_reviews WHERE id = ?
        `, [id]);

        if (reviews.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Scheduled review not found'
            });
        }

        const review = reviews[0];

        res.json({
            success: true,
            data: {
                id: review.id,
                position: review.position,
                reviewType: review.review_type,
                title: review.title,
                description: review.description,
                scheduledDateTime: review.scheduled_date_time,
                assignee: review.assignee,
                priority: review.priority,
                status: review.status,
                sendReminder: review.send_reminder === 1,
                reminderDaysBefore: review.reminder_days_before,
                createdBy: review.created_by,
                user_id: review.user_id,
                office_id: review.office_id,
                createdAt: review.created_at,
                updatedAt: review.updated_at
            }
        });

    } catch (error) {
        console.error('Error fetching scheduled review:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch scheduled review'
        });
    }
});

/**
 * PUT /api/reviews/schedule/:id
 * Update a scheduled review
 */
app.put('/api/reviews/schedule/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            position,
            reviewType,
            title,
            description,
            scheduledDate,
            scheduledTime,
            assignee,
            priority,
            sendReminder,
            reminderDaysBefore,
            status
        } = req.body;

        // Check if review exists
        const [existingReview] = await pool.query(`
            SELECT * FROM scheduled_reviews WHERE id = ?
        `, [id]);

        if (existingReview.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Scheduled review not found'
            });
        }

        // Build update query dynamically
        const updates = [];
        const params = [];

        if (position !== undefined) {
            updates.push('position = ?');
            params.push(position);
        }

        if (reviewType !== undefined) {
            updates.push('review_type = ?');
            params.push(reviewType);
        }

        if (title !== undefined) {
            if (title.trim().length < 3) {
                return res.status(400).json({
                    success: false,
                    error: 'Review title must be at least 3 characters long.'
                });
            }
            updates.push('title = ?');
            params.push(title.trim());
        }

        if (description !== undefined) {
            updates.push('description = ?');
            params.push(description?.trim() || null);
        }

        if (scheduledDate !== undefined || scheduledTime !== undefined) {
            const currentDate = existingReview[0].scheduled_date_time;
            const date = scheduledDate || currentDate.toISOString().split('T')[0];
            const time = scheduledTime || currentDate.toTimeString().slice(0, 5);
            const scheduledDateTime = new Date(`${date}T${time}`);
            
            updates.push('scheduled_date_time = ?');
            params.push(scheduledDateTime);
        }

        if (assignee !== undefined) {
            updates.push('assignee = ?');
            params.push(assignee);
        }

        if (priority !== undefined) {
            updates.push('priority = ?');
            params.push(priority);
        }

        if (sendReminder !== undefined) {
            updates.push('send_reminder = ?');
            params.push(sendReminder ? 1 : 0);
        }

        if (reminderDaysBefore !== undefined) {
            updates.push('reminder_days_before = ?');
            params.push(reminderDaysBefore);
        }

        if (status !== undefined) {
            const validStatuses = ['scheduled', 'in-progress', 'completed', 'cancelled'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
                });
            }
            updates.push('status = ?');
            params.push(status);
        }

        if (updates.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No valid update fields provided'
            });
        }

        updates.push('updated_at = NOW()');
        params.push(id);

        await pool.query(`
            UPDATE scheduled_reviews SET ${updates.join(', ')} WHERE id = ?
        `, params);

        // Fetch the updated record
        const [updatedReview] = await pool.query(`
            SELECT * FROM scheduled_reviews WHERE id = ?
        `, [id]);

        res.json({
            success: true,
            message: 'Review updated successfully',
            data: {
                id: updatedReview[0].id,
                title: updatedReview[0].title,
                status: updatedReview[0].status,
                scheduledDateTime: updatedReview[0].scheduled_date_time
            }
        });

    } catch (error) {
        console.error('Error updating scheduled review:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update scheduled review'
        });
    }
});

/**
 * DELETE /api/reviews/schedule/:id
 * Cancel/delete a scheduled review
 */
app.delete('/api/reviews/schedule/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if review exists
        const [existingReview] = await pool.query(`
            SELECT * FROM scheduled_reviews WHERE id = ?
        `, [id]);

        if (existingReview.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Scheduled review not found'
            });
        }

        // Delete the review
        await pool.query(`
            DELETE FROM scheduled_reviews WHERE id = ?
        `, [id]);

        res.json({
            success: true,
            message: 'Scheduled review cancelled successfully'
        });

    } catch (error) {
        console.error('Error deleting scheduled review:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to cancel scheduled review'
        });
    }
});

/**
 * PATCH /api/reviews/schedule/:id/status
 * Update only the status of a scheduled review
 */
app.patch('/api/reviews/schedule/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                error: 'status is required'
            });
        }

        const validStatuses = ['scheduled', 'in-progress', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
            });
        }

        // Check if review exists
        const [existingReview] = await pool.query(`
            SELECT * FROM scheduled_reviews WHERE id = ?
        `, [id]);

        if (existingReview.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Scheduled review not found'
            });
        }

        // Update status
        await pool.query(`
            UPDATE scheduled_reviews SET status = ?, updated_at = NOW() WHERE id = ?
        `, [status, id]);

        res.json({
            success: true,
            message: 'Review status updated successfully',
            data: {
                id: parseInt(id),
                previousStatus: existingReview[0].status,
                newStatus: status
            }
        });

    } catch (error) {
        console.error('Error updating review status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update review status'
        });
    }
});

/**
 * GET /branch-collection-waterfall
 * Calculate Collections Waterfall for a branch/office
 * 
 * Query Parameters:
 * - office_id (required): Branch office ID
 * - start_date (optional): Start date for the period (YYYY-MM-DD) - default: 2023-02-01
 * - end_date (optional): End date for the period (YYYY-MM-DD) - default: current date
 * 
 * Collections Waterfall Metrics:
 * - Due: Total amount expected within a period (from loan_repayment_schedules.total_due)
 * - Collected: Full payments + reloan payments (payment_apply_to = 'full_payment' OR 'reloan_payment')
 * - Partial: Partial payments only (payment_apply_to = 'part_payment')
 * - Overdue: Uncollected amounts past due date
 * - Compliance: (Collected/Due) × 100
 * 
 * Database Enums Used:
 * - transaction_type: 'repayment' (from loan_transactions)
 * - payment_apply_to: 'full_payment', 'part_payment', 'reloan_payment' (from loan_transactions)
 * - loan status: 'disbursed', 'closed', 'paid' (from loans)
 */
app.get('/branch-collection-waterfall', async (req, res) => {
    try {
        const { office_id, start_date, end_date } = req.query;

        // Validation
        if (!office_id) {
            return res.status(400).json({
                success: false,
                error: "office_id is required"
            });
        }

        // Set default dates
        const defaultStartDate = '2023-02-01';
        const today = new Date();
        const defaultEndDate = today.toISOString().split('T')[0];
        
        const startDate = start_date || defaultStartDate;
        const endDate = end_date || defaultEndDate;

        // Get branch info
        const [branchInfoResult] = await pool.query(`
            SELECT id, name FROM offices WHERE id = ?
        `, [office_id]);

        if (branchInfoResult.length === 0) {
            return res.status(404).json({
                success: false,
                error: "Branch/Office not found"
            });
        }

        // 1. DUE AMOUNT - Total amount expected to be collected within the period
        // Sum of total_due from repayment schedules within the period
        const [dueResult] = await pool.query(`
            SELECT 
                COALESCE(SUM(lrs.total_due), 0) AS total_due,
                COALESCE(SUM(lrs.principal), 0) AS principal_due,
                COALESCE(SUM(lrs.interest), 0) AS interest_due,
                COALESCE(SUM(lrs.fees), 0) AS fees_due,
                COALESCE(SUM(lrs.penalty), 0) AS penalty_due,
                COUNT(DISTINCT lrs.loan_id) AS loans_with_due,
                COUNT(*) AS total_installments
            FROM loan_repayment_schedules lrs
            JOIN loans l ON lrs.loan_id = l.id
            WHERE l.office_id = ?
              AND lrs.due_date BETWEEN ? AND ?
              AND l.status IN ('disbursed', 'closed', 'paid')
        `, [office_id, startDate, endDate]);

        // 2. COLLECTED AMOUNT - Full payments and reloan payments received
        // Sum of credits from repayment transactions (full_payment, reloan_payment, or NULL for legacy)
        // payment_apply_to enum: 'full_payment', 'part_payment', 'reloan_payment'
        // Note: part_payment is tracked separately as "Partial"
        const [collectedResult] = await pool.query(`
            SELECT 
                COALESCE(SUM(lt.credit), 0) AS total_collected,
                COALESCE(SUM(lt.principal), 0) AS principal_collected,
                COALESCE(SUM(lt.interest), 0) AS interest_collected,
                COALESCE(SUM(lt.fee), 0) AS fees_collected,
                COALESCE(SUM(lt.penalty), 0) AS penalty_collected,
                COUNT(DISTINCT lt.loan_id) AS loans_collected,
                COUNT(*) AS payment_count
            FROM loan_transactions lt
            JOIN loans l ON lt.loan_id = l.id
            WHERE l.office_id = ?
              AND lt.transaction_type = 'repayment'
              AND (lt.payment_apply_to IN ('full_payment', 'reloan_payment') OR lt.payment_apply_to IS NULL)
              AND lt.date BETWEEN ? AND ?
              AND lt.reversed = 0
              AND lt.status = 'approved'
              AND l.status IN ('disbursed', 'closed', 'paid')
        `, [office_id, startDate, endDate]);

        // 3. PARTIAL AMOUNT - Partial payments received
        // Sum of credits from partial payment transactions
        const [partialResult] = await pool.query(`
            SELECT 
                COALESCE(SUM(lt.credit), 0) AS total_partial,
                COALESCE(SUM(lt.principal), 0) AS principal_partial,
                COALESCE(SUM(lt.interest), 0) AS interest_partial,
                COALESCE(SUM(lt.fee), 0) AS fees_partial,
                COALESCE(SUM(lt.penalty), 0) AS penalty_partial,
                COUNT(DISTINCT lt.loan_id) AS loans_with_partial,
                COUNT(*) AS partial_payment_count
            FROM loan_transactions lt
            JOIN loans l ON lt.loan_id = l.id
            WHERE l.office_id = ?
              AND lt.transaction_type = 'repayment'
              AND lt.payment_apply_to = 'part_payment'
              AND lt.date BETWEEN ? AND ?
              AND lt.reversed = 0
              AND lt.status = 'approved'
              AND l.status IN ('disbursed', 'closed', 'paid')
        `, [office_id, startDate, endDate]);

        // 4. OVERDUE AMOUNT - Uncollected amounts past due date
        // Sum of unpaid amounts from schedules past due date
        const [overdueResult] = await pool.query(`
            SELECT 
                COALESCE(SUM(
                    lrs.total_due - 
                    COALESCE(lrs.principal_paid, 0) - 
                    COALESCE(lrs.interest_paid, 0) - 
                    COALESCE(lrs.fees_paid, 0) - 
                    COALESCE(lrs.penalty_paid, 0)
                ), 0) AS total_overdue,
                COALESCE(SUM(lrs.principal - COALESCE(lrs.principal_paid, 0)), 0) AS principal_overdue,
                COALESCE(SUM(lrs.interest - COALESCE(lrs.interest_paid, 0)), 0) AS interest_overdue,
                COALESCE(SUM(lrs.fees - COALESCE(lrs.fees_paid, 0)), 0) AS fees_overdue,
                COALESCE(SUM(lrs.penalty - COALESCE(lrs.penalty_paid, 0)), 0) AS penalty_overdue,
                COUNT(DISTINCT lrs.loan_id) AS loans_overdue,
                COUNT(*) AS overdue_installments
            FROM loan_repayment_schedules lrs
            JOIN loans l ON lrs.loan_id = l.id
            WHERE l.office_id = ?
              AND lrs.due_date < CURDATE()
              AND lrs.paid = 0
              AND l.status = 'disbursed'
        `, [office_id]);

        // 5. COMPLIANCE RATE - (Collected / Due) × 100
        const totalDue = parseFloat(dueResult[0].total_due) || 0;
        const totalCollected = parseFloat(collectedResult[0].total_collected) || 0;
        const totalPartial = parseFloat(partialResult[0].total_partial) || 0;
        const totalOverdue = parseFloat(overdueResult[0].total_overdue) || 0;
        
        // Compliance calculation: (Collected / Due) × 100
        const complianceRate = totalDue > 0 ? ((totalCollected / totalDue) * 100).toFixed(2) : 0;

        // Get total collected (including partial) for overall collection
        const totalAllCollected = totalCollected + totalPartial;
        const overallCollectionRate = totalDue > 0 ? ((totalAllCollected / totalDue) * 100).toFixed(2) : 0;

        // Get collection breakdown by loan officer
        const [officerBreakdown] = await pool.query(`
            SELECT 
                u.id AS officer_id,
                CONCAT(u.first_name, ' ', u.last_name) AS officer_name,
                COALESCE(SUM(lt.credit), 0) AS total_collected,
                COUNT(DISTINCT lt.loan_id) AS loans_collected,
                COUNT(*) AS payment_count
            FROM loan_transactions lt
            JOIN loans l ON lt.loan_id = l.id
            JOIN users u ON l.loan_officer_id = u.id
            WHERE l.office_id = ?
              AND lt.transaction_type = 'repayment'
              AND lt.date BETWEEN ? AND ?
              AND lt.reversed = 0
              AND lt.status = 'approved'
              AND l.status IN ('disbursed', 'closed', 'paid')
            GROUP BY u.id, u.first_name, u.last_name
            ORDER BY total_collected DESC
        `, [office_id, startDate, endDate]);

        // Get monthly trend for the period
        const [monthlyTrend] = await pool.query(`
            SELECT 
                DATE_FORMAT(lt.date, '%Y-%m') AS month,
                COALESCE(SUM(lt.credit), 0) AS monthly_collected,
                COUNT(*) AS payment_count
            FROM loan_transactions lt
            JOIN loans l ON lt.loan_id = l.id
            WHERE l.office_id = ?
              AND lt.transaction_type = 'repayment'
              AND lt.date BETWEEN ? AND ?
              AND lt.reversed = 0
              AND lt.status = 'approved'
              AND l.status IN ('disbursed', 'closed', 'paid')
            GROUP BY DATE_FORMAT(lt.date, '%Y-%m')
            ORDER BY month DESC
        `, [office_id, startDate, endDate]);

        // Get expected vs collected monthly comparison
        const [expectedMonthly] = await pool.query(`
            SELECT 
                DATE_FORMAT(lrs.due_date, '%Y-%m') AS month,
                COALESCE(SUM(lrs.total_due), 0) AS monthly_expected
            FROM loan_repayment_schedules lrs
            JOIN loans l ON lrs.loan_id = l.id
            WHERE l.office_id = ?
              AND lrs.due_date BETWEEN ? AND ?
              AND l.status IN ('disbursed', 'closed', 'paid')
            GROUP BY DATE_FORMAT(lrs.due_date, '%Y-%m')
            ORDER BY month DESC
        `, [office_id, startDate, endDate]);

        // Build response
        const responseData = {
            metric: "Collections Waterfall",
            office_id: parseInt(office_id),
            office_name: branchInfoResult[0].name,
            period: {
                start_date: startDate,
                end_date: endDate
            },
            currency: "ZMW",
            summary: {
                due: {
                    total: totalDue,
                    formatted: `ZMW ${totalDue.toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    breakdown: {
                        principal: parseFloat(dueResult[0].principal_due) || 0,
                        interest: parseFloat(dueResult[0].interest_due) || 0,
                        fees: parseFloat(dueResult[0].fees_due) || 0,
                        penalty: parseFloat(dueResult[0].penalty_due) || 0
                    },
                    loans_count: dueResult[0].loans_with_due,
                    installments_count: dueResult[0].total_installments
                },
                collected: {
                    total: totalCollected,
                    formatted: `ZMW ${totalCollected.toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    breakdown: {
                        principal: parseFloat(collectedResult[0].principal_collected) || 0,
                        interest: parseFloat(collectedResult[0].interest_collected) || 0,
                        fees: parseFloat(collectedResult[0].fees_collected) || 0,
                        penalty: parseFloat(collectedResult[0].penalty_collected) || 0
                    },
                    loans_count: collectedResult[0].loans_collected,
                    payments_count: collectedResult[0].payment_count
                },
                partial: {
                    total: totalPartial,
                    formatted: `ZMW ${totalPartial.toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    breakdown: {
                        principal: parseFloat(partialResult[0].principal_partial) || 0,
                        interest: parseFloat(partialResult[0].interest_partial) || 0,
                        fees: parseFloat(partialResult[0].fees_partial) || 0,
                        penalty: parseFloat(partialResult[0].penalty_partial) || 0
                    },
                    loans_count: partialResult[0].loans_with_partial,
                    payments_count: partialResult[0].partial_payment_count
                },
                overdue: {
                    total: totalOverdue,
                    formatted: `ZMW ${totalOverdue.toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    breakdown: {
                        principal: parseFloat(overdueResult[0].principal_overdue) || 0,
                        interest: parseFloat(overdueResult[0].interest_overdue) || 0,
                        fees: parseFloat(overdueResult[0].fees_overdue) || 0,
                        penalty: parseFloat(overdueResult[0].penalty_overdue) || 0
                    },
                    loans_count: overdueResult[0].loans_overdue,
                    installments_count: overdueResult[0].overdue_installments
                },
                compliance: {
                    rate: parseFloat(complianceRate),
                    formatted: `${complianceRate}%`,
                    status: parseFloat(complianceRate) >= 95 ? 'excellent' :
                            parseFloat(complianceRate) >= 80 ? 'good' :
                            parseFloat(complianceRate) >= 70 ? 'average' : 'needs_attention'
                }
            },
            analysis: {
                total_collections: totalAllCollected,
                total_collections_formatted: `ZMW ${totalAllCollected.toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                overall_collection_rate: parseFloat(overallCollectionRate),
                collection_gap: totalDue - totalCollected,
                collection_gap_formatted: `ZMW ${Math.max(0, totalDue - totalCollected).toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                uncollected_amount: Math.max(0, totalDue - totalAllCollected),
                uncollected_formatted: `ZMW ${Math.max(0, totalDue - totalAllCollected).toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            },
            officer_breakdown: officerBreakdown.map(officer => ({
                officer_id: officer.officer_id,
                officer_name: officer.officer_name,
                total_collected: parseFloat(officer.total_collected) || 0,
                formatted: `ZMW ${(parseFloat(officer.total_collected) || 0).toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                loans_collected: officer.loans_collected,
                payment_count: officer.payment_count
            })),
            monthly_trend: monthlyTrend.map(month => ({
                month: month.month,
                collected: parseFloat(month.monthly_collected) || 0,
                formatted: `ZMW ${(parseFloat(month.monthly_collected) || 0).toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                payment_count: month.payment_count
            })),
            expected_monthly: expectedMonthly.map(month => ({
                month: month.month,
                expected: parseFloat(month.monthly_expected) || 0,
                formatted: `ZMW ${(parseFloat(month.monthly_expected) || 0).toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            }))
        };

        // Response
        return res.json({
            success: true,
            data: responseData
        });

    } catch (err) {
        console.error('Error calculating Collections Waterfall:', err);
        return res.status(500).json({
            success: false,
            error: "Failed to calculate Collections Waterfall",
            message: err.message
        });
    }
});

app.listen(5000,()=>{
    console.log('Server is up and running');
})