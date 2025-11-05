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
export const addEnquiry = async (data, callback) => {
  const { firstName, lastName, email, phone, enquiryType, message } = data;

  try {
    const pool = await db();

    await pool
      .request()
      .input("firstName", firstName)
      .input("lastName", lastName)
      .input("email", email)
      .input("phone", phone)
      .input("enquiryType", enquiryType)
      .input("message", message)
      .query(`
        INSERT INTO enquiry 
        (firstName, lastName, email, phone, enquiryType, message)
        VALUES (@firstName, @lastName, @email, @phone, @enquiryType, @message)
      `);

    callback(null, { message: "Enquiry added successfully" });
  } catch (err) {
    console.error("❌ Error inserting enquiry:", err.message);
    callback(err);
  }
};

// ✅ Fetch all enquiries
export const getEnquiries = async (callback) => {
  try {
    const pool = await db();
    const result = await pool
      .request()
      .query("SELECT * FROM enquiry ORDER BY created_at DESC");

    callback(null, result.recordset);
  } catch (err) {
    console.error("❌ Error fetching enquiries:", err.message);
    callback(err);
  }
};

