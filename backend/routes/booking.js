import express from "express";
import {
  getUserBookings,
  createBooking,
  updateBookingStatus,
  getBookingById,
  getGuideBookings
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create a booking (user)
router.post("/", protect, createBooking);

// ✅ Guide updates booking status
router.patch("/:id/status", protect, updateBookingStatus);

// ✅ Get all bookings for a specific user
router.get("/user/:userId", protect, getUserBookings);

// ✅ Get booking by ID
router.get("/:id", protect, getBookingById);
// ✅ Get all bookings for a specific guide
router.get("/guide/:guideId", protect, getGuideBookings);
export default router;
