import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });


// ✅ Register
export const registerUser = async (req, res) => {
  try {
    console.log("📥 Incoming body:", req.body);

    const { fullName, email, password, role, phone, place } = req.body;

    // 🔹 Validate inputs
    if (!fullName) {
      return res.status(400).json({ message: "Full name is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (!phone) {
      return res.status(400).json({ message: "Phone is required" });
    }
    if (!place) {
      return res.status(400).json({ message: "Place is required" });
    }

    // 🔹 Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔹 Hash password safely
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Create user
    const user = await User.create({
      fullName,
      email,
      phone,     // ✅ added
      place,     // ✅ added
      password: hashedPassword,
      role: role || "user", // default role if not provided
    });

    // 🔹 Return response (no password in response)
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,   // ✅ added
      place: user.place,   // ✅ added
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ message: error.message });
  }
};


// ✅ Login
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log("📥 Login body:", req.body);

    const user = await User.findOne({ email, role }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or role" });
    }

    if (!password || !user.password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,   // ✅ return phone here too
      place: user.place,   // ✅ return place here too
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: error.message });
  }
};


// ✅ Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    console.log("🔍 Update request details:");
    console.log("  - User ID from params:", userId);
    console.log("  - Authenticated user ID:", req.user._id.toString());
    console.log("  - Request body:", req.body);

    // ✅ Check authorization
    if (req.user._id.toString() !== userId && req.user.role !== "admin") {
      console.log("🚨 Authorization failed");
      return res.status(403).json({ message: "Not authorized to update this user" });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log("🚨 User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("📝 Current user data:", {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      place: user.place,
    });

    // ✅ Prepare updates
    const updates = {};
    if (req.body.fullName !== undefined) updates.fullName = req.body.fullName;
    if (req.body.email !== undefined) updates.email = req.body.email;
    if (req.body.phone !== undefined) updates.phone = req.body.phone;
    if (req.body.place !== undefined) updates.place = req.body.place;

    console.log("🔄 Updates to apply:", updates);

    // ✅ Update the user
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      console.log("🚨 Update failed - user not found after update");
      return res.status(404).json({ message: "Update failed" });
    }

    console.log("✅ User updated successfully:", {
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      place: updatedUser.place,
    });

    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      place: updatedUser.place,
      role: updatedUser.role,
      isVerified: updatedUser.isVerified,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  } catch (error) {
    console.error("❌ Update error:", error);
    res.status(500).json({
      message: "❌ Server error",
      error: error.message,
    });
  }
};
