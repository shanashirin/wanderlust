import { GuideReview, PlaceReview, SiteReview } from "../models/Review.js";

// Submit a review
export const createReview = async (req, res) => {
    try {
        const { type, userId, guideId, place, comment, rating } = req.body;

        if (!type || !userId || !comment || !rating) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let review;
        switch (type) {
            case "guide":
                if (!guideId) return res.status(400).json({ message: "Guide ID required" });
                review = await GuideReview.create({ userId, guideId, comment, rating });
                break;
            case "place":
                if (!place) return res.status(400).json({ message: "Place required" });
                review = await PlaceReview.create({ userId, place, comment, rating });
                break;
            case "site":
                review = await SiteReview.create({ userId, comment, rating });
                break;
            default:
                return res.status(400).json({ message: "Invalid review type" });
        }

        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Guide: Get reviews for a specific guide
export const getGuideReviews = async (req, res) => {
    try {
        const reviews = await GuideReview.find({ guideId: req.params.guideId })
            .populate("userId", "fullName email")
            .populate("guideId", "fullName email");
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Admin: Get all reviews by type
export const getReviewsByType = async (req, res) => {
    try {
        const { type } = req.query; // guide | place | site
        if (!type) return res.status(400).json({ message: "Type query required" });

        let reviews;
        switch (type) {
            case "guide":
                reviews = await GuideReview.find()
                    .populate("userId", "fullName email")
                    .populate("guideId", "fullName email");
                break;
            case "place":
                reviews = await PlaceReview.find().populate("userId", "fullName email");
                break;
            case "site":
                reviews = await SiteReview.find().populate("userId", "fullName email");
                break;
            default:
                return res.status(400).json({ message: "Invalid type" });
        }

        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
