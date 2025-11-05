import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load .env variables

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // leave empty if no password
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // optional, default MySQL port
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

export default db;
