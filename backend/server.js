// server.js - Enhanced with connection monitoring
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import adminRoutes from "./routes/admin.js";
import guideRoutes from "./routes/guide.js";
import bookingRoutes from "./routes/booking.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

// ✅ Connect to DB with better error handling
connectDB();

// Monitor MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.log('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ✅ Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/packages", packageRoutes);
app.use("/admin", adminRoutes);
app.use("/guides", guideRoutes);
app.use("/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.post("/api/reviews", (req, res) => {
  console.log("📩 Incoming Review:", req.body);
  res.status(201).json({ success: true, review: req.body });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
