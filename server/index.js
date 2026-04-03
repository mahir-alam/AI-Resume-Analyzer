// Why separate routes and controllers?
// To keep the code modular, scalable, and maintainable.
// Controllers handle the business logic of the application and process requests.
// Routes define API endpoints and map them to controller functions.

// Why separate routes and controllers?
// To keep the code modular, scalable, and maintainable.
// Controllers handle the business logic of the application and process requests.
// Routes define API endpoints and map them to controller functions.

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import messageRoutes from "./routes/messageRoutes.js";
import analyzerRoutes from "./routes/analyzerRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
  });
});

app.use("/api/message", messageRoutes);
app.use("/api/analyzer", analyzerRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});