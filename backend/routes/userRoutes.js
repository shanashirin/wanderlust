import express from "express";
import User from "../models/User.js"
import { registerUser, loginUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);

// ✅ Update user profile
router.put("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Update fields
    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.place = req.body.place || user.place;

    const updatedUser = await user.save();

    // ✅ Send JSON response
    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      place: updatedUser.place,
      token: generateToken(updatedUser._id), // keep token from middleware
    });
  } catch (error) {
    console.error("❌ Error updating user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
