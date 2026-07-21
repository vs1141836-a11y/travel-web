import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bed, Star, MapPin, Wifi, Car, Dumbbell, Utensils, Waves, Sun, Gift, BellRing, ExternalLink, ArrowUpDown, ShieldCheck, CheckCircle2 } from "lucide-react";
import { getDestData } from "../../utils/travelData";

const amenityIcons = {
  "Free WiFi": <Wifi size={10} />,
  "Airport Shuttle": <Car size={10} />,
  "Gym": <Dumbbell size={10} />,
  "Restaurant": <Utensils size={10} />,
  "Pool": <Waves size={10} />,
  "Spa": <Sun size={10} />,
  "Breakfast": <Gift size={10} />,
  "Butler": <BellRing size={10} />,
  "Room Service": <BellRing size={10} />,
};

const getDefaultIcon = (amenity) => {
  if (amenity.includes("WiFi") || amenity.includes("Internet")) return <Wifi size={10} />;
  if (amenity.includes("Pool") || amenity.includes("Spa")) return <Waves size={10} />;
  if (amenity.includes("Gym") || amenity.includes("Fitness")) return <Dumbbell size={10} />;
  if (amenity.includes("Restaurant") || amenity.includes("Bar")) return <Utensils size={10} />;
  if (amenity.includes("Butler") || amenity.includes("Concierge")) return <BellRing size={10} />;
  if (amenity.includes("Shuttle") || amenity.includes("Parking")) return <Car size={10} />;
  return <Gift size={10} />;
};

const BUDGET_TABS = [
  { key: "budget", label: "Budget Hostels & Inns", color: "text-emerald-400 border-emerald-400 bg-emerald-400/10" },
  { key: "standard", label: "3-Star Standard Stays", color: "text-sky-400 border-sky-400 bg-sky-400/10" },
  { key: "premium", label: "4-Star Premium Resorts", color: "text-purple-400 border-purple-400 bg-purple-400/10" },
  { key: "luxury", label: "5-Star Luxury Suites", color: "text-amber-400 border-amber-400 bg-amber-400/10" },
];

const SORT_OPTIONS = [
  { key: "value", label: "Best Value" },
  { key: "price_asc", label: "Cheapest First" },
  { key: "rating_desc", label: "Highest Rated" },
  { key: "distance_asc", label: "Closest to Center" },
];

const StayRecommendations = ({ destination }) => {
  const [activeTab, setActiveTab] = useState("budget");
  const [sortBy, setSortBy] = useState("value");

  const data = getDestData(destination);

  if (!data || !data.hotels) {
    return (
      <div className="glass p-8 rounded-2xl border border-zinc-800 text-center flex flex-col items-center gap-3">
        <Bed className="text-brand-accent animate-pulse" size={32} />
        <h3 className="text-lg font-bold">Curating Stays for {destination || "Destination"}...</h3>
        <p className="text-zinc-400 text-xs max-w-md">Finding verified hotel deals across Booking.com and TripAdvisor.</p>
      </div>
    );
  }

  const rawHotels = data.hotels[activeTab] || [];

  // Parse price number helper
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Parse distance number helper
  const parseDistance = (distStr) => {
    if (!distStr) return 99;
    const match = distStr.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 99;
  };

  // Sort hotels
  const sortedHotels = [...rawHotels].sort((a, b) => {
    if (sortBy === "price_asc") return parsePrice(a.pricePerNight) - parsePrice(b.pricePerNight);
    if (sortBy === "rating_desc") return b.rating - a.rating;
    if (sortBy === "distance_asc") return parseDistance(a.distance) - parseDistance(b.distance);
    return b.rating - a.rating; // Default best value
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
            <Bed size={12} />
            Booking.com & TripAdvisor Verified
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-0.5">Hotel & Accommodation Guide</h3>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl self-start md:self-auto">
          <ArrowUpDown size={12} className="text-zinc-400" />
          <span className="text-[10px] font-semibold text-zinc-500 uppercase">Sort By:</span>
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

      {/* Tier Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {BUDGET_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-3 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all duration-200 cursor-pointer text-center flex flex-col items-center gap-1 ${
              activeTab === tab.key
                ? `${tab.color} border-brand-accent shadow-lg shadow-brand-accent/10`
                : "border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-white"
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <AnimatePresence mode="wait">
          {sortedHotels.map((hotel, idx) => (
            <motion.div
              key={hotel.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-zinc-900/70 border border-zinc-800/90 rounded-2xl overflow-hidden hover:border-brand-accent/40 hover:shadow-xl hover:shadow-brand-accent/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-zinc-800">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-zinc-950/80 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 border border-zinc-800">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    {hotel.rating} / 5
                  </div>

                  <div className="absolute bottom-3 left-3 bg-brand-accent/90 text-zinc-950 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow">
                    {activeTab === "luxury" ? "5★ Luxury" : activeTab === "premium" ? "4★ Premium" : activeTab === "standard" ? "3★ Standard" : "Hostel & Inn"}
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-2.5">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-base text-white leading-snug">{hotel.name}</h4>
                    <div className="text-right shrink-0">
                      <span className="text-lg font-extrabold text-brand-accent block leading-none">{hotel.pricePerNight}</span>
                      <span className="text-[9px] text-zinc-500 font-semibold uppercase">per night</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <MapPin size={12} className="text-amber-400 shrink-0" />
                    <span>{hotel.distance} from city center</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5 my-1">
                    {hotel.amenities.map((amenity) => (
                      <span key={amenity} className="flex items-center gap-1 text-[10px] font-medium text-zinc-300 bg-zinc-800/80 px-2 py-0.5 rounded-md border border-zinc-800">
                        {amenityIcons[amenity] || getDefaultIcon(amenity)}
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Policies */}
                  <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-semibold bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/40">
                    <CheckCircle2 size={12} className="shrink-0" />
                    <span>Free Cancellation Available • Pay at Property option</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <a
                  href={hotel.bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-brand-accent hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-brand-accent/10"
                >
                  <ExternalLink size={13} />
                  Book on Booking.com
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StayRecommendations;
