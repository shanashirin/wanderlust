import mongoose from "mongoose";

// Base schema options
const baseOptions = {
  timestamps: true,
};

// Guide Review
const guideReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guideId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, baseOptions);

// Place Review
const placeReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  place: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, baseOptions);

// Site Review
const siteReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, baseOptions);

export const GuideReview = mongoose.model("GuideReview", guideReviewSchema);
export const PlaceReview = mongoose.model("PlaceReview", placeReviewSchema);
export const SiteReview = mongoose.model("SiteReview", siteReviewSchema);
