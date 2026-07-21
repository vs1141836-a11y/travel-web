import React, { useState } from "react";
import { Plane, Train, Car, Bus, Bike, CheckCircle, Globe, BookOpen, ShieldCheck, Smartphone, PlaneLanding, MapPin, Zap, Clock, ShieldAlert, Wifi, CreditCard, Navigation, ExternalLink, Filter } from "lucide-react";
import { getDestData } from "../../utils/travelData";

const TransportSection = ({ label, children }) => (
  <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 flex flex-col gap-3">
    <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
      {label}
    </h4>
    {children}
  </div>
);

const TransportationGuide = ({ source = "Origin", destination = "Destination" }) => {
  const [selectedMode, setSelectedMode] = useState("all");
  const [activeBadge, setActiveBadge] = useState("recommended");

  const data = getDestData(destination);

  if (!data) {
    return (
      <div className="glass p-8 rounded-2xl border border-zinc-800 text-center flex flex-col items-center gap-3">
        <Train className="text-brand-accent animate-pulse" size={32} />
        <h3 className="text-lg font-bold">Mapping All Travel Modes for {destination}...</h3>
        <p className="text-zinc-400 text-xs max-w-md">Calculating trains, buses, car rentals, flights, and local transit.</p>
      </div>
    );
  }

  const isInternational = source?.toLowerCase().trim() !== data.country?.toLowerCase().trim();
  const { transport } = data;

  const TRANSPORT_MODES = [
    { id: "all", label: "All Travel Modes", icon: Navigation },
    { id: "flight", label: "✈️ Flights & Airlines", icon: Plane },
    { id: "train", label: "🚆 Express & High-Speed Rail", icon: Train },
    { id: "bus", label: "🚌 Intercity Volvo Buses", icon: Bus },
    { id: "car", label: "🚗 Self-Drive & Taxi Cab", icon: Car },
  ];

  // Helper generator for realistic multi-modal options between source and destination
  const getMultiModalOptions = () => {
    return [
      {
        id: "train-1",
        mode: "train",
        title: `Express / High-Speed Train (${source} ➔ ${destination})`,
        operator: "National Railway / High-Speed Express Rail",
        duration: "3h 45m - 6h 15m",
        price: "₹850 - ₹2,400 / €35 - €85",
        features: ["Sleeper & AC Chair Class", "Pantry Car & Meals", "Station-to-Station Direct", "No Baggage Weight Limit"],
        badge: "⭐ Most Popular & Comfortable",
        bookingUrl: `https://www.google.com/search?q=trains+from+${encodeURIComponent(source)}+to+${encodeURIComponent(destination)}`
      },
      {
        id: "bus-1",
        mode: "bus",
        title: `Intercity AC Sleeper / Luxury Coach (${source} ➔ ${destination})`,
        operator: "FlixBus / RedBus / Volvo Multi-Axle",
        duration: "5h 30m - 8h 00m",
        price: "₹650 - ₹1,800 / €25 - €55",
        features: ["Reclining AC Sleeper Berth", "Free Onboard Wi-Fi", "Charging Sockets", "Frequent Daily Departures"],
        badge: "💰 Budget Friendly Choice",
        bookingUrl: `https://www.google.com/search?q=bus+from+${encodeURIComponent(source)}+to+${encodeURIComponent(destination)}`
      },
      {
        id: "car-1",
        mode: "car",
        title: `Self-Drive Rental or Private Taxi Transfer`,
        operator: "Uber / Highway Rental / Local Cab",
        duration: "4h 15m - 6h 00m",
        price: "₹3,500 - ₹6,500 / €90 - €180",
        features: ["Door-to-Door Pickup", "Flexible Stops & Scenic Highway", "Spacious Luggage Boot", "Ideal for Families"],
        badge: "🚗 Maximum Flexibility",
        bookingUrl: `https://www.google.com/search?q=cab+booking+from+${encodeURIComponent(source)}+to+${encodeURIComponent(destination)}`
      },
      {
        id: "flight-1",
        mode: "flight",
        title: `Commercial Airlines (${source} ➔ ${destination})`,
        operator: transport?.flights?.[0]?.airline || "Air India / KLM / Emirates",
        duration: transport?.flights?.[0]?.duration || "2h 15m direct",
        price: transport?.flights?.[0]?.price || "₹4,500 - ₹12,000 / €60 - €180",
        features: ["Fastest Travel Time", "Check-in Baggage Included", "Complimentary In-Flight Snacks", "Frequent Daily Flights"],
        badge: "⚡ Fastest Transit Option",
        bookingUrl: `https://www.google.com/travel/flights?q=flights+from+${encodeURIComponent(source)}+to+${encodeURIComponent(destination)}`
      }
    ];
  };

  const allModalOptions = getMultiModalOptions();
  const filteredModalOptions = allModalOptions.filter((item) => {
    if (selectedMode === "all") return true;
    return item.mode === selectedMode;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Journey Hero Banner */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col gap-4 relative overflow-hidden">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="bg-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-brand-accent/30 flex items-center gap-1">
              <Globe size={12} />
              {isInternational ? "International Multi-Modal Route" : "Domestic / Regional Route"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Clock size={14} className="text-amber-400" />
            <span>Multiple Transport Options Available</span>
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
            <span className="text-[10px] text-brand-accent font-bold tracking-wider uppercase">Trains • Buses • Cabs • Flights</span>
            <div className="w-full flex items-center gap-2 my-1">
              <div className="h-0.5 flex-1 bg-zinc-800" />
              <Navigation size={16} className="text-brand-accent shrink-0" />
              <div className="h-0.5 flex-1 bg-zinc-800" />
            </div>
            <span className="text-[9px] text-zinc-500 font-mono">Multi-Modal Intercity Transit</span>
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
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Navigation size={18} className="text-brand-accent" />
            Available Transportation Modes ({source} ➔ {destination})
          </h4>
          <span className="text-[10px] text-zinc-400 font-semibold hidden sm:inline">Select mode to compare fares & travel times</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {TRANSPORT_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                selectedMode === mode.id
                  ? "bg-brand-accent text-zinc-950 shadow-lg shadow-brand-accent/10"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Intercity Transport Options Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredModalOptions.map((item) => (
          <div key={item.id} className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-brand-accent/40 transition-all">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
                  {item.badge}
                </span>
                <span className="text-xs font-extrabold text-emerald-400">{item.price}</span>
              </div>

              <h4 className="text-base font-bold text-white mt-1">{item.title}</h4>
              <span className="text-xs text-zinc-400 font-medium">{item.operator} • Est. Time: <strong className="text-white">{item.duration}</strong></span>

              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-zinc-800/80">
                {item.features.map((feat, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                    <CheckCircle size={12} className="text-emerald-400 shrink-0" />
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href={item.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-zinc-800 hover:bg-brand-accent hover:text-zinc-950 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ExternalLink size={13} />
                Search & Book Tickets
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Step-by-Step Travel Blueprint */}
      <TransportSection label="Step-by-Step Travel Journey Blueprint">
        <div className="relative pl-6 border-l-2 border-brand-accent/40 flex flex-col gap-6 my-2">
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-brand-accent text-zinc-950 flex items-center justify-center font-black text-xs">
              1
            </div>
            <h5 className="font-bold text-sm text-white">Origin Departure & Station Boarding</h5>
            <p className="text-xs text-zinc-400 mt-0.5">
              Depart from central <strong>{source} Railway Station / Bus Terminal / Airport</strong>. For trains & buses, arrive 30 minutes prior. For flights, arrive 2-3 hours early.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-zinc-800 border border-brand-accent text-brand-accent flex items-center justify-center font-black text-xs">
              2
            </div>
            <h5 className="font-bold text-sm text-white">Intercity Journey & Scenic Route</h5>
            <p className="text-xs text-zinc-400 mt-0.5">
              Travel via high-speed train, luxury Volvo coach, private vehicle highway route, or commercial flight. Enjoy onboard Wi-Fi and food options.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-emerald-400 text-zinc-950 flex items-center justify-center font-black text-xs">
              3
            </div>
            <h5 className="font-bold text-sm text-white">Arrival & Local City Transit</h5>
            <p className="text-xs text-zinc-400 mt-0.5">
              Arrive at <strong>{data.name} Central Station / Bus Stand / Airport</strong>. Take local city metro, app cab (Uber/Ola/Bolt), or local bus directly to your hotel.
            </p>
          </div>
        </div>
      </TransportSection>

      {/* Local Ground Transport Options */}
      {transport?.localTransport && (
        <TransportSection label="City Center & Local Ground Transit Options">
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
