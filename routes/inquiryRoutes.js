// import express from "express";
// import { addInquiry, getInquiries } from "../models/Inquiry.js";

// const router = express.Router();

// // ✅ POST /api/inquiry - Add new inquiry
// router.post("/inquiry", async (req, res) => {
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
//   } = req.body;

//   // ✅ Validation
//   if (!from || !to || !departDate || !name || !email || !phone) {
//     return res.status(400).json({ message: "Please fill all required fields" });
//   }

//   try {
//     const result = await addInquiry(req.body);
//     res.status(200).json(result); // { message: "Inquiry added successfully" }
//   } catch (err) {
//     console.error("Error saving inquiry:", err);
//     res.status(500).json({ message: "Error saving inquiry" });
//   }
// });

// // ✅ GET /api/inquiries - Fetch all inquiries
// router.get("/inquiries", async (req, res) => {
//   try {
//     const inquiries = await getInquiries();
//     res.status(200).json(inquiries);
//   } catch (err) {
//     console.error("Error fetching inquiries:", err);
//     res.status(500).json({ message: "Error fetching inquiries" });
//   }
// });

// export default router;

// ---------------------------------------------------------

import express from "express";
import { addInquiry, getInquiries } from "../models/Inquiry.js";

const router = express.Router();

// ✅ POST /api/inquiry - Add new inquiry
router.post("/inquiry", async (req, res) => {
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

  try {
    const result = await addInquiry(req.body);
    res.status(200).json(result); // { message: "Inquiry added successfully" }
  } catch (err) {
    console.error("❌ Error saving inquiry:", err);
    res.status(500).json({ message: "Error saving inquiry" });
  }
});

// ✅ GET /api/inquiries - Fetch all inquiries
router.get("/inquiries", async (req, res) => {
  try {
    const inquiries = await getInquiries();
    res.status(200).json(inquiries);
  } catch (err) {
    console.error("❌ Error fetching inquiries:", err);
    res.status(500).json({ message: "Error fetching inquiries" });
  }
});

export default router;
