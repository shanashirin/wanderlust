import express from "express";
import { getUsers, deleteUser, getAllGuides, deleteGuide, getAllPackages, deletePackageByAdmin } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Users
router.get("/users", protect, adminOnly, getUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);

// Guides
router.get("/guides", protect, adminOnly, getAllGuides);
router.delete("/guides/:id", protect, adminOnly, deleteGuide);

// Packages
router.get("/packages", protect, adminOnly, getAllPackages);
router.delete("/packages/:id", protect, adminOnly, deletePackageByAdmin);

export default router;
