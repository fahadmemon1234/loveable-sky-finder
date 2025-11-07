// import express from "express";
// import { addEnquiry, getEnquiries } from "../models/Enquiry.js";

// const router = express.Router();

// // ✅ Save a new enquiry
// router.post("/enquiry", async (req, res) => {
//   try {
//     const result = await addEnquiry(req.body);
//     res.status(200).json(result); // { message: "Enquiry added successfully" }
//   } catch (err) {
//     console.error("❌ Error saving enquiry:", err);
//     res.status(500).json({ message: "Error saving enquiry" });
//   }
// });

// // ✅ Get all enquiries
// router.get("/enquiries", async (req, res) => {
//   try {
//     const rows = await getEnquiries();
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error("❌ Error fetching enquiries:", err);
//     res.status(500).json({ message: "Error fetching enquiries" });
//   }
// });

// export default router;


// -----------------------------------------------


import express from "express";
import { addEnquiry, getEnquiries } from "../models/Enquiry.js";

const router = express.Router();

// ✅ Save a new enquiry
router.post("/enquiry", async (req, res) => {
  const { firstName, lastName, email, phone, enquiryType, message } = req.body;

  // ✅ Basic validation
  if (!firstName || !email || !phone || !message) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const result = await addEnquiry(req.body);
    res.status(200).json(result); // { message: "Enquiry added successfully" }
  } catch (err) {
    console.error("❌ Error saving enquiry:", err);
    res.status(500).json({ message: "Error saving enquiry" });
  }
});

// ✅ Get all enquiries
router.get("/enquiries", async (req, res) => {
  try {
    const rows = await getEnquiries();
    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Error fetching enquiries:", err);
    res.status(500).json({ message: "Error fetching enquiries" });
  }
});

export default router;
