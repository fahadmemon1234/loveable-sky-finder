import express from "express";
import Inquiry from "../models/Inquiry.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newInquiry = new Inquiry(req.body);
    await newInquiry.save();
    res.status(200).json({ message: "Inquiry saved successfully" });
  } catch (error) {
    console.error("Error saving inquiry:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
