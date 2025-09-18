
import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  days: [
    {
      day: String,
      details: String,
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
});

export default mongoose.model("Itinerary", itinerarySchema);
