import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import cookieParser from "cookie-parser";

// Routes
import inquiryRoutes from "./routes/inquiryRoutes.js";
import EnquiryRoutes from "./routes/EnquiryRoutes.js";
import CallbackRequestRoutes from "./routes/CallbackRequestRoutes.js";
import SubscribeRoutes from "./routes/SubscribeRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "https://skynovatravels.co.uk",
      "https://sky-nova-travels-admin.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ✅ Connect to SQL Server
db();

// API Routes
app.use("/api", CallbackRequestRoutes);
app.use("/api", EnquiryRoutes);
app.use("/api", inquiryRoutes);
app.use("/api", SubscribeRoutes);
app.use("/api", userRoutes);


// Default route
// app.get("/", (req, res) => {
//   res.send("🚀 Server is running using MySQL Workbench Database!");
// });

app.get("/", (req, res) => {
  res.send("🚀 Backend deployed successfully with frontend https://skynovatravels.co.uk");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

