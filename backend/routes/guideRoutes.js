import express from "express";
import { getGuides, addGuide } from "../controllers/guideController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getGuides);
router.post("/", protect, adminOnly, addGuide);

export default router;
