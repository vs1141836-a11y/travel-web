import React, { useState } from "react";
import { Plane, Train, Car, Bus, Bike, CheckCircle, Globe, BookOpen, ShieldCheck, Smartphone, PlaneLanding, MapPin, Zap, Clock, ShieldAlert, Wifi, CreditCard } from "lucide-react";
import { getDestData } from "../../utils/travelData";

const TransportSection = ({ label, children }) => (
  <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 flex flex-col gap-3">
    <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
      {label}
    </h4>
    {children}
  </div>
);

const TransportationGuide = ({ source = "India", destination }) => {
  const [activeOption, setActiveOption] = useState("recommended");
  const data = getDestData(destination);

  if (!data) {
    return (
      <div className="glass p-8 rounded-2xl border border-zinc-800 text-center flex flex-col items-center gap-3">
        <Plane className="text-brand-accent animate-pulse" size={32} />
        <h3 className="text-lg font-bold">Mapping Journey to {destination}...</h3>
        <p className="text-zinc-400 text-xs max-w-md">Calculating flights, layovers, airport trains, and ground transportation.</p>
      </div>
    );
  }

  const isInternational = source?.toLowerCase().trim() !== data.country?.toLowerCase().trim();
  const { transport } = data;

  const TRANSPORT_BADGES = [
    { id: "recommended", label: "⭐ Recommended Journey", desc: "Optimal balance of flight duration, comfort, and transit" },
    { id: "fastest", label: "⚡ Fastest Route", desc: "Direct flight option with minimum airport layovers" },
    { id: "cheapest", label: "💰 Cheapest Fare", desc: "Budget flight with 1 layover + local airport train" },
    { id: "comfortable", label: "🛋️ Premium Comfort", desc: "Full-service airline + private airport transfer" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Journey Hero Banner */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col gap-4 relative overflow-hidden">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="bg-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-brand-accent/30 flex items-center gap-1">
              <Globe size={12} />
              {isInternational ? "International Multi-Modal Route" : "Domestic Route"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Clock size={14} className="text-amber-400" />
            <span>Est. Total Travel Time: <strong>10h 30m</strong></span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 my-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-black text-brand-accent text-lg">
              {source.slice(0, 3).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Origin City</span>
              <h3 className="text-xl font-extrabold text-white">{source}</h3>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center max-w-xs px-4">
            <span className="text-[10px] text-brand-accent font-bold tracking-wider uppercase">Direct Flight + Train</span>
            <div className="w-full flex items-center gap-2 my-1">
              <div className="h-0.5 flex-1 bg-zinc-800" />
              <Plane size={16} className="text-brand-accent rotate-90 shrink-0" />
              <div className="h-0.5 flex-1 bg-zinc-800" />
            </div>
            <span className="text-[9px] text-zinc-500 font-mono">Schiphol Airport AMS</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Destination</span>
              <h3 className="text-xl font-extrabold text-white">{data.name}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-accent text-zinc-950 flex items-center justify-center font-black text-lg">
              {data.name.slice(0, 3).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Option Filter Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-zinc-800/80">
          {TRANSPORT_BADGES.map((badge) => (
            <button
              key={badge.id}
              onClick={() => setActiveOption(badge.id)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col ${
                activeOption === badge.id
                  ? "bg-brand-accent/15 border-brand-accent text-white"
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:border-zinc-700"
              }`}
            >
              <span className="text-xs font-bold">{badge.label}</span>
              <span className="text-[9px] text-zinc-400 leading-tight mt-0.5">{badge.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Complete Step-by-Step Travel Timeline */}
      <TransportSection label="Complete Travel Journey Blueprint">
        <div className="relative pl-6 border-l-2 border-brand-accent/40 flex flex-col gap-6 my-2">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-brand-accent text-zinc-950 flex items-center justify-center font-black text-xs">
              1
            </div>
            <h5 className="font-bold text-sm text-white">Departure & Airport Boarding</h5>
            <p className="text-xs text-zinc-400 mt-0.5">
              Depart from <strong>{transport?.departureAirports?.join(" / ") || "Delhi / Mumbai Airport"}</strong>. Arrive 3 hours prior to departure for international web check-in and luggage drop.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-zinc-800 border border-brand-accent text-brand-accent flex items-center justify-center font-black text-xs">
              2
            </div>
            <h5 className="font-bold text-sm text-white">In-Flight Journey & Layovers</h5>
            <p className="text-xs text-zinc-400 mt-0.5">
              In-flight duration ~<strong>{transport?.flights?.[0]?.duration || "9 hours"}</strong>. Enjoy in-flight meals and streaming entertainment. Non-stop flights bypass layovers.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-zinc-800 border border-emerald-400 text-emerald-400 flex items-center justify-center font-black text-xs">
              3
            </div>
            <h5 className="font-bold text-sm text-white">Arrival, Passport Control & Customs</h5>
            <p className="text-xs text-zinc-400 mt-0.5">
              Land at <strong>{transport?.arrivalAirport || "Amsterdam Schiphol Airport (AMS)"}</strong>. Proceed through Passport Control & EU Immigration. Have passport, visa, and insurance documents handy.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-emerald-400 text-zinc-950 flex items-center justify-center font-black text-xs">
              4
            </div>
            <h5 className="font-bold text-sm text-white">Airport Transit to City Center</h5>
            <p className="text-xs text-zinc-400 mt-0.5">
              Catch the Direct Airport Train or Metro to city center (15–20 mins, €5.60). Pick up an Airalo eSIM or local SIM card at arrival hall.
            </p>
          </div>
        </div>
      </TransportSection>

      {/* Travel Requirements Grid */}
      {isInternational && (
        <TransportSection label="Immigration & Entry Guidelines">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800">
              <Globe size={16} className="text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Passport Validity Rule</p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Must be valid for at least 6 months beyond intended stay with 2 blank pages.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800">
              <BookOpen size={16} className="text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Schengen / Entry Visa</p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Ensure valid tourist visa & hotel booking confirmations are available for immigration inspection.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800">
              <ShieldCheck size={16} className="text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Travel Medical Insurance</p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Mandatory €30,000 emergency medical coverage required for Schengen entries.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800">
              <Smartphone size={16} className="text-sky-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Airport SIM & Wi-Fi</p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Free Schiphol Airport Wi-Fi. Pick up Airalo eSIM or Lebara SIM card at Arrival Hall 1.</p>
              </div>
            </div>
          </div>
        </TransportSection>
      )}

      {/* Local Ground Transport Options */}
      {transport?.localTransport && (
        <TransportSection label="Airport Ground Transportation Options">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {transport.localTransport.map((item, idx) => (
              <div key={idx} className="bg-zinc-950/60 border border-zinc-800 rounded-xl p-3.5 flex items-start gap-3 hover:border-zinc-700 transition-colors">
                {item.type === "Train" && <Train size={18} className="text-indigo-400 mt-0.5 shrink-0" />}
                {item.type === "Metro" && <Train size={18} className="text-sky-400 mt-0.5 shrink-0" />}
                {item.type === "Taxi" && <Car size={18} className="text-amber-400 mt-0.5 shrink-0" />}
                {item.type === "Bus" && <Bus size={18} className="text-emerald-400 mt-0.5 shrink-0" />}
                {item.type === "Bike Rental" && <Bike size={18} className="text-purple-400 mt-0.5 shrink-0" />}
                <div>
                  <h5 className="text-xs font-bold text-white">{item.type}</h5>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </TransportSection>
      )}
    </div>
  );
};

export default TransportationGuide;
