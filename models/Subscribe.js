import db from "../config/db.js";

// ✅ Insert new subscriber
export const addSubscriber = async (email, callback) => {
  try {
    const pool = await db();
    await pool.request().input("email", email).query("INSERT INTO subscribe (email) VALUES (@email)");
    callback(null, { message: "Subscriber added successfully" });
  } catch (err) {
    console.error("Error adding subscriber:", err);
    callback(err, null);
  }
};

// ✅ Get all subscribers
export const getSubscribers = async (callback) => {
  try {
    const pool = await db();
    const result = await pool.request().query("SELECT * FROM subscribe ORDER BY created_at DESC");
    callback(null, result.recordset);
  } catch (err) {
    console.error("Error fetching subscribers:", err);
    callback(err, null);
  }
};
