import db from "../config/db.js";

// ✅ Insert booking header
export const addBookingHeader = async (headerData) => {
  const connection = await db();
  const {
    user_id,
    BookingDate,
    SupplierName,
    ReferencesNO,
    FullName,
    Email,
    Phone,
    Departureairport,
    Returnairport,
    Goingstopover,
    Returnstopover,
    Airline,
    DepartureDate,
    ReturnDate,
    FlightType,
    FlightClass,
    PNRno,
    airlineLocator,
    PNRExpiryDate,
    FareExpiryDate,
    PaymentType,
    AgentFlightDetails,
    CustomerFlightDetails,
    Passengers,
    Total,
    PayableToSupplier,
    ReceivedAmount,
    RemainingProfit,
  } = headerData;

  const [result] = await connection.execute(
    `INSERT INTO booking_header
    (user_id, booking_date, supplier_name, reference_no, full_name, email, phone,
     departure_airport, return_airport, going_stopover, return_stopover, airline,
     departure_date, return_date, flight_type, flight_class, pnr, airline_locator,
     pnr_expiry, fare_expiry, payment_type, agent_flight_details, customer_flight_details,passanger,
     total, payable_supplier, received_amount, remaining_profit)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id,
      BookingDate,
      SupplierName,
      ReferencesNO,
      FullName,
      Email,
      Phone,
      Departureairport,
      Returnairport,
      Goingstopover,
      Returnstopover,
      Airline,
      DepartureDate,
      ReturnDate,
      FlightType,
      FlightClass,
      PNRno,
      airlineLocator,
      PNRExpiryDate,
      FareExpiryDate,
      PaymentType,
      AgentFlightDetails,
      CustomerFlightDetails,
      Passengers,
      Total,
      PayableToSupplier,
      ReceivedAmount,
      RemainingProfit,
    ]
  );

  await connection.end();
  return result.insertId;
};

// ✅ Insert booking details (passengers)
export const addBookingDetails = async (headerId, passengers) => {
  const connection = await db();

  for (const p of passengers) {
    await connection.execute(
      `INSERT INTO booking_details
       (booking_header_id, category, title, first_name, mid_name, sur_name, age, sale_price, admin_price)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        headerId,
        p.Category,
        p.Title,
        p.FirstName,
        p.MidName,
        p.SurName,
        p.Age,
        p.SalePrice,
        p.AdminPrice,
      ]
    );
  }

  await connection.end();
};

// ✅ Create invoice
export const addInvoice = async (headerId, userId, total, received) => {
  const connection = await db();
  const { v4: uuidv4 } = await import("uuid");

  const invoiceNo = `INV-${uuidv4().split("-")[0]}`;
  const invoiceDate = new Date().toISOString().split("T")[0];

  await connection.execute(
    `INSERT INTO invoice
     (booking_header_id, user_id, invoice_no, invoice_date, total, received)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [headerId, userId, invoiceNo, invoiceDate, total, received]
  );

  await connection.end();
};

// ✅ Fetch all bookings
export const getAllBookings = async () => {
  const connection = await db();
  const [rows] = await connection.execute(
    `SELECT bh.*, u.name AS user_name
     FROM booking_header bh
     LEFT JOIN users u ON u.id = bh.user_id
     ORDER BY bh.created_at DESC`
  );
  await connection.end();
  return rows;
};


export const getBookingById = async (id) => {
  const connection = await db();

  try {
    // Booking header
    const [headerRows] = await connection.execute(
      `SELECT bh.*, u.name AS user_name
       FROM booking_header bh
       LEFT JOIN users u ON u.id = bh.user_id
       WHERE bh.id = ?`,
      [id]
    );

    if ((headerRows).length === 0) return null;

    const bookingHeader = (headerRows)[0];

    // Booking details
    const [detailRows] = await connection.execute(
      `SELECT * FROM booking_details WHERE booking_header_id = ?`,
      [id]
    );

    bookingHeader.details = detailRows;

    return bookingHeader;
  } finally {
    await connection.end();
  }
};