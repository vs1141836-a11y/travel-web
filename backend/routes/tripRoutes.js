import express from "express";
import { z } from "zod";
import { protect } from "../middleware/authMiddleware.js";
import {
  createTrip,
  getUserTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  exportTripPDF,
  getTripWeather,
  shareTripEmail
} from "../controllers/tripController.js";
import { generateItinerary, regenerateDay } from "../controllers/aiController.js";
import { validate } from "../middleware/validationMiddleware.js";

const router = express.Router();

const createTripSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  source: z.string().default(""),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be YYYY-MM-DD"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be YYYY-MM-DD"),
  budget: z.number().nonnegative("Budget must be 0 or greater"),
  travelers: z.number().int().positive("Travelers must be at least 1"),
  interests: z.array(z.string()).default([]),
});

const updateTripSchema = z.object({
  destination: z.string().min(1).optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  budget: z.number().nonnegative().optional(),
  travelers: z.number().int().positive().optional(),
  interests: z.array(z.string()).optional(),
  status: z.enum(["draft", "generated", "confirmed"]).optional(),
  days: z.array(
    z.object({
      _id: z.string().optional(),
      date: z.string(),
      activities: z.array(
        z.object({
          _id: z.string().optional(),
          time: z.string(),
          title: z.string(),
          description: z.string().optional(),
          estimatedCost: z.number().optional(),
          category: z.enum(["stay", "food", "activity", "transport"]),
          duration: z.string().optional(),
        })
      ),
    })
  ).optional(),
});

router
  .route("/")
  .post(protect, validate(createTripSchema), createTrip)
  .get(protect, getUserTrips);

router
  .route("/:id")
  .get(protect, getTripById)
  .put(protect, validate(updateTripSchema), updateTrip)
  .delete(protect, deleteTrip);

router.post("/:id/generate-itinerary", protect, generateItinerary);
router.post("/:id/regenerate-day/:dayIndex", protect, regenerateDay);
router.get("/:id/export-pdf", protect, exportTripPDF);
router.get("/:id/weather", protect, getTripWeather);
router.post("/:id/share-email", protect, shareTripEmail);

export default router;