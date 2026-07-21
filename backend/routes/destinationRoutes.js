import express from "express";
import { getDestinationInfo, getExchangeRate } from "../controllers/destinationController.js";

const router = express.Router();

router.get("/:name/info", getDestinationInfo);

export default router;
