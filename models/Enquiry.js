import db from "../config/db.js";

// ✅ Insert a new enquiry
export const addEnquiry = async (data) => {
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

    return { message: "Enquiry added successfully" };
  } catch (err) {
    console.error("❌ Error inserting enquiry:", err.message);
    throw err;
  }
};

// ✅ Fetch all enquiries
export const getEnquiries = async () => {
  try {
    const pool = await db();
    const result = await pool
      .request()
      .query("SELECT * FROM enquiry ORDER BY created_at DESC");

    return result.recordset;
  } catch (err) {
    console.error("❌ Error fetching enquiries:", err.message);
    throw err;
  }
};
