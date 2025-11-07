// import db from "../config/db.js";

// // ✅ Insert a new enquiry
// export const addEnquiry = async (data) => {
//   const { firstName, lastName, email, phone, enquiryType, message } = data;

//   try {
//     const pool = await db();

//     await pool
//       .request()
//       .input("firstName", firstName)
//       .input("lastName", lastName)
//       .input("email", email)
//       .input("phone", phone)
//       .input("enquiryType", enquiryType)
//       .input("message", message)
//       .query(`
//         INSERT INTO enquiry 
//         (firstName, lastName, email, phone, enquiryType, message)
//         VALUES (@firstName, @lastName, @email, @phone, @enquiryType, @message)
//       `);

//     return { message: "Enquiry added successfully" };
//   } catch (err) {
//     console.error("❌ Error inserting enquiry:", err.message);
//     throw err;
//   }
// };

// // ✅ Fetch all enquiries
// export const getEnquiries = async () => {
//   try {
//     const pool = await db();
//     const result = await pool
//       .request()
//       .query("SELECT * FROM enquiry ORDER BY created_at DESC");

//     return result.recordset;
//   } catch (err) {
//     console.error("❌ Error fetching enquiries:", err.message);
//     throw err;
//   }
// };



// ----------------------------------------------------


import db from "../config/db.js";

// ✅ Insert a new enquiry (MySQL version)
export const addEnquiry = async (data) => {
  const { firstName, lastName, email, phone, enquiryType, message } = data;

  try {
    const connection = await db();

    const query = `
      INSERT INTO enquiry 
      (firstName, lastName, email, phone, enquiryType, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [firstName, lastName, email, phone, enquiryType, message];

    await connection.execute(query, values);
    await connection.end();

    return { message: "Enquiry added successfully" };
  } catch (err) {
    console.error("❌ Error inserting enquiry:", err.message);
    throw err;
  }
};

// ✅ Fetch all enquiries (MySQL version)
export const getEnquiries = async () => {
  try {
    const connection = await db();
    const [rows] = await connection.execute(
      "SELECT * FROM enquiry ORDER BY created_at DESC"
    );
    await connection.end();
    return rows;
  } catch (err) {
    console.error("❌ Error fetching enquiries:", err.message);
    throw err;
  }
};
