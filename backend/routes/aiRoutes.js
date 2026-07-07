import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { generateItinerary } from "../controllers/aiController.js";

const router = express.Router();
router.post("/generate", protect, generateItinerary);

export default router;