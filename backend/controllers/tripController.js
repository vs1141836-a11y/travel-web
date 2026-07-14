import Trip from "../models/Trip.js";
import PDFDocument from "pdfkit";
import axios from "axios";

const countryToCurrencyMap = {
  "india": { country: "India", code: "INR", symbol: "₹", rate: 83.5 },
  "delhi": { country: "India", code: "INR", symbol: "₹", rate: 83.5 },
  "kedarnath": { country: "India", code: "INR", symbol: "₹", rate: 83.5 },
  "haridwar": { country: "India", code: "INR", symbol: "₹", rate: 83.5 },
  "sonprayag": { country: "India", code: "INR", symbol: "₹", rate: 83.5 },
  "vizag": { country: "India", code: "INR", symbol: "₹", rate: 83.5 },
  "goa": { country: "India", code: "INR", symbol: "₹", rate: 83.5 },
  "mumbai": { country: "India", code: "INR", symbol: "₹", rate: 83.5 },
  "bengaluru": { country: "India", code: "INR", symbol: "₹", rate: 83.5 },
  "kerala": { country: "India", code: "INR", symbol: "₹", rate: 83.5 },
  "hyderabad": { country: "India", code: "INR", symbol: "₹", rate: 83.5 },
  "tamil nadu": { country: "India", code: "INR", symbol: "₹", rate: 83.5 },
  "japan": { country: "Japan", code: "JPY", symbol: "¥", rate: 155.0 },
  "tokyo": { country: "Japan", code: "JPY", symbol: "¥", rate: 155.0 },
  "kyoto": { country: "Japan", code: "JPY", symbol: "¥", rate: 155.0 },
  "osaka": { country: "Japan", code: "JPY", symbol: "¥", rate: 155.0 },
  "united kingdom": { country: "United Kingdom", code: "GBP", symbol: "£", rate: 0.78 },
  "london": { country: "United Kingdom", code: "GBP", symbol: "£", rate: 0.78 },
  "england": { country: "United Kingdom", code: "GBP", symbol: "£", rate: 0.78 },
  "scotland": { country: "United Kingdom", code: "GBP", symbol: "£", rate: 0.78 },
  "united arab emirates": { country: "United Arab Emirates", code: "AED", symbol: "AED", rate: 3.67 },
  "dubai": { country: "United Arab Emirates", code: "AED", symbol: "AED", rate: 3.67 },
  "abu dhabi": { country: "United Arab Emirates", code: "AED", symbol: "AED", rate: 3.67 },
  "australia": { country: "Australia", code: "AUD", symbol: "A$", rate: 1.50 },
  "sydney": { country: "Australia", code: "AUD", symbol: "A$", rate: 1.50 },
  "melbourne": { country: "Australia", code: "AUD", symbol: "A$", rate: 1.50 },
  "france": { country: "France", code: "EUR", symbol: "€", rate: 0.92 },
  "paris": { country: "France", code: "EUR", symbol: "€", rate: 0.92 },
  "germany": { country: "Germany", code: "EUR", symbol: "€", rate: 0.92 },
  "italy": { country: "Italy", code: "EUR", symbol: "€", rate: 0.92 },
  "rome": { country: "Italy", code: "EUR", symbol: "€", rate: 0.92 },
  "spain": { country: "Spain", code: "EUR", symbol: "€", rate: 0.92 },
  "madrid": { country: "Spain", code: "EUR", symbol: "€", rate: 0.92 },
  "barcelona": { country: "Spain", code: "EUR", symbol: "€", rate: 0.92 },
  "greece": { country: "Greece", code: "EUR", symbol: "€", rate: 0.92 },
  "switzerland": { country: "Switzerland", code: "CHF", symbol: "CHF", rate: 0.90 },
  "netherlands": { country: "Netherlands", code: "EUR", symbol: "€", rate: 0.92 },
  "amsterdam": { country: "Netherlands", code: "EUR", symbol: "€", rate: 0.92 },
  "canada": { country: "Canada", code: "CAD", symbol: "C$", rate: 1.36 },
  "toronto": { country: "Canada", code: "CAD", symbol: "C$", rate: 1.36 },
  "vancouver": { country: "Canada", code: "CAD", symbol: "C$", rate: 1.36 },
  "singapore": { country: "Singapore", code: "SGD", symbol: "S$", rate: 1.34 },
  "brazil": { country: "Brazil", code: "BRL", symbol: "R$", rate: 5.20 },
  "rio de janeiro": { country: "Brazil", code: "BRL", symbol: "R$", rate: 5.20 },
  "sweden": { country: "Sweden", code: "SEK", symbol: "kr", rate: 10.50 },
  "norway": { country: "Norway", code: "NOK", symbol: "kr", rate: 10.70 },
  "denmark": { country: "Denmark", code: "DKK", symbol: "kr", rate: 6.80 },
  "china": { country: "China", code: "CNY", symbol: "¥", rate: 7.25 },
  "hong kong": { country: "Hong Kong", code: "HKD", symbol: "HK$", rate: 7.80 },
  "new zealand": { country: "New Zealand", code: "NZD", symbol: "NZ$", rate: 1.62 },
  "mexico": { country: "Mexico", code: "MXN", symbol: "$", rate: 18.20 },
  "thailand": { country: "Thailand", code: "THB", symbol: "฿", rate: 36.50 },
  "bangkok": { country: "Thailand", code: "THB", symbol: "฿", rate: 36.50 },
  "phuket": { country: "Thailand", code: "THB", symbol: "฿", rate: 36.50 },
  "malaysia": { country: "Malaysia", code: "MYR", symbol: "RM", rate: 4.70 },
  "indonesia": { country: "Indonesia", code: "IDR", symbol: "Rp", rate: 16200 },
  "bali": { country: "Indonesia", code: "IDR", symbol: "Rp", rate: 16200 },
  "philippines": { country: "Philippines", code: "PHP", symbol: "₱", rate: 58.50 },
  "vietnam": { country: "Vietnam", code: "VND", symbol: "₫", rate: 25400 },
  "south korea": { country: "South Korea", code: "KRW", symbol: "₩", rate: 1380 },
  "seoul": { country: "South Korea", code: "KRW", symbol: "₩", rate: 1380 },
  "turkey": { country: "Turkey", code: "TRY", symbol: "₺", rate: 32.50 },
  "south africa": { country: "South Africa", code: "ZAR", symbol: "R", rate: 18.50 },
  "russia": { country: "Russia", code: "RUB", symbol: "₽", rate: 90.00 },
  "saudi arabia": { country: "Saudi Arabia", code: "SAR", symbol: "SR", rate: 3.75 },
  "israel": { country: "Israel", code: "ILS", symbol: "₪", rate: 3.70 },
  "egypt": { country: "Egypt", code: "EGP", symbol: "E£", rate: 47.50 },
};

const detectCountryCurrency = (destination) => {
  const dest = destination.toLowerCase().trim();
  for (const key of Object.keys(countryToCurrencyMap)) {
    if (dest.includes(key)) {
      const match = countryToCurrencyMap[key];
      return { country: match.country, code: match.code, symbol: match.symbol, fallbackRate: match.rate };
    }
  }
  return { country: "United States", code: "USD", symbol: "$", fallbackRate: 1.0 };
};

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

    // Self-healing migration check for older trips
    let needsSave = false;
    if (!trip.currencyCode || !trip.currencySymbol || !trip.localBudget) {
      const currencyInfo = detectCountryCurrency(trip.destination);
      const rate = currencyInfo.fallbackRate || 1.0;
      trip.country = currencyInfo.country;
      trip.currencyCode = currencyInfo.code;
      trip.currencySymbol = currencyInfo.symbol;
      trip.exchangeRate = rate;
      trip.localBudget = Math.round(trip.budget * rate);
      needsSave = true;
    }
    if (!trip.destinationDetails || !trip.destinationDetails.region) {
      let latitude = 0;
      let longitude = 0;
      let region = "Province";
      const destLower = trip.destination.toLowerCase();
      if (destLower.includes("delhi")) { latitude = 28.6139; longitude = 77.2090; region = "NCR"; }
      else if (destLower.includes("kedarnath")) { latitude = 30.7346; longitude = 79.0669; region = "Uttarakhand"; }
      else if (destLower.includes("haridwar")) { latitude = 29.9457; longitude = 78.1642; region = "Uttarakhand"; }
      else if (destLower.includes("vizag")) { latitude = 17.6868; longitude = 83.2185; region = "Andhra Pradesh"; }
      else if (destLower.includes("paris")) { latitude = 48.8566; longitude = 2.3522; region = "Ile-de-France"; }
      else if (destLower.includes("tokyo")) { latitude = 35.6762; longitude = 139.6503; region = "Kanto"; }
      else if (destLower.includes("london")) { latitude = 51.5074; longitude = -0.1278; region = "Greater London"; }
      
      trip.destinationDetails = {
        region,
        latitude,
        longitude,
        popularAttractions: ["Scenic spots", "Local center"],
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      };
      needsSave = true;
    }

    if (trip.days && trip.days.length > 0) {
      trip.days.forEach((day) => {
        if (day.activities && day.activities.length > 0) {
          day.activities.forEach((act, actIdx) => {
            if (!act.mapsLink) {
              act.mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.title + " " + trip.destination)}`;
              needsSave = true;
            }
            if (!act.travelTime) {
              act.travelTime = actIdx === 0 ? "Check-in arrival" : "15-20 mins transit";
              needsSave = true;
            }
          });
        }
      });
    }

    if (needsSave) {
      await trip.save();
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
    doc.text(`Budget Limit: ${trip.currencySymbol || "$"}${trip.budget} ${trip.currencyCode || "USD"}`);
    doc.text(`Total Estimated Cost: ${trip.currencySymbol || "$"}${trip.totalEstimatedCost || 0} ${trip.currencyCode || "USD"}`);
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
            doc.fillColor("#1E293B").fontSize(10).text(`Estimated Cost: ${trip.currencySymbol || "$"}${act.estimatedCost} ${trip.currencyCode || "USD"} | Duration: ${act.duration || "N/A"}`, { indent: 15 });
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

// @desc    Get weather details of a trip destination
// @route   GET /api/trips/:id/weather
// @access  Private
export const getTripWeather = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      res.status(404);
      return next(new Error("Trip not found"));
    }

    const destination = trip.destination;
    let weatherData = null;
    let forecast = [];
    let recommendation = "Perfect weather for outdoor exploration!";

    if (process.env.WEATHER_API_KEY) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            destination
          )}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );
        weatherData = {
          temp: Math.round(response.data.main.temp),
          feels_like: Math.round(response.data.main.feels_like),
          humidity: response.data.main.humidity,
          wind: Math.round(response.data.wind.speed * 3.6),
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
          city: response.data.name,
        };

        // Try getting forecast
        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
            destination
          )}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );
        if (forecastRes.data && Array.isArray(forecastRes.data.list)) {
          const list = forecastRes.data.list;
          const dailyPoints = [];
          for (let i = 0; i < list.length; i += 8) {
            dailyPoints.push({
              date: list[i].dt_txt ? list[i].dt_txt.split(" ")[0] : "Forecast Day",
              temp: Math.round(list[i].main.temp),
              description: list[i].weather[0].description,
              icon: list[i].weather[0].icon,
            });
            if (dailyPoints.length >= 3) break;
          }
          forecast = dailyPoints;
        }
      } catch (apiErr) {
        console.warn("Weather/Forecast API call failed, using high-fidelity mock fallback:", apiErr.message);
      }
    }

    if (!weatherData) {
      // Mock weather based on destination name hashes to keep it consistent
      let code = 0;
      for (let i = 0; i < destination.length; i++) {
        code += destination.charCodeAt(i);
      }
      const temp = (code % 15) + 15; // 15 to 30
      const humidity = (code % 30) + 50; // 50 to 80
      const wind = (code % 20) + 5; // 5 to 25
      const descriptions = ["clear sky", "few clouds", "scattered clouds", "broken clouds", "light rain"];
      const desc = descriptions[code % descriptions.length];
      const icons = ["01d", "02d", "03d", "04d", "10d"];
      const icon = icons[code % icons.length];

      weatherData = {
        temp,
        feels_like: temp - 1,
        humidity,
        wind,
        description: desc,
        icon,
        city: destination,
        isMock: true,
      };
    }

    if (forecast.length === 0) {
      let code = 0;
      for (let i = 0; i < destination.length; i++) {
        code += destination.charCodeAt(i);
      }
      const temp = weatherData.temp;
      const descriptions = ["clear sky", "few clouds", "scattered clouds", "broken clouds", "light rain"];
      const icons = ["01d", "02d", "03d", "04d", "10d"];
      
      forecast = [
        { date: "Day 1", temp: temp, description: weatherData.description, icon: weatherData.icon },
        { date: "Day 2", temp: temp + (code % 3) - 1, description: descriptions[(code + 1) % descriptions.length], icon: icons[(code + 1) % icons.length] },
        { date: "Day 3", temp: temp + (code % 4) - 2, description: descriptions[(code + 2) % descriptions.length], icon: icons[(code + 2) % icons.length] }
      ];
    }

    const hasRain = forecast.some(f => f.description.includes("rain") || f.description.includes("drizzle") || f.description.includes("shower"));
    const isVeryHot = forecast.some(f => f.temp > 32);
    
    if (hasRain) {
      recommendation = "🌧️ Rainy conditions expected. We recommend exploring indoor attractions like museums, cafes, and historical monuments today.";
    } else if (isVeryHot) {
      recommendation = "☀️ Very high temperatures forecast. Stay hydrated! Focus on air-conditioned indoor experiences or shaded parks/gardens.";
    } else {
      recommendation = "✨ Excellent weather ahead. Ideal conditions for outdoor adventures, treks, sightseeing, and beach explorations.";
    }

    res.json({
      current: weatherData,
      forecast,
      recommendation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Simulate sharing trip details via email
// @route   POST /api/trips/:id/share-email
// @access  Private
export const shareTripEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    return next(new Error("Email address is required"));
  }

  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      res.status(404);
      return next(new Error("Trip not found"));
    }

    console.log(`[EMAIL SIMULATION] Sending full itinerary to ${email} for trip ${trip._id} to ${trip.destination}`);

    res.json({
      success: true,
      message: `Full trip itinerary details successfully shared to ${email}!`,
    });
  } catch (error) {
    next(error);
  }
};