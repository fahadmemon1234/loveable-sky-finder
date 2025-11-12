// import db from "../config/db.js";

// // ✅ Insert new inquiry
// export const addInquiry = async (data) => {
//   const {
//     from,
//     to,
//     departDate,
//     returnDate,
//     adults,
//     children,
//     infants,
//     name,
//     email,
//     phone,
//     tripType,
//   } = data;

//   try {
//     const pool = await db();
//     await pool
//       .request()
//       .input("from_location", from)
//       .input("to_location", to)
//       .input("departDate", departDate)
//       .input("returnDate", returnDate)
//       .input("adults", adults)
//       .input("children", children)
//       .input("infants", infants)
//       .input("name", name)
//       .input("email", email)
//       .input("phone", phone)
//       .input("tripType", tripType)
//       .query(`
//         INSERT INTO inquiry
//         (from_location, to_location, departDate, returnDate, adults, children, infants, name, email, phone, tripType)
//         VALUES
//         (@from_location, @to_location, @departDate, @returnDate, @adults, @children, @infants, @name, @email, @phone, @tripType)
//       `);

//     return { message: "Inquiry added successfully" };
//   } catch (err) {
//     console.error("Error adding inquiry:", err);
//     throw err;
//   }
// };

// // ✅ Get all inquiries
// export const getInquiries = async () => {
//   try {
//     const pool = await db();
//     const result = await pool.request().query("SELECT * FROM inquiry ORDER BY id DESC");
//     return result.recordset;
//   } catch (err) {
//     console.error("Error fetching inquiries:", err);
//     throw err;
//   }
// };

// ---------------------------------------------------------

import db from "../config/db.js";

// ✅ Insert new inquiry (MySQL version)
export const addInquiry = async (data) => {
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
    const connection = await db();
    const query = `
      INSERT INTO inquiry 
      (from_location, to_location, departDate, returnDate, adults, children, infants, name, email, phone, tripType)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
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
    ];

    await connection.execute(query, values);
    await connection.end();

    return { message: "Inquiry added successfully" };
  } catch (err) {
    console.error("❌ Error adding inquiry:", err);
    throw err;
  }
};

// ✅ Get all inquiries (MySQL version)
export const getInquiries = async () => {
  try {
    const connection = await db();
    const [rows] = await connection.execute(
      `
      SELECT 
        i.*,
        u.name AS user_name
      FROM inquiry i
      LEFT JOIN users u ON i.view_id = u.id
      ORDER BY i.id DESC
      `
    );
    await connection.end();
    return rows;
  } catch (err) {
    console.error("❌ Error fetching inquiries:", err);
    throw err;
  }
};

export const updateInquiry = async (id, view_id) => {
  try {
    const connection = await db();
    const query = `
      UPDATE inquiry
      SET view_id = ?
      WHERE id = ?
    `;
    const values = [view_id, id];

    const [result] = await connection.execute(query, values);
    await connection.end();

    return { message: "Inquiry updated successfully", result };
  } catch (err) {
    console.error("❌ Error updating inquiry:", err);
    throw err;
  }
};

export const addInquiryComment = async (data) => {
  const { userId, inquiry_id, comment } = data;
  try {
    const connection = await db();
    const query = `
      INSERT INTO inquiry_comments 
      (user_id, inquiry_id, comment)
      VALUES (?,?,?)
    `;
    const values = [userId, inquiry_id, comment];
    await connection.execute(query, values);
    await connection.end();

    return { message: "Inquiry added successfully" };
  } catch (err) {
    console.error("❌ Error adding inquiry:", err);
    throw err;
  }
};


export const getCommentByID = async (inquiry_id) => {
  try {
    const connection = await db();
    const [rows] = await connection.execute(
      `
      SELECT 
        *
      FROM inquiry_comments i
      WHERE i.inquiry_id = ?
      ORDER BY i.id DESC
      `,
      [inquiry_id] // Pass the parameter here
    );
    await connection.end();
    return rows;
  } catch (err) {
    console.error("❌ Error fetching comments:", err);
    throw err;
  }
};
