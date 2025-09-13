import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Any logged-in user
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// Only guides
router.get("/guide-dashboard", protect, authorizeRoles("guide"), (req, res) => {
  res.json({ message: "Welcome Guide!" });
});

// Only admins
router.get("/admin-dashboard", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

export default router;
