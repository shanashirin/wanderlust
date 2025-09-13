import mongoose from "mongoose";

const guideSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String },
    achievements: [String],
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Guide = mongoose.model("Guide", guideSchema);
export default Guide;
