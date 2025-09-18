// models/Guide.js
import mongoose from "mongoose";

const guideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  location: String,
  experience: String,
  rating: { type: Number, default: 0 },
  achievements: [String],
  certificates: [String],
  image: String,
  bio: String,
  availability: { type: Boolean, default: true }, // ✅ Available toggle
});

export default mongoose.model("Guide", guideSchema);
