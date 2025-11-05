// import express from "express";
// import axios from "axios";
// import { insertAirport } from "../models/Airport.js";

// const router = express.Router();

// // 🔑 Temporary Amadeus Access Token (expires every ~30 min)
// const ACCESS_TOKEN = "EehkuMwPlAHjdwOwtY84YKovlwlv";

// router.get("/fetch-all", async (req, res) => {
//   try {
//     const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
//     let totalSaved = 0;

//     for (const letter of letters) {
//       console.log(`Fetching airports for: ${letter}`);

//       const response = await axios.get(
//         "https://test.api.amadeus.com/v1/reference-data/locations",
//         {
//           params: { subType: "AIRPORT", keyword: letter },
//           headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
//         }
//       );

//       const airports = response.data?.data || [];

//       for (const a of airports) {
//         await insertAirport({
//           keyword: letter,
//           airport_code: a.iataCode || null,
//           airport_name: a.name || null,
//           city: a.address?.cityName || null,
//           country: a.address?.countryName || null,
//         });
//         totalSaved++;
//       }

//       console.log(`✅ Saved ${airports.length} airports for letter ${letter}`);
//       await new Promise((r) => setTimeout(r, 2000)); // avoid rate limit
//     }

//     res.status(200).json({
//       message: "All airports fetched and saved successfully.",
//       totalSaved,
//     });
//   } catch (error) {
//     console.error("❌ Error:", error.message);
//     res.status(500).json({ message: "Failed to fetch or save airports." });
//   }
// });

// export default router;

// routes/airports.js
import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import db from "../config/db.js";

dotenv.config();
const router = express.Router();

// GET /api/airports
router.get("/airports", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM airports ORDER BY created_at DESC"
    );

    // rows will be [] if no records — return 200 with array
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching airports:", err);
    return res.status(500).json({ message: "Error fetching airports" });
  }
});

export default router;
