import express from "express";
import axios from "axios";
import { insertAirport, findAirportByCode } from "../models/airport.js";
import db from "../config/db.js";

const router = express.Router();

// Pause between API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

router.post("/fetch-all", async (req, res) => {
  try {
    const token = "zmAStT1fXPGRwClR2Qv857zm7UaC";
    const apiUrl = "https://test.api.amadeus.com/v1/reference-data/locations";

    const alphabet = "YZ".split("");
    let totalInserted = 0;
    let skipped = 0;

    for (const letter of alphabet) {
      console.log(`Fetching airports for letter: ${letter}`);

      const response = await axios.get(apiUrl, {
        params: {
          subType: "AIRPORT",
          keyword: letter,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const airports = response.data?.data || [];

      for (const a of airports) {
        const airportData = {
          keyword: letter,
          airport_code: a.iataCode || "",
          airport_name: a.name || "",
          city: a.address?.cityName || "",
          country: a.address?.countryName || "",
        };

        // ✅ Check if airport already exists
        const exists = await findAirportByCode(airportData.airport_code);
        if (exists) {
          skipped++;
          continue; // skip insert
        }

        try {
          await insertAirport(airportData);
          totalInserted++;
        } catch (err) {
          console.error("❌ Insert error:", err.message);
        }
      }

      // wait 1.5 seconds before next letter
      await delay(1500);
    }

    res.json({
      success: true,
      message: "✅ Airport data fetched and inserted successfully.",
      totalInserted,
      skipped,
    });
  } catch (error) {
    console.error("Error fetching airports:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch or insert airports",
    });
  }
});

router.get("/", async (req, res) => {
  const { search, mode } = req.query;

  try {
    const connection = await db();
    let query = "SELECT * FROM airports ORDER BY created_at DESC";
    let params = [];

    if (mode === "search" && search && search.trim().length >= 1) {
      query =
        "SELECT * FROM airports WHERE airport_name LIKE ? OR airport_code LIKE ? ORDER BY created_at DESC";
      params = [`%${search}%`, `%${search}%`];
    }

    // If mode === "all" or undefined, query will return all airports

    const [rows] = await connection.execute(query, params);
    await connection.end();

    res.status(200).json({ success: true, airports: rows });
  } catch (err) {
    console.error("❌ Error fetching airports:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
