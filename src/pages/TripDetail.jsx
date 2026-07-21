import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Compass, Calendar, DollarSign, Users, ChevronLeft, Download, Plus, Sparkles, Share2, X, Mail, MapPin, Bed, Plane, Sun, Lightbulb, Bot, Globe, RefreshCw, BookOpen } from "lucide-react";
import api from "../utils/api";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import ItineraryPlanner from "../components/trip/ItineraryPlanner";
import BudgetDashboard from "../components/trip/BudgetDashboard";
import AddActivityModal from "../components/trip/AddActivityModal";
import DestinationIntelligence from "../components/trip/DestinationIntelligence";
import StayRecommendations from "../components/trip/StayRecommendations";
import TransportationGuide from "../components/trip/TransportationGuide";
import CurrencyAssistant from "../components/trip/CurrencyAssistant";
import VisaGuidance from "../components/trip/VisaGuidance";
import WeatherForecast from "../components/trip/WeatherForecast";
import SmartTravelTips from "../components/trip/SmartTravelTips";
import AITravelAssistant from "../components/trip/AITravelAssistant";
import FlightSearch from "../components/trip/FlightSearch";

const TABS = [
  { id: "itinerary", label: "Itinerary", icon: Calendar },
  { id: "budget", label: "Budget", icon: DollarSign },
  { id: "attractions", label: "Attractions", icon: MapPin },
  { id: "stays", label: "Stays", icon: Bed },
  { id: "flights", label: "Flights", icon: Plane },
  { id: "transport", label: "Transport Blueprint", icon: Compass },
  { id: "currency", label: "Currency", icon: Globe },
  { id: "visa", label: "Visa", icon: BookOpen },
  { id: "weather", label: "Weather", icon: Sun },
  { id: "tips", label: "Tips & Packing", icon: Lightbulb },
  { id: "assistant", label: "AI Assistant", icon: Bot },
];

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("itinerary");
  
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeDayIdx, setActiveDayIdx] = useState(null);
  const [regeneratingDayIdx, setRegeneratingDayIdx] = useState(null);

  const fetchTrip = async () => {
    try {
      const response = await api.get(`/trips/${id}`);
      setTrip(response.data);
    } catch (err) {
      toast.error("Failed to load trip details");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await api.get(`/trips/${id}/weather`);
      setWeather(response.data);
    } catch (err) {
      console.warn("Could not load weather details:", err);
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    fetchTrip();
    fetchWeather();
  }, [id]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceDayIdx = parseInt(source.droppableId, 10);
    const destDayIdx = parseInt(destination.droppableId, 10);

    const updatedDays = [...trip.days];
    const sourceActivities = [...updatedDays[sourceDayIdx].activities];
    const [movedActivity] = sourceActivities.splice(source.index, 1);

    if (sourceDayIdx === destDayIdx) {
      sourceActivities.splice(destination.index, 0, movedActivity);
      updatedDays[sourceDayIdx].activities = sourceActivities;
    } else {
      const destActivities = [...updatedDays[destDayIdx].activities];
      destActivities.splice(destination.index, 0, movedActivity);
      updatedDays[sourceDayIdx].activities = sourceActivities;
      updatedDays[destDayIdx].activities = destActivities;
    }

    setTrip({ ...trip, days: updatedDays });

    try {
      const res = await api.put(`/trips/${id}`, { days: updatedDays });
      setTrip(res.data);
    } catch (err) {
      toast.error("Failed to save reordered timeline");
      fetchTrip();
    }
  };

  const handleDeleteActivity = async (dayIdx, actIdx) => {
    const updatedDays = [...trip.days];
    updatedDays[dayIdx].activities.splice(actIdx, 1);
    setTrip({ ...trip, days: updatedDays });

    try {
      const res = await api.put(`/trips/${id}`, { days: updatedDays });
      setTrip(res.data);
      toast.success("Event deleted");
    } catch (err) {
      toast.error("Failed to delete event");
      fetchTrip();
    }
  };

  const handleAddActivity = async (newActivity) => {
    const updatedDays = [...trip.days];
    updatedDays[activeDayIdx].activities.push(newActivity);
    setTrip({ ...trip, days: updatedDays });

    try {
      const res = await api.put(`/trips/${id}`, { days: updatedDays });
      setTrip(res.data);
      toast.success("Event added successfully!");
    } catch (err) {
      toast.error("Failed to add event");
      fetchTrip();
    }
  };

  const handleRegenerateDay = async (dayIdx) => {
    setRegeneratingDayIdx(dayIdx);
    try {
      const res = await api.post(`/trips/${id}/regenerate-day/${dayIdx}`);
      setTrip(res.data);
      toast.success(`Day ${dayIdx + 1} itinerary regenerated by AI!`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to regenerate day");
    } finally {
      setRegeneratingDayIdx(null);
    }
  };

  const triggerPDFExport = async () => {
    const toastId = toast.loading("Generating your styled PDF document...");
    try {
      const response = await api.get(`/trips/${id}/export-pdf`, {
        responseType: "blob",
      });
      
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", `${trip.destination.replace(/\s+/g, "_")}_itinerary.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(fileURL);
      toast.success("PDF Itinerary downloaded successfully!", { id: toastId });
    } catch (err) {
      toast.error("Failed to generate PDF. Please try again.", { id: toastId });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Shareable itinerary URL copied to clipboard!");
  };

  const handleShareEmail = async (e) => {
    e.preventDefault();
    if (!shareEmail.trim()) return toast.error("Please enter a recipient email");
    
    setIsSharing(true);
    try {
      await api.post(`/trips/${id}/share-email`, { email: shareEmail });
      toast.success(`Itinerary successfully emailed to ${shareEmail}!`);
      setShareEmail("");
      setIsShareModalOpen(false);
    } catch (err) {
      toast.error("Failed to share itinerary. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-brand-dark min-h-screen text-white p-8 max-w-6xl mx-auto flex flex-col gap-6">
        <Skeleton height="h-[60px]" />
        <Skeleton height="h-[200px]" />
      </div>
    );
  }

  return (
    <div className="bg-brand-dark min-h-screen text-white pb-20 print:bg-white print:text-black print:pb-0">
      <header className="bg-zinc-950/60 border-b border-zinc-900 px-6 py-4 flex items-center justify-between sticky top-0 z-30 print:hidden backdrop-blur-md">
        <button 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer"
        >
          <ChevronLeft size={16} />
          Dashboard
        </button>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="px-4 py-2 text-xs flex items-center gap-1.5" onClick={() => setIsShareModalOpen(true)}>
            <Share2 size={14} />
            Share Trip
          </Button>
          <Button variant="outline" className="px-4 py-2 text-xs flex items-center gap-1.5" onClick={triggerPDFExport}>
            <Download size={14} />
            Export PDF
          </Button>
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto px-6 mt-10 print:mt-0 print:px-0">
        <section 
          className="relative rounded-xl overflow-hidden border border-zinc-900 mb-8 print:border-none print:bg-transparent print:p-0 print:mb-12 min-h-[160px] flex items-end"
          style={{
            backgroundImage: trip.destinationDetails?.imageUrl ? `linear-gradient(to top, rgba(9,9,11,0.95), rgba(9,9,11,0.5)), url(${trip.destinationDetails.imageUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 p-8 w-full">
            <div>
              <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                <Compass size={11} />
                Bespoke Route {trip.country ? `• ${trip.country}` : ""}
              </span>
              <h1 className="text-4xl font-extrabold mt-1 text-white tracking-tight drop-shadow print:text-3xl">{trip.destination}</h1>
              {trip.destinationDetails?.region && (
                <span className="text-zinc-400 text-xs mt-1 block font-light">
                  {trip.destinationDetails.region}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full md:w-auto mt-4 md:mt-0 bg-zinc-950/80 p-4 rounded-xl border border-zinc-900/60 backdrop-blur-sm print:grid-cols-4 print:border-none print:p-0 print:bg-transparent">
              <div>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Start Date</span>
                <span className="text-sm font-semibold font-sans mt-0.5 block">{trip.startDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">End Date</span>
                <span className="text-sm font-semibold font-sans mt-0.5 block">{trip.endDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Travelers</span>
                <span className="text-sm font-semibold mt-0.5 block">{trip.travelers} Explorer{trip.travelers > 1 ? "s" : ""}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Limit Budget</span>
                <span className="text-sm font-semibold font-sans mt-0.5 text-brand-accent block">{trip.currencySymbol || "$"}{trip.localBudget || trip.budget}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-1 mb-8 pb-1 print:hidden scrollbar-none">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-brand-accent text-brand-dark shadow-glow"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/60 bg-zinc-900/30 border border-zinc-800/50"
                }`}
              >
                <Icon size={12} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="print:block">
          {activeTab === "itinerary" && (
            <div className="flex flex-col gap-6">
              <ItineraryPlanner
                days={trip.days}
                onDragEnd={handleDragEnd}
                onDeleteActivity={handleDeleteActivity}
                onOpenAddModal={(dayIdx) => {
                  setActiveDayIdx(dayIdx);
                  setIsAddModalOpen(true);
                }}
                onRegenerateDay={handleRegenerateDay}
                regeneratingDayIndex={regeneratingDayIdx}
                currencySymbol={trip.currencySymbol}
              />
            </div>
          )}

          {activeTab === "budget" && (
            <div className="print:hidden">
              <BudgetDashboard trip={trip} />
            </div>
          )}

          {activeTab === "attractions" && (
            <div className="print:hidden">
              <DestinationIntelligence destination={trip.destination} />
            </div>
          )}

          {activeTab === "stays" && (
            <div className="print:hidden">
              <StayRecommendations destination={trip.destination} />
            </div>
          )}

          {activeTab === "flights" && (
            <div className="print:hidden">
              <FlightSearch source={trip.source || "India"} destination={trip.destination} />
            </div>
          )}

          {activeTab === "transport" && (
            <div className="print:hidden">
              <TransportationGuide source={trip.source || trip.country || "India"} destination={trip.destination} />
            </div>
          )}

          {activeTab === "currency" && (
            <div className="print:hidden">
              <CurrencyAssistant destination={trip.destination} budget={trip.localBudget || trip.budget} />
            </div>
          )}

          {activeTab === "visa" && (
            <div className="print:hidden">
              <VisaGuidance destination={trip.destination} />
            </div>
          )}

          {activeTab === "weather" && (
            <div className="print:hidden">
              <WeatherForecast weather={weather} destination={trip.destination} loading={weatherLoading} />
            </div>
          )}

          {activeTab === "tips" && (
            <div className="print:hidden">
              <SmartTravelTips destination={trip.destination} />
            </div>
          )}

          {activeTab === "assistant" && (
            <div className="print:hidden">
              <AITravelAssistant destination={trip.destination} budget={trip.localBudget || trip.budget} currencySymbol={trip.currencySymbol} />
            </div>
          )}
        </div>
      </main>

      <AddActivityModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddActivity}
      />

      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass max-w-md w-full rounded-xl border border-zinc-800/80 p-6 flex flex-col gap-4 relative">
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-900 cursor-pointer"
            >
              <X size={16} />
            </button>
            <div>
              <h3 className="text-xl font-bold">Share Itinerary</h3>
              <p className="text-zinc-500 text-xs mt-1">Copy the share link or send an email confirmation to a co-traveler.</p>
            </div>
            
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={handleCopyLink}
                className="w-full py-3 border border-zinc-850 hover:border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 text-white rounded-lg flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer transition-all"
              >
                <Share2 size={14} className="text-brand-accent" />
                Copy Link to Clipboard
              </button>
              
              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-zinc-900"></div>
                <span className="flex-shrink mx-4 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Or email share</span>
                <div className="flex-grow border-t border-zinc-900"></div>
              </div>

              <form onSubmit={handleShareEmail} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="shareEmail" className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider px-1">Email Address</label>
                  <input
                    type="email"
                    id="shareEmail"
                    placeholder="e.g. friend@domain.com"
                    value={shareEmail}
                    onChange={(e) => setShareEmail(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand-accent/50 transition-colors"
                  />
                </div>
                <Button
                  type="submit"
                  variant="accent"
                  className="w-full py-3 text-xs font-semibold flex items-center justify-center gap-1.5"
                  disabled={isSharing}
                >
                  <Mail size={14} />
                  {isSharing ? "Sending..." : "Send Email"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      <AITravelAssistant destination={trip.destination} />
    </div>
  );
};

export default TripDetail;
