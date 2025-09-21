import express from "express";
import Payment from "../models/Payment.js";
import { protect } from "../middleware/authMiddleware.js"; // ensures user is logged in

const router = express.Router();

router.post("/", protect, async (req, res) => {
    try {
        const { packageId, selectedActivities, amount } = req.body;

        const newPayment = new Payment({
            user: req.user._id,
            package: packageId,
            selectedActivities,
            amount,
            status: "paid",
        });

        const saved = await newPayment.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create payment" });
    }
});

router.get("/", protect, async (req, res) => {
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

export default router;
