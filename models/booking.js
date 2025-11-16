import db from "../config/db.js";

// ✅ Fetch all airports
export const getallBooking = async () => {
  try {
    const connection = await db();
    const [rows] = await connection.execute(
      "SELECT * FROM travel_bookings ORDER BY created_at DESC"
    );
    await connection.end();
    return rows;
  } catch (err) {
    console.error("❌ Error fetching booking:", err.message);
    throw err;
  }
};