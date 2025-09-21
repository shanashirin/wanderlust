// routes/admin.js
import express from "express";
import Itinerary from "../models/itinerary.js";
const router = express.Router();

// Add itinerary
router.post("/itinerary", async (req, res) => {
  try {
    const itinerary = new Itinerary(req.body);
    await itinerary.save();
    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all itineraries
router.get("/itineraries", async (req, res) => {
  const itineraries = await Itinerary.find();
  res.json(itineraries);
});

export default router;
