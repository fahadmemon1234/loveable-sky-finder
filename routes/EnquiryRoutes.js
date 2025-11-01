import express from "express";
import Enquiry from "../models/Enquiry.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newInquiry = new Enquiry(req.body);
    await newInquiry.save();
    res.status(200).json({ message: "Enquiry saved successfully" });
  } catch (error) {
    console.error("Error saving Enquiry:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
