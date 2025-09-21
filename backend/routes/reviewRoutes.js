import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createReview,
  getGuideReviews,
  getReviewsByType,
} from "../controllers/reviewController.js";

const router = express.Router();

// Create a review (logged-in users only)
router.post("/", protect, createReview);

// Admin: Get all reviews by type
router.get("/", protect, getReviewsByType);

// Guide: Get reviews for a specific guide
router.get("/guides/:guideId", protect, getGuideReviews);

export default router;
