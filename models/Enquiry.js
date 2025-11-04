// import mongoose from "mongoose";

// const EnquirySchema = new mongoose.Schema(
//   {
//     firstName: String,
//     lastName: String,
//     email: String,
//     phone: String,
//     enquiryType: String,
//     message: String,
//   },
//   { timestamps: true }
// );

// const Enquiry = mongoose.model("Enquiry", EnquirySchema);

// export default Enquiry;


import db from "../config/db.js";

// ✅ Insert a new enquiry
export const addEnquiry = (data, callback) => {
  const { firstName, lastName, email, phone, enquiryType, message } = data;

  const query = `
    INSERT INTO enquiry 
    (firstName, lastName, email, phone, enquiryType, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [firstName, lastName, email, phone, enquiryType, message], callback);
};

// ✅ Fetch all enquiries
export const getEnquiries = (callback) => {
  const query = "SELECT * FROM enquiry ORDER BY created_at DESC";
  db.query(query, callback);
};
