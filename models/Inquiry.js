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
export const addInquiry = async (data, callback) => {
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

  try {
    const pool = await db();

    await pool
      .request()
      .input("from_location", from)
      .input("to_location", to)
      .input("departDate", departDate)
      .input("returnDate", returnDate)
      .input("adults", adults)
      .input("children", children)
      .input("infants", infants)
      .input("name", name)
      .input("email", email)
      .input("phone", phone)
      .input("tripType", tripType)
      .query(`
        INSERT INTO inquiry 
        (from_location, to_location, departDate, returnDate, adults, children, infants, name, email, phone, tripType)
        VALUES (@from_location, @to_location, @departDate, @returnDate, @adults, @children, @infants, @name, @email, @phone, @tripType)
      `);

    callback(null, { message: "Inquiry added successfully" });
  } catch (err) {
    console.error("Error adding inquiry:", err);
    callback(err, null);
  }
};

// Get all inquiries
export const getInquiries = async (callback) => {
  try {
    const pool = await db();
    const result = await pool.request().query("SELECT * FROM inquiry ORDER BY id DESC");
    callback(null, result.recordset);
  } catch (err) {
    console.error("Error fetching inquiries:", err);
    callback(err, null);
  }
};
