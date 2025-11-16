import express from "express";
import { getallBooking } from "../models/booking.js";

const router = express.Router();

// ✅ Fetch all airports
router.get("/bookings", async (req, res) => {
    try {
        const rows = await getallBooking();
        res.status(200).json(rows);
    } catch (err) {
        console.error("❌ Error fetching booking:", err.message);
        res.status(500).json({ message: "Error fetching booking" });
    }
});

export default router;