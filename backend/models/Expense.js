// models/Expense.js
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" }, // optional link to trip
        category: { type: String, required: true }, // e.g., "food", "travel", "shopping"
        amount: { type: Number, required: true },
        note: { type: String },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
