import express from "express";
import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import { protect } from "../middleware/authMiddleware.js"; // ensures user is logged in

const router = express.Router();

router.post("/", protect, async (req, res) => {
    try {
        const { bookingId, packageId, guideId, selectedActivities, amount } = req.body;

        // 1. Save payment
        const newPayment = new Payment({
            user: req.user._id,
            guide: guideId,
            package: packageId,
            booking: bookingId,
            selectedActivities,
            amount,
            status: "paid",
        });

        const savedPayment = await newPayment.save();

        // 2. Update booking status using bookingId
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { $set: { status: "paid" } },
            { new: true }
        )
            .populate("packageId", "title price")
            .populate("userId", "fullName email");

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(201).json({
            message: "Payment successful, booking updated",
            payment: savedPayment,
            booking: updatedBooking,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create payment" });
    }
});


// User: see only their payments
router.get("/my", protect, async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user._id })
            .populate("package", "title price")
            .populate("user", "fullName email");
        res.json(payments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch payments" });
    }
});

// GET /api/payments/booking/:bookingId
// Get payment by booking ID (authenticated users only)
router.get("/booking/:bookingId", protect, async (req, res) => {
    try {
        const payment = await Payment.findOne({
            booking: req.params.bookingId, // Make sure your Payment schema uses "booking", not "bookingId"
            user: req.user._id             // Only allow the user to access their own payment
        })
            .populate("package", "title price")
            .populate("user", "fullName email")
            .populate("booking", "status"); // Use "booking" if that is the field in your schema

        if (!payment) {
            return res.status(404).json({ message: "Payment not found for this booking" });
        }

        res.json(payment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch payment details" });
    }
});


// Admin: see all payments
router.get("/all", protect, async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate("package", "title price")
            .populate("user", "fullName email")
            .populate("guide", "fullName email");

        res.json(payments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch payments" });
    }
});


export default router;
