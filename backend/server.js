import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`[API REQUEST] ${req.method} ${req.url} - Origin: ${req.headers.origin || "None"}`);
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      // Permissive callback to eliminate CORS errors in dev
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/ai", aiRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));