import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {getDashBoardData} from "../controllers/dashboardController.js"

const router = express.Router()

router.get("/", protect, getDashBoardData)

export default router