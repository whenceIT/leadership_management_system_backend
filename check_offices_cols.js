const pool = require("./db");

async function checkOffices() {
    try {
        const [rows] = await pool.query("DESCRIBE offices");
        console.log("Offices Columns:");
        rows.forEach(row => console.log(row.Field));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkOffices();
