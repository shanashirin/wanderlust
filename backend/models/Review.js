import mongoose from "mongoose";

// Guide Review
const guideReviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  guideId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Place Review
const placeReviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  place: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Site Review
const siteReviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

export const GuideReview = mongoose.model("GuideReview", guideReviewSchema);
export const PlaceReview = mongoose.model("PlaceReview", placeReviewSchema);
export const SiteReview = mongoose.model("SiteReview", siteReviewSchema);
