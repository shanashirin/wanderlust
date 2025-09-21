// routes/expenseRoutes.js
import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

// ➕ Add new expense
router.post("/", async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        res.status(201).json(expense);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 📖 Get all expenses by user
router.get("/user/:userId", async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.params.userId });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ❌ Delete an expense
router.delete("/:id", async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
