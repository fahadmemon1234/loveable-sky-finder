// import express from "express";
// import Enquiry from "../models/Enquiry.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const newInquiry = new Enquiry(req.body);
//     await newInquiry.save();
//     res.status(200).json({ message: "Enquiry saved successfully" });
//   } catch (error) {
//     console.log("Error saving Enquiry:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;


import express from "express";
import { addEnquiry, getEnquiries } from "../models/Enquiry.js";

const router = express.Router();

// ✅ Save a new enquiry
router.post("/enquiry", (req, res) => {
  addEnquiry(req.body, (err, result) => {
    if (err) {
      console.error("Error saving enquiry:", err);
      return res.status(500).json({ message: "Error saving enquiry" });
    }
    res.status(200).json({ message: "Enquiry saved successfully" });
  });
});

// ✅ Get all enquiries
router.get("/enquiries", (req, res) => {
  getEnquiries((err, rows) => {
    if (err) {
      console.error("Error fetching enquiries:", err);
      return res.status(500).json({ message: "Error fetching enquiries" });
    }
    res.status(200).json(rows);
  });
});

export default router;