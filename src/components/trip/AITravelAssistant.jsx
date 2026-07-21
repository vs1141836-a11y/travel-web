import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Hotel, DollarSign, Sun, MapPin, Compass } from "lucide-react";
import { getDestData, getCurrencyInfo } from "../../utils/travelData";

const QUICK_ACTIONS = [
  { label: "Best hotels", icon: Hotel },
  { label: "Weather", icon: Sun },
  { label: "Budget tips", icon: DollarSign },
  { label: "Places to visit", icon: MapPin },
  { label: "Visa info", icon: Compass },
];

const generateAIResponse = (message, destination) => {
  const msg = message.toLowerCase();
  const data = getDestData(destination);

  if (!destination || destination === "Unknown") {
    return "Please set a destination for your trip first! I can help with hotels, attractions, weather, budget tips, and more.";
  }

  if (msg.includes("hotel") || msg.includes("stay") || msg.includes("accommodation") || msg.includes("room")) {
    if (data?.hotels) {
      const budget = data.hotels.budget?.[0];
      const standard = data.hotels.standard?.[0];
      const premium = data.hotels.premium?.[0];
      const luxury = data.hotels.luxury?.[0];
      return `🏨 **Hotels in ${data.name}:**\n\n• **Budget:** ${budget?.name || "Available"} - ${budget?.pricePerNight || "N/A"}/night (${budget?.rating || ""}⭐)\n• **Standard:** ${standard?.name || "Available"} - ${standard?.pricePerNight || "N/A"}/night\n• **Premium:** ${premium?.name || "Available"} - ${premium?.pricePerNight || "N/A"}/night\n• **Luxury:** ${luxury?.name || "Available"} - ${luxury?.pricePerNight || "N/A"}/night\n\nI recommend booking early for better rates!`;
    }
    return `I found hotels in ${destination || "your destination"}. Check the "Stay Recommendations" section above for detailed options with prices, ratings, and amenities.`;
  }

  if (msg.includes("weather") || msg.includes("climate") || msg.includes("rain") || msg.includes("temperature") || msg.includes("cold") || msg.includes("hot")) {
    const season = data?.weather?.bestSeason || "varies by season";
    const temp = data?.weather?.summer?.temp || "check forecast";
    return `🌤️ **Weather in ${data?.name || destination}:**\n\n• Best season: ${season}\n• Summer: ${data?.weather?.summer?.conditions || temp}\n• Winter: ${data?.weather?.winter?.conditions || "Mild"}\n\n💡 **Packing tip:** ${data?.weather?.whatToWear?.summer || "Pack for the season and check the 7-day forecast!"}`;
  }

  if (msg.includes("budget") || msg.includes("cost") || msg.includes("expensive") || msg.includes("cheap") || msg.includes("money") || msg.includes("price") || msg.includes("₹") || msg.includes("$")) {
    const currency = getCurrencyInfo(destination);
    return `💰 **Budget Guide for ${data?.name || destination}:**\n\n• Currency: ${currency.name} (${currency.symbol}${currency.code})\n• Budget travel: $30-50/day\n• Mid-range: $80-150/day\n• Luxury: $200+/day\n\n💡 Tip: Use the Currency Assistant below to calculate your exact budget! Eat where locals eat to save money.`;
  }

  if (msg.includes("attraction") || msg.includes("place") || msg.includes("visit") || msg.includes("see") || msg.includes("tourist") || msg.includes("sight") || msg.includes("thing")) {
    const attractions = data?.attractions?.slice(0, 5) || [];
    if (attractions.length > 0) {
      return `🗺️ **Top attractions in ${data?.name || destination}:**\n\n${attractions.map((a, i) => `${i + 1}. **${a.name}** (${a.rating}⭐) - ${a.description.slice(0, 80)}...`).join("\n")}\n\nCheck the "Popular Attractions" section for more details!`;
    }
    return `I found several attractions in ${destination}. Check the "Destination Intelligence" section for detailed info with ratings, images, and Google Maps links!`;
  }

  if (msg.includes("visa") || msg.includes("passport") || msg.includes("document") || msg.includes("immigration")) {
    const visa = data?.visa;
    if (visa) {
      return `🛂 **Visa Guide for ${data?.name || destination}:**\n\n• Requirement: ${visa.required ? "✅ Visa required" : "✅ No visa needed"}\n• Type: ${visa.type || "N/A"}\n• Processing: ${visa.processingTime || "Varies"}\n• Fee: ${visa.fee || "N/A"}\n\n${visa.required ? "Make sure to apply well in advance with all required documents!" : "Enjoy visa-free travel! Check stay duration limits."}`;
    }
    return `Check the "Visa Guidance" section above for detailed information about visa requirements for ${destination}.`;
  }

  if (msg.includes("food") || msg.includes("eat") || msg.includes("restaurant") || msg.includes("cuisine") || msg.includes("dining") || msg.includes("meal")) {
    return `🍽️ **Food Tips for ${data?.name || destination}:**\n\n• Try local cuisine and street food for authentic experiences\n• Restaurant meals: $10-30 per person for mid-range\n• Street food: $3-10 per item\n• Tipping: 10-15% is customary in most places\n\n💡 Pro tip: Ask locals for their favorite restaurants, not just tourist spots!`;
  }

  if (msg.includes("transport") || msg.includes("taxi") || msg.includes("bus") || msg.includes("train") || msg.includes("metro") || msg.includes("uber") || msg.includes("get around") || msg.includes("commute")) {
    return `🚇 **Getting Around ${data?.name || destination}:**\n\n• Public transport is efficient and affordable in most cities\n• Consider daily/weekly passes for savings\n• Ride-sharing apps available in major cities\n• Walking is often the best way to explore city centers\n\nCheck the "Transportation Guide" section for airport transfers and local transport options!`;
  }

  if (msg.includes("safe") || msg.includes("dangerous") || msg.includes("scam") || msg.includes("security") || msg.includes("police") || msg.includes("emergency")) {
    const tips = data?.tips?.filter(t => t.title.toLowerCase().includes("safe") || t.title.toLowerCase().includes("scam"));
    return `🔒 **Safety Tips for ${data?.name || destination}:**\n\n${tips?.length > 0 ? tips.map(t => `• ${t.description}`).join("\n") : "• Keep valuables secure in crowded areas\n• Use official taxis and verified tour operators\n• Save emergency numbers: 112 (Europe), 911 (US)\n• Share your itinerary with someone back home"}\n\nStay aware of your surroundings and trust your instincts!`;
  }

  if (msg.includes("hello") || msg.includes("hi ") || msg.includes("hey") || msg.includes("namaste") || msg === "hi") {
    return `👋 **Hello! Welcome to TripCraft AI!**\n\nI'm your AI travel assistant for ${data?.name || destination}. I can help you with:\n\n🏨 Hotels & accommodation\n🗺️ Places to visit & attractions\n🌤️ Weather & what to pack\n💰 Budget tips & currency\n🛂 Visa & documents\n🚇 Transport & getting around\n\nWhat would you like to know?`;
  }

  return `🌟 **Travel Tips for ${data?.name || destination}:**\n\nI'm here to help! Here's what I know about ${destination}:\n${data ? `• ${data.attractions?.length || 0}+ attractions to explore\n• Hotels from budget to luxury\n• ${data.visa?.required ? "Visa required - check guidance" : "No visa needed for most travelers"}\n• Best season: ${data.weather?.bestSeason || "Year-round"}` : "I'm still learning about this destination. Check the sections above for detailed information!"}\n\nFeel free to ask me about hotels, weather, budget, attractions, food, transport, safety, or anything else!`;
};

const AITravelAssistant = ({ destination }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { role: "bot", text: `👋 Hi! I'm your AI travel assistant for **${destination || "your trip"}**. Ask me about hotels, attractions, weather, budget, visa, or anything travel-related!`, timestamp: Date.now() },
      ]);
    }
  }, [isOpen, destination]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input.trim(), timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(userMsg.text, destination);
      setMessages((prev) => [...prev, { role: "bot", text: response, timestamp: Date.now() }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action) => {
    setInput(action.label);
    setTimeout(() => {
      const userMsg = { role: "user", text: action.label, timestamp: Date.now() };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);
      setTimeout(() => {
        const response = generateAIResponse(action.label, destination);
        setMessages((prev) => [...prev, { role: "bot", text: response, timestamp: Date.now() }]);
        setIsTyping(false);
      }, 600);
    }, 100);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-accent text-brand-dark shadow-lg shadow-brand-accent/30 hover:shadow-brand-accent/50 hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
        aria-label="Open AI Travel Assistant"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-32px)] h-[520px] max-h-[calc(100vh-180px)] glass border border-zinc-800 rounded-2xl shadow-premium flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-brand-accent/20 to-transparent border-b border-zinc-800 px-4 py-3.5 flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-brand-accent/20 flex items-center justify-center">
                <Bot size={18} className="text-brand-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">TripCraft AI</p>
                <p className="text-[10px] text-zinc-500">{destination ? `Assistant for ${destination}` : "Travel Assistant"}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white p-1 rounded hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 scroll-smooth">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-brand-accent text-brand-dark rounded-tr-sm"
                        : "bg-zinc-800/80 text-zinc-200 rounded-tl-sm border border-zinc-700/50"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-2">
                  <div className="bg-zinc-800/80 border border-zinc-700/50 rounded-xl rounded-tl-sm px-3.5 py-2.5">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-zinc-800/60 flex gap-1.5 flex-wrap shrink-0">
                {QUICK_ACTIONS.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      onClick={() => handleQuickAction(action)}
                      className="flex items-center gap-1 text-[9px] font-semibold text-zinc-400 bg-zinc-800/60 hover:bg-zinc-700/60 hover:text-white px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Icon size={10} />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="border-t border-zinc-800 px-3 py-2.5 flex items-center gap-2 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your trip..."
                className="flex-1 bg-zinc-900/60 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-brand-accent/50 placeholder-zinc-600"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-brand-accent text-brand-dark flex items-center justify-center disabled:opacity-40 transition-all hover:bg-amber-400 cursor-pointer shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AITravelAssistant;
