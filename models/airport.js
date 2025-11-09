import db from "../config/db.js";

// ✅ Insert airport into MySQL
export const insertAirport = async (airportData) => {
  const { keyword, airport_code, airport_name, city, country } = airportData;

  try {
    const connection = await db();
    const query = `
      INSERT INTO airports (keyword, airport_code, airport_name, city, country)
      VALUES (?, ?, ?, ?, ?)
    `;
    await connection.execute(query, [
      keyword,
      airport_code,
      airport_name,
      city,
      country,
    ]);
    await connection.end();

    return { message: "Airport inserted successfully" };
  } catch (err) {
    console.error("❌ Error inserting airport:", err.message);
    throw err;
  }
};

// ✅ Fetch all airports
export const getAllAirports = async () => {
  try {
    const connection = await db();
    const [rows] = await connection.execute(
      "SELECT * FROM airports ORDER BY created_at DESC"
    );
    await connection.end();
    return rows;
  } catch (err) {
    console.error("❌ Error fetching airports:", err.message);
    throw err;
  }
};

export const findAirportByCode = async (airport_code) => {
  try {
    const connection = await db();
    const [rows] = await connection.execute(
      "SELECT * FROM airports WHERE airport_code = ?",
      [airport_code]
    );

    await connection.end();
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error("❌ Error fetching airports:", err.message);
    throw err;
  }
};
