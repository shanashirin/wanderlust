import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    place: { type: String, required: true },
    password: { type: String, required: true, select: false }, // ✅ select: false so not always required on update
    certificateUrl: { type: String }, // URL to the uploaded certificate
    role: {
      type: String,
      enum: ["user", "guide", "admin"],
      default: "user",
    },

    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
