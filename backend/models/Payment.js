import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    package: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
    amount: { type: Number, required: true },
    selectedActivities: [
      {
        name: String,
        price: Number,
      }
    ],
    status: { type: String, enum: ["pending", "paid"], default: "paid" }, // mark as paid
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
