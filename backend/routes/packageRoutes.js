import express from "express";
import {
    getPackages,
    getPackageById,
    addPackage,
    updatePackage,
    deletePackage,
} from "../controllers/packageController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.get("/", getPackages);             // Get all packages
router.get("/:id", getPackageById);      // Get single package

// Admin routes
router.post("/", protect, authorizeRoles("admin"), addPackage);
router.put("/:id", protect, authorizeRoles("admin"), updatePackage);  // Edit package
router.delete("/:id", protect, authorizeRoles("admin"), deletePackage);

export default router;
