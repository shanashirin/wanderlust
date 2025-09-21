import express from "express";
import { getPackages, addPackage, deletePackage, getPackageById } from "../controllers/packageController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// User route
router.get("/", getPackages);
router.get("/:id", getPackageById); // ✅ fetch single package

// Admin routes
router.post("/", protect, authorizeRoles("admin"), addPackage);
router.delete("/:id", protect, authorizeRoles("admin"), deletePackage);

export default router;
