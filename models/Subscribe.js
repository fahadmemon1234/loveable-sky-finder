// import db from "../config/db.js";

// // ✅ Insert new subscriber
// export const addSubscriber = async (email, callback) => {
//   try {
//     const pool = await db();
//     await pool.request().input("email", email).query("INSERT INTO subscribe (email) VALUES (@email)");
//     callback(null, { message: "Subscriber added successfully" });
//   } catch (err) {
//     console.error("Error adding subscriber:", err);
//     callback(err, null);
//   }
// };

// // ✅ Get all subscribers
// export const getSubscribers = async (callback) => {
//   try {
//     const pool = await db();
//     const result = await pool.request().query("SELECT * FROM subscribe ORDER BY created_at DESC");
//     callback(null, result.recordset);
//   } catch (err) {
//     console.error("Error fetching subscribers:", err);
//     callback(err, null);
//   }
// };


// ---------------------------------------------------------------------


import db from "../config/db.js";

// ✅ Insert new subscriber (MySQL)
export const addSubscriber = async (email) => {
  try {
    const connection = await db();
    const query = "INSERT INTO subscribe (email) VALUES (?)";
    await connection.execute(query, [email]);
    await connection.end();

    return { message: "Subscriber added successfully" };
  } catch (err) {
    console.error("❌ Error adding subscriber:", err.message);
    throw err;
  }
};

// ✅ Get all subscribers (MySQL)
export const getSubscribers = async () => {
  try {
    const connection = await db();
    const [rows] = await connection.execute(
      "SELECT * FROM subscribe ORDER BY created_at DESC"
    );
    await connection.end();
    return rows;
  } catch (err) {
    console.error("❌ Error fetching subscribers:", err.message);
    throw err;
  }
};
