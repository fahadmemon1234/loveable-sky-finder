import mysql from "mysql2/promise";
import db from "../config/db.js"; // existing db.js

// Create a promise-based connection from your existing db config
export async function getConnection() {
  return await mysql.createConnection({
    host: db.config.host,
    user: db.config.user,
    password: db.config.password,
    database: db.config.database,
    port: db.config.port,
  });
}

// Insert a single airport
export async function insertAirport({ keyword, airport_code, airport_name, city, country }) {
  const connection = await getConnection();
  try {
    await connection.execute(
      `INSERT INTO airports (keyword, airport_code, airport_name, city, country)
       VALUES (?, ?, ?, ?, ?)`,
      [keyword, airport_code, airport_name, city, country]
    );
  } catch (err) {
    if (err.code !== "ER_DUP_ENTRY") {
      console.error("Error inserting airport:", err.message);
    }
  } finally {
    await connection.end();
  }
}
