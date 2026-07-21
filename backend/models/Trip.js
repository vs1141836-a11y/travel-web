import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  time: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  estimatedCost: { type: Number, default: 0 },
  category: { 
    type: String, 
    enum: ["stay", "food", "activity", "transport"], 
    required: true 
  },
  duration: { type: String, default: "" },
  mapsLink: { type: String, default: "" },
  travelTime: { type: String, default: "" },
});

const daySchema = new mongoose.Schema({
  date: { type: String, required: true },
  activities: [activitySchema],
});

const tripSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    destination: { type: String, required: true },
    source: { type: String, default: "" },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    budget: { type: Number, required: true },
    travelers: { type: Number, required: true, default: 1 },
    interests: { type: [String], default: [] },
    status: { 
      type: String, 
      enum: ["draft", "generated", "confirmed"], 
      default: "draft" 
    },
    days: { type: [daySchema], default: [] },
    totalEstimatedCost: { type: Number, default: 0 },
    country: { type: String, default: "" },
    currencyCode: { type: String, default: "USD" },
    currencySymbol: { type: String, default: "$" },
    localBudget: { type: Number, default: 0 },
    exchangeRate: { type: Number, default: 1 },
    destinationDetails: {
      region: { type: String, default: "" },
      latitude: { type: Number, default: 0 },
      longitude: { type: Number, default: 0 },
      popularAttractions: { type: [String], default: [] },
      imageUrl: { type: String, default: "" }
    },
  },
  { timestamps: true }
);

// Pre-save hook to calculate totalEstimatedCost based on activities in all days
tripSchema.pre("save", function () {
  let cost = 0;
  if (this.days && this.days.length > 0) {
    for (const day of this.days) {
      if (day.activities && day.activities.length > 0) {
        for (const act of day.activities) {
          cost += act.estimatedCost || 0;
        }
      }
    }
  }
  this.totalEstimatedCost = cost;
});

export default mongoose.model("Trip", tripSchema);
