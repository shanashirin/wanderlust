import express from "express";
import { getPackages, addPackage, updatePackage, deletePackage } from "../controllers/packageController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPackages);
router.post("/", protect, adminOnly, addPackage);
router.put("/:id", protect, adminOnly, updatePackage);
router.delete("/:id", protect, adminOnly, deletePackage);

export default router;
