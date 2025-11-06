import db from "../config/db.js";

// ✅ Add new callback request
export const addCallbackRequest = async (data) => {
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

  try {
    const pool = await db();

    await pool
      .request()
      .input("departDate", departDate)
      .input("returnDate", returnDate)
      .input("departureAirport", departureAirport)
      .input("destinationAirport", destinationAirport)
      .input("cabin", cabin)
      .input("passengers", passengers)
      .input("fullName", fullName)
      .input("phone", phone)
      .input("email", email)
      .input("message", message)
      .query(`
        INSERT INTO callback_request
        (departDate, returnDate, departureAirport, destinationAirport, cabin, passengers, fullName, phone, email, message)
        VALUES (@departDate, @returnDate, @departureAirport, @destinationAirport, @cabin, @passengers, @fullName, @phone, @email, @message)
      `);

    return { message: "Callback request added successfully" };
  } catch (err) {
    console.error("Error inserting callback request:", err.message);
    throw err;
  }
};

// ✅ Get all callback requests
export const getCallbackRequests = async () => {
  try {
    const pool = await db();
    const result = await pool
      .request()
      .query("SELECT * FROM callback_request ORDER BY created_at DESC");
    return result.recordset;
  } catch (err) {
    console.error("Error fetching callback requests:", err.message);
    throw err;
  }
};
