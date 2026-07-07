import Trip from "../models/Trip.js";
import PDFDocument from "pdfkit";

// @desc    Create a new trip
// @route   POST /api/trips
// @access  Private
export const createTrip = async (req, res, next) => {
  try {
    const trip = new Trip({
      ...req.body,
      userId: req.user._id,
    });
    
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all trips of logged-in user
// @route   GET /api/trips
// @access  Private
export const getUserTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

// @desc    Get trip by ID (with ownership check)
// @route   GET /api/trips/:id
// @access  Private
export const getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    
    if (!trip) {
      res.status(404);
      return next(new Error("Trip not found"));
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error("Not authorized to access this trip"));
    }

    res.json(trip);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a trip (with ownership check & cost recalculation)
// @route   PUT /api/trips/:id
// @access  Private
export const updateTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      res.status(404);
      return next(new Error("Trip not found"));
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error("Not authorized to update this trip"));
    }

    // Update fields dynamically
    Object.keys(req.body).forEach((key) => {
      trip[key] = req.body[key];
    });

    const updatedTrip = await trip.save();
    res.json(updatedTrip);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a trip (with ownership check)
// @route   DELETE /api/trips/:id
// @access  Private
export const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      res.status(404);
      return next(new Error("Trip not found"));
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error("Not authorized to delete this trip"));
    }

    await Trip.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Trip deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Export trip details as PDF
// @route   GET /api/trips/:id/export-pdf
// @access  Private
export const exportTripPDF = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    
    if (!trip) {
      res.status(404);
      return next(new Error("Trip not found"));
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error("Not authorized to access this trip"));
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${trip.destination}-itinerary.pdf"`);

    doc.pipe(res);

    // Document Title
    doc
      .fillColor("#0F172A")
      .fontSize(28)
      .text("TripCraft AI Itinerary", { align: "center" })
      .moveDown(0.5);

    doc
      .fillColor("#E5A93C")
      .fontSize(18)
      .text(trip.destination, { align: "center" })
      .moveDown(1.5);

    // Metadata
    doc.fillColor("#1E293B").fontSize(11);
    doc.text(`Start Date: ${trip.startDate}`);
    doc.text(`End Date: ${trip.endDate}`);
    doc.text(`Travelers: ${trip.travelers}`);
    doc.text(`Budget Limit: $${trip.budget} USD`);
    doc.text(`Total Estimated Cost: $${trip.totalEstimatedCost || 0} USD`);
    doc.text(`Interests: ${trip.interests.join(", ")}`);
    doc.moveDown(2);

    doc.strokeColor("#E2E8F0").lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(1.5);

    // Days & Activities
    if (trip.days && trip.days.length > 0) {
      trip.days.forEach((day, index) => {
        doc.fillColor("#0F172A").fontSize(16).text(`Day ${index + 1} - ${day.date}`, { underline: true });
        doc.moveDown(0.8);

        if (day.activities && day.activities.length > 0) {
          day.activities.forEach((act) => {
            doc.fillColor("#475569").fontSize(11).text(`[${act.category.toUpperCase()}]  ${act.time} - ${act.title}`, { bold: true });
            if (act.description) {
              doc.fillColor("#64748B").fontSize(10).text(act.description, { indent: 15 });
            }
            doc.fillColor("#1E293B").fontSize(10).text(`Estimated Cost: $${act.estimatedCost} USD | Duration: ${act.duration || "N/A"}`, { indent: 15 });
            doc.moveDown(0.8);
          });
        } else {
          doc.fillColor("#94A3B8").fontSize(11).text("No activities scheduled for this day.");
          doc.moveDown(1);
        }
        doc.moveDown(1.5);
      });
    }

    doc.end();
  } catch (error) {
    next(error);
  }
};