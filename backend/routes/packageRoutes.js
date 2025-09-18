import express from "express";
import { getPackages, addPackage, deletePackage } from "../controllers/packageController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// User route
router.get("/", getPackages);

// Admin routes
router.post("/", protect, authorizeRoles("admin"), addPackage);
router.delete("/:id", protect, authorizeRoles("admin"), deletePackage);

export default router;
