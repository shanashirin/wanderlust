import mongoose from "mongoose";

const packageSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    activities: [String],
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);
export default Package;
