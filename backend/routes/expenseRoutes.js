import express from "express";

import {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExcelExpense,
} from "../controllers/expenseControllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/all", protect, getAllExpense);
router.get("/getExcel", protect, downloadExcelExpense);
router.delete("/:id", protect, deleteExpense);

export default router;
