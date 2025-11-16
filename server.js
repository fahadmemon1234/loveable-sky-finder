// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import db from "./config/db.js";
// import cookieParser from "cookie-parser";

// // Routes
// import inquiryRoutes from "./routes/inquiryRoutes.js";
// import EnquiryRoutes from "./routes/EnquiryRoutes.js";
// import CallbackRequestRoutes from "./routes/CallbackRequestRoutes.js";
// import SubscribeRoutes from "./routes/SubscribeRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

// dotenv.config();

// const app = express();
// app.use(
//   cors({
//     origin: [
//       "https://sky-nova-travels-admin.vercel.app",
//       "https://skynovatravels.co.uk",
//       "http://localhost:3000",
//       "http://localhost:8080",
//     ],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(cors({ origin: "*", methods: ["GET","POST","PUT","DELETE","OPTIONS"] }));


// app.use(express.json());
// app.use(cookieParser());

// // ✅ Connect to SQL Server
// db();

// // API Routes
// app.use("/api", CallbackRequestRoutes);
// app.use("/api", EnquiryRoutes);
// app.use("/api", inquiryRoutes);
// app.use("/api", SubscribeRoutes);
// app.use("/api", userRoutes);

// // Default route
// // app.get("/", (req, res) => {
// //   res.send("🚀 Server is running using MySQL Workbench Database!");
// // });

// app.get("/", (req, res) => {
//   res.send(
//     "🚀 Backend deployed successfully with frontend https://skynovatravels.co.uk"
//   );
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


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
import airportRoutes from "./routes/airportRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

// ✅ Correct CORS setup for credentials
const allowedOrigins = [
  "https://sky-nova-travels-admin.vercel.app",
  "https://skynovatravels.co.uk",
  "http://localhost:3000",
  "http://localhost:8080",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like Postman
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // important for cookies/session
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Connect to SQL Server
db();


app.use("/api/airports", airportRoutes);

// API Routes
app.use("/api", bookingRoutes);
app.use("/api", CallbackRequestRoutes);
app.use("/api", EnquiryRoutes);
app.use("/api", inquiryRoutes);
app.use("/api", SubscribeRoutes);
app.use("/api", userRoutes);




app.get("/", (req, res) => {
  res.send(
    "🚀 Backend deployed successfully with frontend https://skynovatravels.co.uk"
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
