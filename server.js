import express from "express";
// import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";

// Routes
import inquiryRoutes from "./routes/inquiryRoutes.js";
import EnquiryRoutes from "./routes/EnquiryRoutes.js";
import CallbackRequestRoutes from "./routes/CallbackRequestRoutes.js";
import SubscribeRoutes from "./routes/SubscribeRoutes.js";

import userRoutes from "./routes/userRoutes.js"; // ✅ Add user routes
import airportRoutes from "./routes/airportRoutes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    credentials: true,
  })
);
app.use(express.json());

// API Routes


app.use("/api", CallbackRequestRoutes);
app.use("/api", EnquiryRoutes);
app.use("/api", inquiryRoutes);
app.use("/api", SubscribeRoutes);
app.use("/api", userRoutes);
app.use("/api", airportRoutes);

// app.use("/api/airports", airportRoutes);

// MongoDB connection
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.log("❌ DB connection failed:", err));

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Server is running using MySQL Database!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
