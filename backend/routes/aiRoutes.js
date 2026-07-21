import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { generateItinerary, aiChat } from "../controllers/aiController.js";

const router = express.Router();
router.post("/generate", protect, generateItinerary);
router.post("/chat", protect, aiChat);

export default router;
