// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // traveler
  guideId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
  status: { type: String, enum: ["pending", "accepted", "declined", "paid"], default: "pending" },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
