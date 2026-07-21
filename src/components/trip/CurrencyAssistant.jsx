import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, RefreshCw, ArrowRightLeft, Calculator, Plane, Hotel, Utensils, Car, ShoppingBag, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { getCurrencyInfo } from "../../utils/travelData";
import Card from "../ui/Card";

const DEFAULT_RATES = { INR: 83.5, EUR: 0.92, GBP: 0.78, JPY: 155, AED: 3.67, IDR: 16200, THB: 36.5, SGD: 1.34, CHF: 0.9, TRY: 32.5, KRW: 1380, VND: 25400, MYR: 4.7, AUD: 1.5, CAD: 1.36, NZD: 1.62, BRL: 5.2, MXN: 18.2, ZAR: 18.5, EGP: 47.5, USD: 1 };

const EXPENSE_CATEGORIES = [
  { key: "flight", label: "Flights & Airline Tickets", icon: Plane, defaultPct: 0.35, color: "text-sky-400" },
  { key: "hotel", label: "Hotels & Accommodation", icon: Hotel, defaultPct: 0.30, color: "text-purple-400" },
  { key: "food", label: "Dining, Cafes & Food", icon: Utensils, defaultPct: 0.15, color: "text-amber-400" },
  { key: "transport", label: "Local Transport & Trains", icon: Car, defaultPct: 0.08, color: "text-emerald-400" },
  { key: "shopping", label: "Shopping & Souvenirs", icon: ShoppingBag, defaultPct: 0.07, color: "text-pink-400" },
  { key: "emergency", label: "Emergency Reserve Fund", icon: AlertTriangle, defaultPct: 0.05, color: "text-red-400" },
];

const CurrencyAssistant = ({ destination, budget = 0 }) => {
  const [destCurrency, setDestCurrency] = useState({ code: "EUR", symbol: "€", name: "Euro" });
  const [inrRate, setInrRate] = useState(92); // e.g. 1 EUR = ₹92
  const [loadingRate, setLoadingRate] = useState(true);
  const [customBudget, setCustomBudget] = useState(budget || 100000);
  const [quickAmount, setQuickAmount] = useState(100);

  const fetchExchangeRates = async (targetCode) => {
    setLoadingRate(true);
    try {
      // Fetch USD base rates and calculate cross rate for INR -> Target
      const response = await fetch(`https://open.er-api.com/v6/latest/USD`);
      const data = await response.json();
      if (data?.rates?.[targetCode] && data?.rates?.["INR"]) {
        const usdToInr = data.rates["INR"];
        const usdToTarget = data.rates[targetCode];
        // 1 Target unit = (usdToInr / usdToTarget) INR
        const oneTargetInInr = usdToInr / usdToTarget;
        setInrRate(Math.round(oneTargetInInr * 100) / 100);
      } else {
        const rate = DEFAULT_RATES[targetCode] ? 83.5 / DEFAULT_RATES[targetCode] : 92;
        setInrRate(Math.round(rate * 100) / 100);
      }
    } catch {
      const rate = DEFAULT_RATES[targetCode] ? 83.5 / DEFAULT_RATES[targetCode] : 92;
      setInrRate(Math.round(rate * 100) / 100);
    }
    setLoadingRate(false);
  };

  useEffect(() => {
    const info = getCurrencyInfo(destination);
    setDestCurrency(info);
    fetchExchangeRates(info.code);
  }, [destination]);

  useEffect(() => {
    if (budget > 0) setCustomBudget(budget);
  }, [budget]);

  const totalInr = parseFloat(customBudget) || 0;
  const totalDestConverted = inrRate > 0 ? Math.round(totalInr / inrRate) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
        <div>
          <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
            <DollarSign size={12} />
            Live Currency Exchange & Budget Assistant
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-0.5">
            Currency Intelligence for {destination || "Trip"}
          </h3>
          <p className="text-zinc-400 text-xs mt-1">
            Real-time exchange rates and localized expense breakdown.
          </p>
        </div>

        {/* Live Exchange Rate Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center gap-3 shrink-0">
          <RefreshCw size={18} className={`text-indigo-400 ${loadingRate ? "animate-spin" : ""}`} />
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Real-Time Exchange Rate</span>
            <p className="text-lg font-black text-brand-accent">
              1 {destCurrency.code} ({destCurrency.symbol}) = <span className="text-white">₹{inrRate} INR</span>
            </p>
          </div>
        </div>
      </div>

      {/* Quick Calculator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border border-zinc-800/80 flex flex-col gap-3">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Source Currency</span>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-brand-accent text-base">
              ₹
            </div>
            <div>
              <p className="font-bold text-white text-sm">Indian Rupee (INR)</p>
              <p className="text-[10px] text-zinc-500">Your Base Budget Currency</p>
            </div>
          </div>
        </Card>

        <Card className="border border-zinc-800/80 flex flex-col gap-3">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Destination Currency</span>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-accent text-zinc-950 flex items-center justify-center font-bold text-base">
              {destCurrency.symbol}
            </div>
            <div>
              <p className="font-bold text-white text-sm">{destCurrency.name} ({destCurrency.code})</p>
              <p className="text-[10px] text-zinc-500">Local Destination Currency</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Interactive Quick Converter */}
      <Card className="border border-zinc-800/80 p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <ArrowRightLeft size={16} className="text-brand-accent" /> Quick Converter Calculator
          </h4>
          <span className="text-[10px] text-zinc-500 font-semibold">1 {destCurrency.code} = ₹{inrRate}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex items-center gap-2">
            <span className="text-sm font-bold text-brand-accent">{destCurrency.symbol}</span>
            <input
              type="number"
              value={quickAmount}
              onChange={(e) => setQuickAmount(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-transparent text-sm font-bold text-white outline-none"
              placeholder="Amount"
            />
            <span className="text-xs font-bold text-zinc-400">{destCurrency.code}</span>
          </div>

          <ArrowRight size={16} className="text-zinc-600 shrink-0 hidden sm:block" />

          <div className="flex-1 w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-semibold">Equals in INR:</span>
            <span className="text-base font-black text-emerald-400">₹{Math.round(quickAmount * inrRate).toLocaleString()}</span>
          </div>
        </div>
      </Card>

      {/* Budget Category Allocations */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-bold text-white">Estimated Travel Budget Allocation</h4>
            <p className="text-zinc-400 text-xs mt-0.5">Recommended budget breakdown for flights, stays, food, transport, and shopping.</p>
          </div>

          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            <span className="text-xs text-zinc-400 font-semibold">Total Budget (INR):</span>
            <input
              type="number"
              value={customBudget}
              onChange={(e) => setCustomBudget(e.target.value)}
              className="w-28 bg-transparent text-xs font-extrabold text-brand-accent outline-none"
            />
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXPENSE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const categoryInr = Math.round(totalInr * cat.defaultPct);
            const categoryDest = inrRate > 0 ? Math.round(categoryInr / inrRate) : 0;
            return (
              <div key={cat.key} className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between gap-3 hover:border-zinc-700 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                      <Icon size={16} className={cat.color} />
                    </div>
                    <span className="text-xs font-bold text-white">{cat.label}</span>
                  </div>
                  <span className="text-[10px] font-extrabold bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">
                    {Math.round(cat.defaultPct * 100)}%
                  </span>
                </div>

                <div>
                  <span className="text-lg font-black text-white block">
                    {destCurrency.symbol}{categoryDest.toLocaleString()} <span className="text-xs font-normal text-zinc-400">{destCurrency.code}</span>
                  </span>
                  <span className="text-xs text-zinc-400 font-semibold block mt-0.5">
                    ₹{categoryInr.toLocaleString()} INR
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Summary Bar */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Total Converted Budget</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-brand-accent">{destCurrency.symbol}{totalDestConverted.toLocaleString()} {destCurrency.code}</span>
              <span className="text-xs text-zinc-400">(= ₹{totalInr.toLocaleString()} INR)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950/40 text-emerald-400 text-xs font-bold px-3.5 py-2 rounded-xl border border-emerald-900/50">
            <ShieldCheck size={14} />
            Emergency Reserve Buffer Included (5%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyAssistant;
