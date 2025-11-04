// import mongoose from "mongoose";

// const inquirySchema = new mongoose.Schema(
//   {
//     from: String,
//     to: String,
//     departDate: String,
//     returnDate: String,
//     adults: String,
//     children: String,
//     infants: String,
//     // class: String,
//     // direct: Boolean,
//     name: String,
//     email: String,
//     phone: String,
//     tripType: String,
//   },
//   { timestamps: true }
// );

// const Inquiry = mongoose.model("Inquiry", inquirySchema);

// export default Inquiry;


import db from "../config/db.js";

// Add new inquiry
export const addInquiry = (data, callback) => {
  const {
    from,
    to,
    departDate,
    returnDate,
    adults,
    children,
    infants,
    name,
    email,
    phone,
    tripType,
  } = data;

  const sql = `
    INSERT INTO inquiry 
    (from_location, to_location, departDate, returnDate, adults, children, infants, name, email, phone, tripType)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [from, to, departDate, returnDate, adults, children, infants, name, email, phone, tripType],
    callback
  );
};

// Get all inquiries
export const getInquiries = (callback) => {
  const sql = "SELECT * FROM inquiry ORDER BY id DESC";
  db.query(sql, callback);
};
