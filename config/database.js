// config/database.js
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8mb4",
  collation: "utf8mb4_unicode_ci",
  // Critical connection settings for Arabic
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
