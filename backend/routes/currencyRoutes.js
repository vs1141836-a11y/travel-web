import express from "express";
import { getExchangeRate } from "../controllers/destinationController.js";

const router = express.Router();
router.get("/rate", getExchangeRate);

export default router;
