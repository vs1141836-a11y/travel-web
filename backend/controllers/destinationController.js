import axios from "axios";
import Trip from "../models/Trip.js";

const countryCurrencyMap = {
  "india": { code: "INR", symbol: "₹", name: "Indian Rupee" },
  "japan": { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  "united kingdom": { code: "GBP", symbol: "£", name: "British Pound" },
  "netherlands": { code: "EUR", symbol: "€", name: "Euro" },
  "france": { code: "EUR", symbol: "€", name: "Euro" },
  "germany": { code: "EUR", symbol: "€", name: "Euro" },
  "spain": { code: "EUR", symbol: "€", name: "Euro" },
  "italy": { code: "EUR", symbol: "€", name: "Euro" },
  "uae": { code: "AED", symbol: "AED", name: "UAE Dirham" },
  "dubai": { code: "AED", symbol: "AED", name: "UAE Dirham" },
  "australia": { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  "canada": { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  "thailand": { code: "THB", symbol: "฿", name: "Thai Baht" },
  "indonesia": { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
  "switzerland": { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  "turkey": { code: "TRY", symbol: "₺", name: "Turkish Lira" },
  "south korea": { code: "KRW", symbol: "₩", name: "South Korean Won" },
  "vietnam": { code: "VND", symbol: "₫", name: "Vietnamese Dong" },
  "malaysia": { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
  "singapore": { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  "egypt": { code: "EGP", symbol: "E£", name: "Egyptian Pound" },
  "brazil": { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  "mexico": { code: "MXN", symbol: "$", name: "Mexican Peso" },
};

// @desc    Get destination intelligence data
// @route   GET /api/destinations/:name/info
// @access  Public
export const getDestinationInfo = async (req, res, next) => {
  try {
    const { name } = req.params;
    const dest = name.toLowerCase().trim();
    
    let currency = { code: "USD", symbol: "$", name: "US Dollar" };
    for (const key of Object.keys(countryCurrencyMap)) {
      if (dest.includes(key)) {
        currency = countryCurrencyMap[key];
        break;
      }
    }

    let exchangeRate = 1;
    try {
      const response = await axios.get("https://open.er-api.com/v6/latest/INR");
      if (response.data?.rates?.[currency.code]) {
        exchangeRate = response.data.rates[currency.code];
      }
    } catch {
      const fallbackRates = { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0095, JPY: 1.8, AED: 0.044, IDR: 186, THB: 0.44, SGD: 0.016, CHF: 0.011, TRY: 0.39, KRW: 16, VND: 305, MYR: 0.056 };
      exchangeRate = fallbackRates[currency.code] || 1;
    }

    res.json({
      destination: name,
      currency,
      exchangeRate: { from: "INR", to: currency.code, rate: exchangeRate },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get exchange rate
// @route   GET /api/currency/rate
// @access  Public
export const getExchangeRate = async (req, res, next) => {
  try {
    const { from = "INR", to = "USD" } = req.query;
    
    const response = await axios.get(`https://open.er-api.com/v6/latest/${from.toUpperCase()}`);
    
    if (response.data?.rates?.[to.toUpperCase()]) {
      return res.json({
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        rate: response.data.rates[to.toUpperCase()],
      });
    }

    const fallback = { INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095, JPY: 1.8, AED: 0.044 } };
    res.json({
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      rate: fallback[from.toUpperCase()]?.[to.toUpperCase()] || 1,
      note: "Using fallback rate",
    });
  } catch (error) {
    next(error);
  }
};
