// import express from "express";
// import CallbackRequest from "../models/CallbackRequest.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const newCallbackRequest = new CallbackRequest(req.body);
//     await newCallbackRequest.save();
//     res.status(200).json({ message: "Callback request saved successfully" });
//   } catch (error) {
//     console.log("Error saving callback request:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;


import express from "express";
import {
  addCallbackRequest,
  getCallbackRequests,
} from "../models/CallbackRequest.js";

const router = express.Router();

// ✅ POST - Save callback request
router.post("/callback-request", (req, res) => {
  addCallbackRequest(req.body, (err, result) => {
    if (err) {
      console.error("Error saving callback request:", err);
      return res.status(500).json({ message: "Error saving callback request" });
    }
    res.status(200).json({ message: "Callback request saved successfully" });
  });
});

// ✅ GET - Get all callback requests
router.get("/callback-requests", (req, res) => {
  getCallbackRequests((err, rows) => {
    if (err) {
      console.error("Error fetching callback requests:", err);
      return res
        .status(500)
        .json({ message: "Error fetching callback requests" });
    }
    res.status(200).json(rows);
  });
});

export default router;
