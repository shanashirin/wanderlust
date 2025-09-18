// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  guideId: { type: mongoose.Schema.Types.ObjectId, ref: "Guide" },
  itineraryId: { type: mongoose.Schema.Types.ObjectId, ref: "Itinerary" },
  status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
  date: Date,
});

export default mongoose.model("Booking", bookingSchema);
