import express from "express";
import { addSubscriber, getSubscribers } from "../models/Subscribe.js";
import db from "../config/db.js";

const router = express.Router();

// ✅ POST: Add new subscriber
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const pool = await db();
    // ✅ Step 1: Check if email already exists
    const checkResult = await pool
      .request()
      .input("email", email)
      .query("SELECT * FROM subscribe WHERE email = @email");

    if (checkResult.recordset.length > 0) {
      return res.status(400).json({ message: "You have already subscribed." });
    }

    // ✅ Step 2: Insert new subscriber
    await addSubscriber(email, (err) => {
      if (err) {
        console.error("Error inserting email:", err);
        return res.status(500).json({ message: "Error subscribing" });
      }
      res.status(200).json({ message: "You have successfully subscribed." });
    });
  } catch (err) {
    console.error("Error in /subscribe route:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ GET: All subscribers
router.get("/subscribers", async (req, res) => {
  try {
    await getSubscribers((err, rows) => {
      if (err) {
        console.error("Error fetching subscribers:", err);
        return res.status(500).json({ message: "Error fetching data" });
      }
      res.status(200).json(rows);
    });
  } catch (err) {
    console.error("Error in /subscribers route:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
