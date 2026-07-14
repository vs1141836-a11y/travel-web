import axios from "axios";
import Trip from "../models/Trip.js";

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

const getExchangeRate = async (targetCode, fallbackRate) => {
  try {
    const response = await axios.get("https://open.er-api.com/v6/latest/USD");
    if (response.data && response.data.rates && response.data.rates[targetCode]) {
      return response.data.rates[targetCode];
    }
  } catch (err) {
    console.warn("Failed to fetch live exchange rates, using local fallback rate:", err.message);
  }
  return fallbackRate;
};

// Helper to sanitize activities and coerce schema compliance
const sanitizeActivities = (activitiesArray) => {
  if (!Array.isArray(activitiesArray)) return [];
  const sanitized = [];
  for (const act of activitiesArray) {
    if (!act || typeof act !== "object") continue;

    const time = typeof act.time === "string" ? act.time : "09:00 AM";
    const title = typeof act.title === "string" ? act.title : "Explore Spot";
    const description = typeof act.description === "string" ? act.description : "";
    const duration = typeof act.duration === "string" ? act.duration : "2h";
    const mapsLink = typeof act.mapsLink === "string" ? act.mapsLink : "";
    const travelTime = typeof act.travelTime === "string" ? act.travelTime : "";

    // Coerce cost safely
    let estimatedCost = 0;
    if (typeof act.estimatedCost === "number") {
      estimatedCost = act.estimatedCost;
    } else if (typeof act.estimatedCost === "string") {
      const parsed = parseFloat(act.estimatedCost.replace(/[^0-9.]/g, ""));
      estimatedCost = isNaN(parsed) ? 0 : parsed;
    }

    // Standardize category matching
    let category = "activity";
    const rawCat = typeof act.category === "string" ? act.category.toLowerCase().trim() : "";
    if (["stay", "lodging", "hotel", "accommodation", "resort"].includes(rawCat)) {
      category = "stay";
    } else if (["food", "dining", "meal", "restaurant", "cafe", "drinks", "lunch", "dinner", "breakfast"].includes(rawCat)) {
      category = "food";
    } else if (["transport", "transit", "flight", "taxi", "bus", "train", "drive", "car", "metro", "subway"].includes(rawCat)) {
      category = "transport";
    } else {
      category = "activity";
    }

    sanitized.push({
      time,
      title,
      description,
      estimatedCost,
      category,
      duration,
      mapsLink,
      travelTime
    });
  }
  return sanitized;
};

// Helper function to sanitize, repair, and validate itinerary JSON structure
const sanitizeAndValidateItinerary = (data) => {
  if (!data || typeof data !== "object") return null;
  if (!Array.isArray(data.days)) return null;

  const sanitizedDays = [];
  for (const day of data.days) {
    if (!day || typeof day !== "object") continue;
    
    const date = typeof day.date === "string" ? day.date : "YYYY-MM-DD";
    const activities = sanitizeActivities(day.activities);
    
    sanitizedDays.push({ date, activities });
  }

  if (sanitizedDays.length === 0) return null;
  
  return {
    country: typeof data.country === "string" ? data.country : "",
    currencyCode: typeof data.currencyCode === "string" ? data.currencyCode : "USD",
    currencySymbol: typeof data.currencySymbol === "string" ? data.currencySymbol : "$",
    localBudget: Number(data.localBudget) || 0,
    exchangeRate: Number(data.exchangeRate) || 0,
    destinationDetails: {
      region: data.destinationDetails?.region || "",
      latitude: Number(data.destinationDetails?.latitude) || 0,
      longitude: Number(data.destinationDetails?.longitude) || 0,
      popularAttractions: Array.isArray(data.destinationDetails?.popularAttractions) ? data.destinationDetails.popularAttractions : [],
      imageUrl: data.destinationDetails?.imageUrl || ""
    },
    days: sanitizedDays
  };
};

const addDays = (dateStr, days) => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

const getLocalizedActivities = (destination, dayIndex, dailyBudget, exchangeRate = 1.0) => {
  const destLower = destination.toLowerCase();
  const stayCost = Math.round(dailyBudget * 0.4);
  const foodCost1 = Math.round(dailyBudget * 0.15);
  const foodCost2 = Math.round(dailyBudget * 0.2);
  const actCost = Math.round(dailyBudget * 0.25);

  let rawList = [];

  // Delhi Fallback
  if (destLower.includes("delhi")) {
    rawList = [
      [
        { time: "09:00 AM", title: "Delhi Airport/Station Transit", description: "Checked in via pre-paid taxi to your hotel in Connaught Place.", estimatedCost: Math.round(15 * exchangeRate), category: "transport", duration: "1.5h" },
        { time: "12:30 PM", title: "Lunch at Karim's (Old Delhi)", description: "Feast on iconic Mughlai mutton korma and tandoori rotis.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "02:30 PM", title: "Red Fort Exploration", description: "Guided tour through the massive 17th-century sandstone fortress.", estimatedCost: actCost, category: "activity", duration: "3h" },
        { time: "07:30 PM", title: "Stay at The Connaught Hotel", description: "Premium boutique stay in central Delhi.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "09:00 AM", title: "Qutub Minar Complex", description: "Explore the tallest brick minaret in the world and iron pillar.", estimatedCost: actCost, category: "activity", duration: "2h" },
        { time: "01:00 PM", title: "Lunch at Saravana Bhavan", description: "Savor premium South Indian thali and filter coffee in CP.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "03:00 PM", title: "Humayun's Tomb Heritage Walk", description: "Stroll around the magnificent precursor to the Taj Mahal.", estimatedCost: Math.round(10 * exchangeRate), category: "activity", duration: "2h" },
        { time: "07:30 PM", title: "Stay at The Connaught Hotel", description: "Premium boutique stay in central Delhi.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "09:30 AM", title: "Lotus Temple Visit", description: "Experience serene meditation sessions at the Bahai temple.", estimatedCost: 0, category: "activity", duration: "2h" },
        { time: "12:30 PM", title: "Street Food Tour at Chandni Chowk", description: "Sample famous parathas at Paranthe Wali Gali and local sweets.", estimatedCost: foodCost1, category: "food", duration: "2h" },
        { time: "03:00 PM", title: "Shopping Walk at Dilli Haat", description: "Explore authentic Indian regional handicrafts and souvenirs.", estimatedCost: foodCost2, category: "activity", duration: "2.5h" },
        { time: "07:30 PM", title: "Stay at The Connaught Hotel", description: "Premium boutique stay in central Delhi.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ][dayIndex % 3];
  }
  // Kedarnath Fallback
  else if (destLower.includes("kedarnath")) {
    rawList = [
      [
        { time: "06:00 AM", title: "Sonprayag to Gaurikund Transit", description: "Early morning local shared jeep to the trek starting point.", estimatedCost: Math.round(5 * exchangeRate), category: "transport", duration: "1h" },
        { time: "08:00 AM", title: "Kedarnath Trek Initiation", description: "Begin the 16km scenic mountain trail trek (walking/mule/palki).", estimatedCost: actCost, category: "activity", duration: "7h" },
        { time: "04:30 PM", title: "Arrival & GMVN Ashram Check-in", description: "Settle into your cozy mountain cottage near the temple.", estimatedCost: stayCost, category: "stay", duration: "14h" }
      ],
      [
        { time: "05:00 AM", title: "Kedarnath Temple Darshan", description: "Attend the morning Abhishek puja and explore the holy shrine.", estimatedCost: Math.round(10 * exchangeRate), category: "activity", duration: "3h" },
        { time: "09:00 AM", title: "Breakfast at Local Bhandara/Mess", description: "Enjoy hot parathas and tea with a view of the Himalayan peaks.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "11:00 AM", title: "Trek Down to Gaurikund", description: "Begin descending the mountain trail back to Sonprayag.", estimatedCost: 0, category: "activity", duration: "5h" },
        { time: "06:30 PM", title: "Stay at Sonprayag Lodge", description: "Relax at your base lodge after the divine pilgrimage.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "08:00 AM", title: "Bairon Temple Trek", description: "Short uphill hike to Bairon Baba Temple for panoramic valley views.", estimatedCost: Math.round(5 * exchangeRate), category: "activity", duration: "2h" },
        { time: "12:00 PM", title: "Lunch at Kedarnath Base Mess", description: "Simple hot vegetarian mountain meal.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "02:00 PM", title: "Spiritual Meditation Near Shrine", description: "Spend quiet time in the divine, tranquil atmosphere of the valley.", estimatedCost: 0, category: "activity", duration: "3h" },
        { time: "07:30 PM", title: "Stay at GMVN Camp", description: "Cozy tented accommodation with Himalayan views.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ][dayIndex % 3];
  }
  // Haridwar Fallback
  else if (destLower.includes("haridwar")) {
    rawList = [
      [
        { time: "09:00 AM", title: "Check-in at Haridwar Ashram", description: "Settle in at a quiet riverside ashram with Ganges views.", estimatedCost: stayCost, category: "stay", duration: "12h" },
        { time: "11:30 AM", title: "Mansa Devi Cable Car Ride", description: "Scenic ropeway ride to the hilltop temple overlooking Haridwar.", estimatedCost: Math.round(8 * exchangeRate), category: "activity", duration: "2h" },
        { time: "01:30 PM", title: "Lunch at Chotiwala", description: "Iconic traditional thali lunch near the Ganges.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "06:00 PM", title: "Ganga Aarti at Har Ki Pauri", description: "Attend the world-famous evening oil lamp floating prayer ceremony.", estimatedCost: Math.round(5 * exchangeRate), category: "activity", duration: "1.5h" }
      ],
      [
        { time: "09:00 AM", title: "Chandi Devi Hilltop Temple", description: "Take the cable car to Neel Parvat for spectacular panoramic views.", estimatedCost: Math.round(8 * exchangeRate), category: "activity", duration: "2.5h" },
        { time: "01:00 PM", title: "Street Food Crawl (Kachori & Lassi)", description: "Sample famous Haridwar style breakfast and creamy buttermilk.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "03:00 PM", title: "Shanti Kunj Ashram Visit", description: "Peaceful walk through the spiritual and scientific research center.", estimatedCost: 0, category: "activity", duration: "2.5h" },
        { time: "07:30 PM", title: "Stay at Haridwar Heritage Hotel", description: "Premium riverside heritage boutique stay.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ][dayIndex % 2];
  }
  // Sonprayag Fallback
  else if (destLower.includes("sonprayag")) {
    rawList = [
      [
        { time: "09:00 AM", title: "Check-in base camp hotel", description: "Settle into your riverside room in Sonprayag.", estimatedCost: stayCost, category: "stay", duration: "12h" },
        { time: "11:00 AM", title: "Mandakini River Ghat Stroll", description: "Experience fresh mountain air next to the rushing river waters.", estimatedCost: 0, category: "activity", duration: "2h" },
        { time: "01:30 PM", title: "Lunch at Himalayan Cafe", description: "Traditional North Indian hot food.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "06:00 PM", title: "Evening Prayer Meet at Sonprayag", description: "Attend local mountain temple rituals.", estimatedCost: 0, category: "activity", duration: "1h" }
      ]
    ][0];
  }
  // Vizag Fallback
  else if (destLower.includes("vizag")) {
    rawList = [
      [
        { time: "09:00 AM", title: "INS Kursura Submarine Museum", description: "Tour a decommissioned real Soviet-built submarine on RK Beach.", estimatedCost: Math.round(8 * exchangeRate), category: "activity", duration: "1.5h" },
        { time: "12:30 PM", title: "Lunch at Sea Inn (Andhra Mess)", description: "Authentic local spicy Andhra fish curry and rice meals.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "03:00 PM", title: "Kailasagiri Ropeway Ride", description: "Ascend the hilltop park via cable car for panoramic Bay of Bengal views.", estimatedCost: Math.round(5 * exchangeRate), category: "activity", duration: "3h" },
        { time: "07:30 PM", title: "Stay at Novotel Varun Beach", description: "Ocean-view luxury stay on the Beach Road.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "06:00 AM", title: "Araku Valley Train Journey", description: "Scenic rail route crossing 58 tunnels and bridges to the coffee valley.", estimatedCost: Math.round(15 * exchangeRate), category: "transport", duration: "4.5h" },
        { time: "12:00 PM", title: "Borra Caves Exploration", description: "Guided walk inside millions-of-years old stalactite/stalagmite caves.", estimatedCost: Math.round(10 * exchangeRate), category: "activity", duration: "2.5h" },
        { time: "02:30 PM", title: "Bamboo Chicken Lunch in Araku", description: "Sample Araku's famous oil-free chicken cooked inside local green bamboo.", estimatedCost: foodCost2, category: "food", duration: "1.5h" },
        { time: "07:30 PM", title: "Stay at Araku Valley Resort", description: "Charming hill-resort cottage stay.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "09:00 AM", title: "Simhachalam Hill Temple Tour", description: "Explore the 11th-century Lakshmi Narasimha temple covered in sandalwood paste.", estimatedCost: Math.round(5 * exchangeRate), category: "activity", duration: "3h" },
        { time: "01:00 PM", title: "Lunch at Kamat Restaurant", description: "Authentic vegetarian Andhra thali served on banana leaf.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "03:30 PM", title: "Rishikonda Beach Water Sports", description: "Enjoy speed-boating and jet-skiing under expert guidance.", estimatedCost: Math.round(15 * exchangeRate), category: "activity", duration: "3h" },
        { time: "07:30 PM", title: "Stay at Novotel Varun Beach", description: "Ocean-view luxury stay on the Beach Road.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ][dayIndex % 3];
  }
  // Odisha Fallback
  else if (destLower.includes("odisha") || destLower.includes("puri") || destLower.includes("bhubaneswar")) {
    rawList = [
      [
        { time: "09:00 AM", title: "Konark Sun Temple Tour", description: "Explore the 13th-century architectural masterpiece built as a giant chariot.", estimatedCost: Math.round(8 * exchangeRate), category: "activity", duration: "3h" },
        { time: "01:00 PM", title: "Lunch at Dalma Restaurant", description: "Authentic Odia cuisine including Dalma, Pakhala, and fish curry.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "03:00 PM", title: "Puri Jagannath Temple Walk", description: "Visit the holy temple town and walk the grand road (Bada Danda).", estimatedCost: 0, category: "activity", duration: "2h" },
        { time: "07:30 PM", title: "Stay at Hans Coco Palms Resort", description: "Relaxing beach resort stay in Puri.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ][dayIndex % 1];
  }
  // Kerala Fallback
  else if (destLower.includes("kerala") || destLower.includes("munnar") || destLower.includes("kochi") || destLower.includes("alleppey")) {
    rawList = [
      [
        { time: "09:00 AM", title: "Munnar Tea Garden Walk", description: "Stroll through the lush green rolling hills of organic tea estates.", estimatedCost: Math.round(5 * exchangeRate), category: "activity", duration: "2h" },
        { time: "01:00 PM", title: "Lunch at Munnar Hill Cafe", description: "Sample local Kerala style fish pollichathu and parotta.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "03:00 PM", title: "Eravikulam National Park Safari", description: "Spot the endangered Nilgiri Tahr mountain goat on the high slopes.", estimatedCost: Math.round(12 * exchangeRate), category: "activity", duration: "3h" },
        { time: "07:30 PM", title: "Stay at Munnar Hill Resort", description: "Cozy rooms with valley views.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "11:30 AM", title: "Alleppey Houseboat Check-in", description: "Board your private traditional Kettuvallam houseboat.", estimatedCost: stayCost, category: "stay", duration: "20h" },
        { time: "01:30 PM", title: "Lunch on Backwaters", description: "Freshly prepared Karimeen fry and traditional red rice onboard.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "04:30 PM", title: "Village Canal Canoe Cruise", description: "Float through tiny palm-fringed canals to see local village life.", estimatedCost: Math.round(10 * exchangeRate), category: "activity", duration: "2h" }
      ]
    ][dayIndex % 2];
  }
  // Tamil Nadu Fallback
  else if (destLower.includes("tamil nadu") || destLower.includes("chennai") || destLower.includes("madurai")) {
    rawList = [
      [
        { time: "09:00 AM", title: "Mahabalipuram Shore Temples", description: "Explore the 8th-century rock-cut monolithic carvings on the coast.", estimatedCost: Math.round(8 * exchangeRate), category: "activity", duration: "3h" },
        { time: "01:00 PM", title: "Lunch at Saravana Bhavan", description: "Classic South Indian thali served with sambar and rasam.", estimatedCost: foodCost1, category: "food", duration: "1h" },
        { time: "03:00 PM", title: "Marina Beach Evening Walk", description: "Stroll along one of the longest natural sandy urban beaches in the world.", estimatedCost: 0, category: "activity", duration: "2h" },
        { time: "07:30 PM", title: "Stay at ITC Grand Chola", description: "Premium architectural palace luxury stay.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ][dayIndex % 1];
  }
  // Hyderabad Fallback
  else if (destLower.includes("hyderabad")) {
    rawList = [
      [
        { time: "09:30 AM", title: "Golconda Fort Guided Trek", description: "Explore the historic ruins and acoustic wonders of the fortress.", estimatedCost: Math.round(12 * exchangeRate), category: "activity", duration: "3h" },
        { time: "01:00 PM", title: "Lunch at Paradise Biryani", description: "Feast on world-famous Hyderabadi mutton dum biryani.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "03:30 PM", title: "Charminar & Laad Bazaar Stroll", description: "Iconic 16th-century monument and market famous for glass bangles.", estimatedCost: Math.round(5 * exchangeRate), category: "activity", duration: "2.5h" },
        { time: "07:30 PM", title: "Stay at Taj Falaknuma Palace", description: "Luxury palace hotel stay.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "08:30 AM", title: "Ramoji Film City Studio Tour", description: "Complete guided day trip through the largest film studio complex in the world.", estimatedCost: actCost, category: "activity", duration: "6h" },
        { time: "04:30 PM", title: "Hussain Sagar Lake Yachting", description: "Watch sunset next to the massive monolith Buddha statue in the lake.", estimatedCost: Math.round(10 * exchangeRate), category: "activity", duration: "2h" },
        { time: "07:30 PM", title: "Stay at Taj Falaknuma Palace", description: "Luxury palace hotel stay.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "09:30 AM", title: "Chowmahalla Palace Heritage Walk", description: "Explore the grand court halls, vintage cars, and gardens of the Nizams.", estimatedCost: Math.round(10 * exchangeRate), category: "activity", duration: "3h" },
        { time: "01:00 PM", title: "Lunch at Jewel of Nizam", description: "Fine dining Mughlai experience inside a high tower.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "03:30 PM", title: "Jubilee Hills Shopping", description: "Stroll down premium designer boutiques and organic cafes.", estimatedCost: foodCost2, category: "activity", duration: "2.5h" },
        { time: "07:30 PM", title: "Stay at Taj Falaknuma Palace", description: "Luxury palace hotel stay.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ][dayIndex % 3];
  }
  // Foreign Fallbacks (Kyoto, Paris, etc. or generic)
  else if (destLower.includes("paris")) {
    rawList = [
      [
        { time: "09:00 AM", title: "Eiffel Tower Summit", description: "Pre-booked lift tickets to the highest panoramic view of Paris.", estimatedCost: actCost, category: "activity", duration: "2h" },
        { time: "12:30 PM", title: "Lunch at French Bistro", description: "Indulge in delicious steak frites and warm chocolate souffles.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "03:00 PM", title: "Louvre Museum Art Tour", description: "See the Mona Lisa, Winged Victory, and glass pyramids.", estimatedCost: Math.round(20 * exchangeRate), category: "activity", duration: "3h" },
        { time: "07:35 PM", title: "Stay at Hotel de Seine", description: "Charming rooms in Saint-Germain-des-Pres.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "09:30 AM", title: "Champs-Elysees & Arc de Triomphe", description: "Stroll down the grand avenue and visit the rooftop war memorial.", estimatedCost: Math.round(12 * exchangeRate), category: "activity", duration: "2.5h" },
        { time: "01:00 PM", title: "Seine River Cruise Lunch", description: "Delicious gourmet dining on a glass-topped boat cruising the river.", estimatedCost: actCost, category: "food", duration: "2h" },
        { time: "03:30 PM", title: "Montmartre & Sacre-Coeur Walk", description: "Visit the artists' square (Place du Tertre) and the white dome church.", estimatedCost: Math.round(5 * exchangeRate), category: "activity", duration: "3h" },
        { time: "07:35 PM", title: "Stay at Hotel de Seine", description: "Charming rooms in Saint-Germain-des-Pres.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ][dayIndex % 2];
  }
  // Default Generic Premium Fallback
  else {
    rawList = [
      [
        { time: "09:00 AM", title: `Explore Central ${destination}`, description: `A comprehensive guided tour of iconic city centers and sights in ${destination}.`, estimatedCost: actCost, category: "activity", duration: "3h" },
        { time: "12:30 PM", title: "Local Culinary Secrets", description: "Taste-testing regional gourmet specialties at a top-rated restaurant.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "03:00 PM", title: "Art & Culture Shopping Walk", description: "Visit boutique stores, local art galleries, and craft workshops.", estimatedCost: foodCost2, category: "activity", duration: "2.5h" },
        { time: "07:30 PM", title: "Premium Boutique Resort", description: "Relax and rejuvenate in style with full spa and dinner amenities.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ],
      [
        { time: "09:30 AM", title: "Scenic Nature & Panoramic Points", description: "Guided walk through scenic valleys, forests, or high points of interest.", estimatedCost: actCost, category: "activity", duration: "2.5h" },
        { time: "01:00 PM", title: "Lunch at Riverside/Hill Café", description: "Fine bistro dining with beautiful panoramic views.", estimatedCost: foodCost1, category: "food", duration: "1.5h" },
        { time: "03:30 PM", title: "Historic Landmark Exploration", description: "Learn about the heritage, history, and ancient stories of the city.", estimatedCost: Math.round(10 * exchangeRate), category: "activity", duration: "3h" },
        { time: "07:30 PM", title: "Premium Boutique Resort", description: "Relax and rejuvenate in style with full spa and dinner amenities.", estimatedCost: stayCost, category: "stay", duration: "12h" }
      ]
    ][dayIndex % 2];
  }

  return rawList.map((act, index) => {
    return {
      ...act,
      mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.title + " " + destination)}`,
      travelTime: index === 0 ? "Check-in arrival" : "15-20 mins transit"
    };
  });
};

const generateMockItinerary = (destination, startDate, endDate, travelers, interests, budget) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive

  const dailyBudget = Math.round(budget / Math.max(1, diffDays));
  const days = [];

  for (let i = 0; i < diffDays; i++) {
    const currentDate = addDays(startDate, i);
    const dayActivities = getLocalizedActivities(destination, i, dailyBudget);
    days.push({
      date: currentDate,
      activities: dayActivities
    });
  }

  return { days };
};

const generateMockDayActivities = (destination, dayIndex, interests, dailyBudget, exchangeRate = 1.0) => {
  return getLocalizedActivities(destination, dayIndex, dailyBudget, exchangeRate);
};

// Call OpenAI helper
const getItineraryFromAI = async (prompt, isSingleDay = false) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API key is missing in environment variables.");
  }

  const systemContent = isSingleDay
    ? `You are an expert travel assistant. Generate activities for a single day of a trip.
Return ONLY a valid JSON object matching this schema. Do not write any markdown code blocks, HTML, or conversational text.
Schema:
{
  "activities": [
    {
      "time": "09:00 AM",
      "title": "Activity name",
      "description": "Short engaging description",
      "estimatedCost": 25,
      "category": "stay|food|activity|transport",
      "duration": "2h",
      "mapsLink": "https://www.google.com/maps/search/?api=1&query=...",
      "travelTime": "15 mins drive from previous spot"
    }
  ]
}`
    : `You are a premium travel planner. Generate a highly detailed day-by-day itinerary.
Return ONLY a valid JSON object matching this schema. Do not write any markdown formatting, code blocks, or explanations.
Schema:
{
  "country": "Country name (e.g. India, Japan, UK)",
  "currencyCode": "Currency ISO code (e.g. INR, JPY, GBP, EUR)",
  "currencySymbol": "Currency symbol (e.g. ₹, ¥, £, €)",
  "destinationDetails": {
    "region": "State or Region name",
    "latitude": 35.6762,
    "longitude": 139.6503,
    "popularAttractions": ["Attraction A", "Attraction B"],
    "imageUrl": "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7"
  },
  "days": [
    {
      "date": "YYYY-MM-DD",
      "activities": [
        {
          "time": "09:00 AM",
          "title": "Activity name",
          "description": "Short premium description",
          "estimatedCost": 45,
          "category": "stay|food|activity|transport",
          "duration": "3h",
          "mapsLink": "https://www.google.com/maps/search/?api=1&query=...",
          "travelTime": "15 mins drive"
        }
      ]
    }
  ]
}`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  const content = response.data.choices[0].message.content.trim();
  return JSON.parse(content);
};

// @desc    Generate full itinerary for a trip
// @route   POST /api/trips/:id/generate-itinerary
// @access  Private
export const generateItinerary = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      res.status(404);
      return next(new Error("Trip not found"));
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error("Not authorized to modify this trip"));
    }

    const currencyInfo = detectCountryCurrency(trip.destination);
    const exchangeRate = await getExchangeRate(currencyInfo.code, currencyInfo.fallbackRate);
    const localBudget = Math.round(trip.budget * exchangeRate);

    // Initial pre-save of currency code for fallbacks
    trip.country = currencyInfo.country;
    trip.currencyCode = currencyInfo.code;
    trip.currencySymbol = currencyInfo.symbol;

    const prompt = `Generate a highly unique, non-duplicating day-by-day travel itinerary for a trip to: "${trip.destination}".
Start date: ${trip.startDate}
End date: ${trip.endDate}
Budget limit in USD: $${trip.budget}
Travelers: ${trip.travelers}
Interests: ${trip.interests.join(", ")}

Requirements:
1. DETECT the target country, its local currency ISO code (e.g. INR, JPY, EUR, GBP, BRL, AED, etc.), and currency symbol (e.g. ₹, ¥, €, £, R$, etc.) for the destination "${trip.destination}".
2. CONVERT the USD budget limit ($${trip.budget}) to that local currency using current exchange rates, and output this converted number in "localBudget" at the root of the JSON response.
3. Return "country", "currencyCode", and "currencySymbol" in the root of the JSON response.
4. DETECT state/region name, coordinates (latitude & longitude), and list of 3-4 popular attractions near "${trip.destination}" and return them in "destinationDetails".
5. Display ALL activity estimated costs, lodging, and dining costs in that local currency (matching the computed localBudget).
6. Every single day MUST contain different attractions and activities. Do NOT duplicate or copy-paste the same attractions across multiple days.
7. For each activity:
   - Provide a "mapsLink" which is a Google Maps search URL (e.g. "https://www.google.com/maps/search/?api=1&query=...")
   - Provide "travelTime" indicating the estimated travel time from the previous activity of the day (e.g. "15 mins drive" or "Walk across the street").
8. Provide a beautiful, high-quality Unsplash image URL related to the destination in "destinationDetails.imageUrl" (e.g., "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7").`;

    let itineraryData = null;
    let attempts = 0;
    let useFallback = false;

    while (attempts < 2) {
      try {
        console.log(`AI Itinerary Generation Attempt ${attempts + 1}...`);
        const rawData = await getItineraryFromAI(prompt, false);
        const sanitized = sanitizeAndValidateItinerary(rawData);
        if (sanitized) {
          itineraryData = sanitized;
          break;
        }
        console.warn("Invalid itinerary schema returned, retrying...");
      } catch (err) {
        console.error(`Attempt ${attempts + 1} failed:`, err.message);
        if (
          err.response?.status === 429 ||
          err.response?.status === 401 ||
          err.message.includes("429") ||
          err.message.includes("quota")
        ) {
          useFallback = true;
          break;
        }
      }
      attempts++;
    }

    if (useFallback || !itineraryData) {
      console.log("Generating premium localized mock itinerary fallback...");
      itineraryData = generateMockItinerary(
        trip.destination,
        trip.startDate,
        trip.endDate,
        trip.travelers,
        trip.interests,
        trip.budget
      );
    }

    // Save itinerary to trip
    trip.days = itineraryData.days;
    trip.country = itineraryData.country || currencyInfo.country;
    trip.currencyCode = itineraryData.currencyCode || currencyInfo.code;
    trip.currencySymbol = itineraryData.currencySymbol || currencyInfo.symbol;
    trip.localBudget = localBudget;
    trip.exchangeRate = exchangeRate;
    trip.destinationDetails = {
      region: itineraryData.destinationDetails?.region || "",
      latitude: itineraryData.destinationDetails?.latitude || 0,
      longitude: itineraryData.destinationDetails?.longitude || 0,
      popularAttractions: itineraryData.destinationDetails?.popularAttractions || [],
      imageUrl: itineraryData.destinationDetails?.imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
    };
    
    trip.status = "generated";
    const updatedTrip = await trip.save();

    res.json(updatedTrip);
  } catch (error) {
    next(error);
  }
};

// @desc    Regenerate a single day in a trip
// @route   POST /api/trips/:id/regenerate-day/:dayIndex
// @access  Private
export const regenerateDay = async (req, res, next) => {
  try {
    const { id, dayIndex } = req.params;
    const idx = parseInt(dayIndex, 10);

    const trip = await Trip.findById(id);
    if (!trip) {
      res.status(404);
      return next(new Error("Trip not found"));
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error("Not authorized to modify this trip"));
    }

    if (isNaN(idx) || idx < 0 || idx >= trip.days.length) {
      res.status(400);
      return next(new Error("Invalid day index"));
    }

    const targetDay = trip.days[idx];
    const currencyInfo = detectCountryCurrency(trip.destination);
    const exchangeRate = await getExchangeRate(trip.currencyCode || currencyInfo.code, currencyInfo.fallbackRate);
    const dailyBudget = Math.round((trip.budget * exchangeRate) / trip.days.length);

    const prompt = `Regenerate the activities for Day ${idx + 1} of a trip to ${trip.destination}.
Date: ${targetDay.date}
Interests: ${trip.interests.join(", ")}
Budget segment in ${trip.currencyCode || currencyInfo.code}: Daily share is around ${trip.currencySymbol || currencyInfo.symbol}${dailyBudget}.
Provide 3-4 unique, engaging travel activities tailored for this day. 
Requirements:
- Estimated cost must be in ${trip.currencyCode || currencyInfo.code}.
- Provide Google Map search links ("mapsLink") and travel time offsets ("travelTime") for each activity.`;

    let activities = null;
    let attempts = 0;
    let useFallback = false;
    while (attempts < 2) {
      try {
        console.log(`AI Day Regeneration Attempt ${attempts + 1}...`);
        const rawData = await getItineraryFromAI(prompt, true);
        if (rawData && Array.isArray(rawData.activities)) {
          activities = sanitizeActivities(rawData.activities);
          break;
        }
      } catch (err) {
        console.error(`Attempt ${attempts + 1} failed:`, err.message);
        if (
          err.response?.status === 429 ||
          err.response?.status === 401 ||
          err.message.includes("429") ||
          err.message.includes("quota")
        ) {
          useFallback = true;
          break;
        }
      }
      attempts++;
    }

    if (useFallback || !activities || activities.length === 0) {
      console.log("Generating mock fallback activities for day...");
      activities = generateMockDayActivities(trip.destination, idx, trip.interests, dailyBudget, exchangeRate);
    }

    // Replace the activities for that day
    trip.days[idx].activities = activities;
    const updatedTrip = await trip.save();

    res.json(updatedTrip);
  } catch (error) {
    next(error);
  }
};