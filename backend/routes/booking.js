// routes/booking.js
import express from "express";
import Booking from "../models/Booking.js";
const router = express.Router();

// User creates booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Guide updates booking status
router.patch("/:id/status", async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  booking.status = req.body.status;
  await booking.save();
  res.json(booking);
});

export default router;
