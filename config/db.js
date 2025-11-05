import sql from "mssql/msnodesqlv8.js";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

const db = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("✅ Connected to Local SQL Server (Windows Auth)");
    return pool;
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
};

export default db;
