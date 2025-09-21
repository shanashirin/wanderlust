import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  activities: [activitySchema], // Budget/Activities per destination
});

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    destination: { type: String, required: true },
    duration: String,
    price: { type: Number, required: true },
    description: String,
    img: String,
    rating: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin id
    itinerary: [
      {
        day: String,
        details: String,
      },
    ],
    destinations: [destinationSchema], // List of destinations + activities
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);
export default Package;
