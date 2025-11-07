// import express from "express";
// import {
//   addCallbackRequest,
//   getCallbackRequests,
// } from "../models/CallbackRequest.js";

// const router = express.Router();

// // ✅ POST - Save callback request
// router.post("/callback-request", async (req, res) => {
//   try {
//     const result = await addCallbackRequest(req.body);
//     res.status(200).json(result); // { message: "Callback request added successfully" }
//   } catch (err) {
//     console.error("Error saving callback request:", err);
//     res.status(500).json({ message: "Error saving callback request" });
//   }
// });

// // ✅ GET - Get all callback requests
// router.get("/callback-requests", async (req, res) => {
//   try {
//     const rows = await getCallbackRequests();
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error("Error fetching callback requests:", err);
//     res.status(500).json({ message: "Error fetching callback requests" });
//   }
// });

// export default router;



// -------------------------------------------------------------


import express from "express";
import {
  addCallbackRequest,
  getCallbackRequests,
} from "../models/CallbackRequest.js";

const router = express.Router();

// ✅ POST - Save callback request
router.post("/callback-request", async (req, res) => {
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
  } = req.body;

  // ✅ Basic validation
  if (!fullName || !phone || !email) {
    return res
      .status(400)
      .json({ message: "Please provide name, phone, and email" });
  }

  try {
    const result = await addCallbackRequest(req.body);
    res.status(200).json(result); // { message: "Callback request added successfully" }
  } catch (err) {
    console.error("❌ Error saving callback request:", err);
    res.status(500).json({ message: "Error saving callback request" });
  }
});

// ✅ GET - Get all callback requests
router.get("/callback-requests", async (req, res) => {
  try {
    const rows = await getCallbackRequests();
    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Error fetching callback requests:", err);
    res.status(500).json({ message: "Error fetching callback requests" });
  }
});

export default router;
