import express from "express";
import { getallBooking } from "../models/booking.js";
import axios from "axios";
import db from "../config/db.js";

const router = express.Router();

// ✅ Fetch all airports
router.get("/bookings", async (req, res) => {
    try {
        const rows = await getallBooking();
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

export default router;