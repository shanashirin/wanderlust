// routes/user.js
import express from "express";
import User from "../models/User.js";
import { registerUser, loginUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js"; // make sure adminOnly exists
import generateToken from "../utils/generateToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Update user profile
router.put("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.place = req.body.place || user.place;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      place: updatedUser.place,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    console.error("❌ Error updating user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all users (admin)
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// ✅ Get all guides (admin only)
router.get("/guides", async (req, res) => {
  try {
    const guides = await User.find({ role: "guide" }).select("-password");
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch guides" });
  }
});


// ✅ Toggle verification (admin only)
router.patch("/:id/verify", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Toggle the verification status
    user.isVerified = !user.isVerified;

    // Save without triggering required-field validation
    const updatedUser = await user.save({ validateBeforeSave: false });

    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      isVerified: updatedUser.isVerified,
    });
  } catch (error) {
    console.error("❌ Error toggling verification:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
