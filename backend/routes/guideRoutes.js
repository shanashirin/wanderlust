import express from "express";
import { getGuides, addGuide, deleteGuide } from "../controllers/guideController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public: get all guides
router.get("/", getGuides);

// ✅ Admin only: add or delete guide
router.post("/", protect, adminOnly, addGuide);
router.delete("/:id", protect, adminOnly, deleteGuide);

export default router;
