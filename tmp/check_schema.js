const pool = require("./db");

async function checkSchema() {
    try {
        const [offices] = await pool.query("DESCRIBE offices");
        console.log("Offices columns:");
        console.table(offices);
        
        const [users] = await pool.query("DESCRIBE users");
        console.log("Users columns:");
        console.table(users);
        
        const [clients] = await pool.query("DESCRIBE clients");
        console.log("Clients columns:");
        console.table(clients);
        
        const [loans] = await pool.query("DESCRIBE loans");
        console.log("Loans columns:");
        console.table(loans);
        
        const [transactions] = await pool.query("DESCRIBE loan_transactions");
        console.log("Loan Transactions columns:");
        console.table(transactions);
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkSchema();
