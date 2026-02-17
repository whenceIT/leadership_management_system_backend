//import mysql from 'mysql'
const mysql = require('mysql2')

const pool = mysql.createPool({ 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
port: process.env.PORT,
}).promise()


// const pool = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password:'',
//     database: 'wdb',
//     port: 3306,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// }).promise();

module.exports = pool;