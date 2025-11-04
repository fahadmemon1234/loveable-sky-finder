// import mongoose from "mongoose";

// const subscribeSchema = new mongoose.Schema(
//   {
//     email: String,
//   },
//   { timestamps: true }
// );

// const Subscribe = mongoose.model("Subscribe", subscribeSchema);

// export default Subscribe;


import db from "../config/db.js";

// ✅ Insert new subscriber
export const addSubscriber = (email, callback) => {
  const query = "INSERT INTO subscribe (email) VALUES (?)";
  db.query(query, [email], callback);
};

// ✅ Get all subscribers
export const getSubscribers = (callback) => {
  const query = "SELECT * FROM subscribe ORDER BY created_at DESC";
  db.query(query, callback);
};
