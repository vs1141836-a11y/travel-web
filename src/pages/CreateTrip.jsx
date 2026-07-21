import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Compass, Users, DollarSign, Calendar, ArrowLeft, ArrowRight, Sparkles, Check } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import api from "../utils/api";
import toast from "react-hot-toast";
import { getTodayLocalDateString, isPastDate, clampToToday } from "../utils/dateUtils";

const AVAILABLE_INTERESTS = [
  "Culture", "Food", "Adventure", "Shopping", "Relaxation",
  "Nightlife", "History", "Nature", "Art", "Wellness", "Family", "Bespoke"
];

const LOADING_MESSAGES = [
  "Mapping destination hotspots...",
  "Curating authentic local dining...",
  "Structuring day-by-day routes...",
  "Balancing activities and budget...",
  "Sourcing hidden neighborhood gems...",
  "Polishing your custom itinerary...",
];

const CreateTrip = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const todayStr = getTodayLocalDateString();
  
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  // Form State - Default startDate to today's local date
  const [source, setSource] = useState("India");
  const [destination, setDestination] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Cycle through messages during AI generation
  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleInterestToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!destination.trim()) return toast.error("Please enter a destination");
      if (travelers < 1) return toast.error("Travelers must be at least 1");
      setStep(2);
    } else if (step === 2) {
      if (!startDate) return toast.error("Please select a start date");
      if (!endDate) return toast.error("Please select an end date");

      if (isPastDate(startDate)) {
        toast.error("Start date cannot be in the past. Clamped to today's local date.");
        setStartDate(getTodayLocalDateString());
        return;
      }
      if (endDate < startDate) {
        return toast.error("End date must be on or after the start date");
      }
      if (!budget || Number(budget) <= 0) return toast.error("Please enter a valid budget");
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    try {
      // 1. Create the trip entry on server
      const tripResponse = await api.post("/trips", {
        source: source.trim() || "India",
        destination: destination.trim(),
        startDate,
        endDate,
        budget: Number(budget),
        travelers: Number(travelers),
        interests: selectedInterests,
      });

      const tripId = tripResponse.data._id;

      // 2. Generate the itinerary via OpenAI
      await api.post(`/trips/${tripId}/generate-itinerary`);
      
      toast.success("AI generated your itinerary successfully!");
      navigate(`/trips/${tripId}`);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to generate itinerary. Please try again.");
      setIsGenerating(false);
    }
  };

  // Slider Animations
  const slideVariants = shouldReduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 }
      }
    : {
        enter: (dir) => ({
          x: dir > 0 ? 100 : -100,
          opacity: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 300, damping: 25 },
        },
        exit: (dir) => ({
          x: dir < 0 ? 100 : -100,
          opacity: 0,
          transition: { duration: 0.2 },
        }),
      };

  if (isGenerating) {
    return (
      <div className="bg-brand-dark min-h-screen flex flex-col justify-center items-center px-6 text-center select-none overflow-hidden relative">
        {/* Glowing blur effects */}
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="absolute w-[60vw] h-[60vw] top-[20%] left-[20%] bg-indigo-500 rounded-full blur-[110px] animate-pulse" />
        </div>

        <div className="relative z-10 max-w-md w-full flex flex-col items-center gap-10">
          {/* Animated Path & Plane */}
          <div className="relative w-full h-32 flex items-center justify-center">
            {/* SVG Flight Path animation */}
            <svg className="absolute w-full h-full" viewBox="0 0 400 120" fill="none">
              <path
                id="flight-path"
                d="M 50 60 Q 200 -20 350 60"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="3"
                strokeDasharray="6 4"
              />
              {/* Animated flight trace */}
              <motion.path
                d="M 50 60 Q 200 -20 350 60"
                stroke="url(#glowGradient)"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <defs>
                <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
                  <stop offset="100%" stopColor="#E5A93C" />
                </linearGradient>
              </defs>
            </svg>
            <motion.div
              style={{ position: "absolute" }}
              animate={{
                x: [-150, 150, -150],
                y: [20, -30, 20],
                rotate: [15, -15, 15],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Compass size={44} className="text-brand-accent animate-spin" style={{ animationDuration: "12s" }} />
            </motion.div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-semibold tracking-wide">Crafting Your Journey</h2>
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest flex items-center gap-1">
              <Sparkles size={12} className="text-indigo-400" />
              TripCraft AI is generating your itinerary
            </p>
          </div>

          <div className="glass w-full py-4 px-6 rounded-xl border border-zinc-900/60 min-h-[60px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingMsgIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-brand-accent text-sm font-medium"
              >
                {LOADING_MESSAGES[loadingMsgIdx]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-dark min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden pb-12">
      {/* Back button */}
      <button 
        onClick={() => step > 1 ? setStep(step - 1) : navigate("/dashboard")}
        className="absolute top-6 left-6 flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer"
      >
        <ArrowLeft size={14} />
        Back
      </button>

      {/* Step Progress indicators */}
      <div className="max-w-xl w-full flex flex-col items-center gap-6 z-10">
        <div className="flex items-center justify-center gap-3 w-full max-w-xs mb-4">
          <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-brand-accent" : "bg-zinc-800"}`} />
          <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-brand-accent" : "bg-zinc-800"}`} />
          <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step >= 3 ? "bg-brand-accent" : "bg-zinc-800"}`} />
        </div>

        <Card className="w-full border border-zinc-900/60 p-8 shadow-premium overflow-hidden min-h-[420px] flex flex-col justify-between">
          <AnimatePresence mode="wait" custom={step}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-6"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-1">Where to?</h2>
                  <p className="text-zinc-500 text-xs font-light">Input your target destination and number of explorers.</p>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Input
                    label="Departing From (Source)"
                    id="source"
                    placeholder="e.g. India, New York, or London"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />

                  <Input
                    label="Destination"
                    id="destination"
                    placeholder="e.g. Amsterdam, Netherlands or Kyoto, Japan"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />

                  <div className="w-full flex flex-col gap-1.5">
                    <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider px-1">
                      Travelers
                    </label>
                    <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-lg p-1.5">
                      <button
                        type="button"
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center font-bold text-zinc-300"
                      >
                        -
                      </button>
                      <div className="flex-1 flex items-center justify-center gap-2">
                        <Users size={16} className="text-brand-accent" />
                        <span className="font-semibold text-white text-sm">{travelers} Traveler{travelers > 1 ? "s" : ""}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTravelers(travelers + 1)}
                        className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center font-bold text-zinc-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <Button variant="accent" className="w-full font-semibold mt-4 py-3.5" onClick={handleNextStep}>
                  Next: Dates & Budget <ArrowRight size={16} />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={2}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-6"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-1">Time & Investment</h2>
                  <p className="text-zinc-500 text-xs font-light">Specify dates and your target limit budget details.</p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full flex flex-col gap-1.5 mb-4">
                      <label htmlFor="startDate" className="text-zinc-400 text-xs font-semibold uppercase tracking-wider px-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        min={todayStr}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (isPastDate(val)) {
                            toast.error("Past dates are disabled. Selected today's local date.");
                            setStartDate(todayStr);
                          } else {
                            setStartDate(val);
                            if (endDate && val > endDate) setEndDate("");
                          }
                        }}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-all duration-200 outline-none"
                      />
                    </div>
                    <div className="w-full flex flex-col gap-1.5 mb-4">
                      <label htmlFor="endDate" className="text-zinc-400 text-xs font-semibold uppercase tracking-wider px-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        min={startDate || todayStr}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val && val < (startDate || todayStr)) {
                            toast.error("End date must be on or after start date.");
                            setEndDate(startDate || todayStr);
                          } else {
                            setEndDate(val);
                          }
                        }}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-all duration-200 outline-none"
                      />
                    </div>
                  </div>

                  <Input
                    label="Budget (USD)"
                    type="number"
                    id="budget"
                    placeholder="e.g. 2500"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>

                <Button variant="accent" className="w-full font-semibold mt-4 py-3.5" onClick={handleNextStep}>
                  Next: Personal Interests <ArrowRight size={16} />
                </Button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={3}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-6"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-1">Interests & Vibes</h2>
                  <p className="text-zinc-500 text-xs font-light">Select categories to let the AI tailor activities to your taste.</p>
                </div>

                <div className="flex flex-wrap gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {AVAILABLE_INTERESTS.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected 
                            ? "bg-brand-accent text-brand-dark border-brand-accent shadow-md shadow-brand-accent/10" 
                            : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        {isSelected && <Check size={12} />}
                        {interest}
                      </button>
                    );
                  })}
                </div>

                <Button variant="primary" className="w-full font-semibold mt-4 py-3.5 text-white flex items-center gap-2" onClick={handleSubmit}>
                  <Sparkles size={16} className="text-brand-accent" />
                  Generate Bespoke Itinerary
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
};

export default CreateTrip;
