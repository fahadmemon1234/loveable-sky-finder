import express from "express";
import db from "../config/db.js";
import {
  addBookingHeader,
  addBookingDetails,
  addInvoice,
  getAllBookings,
} from "../models/booking.js";

const router = express.Router();

// ✅ Fetch all airports
router.get("/bookings", async (req, res) => {
  try {
    const rows = await getAllBookings();
    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Error fetching booking:", err.message);
    res.status(500).json({ message: "Error fetching booking" });
  }
});

router.get("/", async (req, res) => {
  const { search, mode } = req.query;

  try {
    const connection = await db();
    let query = "SELECT * FROM airlines ORDER BY airline_name ASC";
    let params = [];

    if (mode === "search" && search && search.toString().trim().length >= 1) {
      query =
        "SELECT * FROM airlines WHERE airline_name LIKE ? OR airline_code LIKE ? ORDER BY airline_name ASC";
      params = [`%${search}%`, `%${search}%`];
    }

    const [rows] = await connection.execute(query, params);
    await connection.end();

    // Remove duplicates by airline_code
    const uniqueAirlines = [];
    const seenCodes = new Set();

    for (const airline of rows) {
      if (!seenCodes.has(airline.airline_code)) {
        seenCodes.add(airline.airline_code);
        uniqueAirlines.push(airline);
      }
    }

    res.status(200).json({ success: true, airlines: uniqueAirlines });
  } catch (err) {
    console.error("❌ Error fetching airlines:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/add-booking", async (req, res) => {
  try {
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
      Total,
      PayableToSupplier,
      ReceivedAmount,
      RemainingProfit,
      PassengerDetails,
    } = req.body;

    // 1️⃣ Booking header
    const headerId = await addBookingHeader({
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
      Total,
      PayableToSupplier,
      ReceivedAmount,
      RemainingProfit,
    });

    // 2️⃣ Booking details
    await addBookingDetails(headerId, PassengerDetails);

    // 3️⃣ Invoice
    await addInvoice(headerId, user_id, Total, ReceivedAmount);

    res.status(200).json({ message: "Booking created successfully!" });
  } catch (error) {
    console.error("❌ Error creating booking:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
