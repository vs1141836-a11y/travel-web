import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Clock, DollarSign, ExternalLink, ChevronDown, ChevronUp, Globe, ShieldCheck, Sun, Compass, Sparkles, Navigation, Layers } from "lucide-react";
import { getDestData } from "../../utils/travelData";

const CATEGORIES = [
  "All",
  "Famous Landmarks",
  "Museums",
  "Beaches & Nature",
  "Parks",
  "Historical",
  "Local Experiences",
  "Shopping & Nightlife"
];

const DestinationIntelligence = ({ destination }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [localTime, setLocalTime] = useState("");

  const data = getDestData(destination);

  // Live ticking local clock for destination
  useEffect(() => {
    const updateTime = () => {
      try {
        const tz = data?.timezone || "UTC";
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: tz === "CET" ? "Europe/Amsterdam" : tz === "JST" ? "Asia/Tokyo" : "UTC",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          weekday: "short",
          month: "short",
          day: "numeric"
        }).format(now);
        setLocalTime(formatted);
      } catch (err) {
        setLocalTime(new Date().toLocaleTimeString());
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [data]);

  if (!data) {
    return (
      <div className="glass p-8 rounded-2xl border border-zinc-800 text-center flex flex-col items-center gap-3">
        <Globe className="text-brand-accent animate-pulse" size={32} />
        <h3 className="text-lg font-bold">Discovering {destination || "Destination"}...</h3>
        <p className="text-zinc-400 text-xs max-w-md">Gathering local sights, attractions, and cultural intelligence for your trip.</p>
      </div>
    );
  }

  const rawAttractions = data.attractions || [];
  
  const filteredAttractions = rawAttractions.filter((item) => {
    if (selectedCategory === "All") return true;
    const cat = selectedCategory.toLowerCase();
    const text = (item.name + " " + item.description).toLowerCase();
    if (cat.includes("museum") && text.includes("museum")) return true;
    if (cat.includes("beach") && (text.includes("beach") || text.includes("park") || text.includes("nature") || text.includes("lake"))) return true;
    if (cat.includes("park") && text.includes("park")) return true;
    if (cat.includes("historic") && (text.includes("historic") || text.includes("palace") || text.includes("castle") || text.includes("square"))) return true;
    if (cat.includes("shopping") && (text.includes("shop") || text.includes("market") || text.includes("bar") || text.includes("night"))) return true;
    if (cat.includes("landmark") && (text.includes("tower") || text.includes("square") || text.includes("monument") || text.includes("icon"))) return true;
    return true;
  });

  const displayAttractions = expanded ? filteredAttractions : filteredAttractions.slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      {/* Hero Destination Intelligence Card */}
      <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 p-6 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent z-10" />
        <img
          src={data.attractions?.[0]?.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80"}
          alt={data.name}
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-105 opacity-40"
        />

        <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="bg-brand-accent/20 border border-brand-accent/40 text-brand-accent text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                <Globe size={12} />
                {data.country || "Worldwide"}
              </span>
              <span className="bg-zinc-800/80 text-zinc-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Clock size={12} className="text-amber-400" />
                Live Local Time: {localTime || "Loading..."}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{data.name}</h2>
            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
              Explore key destination insights, local landmarks, cultural details, safety indicators, and top-rated travel spots.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
              <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 p-2.5 rounded-xl">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase block">Currency</span>
                <span className="text-xs font-bold text-amber-400 mt-0.5 block">{data.currency?.symbol} {data.currency?.code} ({data.currency?.name})</span>
              </div>
              <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 p-2.5 rounded-xl">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase block">Language</span>
                <span className="text-xs font-bold text-white mt-0.5 block">{data.language || "English"}</span>
              </div>
              <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 p-2.5 rounded-xl">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase block">Safety Rating</span>
                <span className="text-xs font-bold text-emerald-400 mt-0.5 block flex items-center gap-1">
                  <ShieldCheck size={12} /> High (4.8/5)
                </span>
              </div>
              <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 p-2.5 rounded-xl">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase block">Avg Daily Cost</span>
                <span className="text-xs font-bold text-brand-accent mt-0.5 block">{data.currency?.symbol || "$"}85 - {data.currency?.symbol || "$"}180 / day</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col gap-3 min-w-[220px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <Sun size={12} className="text-amber-400" /> Best Time to Visit
            </span>
            <p className="text-xs font-semibold text-zinc-200">
              {data.weather?.bestSeason || "Spring to Autumn (Mild temperatures & festival seasons)"}
            </p>

            <div className="pt-2 border-t border-zinc-800/80 flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-zinc-500 uppercase">Visa Overview</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <Compass size={12} /> {data.visa?.type || "Standard Tourist Entry"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Attractions Header & Category Filters */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
              <MapPin size={11} />
              TripAdvisor & Google Places Guide
            </span>
            <h3 className="text-xl font-bold mt-0.5">Top Attractions & Landmarks in {data.name}</h3>
          </div>

          {filteredAttractions.length > 6 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-brand-accent hover:text-amber-400 transition-colors font-semibold cursor-pointer self-start sm:self-auto"
            >
              {expanded ? "Show Less" : `Show All (${filteredAttractions.length})`}
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-brand-accent text-zinc-950 font-bold shadow-lg shadow-brand-accent/20"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Attraction Grid */}
      {displayAttractions.length === 0 ? (
        <div className="glass p-8 rounded-xl text-center text-zinc-500 text-xs">
          No attractions found for "{selectedCategory}". Please select another category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {displayAttractions.map((attraction, idx) => (
              <motion.div
                key={attraction.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ delay: idx * 0.04 }}
                className="group relative bg-zinc-900/60 border border-zinc-800/90 rounded-2xl overflow-hidden hover:border-brand-accent/40 hover:shadow-xl hover:shadow-brand-accent/5 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-44 overflow-hidden bg-zinc-800">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-zinc-950/80 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 border border-zinc-800">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    {attraction.rating}
                    <span className="text-[9px] text-zinc-400 font-normal">({(Math.floor(attraction.rating * 2400)).toLocaleString()})</span>
                  </div>

                  <div className="absolute bottom-2 left-3 right-3">
                    <h4 className="font-bold text-base text-white leading-tight drop-shadow">{attraction.name}</h4>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">{attraction.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400 font-medium">
                    <span className="flex items-center gap-1.5 truncate">
                      <Clock size={12} className="text-brand-accent" />
                      {attraction.duration || "2-3 hours"}
                    </span>
                    <span className="flex items-center gap-1.5 truncate">
                      <DollarSign size={12} className="text-emerald-400" />
                      Fee: {attraction.entryFee || "Free"}
                    </span>
                    <span className="flex items-center gap-1.5 truncate col-span-2">
                      <Navigation size={12} className="text-amber-400" />
                      Distance: {attraction.distance || "1.2 km from city center"}
                    </span>
                  </div>

                  <a
                    href={attraction.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-1 py-2 bg-zinc-800/80 hover:bg-brand-accent hover:text-zinc-950 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer"
                  >
                    <ExternalLink size={12} />
                    Open in Google Maps
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default DestinationIntelligence;
