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


import db from "../config/db.js";

// ✅ Add new callback request
export const addCallbackRequest = (data, callback) => {
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

  const query = `
    INSERT INTO callback_request 
    (departDate, returnDate, departureAirport, destinationAirport, cabin, passengers, fullName, phone, email, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
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
    ],
    callback
  );
};

// ✅ Get all callback requests
export const getCallbackRequests = (callback) => {
  const query = "SELECT * FROM callback_request ORDER BY created_at DESC";
  db.query(query, callback);
};