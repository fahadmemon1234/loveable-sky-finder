// import express from "express";
// import Subscribe from "../models/Subscribe.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const newSubscribe = new Subscribe(req.body);
//     await newSubscribe.save();
//     res.status(200).json({ message: "Subscribe saved successfully" });
//   } catch (error) {
//     console.log("Error saving subscribe:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;


// routes/subscribe.js
import express from "express";
import db from "../config/db.js";
import { addSubscriber, getSubscribers } from "../models/Subscribe.js"; // ✅ correct import

const router = express.Router();

router.post("/subscribe", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // ✅ Step 1: Check if email already exists
  const checkQuery = "SELECT * FROM subscribe WHERE email = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      // ✅ Already subscribed
      return res.status(400).json({ message: "You have already subscribed." });
    }

    // ✅ Step 2: Insert new subscriber if not found
    addSubscriber(email, (insertErr) => {
      if (insertErr) {
        console.error("Error inserting email:", insertErr);
        return res.status(500).json({ message: "Error subscribing" });
      }

      res.status(200).json({ message: "You have successfully subscribed." });
    });
  });
});

// ✅ Get all subscribers
router.get("/subscribers", (req, res) => {
  getSubscribers((err, rows) => {
    if (err) {
      console.error("Error fetching subscribers:", err);
      return res.status(500).json({ message: "Error fetching data" });
    }

    res.status(200).json(rows);
  });
});

export default router;