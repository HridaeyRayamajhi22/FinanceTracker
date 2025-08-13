import express from "express";

import {addIncome, getAllIncome, deleteIncome, downloadExcelIncome}  from "../controllers/incomeControllers.js"

import {protect} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/add",protect,addIncome);
router.get("/all", protect, getAllIncome);
router.get("/getExcel", protect, downloadExcelIncome);
router.delete("/:id", protect, deleteIncome)

export default router