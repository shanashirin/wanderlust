import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    destination: { type: String, required: true },
    duration: { type: String },
    price: { type: Number, required: true },
    description: { type: String },
    img: { type: String },
    rating: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin id
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);

export default Package;
