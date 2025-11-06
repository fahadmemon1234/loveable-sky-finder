import db from "../config/db.js";

// ✅ Insert new inquiry
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
        VALUES 
        (@from_location, @to_location, @departDate, @returnDate, @adults, @children, @infants, @name, @email, @phone, @tripType)
      `);

    return { message: "Inquiry added successfully" };
  } catch (err) {
    console.error("Error adding inquiry:", err);
    throw err;
  }
};

// ✅ Get all inquiries
export const getInquiries = async () => {
  try {
    const pool = await db();
    const result = await pool.request().query("SELECT * FROM inquiry ORDER BY id DESC");
    return result.recordset;
  } catch (err) {
    console.error("Error fetching inquiries:", err);
    throw err;
  }
};
