import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Search, Shield, Train, Phone, MessageSquare, Globe, Zap, Wifi, Smartphone, CreditCard, Umbrella, Thermometer, CheckCircle, Clock, DollarSign, CheckSquare, Square, Luggage } from "lucide-react";
import { getDestData, generalTravelTips } from "../../utils/travelData";
import Card from "../ui/Card";

const tipIcons = {
  Shield: Shield, Train: Train, Phone: Phone, MessageSquare: MessageSquare,
  Globe: Globe, Zap: Zap, Wifi: Wifi, Smartphone: Smartphone,
  CreditCard: CreditCard, Umbrella: Umbrella, Thermometer: Thermometer,
  CheckCircle: CheckCircle, Clock: Clock, DollarSign: DollarSign,
};

const DEFAULT_PACKING_ITEMS = [
  { id: 1, name: "Passport (Valid 6+ months)", category: "Documents", checked: true },
  { id: 2, name: "Schengen / Entry Tourist Visa", category: "Documents", checked: true },
  { id: 3, name: "Travel Insurance Document (€30k min)", category: "Documents", checked: false },
  { id: 4, name: "Hotel & Flight Printouts / PDFs", category: "Documents", checked: false },
  { id: 5, name: "Universal Power Plug Adapter (Type C/F)", category: "Electronics", checked: false },
  { id: 6, name: "Power Bank (10,000mAh+)", category: "Electronics", checked: false },
  { id: 7, name: "Airalo eSIM / Local SIM card details", category: "Electronics", checked: false },
  { id: 8, name: "Layered Jackets & Waterproof Outerwear", category: "Clothes", checked: false },
  { id: 9, name: "Comfortable Walking Sneakers", category: "Clothes", checked: false },
  { id: 10, name: "Sunglasses & UV Sunscreen", category: "Toiletries", checked: false },
  { id: 11, name: "First Aid Kit & Motion Sickness Meds", category: "Medicines", checked: false },
  { id: 12, name: "Personal Prescription Medications", category: "Medicines", checked: false },
];

const PACKING_CATEGORIES = ["All", "Documents", "Electronics", "Clothes", "Medicines", "Toiletries"];

const SmartTravelTips = ({ destination }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [packingItems, setPackingItems] = useState(DEFAULT_PACKING_ITEMS);
  const [selectedPackingCat, setSelectedPackingCat] = useState("All");

  const data = getDestData(destination);
  const destTips = data?.tips || [];

  const allTips = [
    ...destTips.map((t) => ({ ...t, source: destination })),
    ...generalTravelTips.map((t) => ({ ...t, source: "General" })),
  ];

  const filteredTips = searchTerm.trim()
    ? allTips.filter(
        (t) =>
          t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allTips;

  const togglePackingItem = (id) => {
    setPackingItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const filteredPacking = packingItems.filter(
    (item) => selectedPackingCat === "All" || item.category === selectedPackingCat
  );

  const completedCount = packingItems.filter((i) => i.checked).length;
  const progressPct = Math.round((completedCount / packingItems.length) * 100);

  return (
    <div className="flex flex-col gap-8">
      {/* Interactive Packing Checklist */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
              <Luggage size={12} />
              Personalized Packing Assistant
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">Interactive Packing Checklist</h3>
          </div>

          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
            <span className="text-xs font-bold text-emerald-400">{completedCount} of {packingItems.length} Packed ({progressPct}%)</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
          <div className="h-full bg-brand-accent transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {PACKING_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedPackingCat(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                selectedPackingCat === cat
                  ? "bg-brand-accent text-zinc-950 font-bold"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-1">
          {filteredPacking.map((item) => (
            <div
              key={item.id}
              onClick={() => togglePackingItem(item.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                item.checked
                  ? "bg-emerald-950/20 border-emerald-900/60 text-zinc-200"
                  : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700"
              }`}
            >
              {item.checked ? (
                <CheckSquare size={16} className="text-emerald-400 shrink-0" />
              ) : (
                <Square size={16} className="text-zinc-600 shrink-0" />
              )}
              <div>
                <span className={`text-xs font-medium block ${item.checked ? "line-through text-zinc-500" : "text-white"}`}>{item.name}</span>
                <span className="text-[9px] text-zinc-500 font-bold uppercase">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local Travel Tips & Advice */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
              <Lightbulb size={12} />
              Local Knowledge & Etiquette
            </span>
            <h3 className="text-xl font-bold mt-0.5">Smart Travel Advice & Scam Alerts</h3>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search scams, phrases, tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-brand-accent/50 placeholder-zinc-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredTips.map((tip, idx) => {
              const Icon = tipIcons[tip.icon] || Lightbulb;
              return (
                <motion.div
                  key={`${tip.source}-${idx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.02 }}
                  className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-4 flex items-start gap-3.5 hover:border-zinc-700 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-brand-accent/20 transition-colors">
                    <Icon size={18} className="text-brand-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <h4 className="text-xs font-bold text-white leading-snug">{tip.title}</h4>
                      {tip.source !== "General" && (
                        <span className="text-[8px] text-brand-accent bg-brand-accent/10 px-1.5 py-0.5 rounded-full uppercase font-bold">{tip.source}</span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">{tip.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SmartTravelTips;
