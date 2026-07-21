import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Clock, ArrowRight, ShieldCheck, Luggage, RefreshCw, Star, ExternalLink, Filter, ArrowUpDown } from "lucide-react";
import { getDestData } from "../../utils/travelData";

const SORT_OPTIONS = [
  { key: "best", label: "Best Value" },
  { key: "cheapest", label: "Cheapest First" },
  { key: "fastest", label: "Fastest First" },
];

const MOCK_FLIGHTS = [
  {
    airline: "KLM Royal Dutch Airlines",
    flightNo: "KL 872",
    logo: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=100&q=80",
    departureTime: "03:15 AM",
    departureCode: "DEL",
    arrivalTime: "08:30 AM",
    arrivalCode: "AMS",
    duration: "8h 45m",
    durationMinutes: 525,
    stops: "Non-stop",
    price: 48500,
    formattedPrice: "₹48,500",
    refundPolicy: "Free Date Change",
    cabinBaggage: "7 kg",
    checkInBaggage: "23 kg",
    rating: 4.7,
    bookingUrl: "https://www.google.com/travel/flights"
  },
  {
    airline: "Air India",
    flightNo: "AI 155",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&q=80",
    departureTime: "01:30 AM",
    departureCode: "DEL",
    arrivalTime: "07:15 AM",
    arrivalCode: "AMS",
    duration: "9h 15m",
    durationMinutes: 555,
    stops: "Non-stop",
    price: 42000,
    formattedPrice: "₹42,000",
    refundPolicy: "Partial Refund Available",
    cabinBaggage: "8 kg",
    checkInBaggage: "25 kg",
    rating: 4.3,
    bookingUrl: "https://www.google.com/travel/flights"
  },
  {
    airline: "Emirates",
    flightNo: "EK 501 / EK 147",
    logo: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=100&q=80",
    departureTime: "04:10 AM",
    departureCode: "DEL",
    arrivalTime: "01:20 PM",
    arrivalCode: "AMS",
    duration: "11h 40m",
    durationMinutes: 700,
    stops: "1 Stop (Dubai - 2h 15m layover)",
    price: 54000,
    formattedPrice: "₹54,000",
    refundPolicy: "Fully Refundable",
    cabinBaggage: "7 kg",
    checkInBaggage: "30 kg",
    rating: 4.8,
    bookingUrl: "https://www.google.com/travel/flights"
  },
  {
    airline: "Qatar Airways",
    flightNo: "QR 571 / QR 273",
    logo: "https://images.unsplash.com/photo-1520437358207-323b43b57529?w=100&q=80",
    departureTime: "03:45 AM",
    departureCode: "DEL",
    arrivalTime: "01:45 PM",
    arrivalCode: "AMS",
    duration: "12h 30m",
    durationMinutes: 750,
    stops: "1 Stop (Doha - 2h 40m layover)",
    price: 49900,
    formattedPrice: "₹49,900",
    refundPolicy: "Flexible Ticket Option",
    cabinBaggage: "7 kg",
    checkInBaggage: "30 kg",
    rating: 4.8,
    bookingUrl: "https://www.google.com/travel/flights"
  },
  {
    airline: "Etihad Airways",
    flightNo: "EY 211 / EY 77",
    logo: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=100&q=80",
    departureTime: "09:20 PM",
    departureCode: "DEL",
    arrivalTime: "07:50 AM",
    arrivalCode: "AMS",
    duration: "13h 00m",
    durationMinutes: 780,
    stops: "1 Stop (Abu Dhabi - 3h 00m layover)",
    price: 46200,
    formattedPrice: "₹46,200",
    refundPolicy: "Standard Cancellation",
    cabinBaggage: "7 kg",
    checkInBaggage: "30 kg",
    rating: 4.5,
    bookingUrl: "https://www.google.com/travel/flights"
  }
];

const FlightSearch = ({ source = "India", destination = "Destination" }) => {
  const [sortBy, setSortBy] = useState("best");
  const [stopFilter, setStopFilter] = useState("All");

  const data = getDestData(destination);
  const flightsList = data?.transport?.flights?.length
    ? data.transport.flights.map((f, idx) => ({
        airline: f.airline,
        flightNo: `FL-${100 + idx}`,
        departureTime: "03:30 AM",
        departureCode: source.slice(0, 3).toUpperCase(),
        arrivalTime: "09:45 AM",
        arrivalCode: destination.slice(0, 3).toUpperCase(),
        duration: f.duration,
        durationMinutes: idx === 0 ? 550 : 680,
        stops: f.type,
        price: parseInt(f.price.replace(/[^0-9]/g, "")) || 45000,
        formattedPrice: f.price,
        refundPolicy: "Free Date Change",
        cabinBaggage: f.baggage?.split(",")?.[1] || "7kg",
        checkInBaggage: f.baggage?.split(",")?.[0] || "25kg",
        rating: 4.6,
        bookingUrl: `https://www.google.com/travel/flights?q=flights+from+${encodeURIComponent(source)}+to+${encodeURIComponent(destination)}`
      }))
    : MOCK_FLIGHTS;

  const filteredFlights = flightsList.filter((f) => {
    if (stopFilter === "Non-stop") return f.stops.toLowerCase().includes("non-stop");
    if (stopFilter === "1 Stop") return f.stops.toLowerCase().includes("1 stop");
    return true;
  });

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortBy === "cheapest") return a.price - b.price;
    if (sortBy === "fastest") return a.durationMinutes - b.durationMinutes;
    return b.rating - a.rating;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
        <div>
          <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
            <Plane size={12} />
            Skyscanner & MakeMyTrip Flight Engine
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-0.5">
            Flights from {source} to {destination}
          </h3>
          <p className="text-zinc-400 text-xs mt-1">
            Comparing direct flights, baggage allowances, and flexible cancellation rules.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
            <Filter size={12} className="text-zinc-400" />
            <select
              value={stopFilter}
              onChange={(e) => setStopFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer"
            >
              <option value="All" className="bg-zinc-900 text-white">All Stops</option>
              <option value="Non-stop" className="bg-zinc-900 text-white">Non-stop Only</option>
              <option value="1 Stop" className="bg-zinc-900 text-white">1 Stop</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
            <ArrowUpDown size={12} className="text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key} className="bg-zinc-900 text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Flight Cards Grid */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="wait">
          {sortedFlights.map((flight, idx) => (
            <motion.div
              key={flight.airline + idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-zinc-900/80 border border-zinc-800/90 hover:border-brand-accent/40 rounded-2xl p-5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group shadow-lg"
            >
              {/* Airline Details */}
              <div className="flex items-center gap-4 min-w-[200px]">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center p-2 shrink-0 border border-zinc-700">
                  <Plane size={20} className="text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">{flight.airline}</h4>
                  <span className="text-[10px] text-zinc-400 font-mono block">{flight.flightNo}</span>
                  <div className="flex items-center gap-1 text-amber-400 text-[10px] font-bold mt-0.5">
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    {flight.rating} / 5 Rating
                  </div>
                </div>
              </div>

              {/* Flight Timeline */}
              <div className="flex-1 flex items-center justify-between gap-4 max-w-md bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800/60">
                <div className="text-center">
                  <span className="text-lg font-black text-white block">{flight.departureTime}</span>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">{flight.departureCode}</span>
                </div>

                <div className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-zinc-400 font-semibold">{flight.duration}</span>
                  <div className="w-full flex items-center gap-1">
                    <div className="h-[2px] flex-1 bg-zinc-700" />
                    <Plane size={12} className="text-brand-accent shrink-0 rotate-90" />
                    <div className="h-[2px] flex-1 bg-zinc-700" />
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${flight.stops.includes("Non-stop") ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-amber-950 text-amber-400 border border-amber-800"}`}>
                    {flight.stops}
                  </span>
                </div>

                <div className="text-center">
                  <span className="text-lg font-black text-white block">{flight.arrivalTime}</span>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">{flight.arrivalCode}</span>
                </div>
              </div>

              {/* Baggage & Policy badges */}
              <div className="flex flex-col gap-1 text-[11px] text-zinc-400 border-l border-zinc-800 pl-4">
                <div className="flex items-center gap-1.5">
                  <Luggage size={12} className="text-brand-accent" />
                  <span>Check-in: <strong>{flight.checkInBaggage}</strong> • Cabin: <strong>{flight.cabinBaggage}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck size={12} />
                  <span>{flight.refundPolicy}</span>
                </div>
              </div>

              {/* Pricing & Booking Action */}
              <div className="flex md:flex-col justify-between items-center md:items-end gap-3 shrink-0">
                <div className="text-left md:text-right">
                  <span className="text-2xl font-black text-brand-accent block leading-none">{flight.formattedPrice}</span>
                  <span className="text-[9px] text-zinc-500 uppercase font-semibold">per traveler</span>
                </div>

                <a
                  href={flight.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-brand-accent hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-brand-accent/10 cursor-pointer"
                >
                  Book Flight <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlightSearch;
