import express from "express";
import Subscribe from "../models/Subscribe.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newSubscribe = new Subscribe(req.body);
    await newSubscribe.save();
    res.status(200).json({ message: "Subscribe saved successfully" });
  } catch (error) {
    console.log("Error saving subscribe:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
