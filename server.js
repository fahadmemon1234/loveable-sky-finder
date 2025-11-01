import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import EnquiryRoutes from "./routes/EnquiryRoutes.js";
import CallbackRequestRoutes from "./routes/CallbackRequestRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/enquiry", EnquiryRoutes);
app.use("/api/requestcallback", CallbackRequestRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB connection failed:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
