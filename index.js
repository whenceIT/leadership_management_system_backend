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





app.listen(5000,()=>{
    console.log('Server is up and running');
})