import express from "express";
import CallbackRequest from "../models/CallbackRequest.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newCallbackRequest = new CallbackRequest(req.body);
    await newCallbackRequest.save();
    res.status(200).json({ message: "Callback request saved successfully" });
  } catch (error) {
    console.error("Error saving callback request:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
