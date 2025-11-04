// import express from "express";
// import Inquiry from "../models/Inquiry.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const newInquiry = new Inquiry(req.body);
//     await newInquiry.save();
//     res.status(200).json({ message: "Inquiry saved successfully" });
//   } catch (error) {
//     console.log("Error saving inquiry:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;


import express from "express";
import { addInquiry, getInquiries } from "../models/Inquiry.js";

const router = express.Router();

// ✅ POST /api/inquiry - Add new inquiry
router.post("/inquiry", (req, res) => {
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
  } = req.body;

  // ✅ Validation
  if (!from || !to || !departDate || !name || !email || !phone) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  addInquiry(req.body, (err, result) => {
    if (err) {
      console.error("Error saving inquiry:", err);
      return res.status(500).json({ message: "Error saving inquiry" });
    }
    // ✅ Use 200 to match your frontend
    res.status(200).json({ message: "Inquiry saved successfully" });
  });
});

// ✅ GET /api/inquiries - Fetch all inquiries
router.get("/inquiries", (req, res) => {
  getInquiries((err, rows) => {
    if (err) {
      console.error("Error fetching inquiries:", err);
      return res.status(500).json({ message: "Error fetching inquiries" });
    }
    res.status(200).json(rows);
  });
});

export default router;