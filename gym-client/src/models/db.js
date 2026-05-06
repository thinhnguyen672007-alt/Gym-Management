const mysql = require('mysql2/promise');
require('dotenv').config();

//========================
// Database connection
//========================

const pool = mysql.createPool({
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    ssl : { rejectUnauthorized : false }
});

module.exports = pool; // đóng gói ra ngoài để sử dụng ở các file khác 