import express from "express";
import { GuideReview, PlaceReview, SiteReview } from "../models/Review.js";

const router = express.Router();

// ➡️ Submit a review
router.post("/", async (req, res) => {
  try {
    const { type, user, guideId, place, comment, rating } = req.body;
    let review;

    if (type === "guide") {
      review = await GuideReview.create({ user, guideId, comment, rating });
    } else if (type === "place") {
      review = await PlaceReview.create({ user, place, comment, rating });
    } else if (type === "site") {
      review = await SiteReview.create({ user, comment, rating });
    } else {
      return res.status(400).json({ message: "Invalid review type" });
    }

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➡️ Get reviews
router.get("/guides/:guideId", async (req, res) => {
  const reviews = await GuideReview.find({ guideId: req.params.guideId });
  res.json(reviews);
});

router.get("/places/:place", async (req, res) => {
  const reviews = await PlaceReview.find({ place: req.params.place });
  res.json(reviews);
});

router.get("/site", async (req, res) => {
  const reviews = await SiteReview.find();
  res.json(reviews);
});

export default router;
