// import mongoose from "mongoose";

// const CallbackRequestSchema = new mongoose.Schema(
//   {
//     departDate: { type: Date, required: true },
//     returnDate: { type: Date, required: true },
//     departureAirport: { type: String, required: true },
//     destinationAirport: { type: String, required: true },
//     cabin: { type: String, required: true },
//     passengers: { type: Number, required: true },
//     fullName: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String, required: false },
//     message: { type: String, required: false },
//   },
//   { timestamps: true }
// );

// const CallbackRequest = mongoose.model(
//   "CallbackRequest",
//   CallbackRequestSchema
// );

// export default CallbackRequest;


// import db from "../config/db.js";

// // ✅ Add new callback request
// export const addCallbackRequest = (data, callback) => {
//   const {
//     departDate,
//     returnDate,
//     departureAirport,
//     destinationAirport,
//     cabin,
//     passengers,
//     fullName,
//     phone,
//     email,
//     message,
//   } = data;

//   const query = `
//     INSERT INTO callback_request 
//     (departDate, returnDate, departureAirport, destinationAirport, cabin, passengers, fullName, phone, email, message)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   db.query(
//     query,
//     [
//       departDate,
//       returnDate,
//       departureAirport,
//       destinationAirport,
//       cabin,
//       passengers,
//       fullName,
//       phone,
//       email,
//       message,
//     ],
//     callback
//   );
// };

// // ✅ Get all callback requests
// export const getCallbackRequests = (callback) => {
//   const query = "SELECT * FROM callback_request ORDER BY created_at DESC";
//   db.query(query, callback);
// };


import db from "../config/db.js";

// ✅ Add new callback request
export const addCallbackRequest = async (data, callback) => {
  const {
    departDate,
    returnDate,
    departureAirport,
    destinationAirport,
    cabin,
    passengers,
    fullName,
    phone,
    email,
    message,
  } = data;

  try {
    const pool = await db();

    await pool
      .request()
      .input("departDate", departDate)
      .input("returnDate", returnDate)
      .input("departureAirport", departureAirport)
      .input("destinationAirport", destinationAirport)
      .input("cabin", cabin)
      .input("passengers", passengers)
      .input("fullName", fullName)
      .input("phone", phone)
      .input("email", email)
      .input("message", message)
      .query(`
        INSERT INTO callback_request
        (departDate, returnDate, departureAirport, destinationAirport, cabin, passengers, fullName, phone, email, message)
        VALUES (@departDate, @returnDate, @departureAirport, @destinationAirport, @cabin, @passengers, @fullName, @phone, @email, @message)
      `);

    callback(null, { message: "Callback request added successfully" });
  } catch (err) {
    console.error("❌ Error inserting callback request:", err.message);
    callback(err);
  }
};

// ✅ Get all callback requests
export const getCallbackRequests = async (callback) => {
  try {
    const pool = await db();
    const result = await pool
      .request()
      .query("SELECT * FROM callback_request ORDER BY created_at DESC");

    callback(null, result.recordset);
  } catch (err) {
    console.error("❌ Error fetching callback requests:", err.message);
    callback(err);
  }
};
