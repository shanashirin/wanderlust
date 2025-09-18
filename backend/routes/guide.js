// routes/guide.js
import express from "express";
import Guide from "../models/Guide.js";
const router = express.Router();

// Create / Update guide profile
router.post("/", async (req, res) => {
  try {
    const guide = new Guide(req.body);
    await guide.save();
    res.json(guide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle availability
router.patch("/:id/availability", async (req, res) => {
  const guide = await Guide.findById(req.params.id);
  guide.availability = !guide.availability;
  await guide.save();
  res.json(guide);
});

// Get all guides
router.get("/", async (req, res) => {
  const guides = await Guide.find();
  res.json(guides);
});

export default router;
