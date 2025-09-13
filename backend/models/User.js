import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },   // 👈 changed to fullName
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "guide", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
); 

const User = mongoose.model("User", userSchema);
export default User;
