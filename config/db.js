// import sql from "mssql/msnodesqlv8.js";
// import dotenv from "dotenv";

// dotenv.config();

// const dbConfig = {
//   server: process.env.DB_SERVER,
//   database: process.env.DB_NAME,
//   driver: "msnodesqlv8",
//   options: {
//     trustedConnection: true,
//     trustServerCertificate: true,
//   },
// };

// const db = async () => {
//   try {
//     const pool = await sql.connect(dbConfig);
//     console.log("✅ Connected to Local SQL Server (Windows Auth)");
//     return pool;
//   } catch (err) {
//     console.error("❌ Database connection failed:", err.message);
//   }
// };

// export default db;


// -----------------------------------------------------------------

// Sql WorkBench


import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
};

const db = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("✅ Connected to MySQL Database (Workbench)");
    return connection;
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
};

export default db;
