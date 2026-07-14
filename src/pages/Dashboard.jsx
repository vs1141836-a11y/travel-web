import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Plus, LogOut, Calendar, Users, DollarSign, Trash2, ArrowRight } from "lucide-react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();

  const fetchTrips = async () => {
    try {
      const response = await api.get("/trips");
      setTrips(response.data);
    } catch (err) {
      toast.error("Failed to load your trips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (e, tripId) => {
    e.preventDefault(); // Prevent navigating to detail page
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this trip?")) return;

    try {
      await api.delete(`/trips/${tripId}`);
      toast.success("Trip deleted successfully");
      setTrips(trips.filter((t) => t._id !== tripId));
    } catch (err) {
      toast.error("Failed to delete trip");
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      }
    }
  };

  const itemVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: { type: "spring", stiffness: 150, damping: 15 }
        },
      };

  return (
    <div className="bg-brand-dark min-h-screen text-white select-none pb-20">
      {/* Dashboard Nav */}
      <nav className="bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <Compass className="text-brand-accent text-indigo-500" />
          <span className="font-display font-bold text-lg">TripCraft AI</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-zinc-400 text-xs font-semibold hidden md:block">
            Logged in as: <span className="text-white font-bold">{user?.name}</span>
          </span>
          <button 
            onClick={handleLogout}
            className="text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl w-full mx-auto px-6 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold leading-tight">My Itineraries</h1>
            <p className="text-zinc-400 text-xs mt-1">Manage and edit your generated bespoke travels.</p>
          </div>
          <button onClick={() => navigate("/create-trip")}>
            <Button variant="accent" className="flex items-center gap-1.5 py-3 font-semibold shadow-glow">
              <Plus size={16} />
              Create New Trip
            </Button>
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton height="h-[220px]" />
            <Skeleton height="h-[220px]" />
            <Skeleton height="h-[220px]" />
          </div>
        ) : trips.length === 0 ? (
          <div className="glass rounded-xl py-20 px-6 text-center flex flex-col items-center gap-4 max-w-xl mx-auto border border-zinc-900 mt-12">
            <Compass size={48} className="text-zinc-700 animate-pulse" />
            <h3 className="text-xl font-semibold">No itineraries found</h3>
            <p className="text-zinc-500 text-xs max-w-sm leading-relaxed">
              Start by typing your destination, dates, and interests. Our AI will curate a personalized day-by-day itinerary instantly.
            </p>
            <button onClick={() => navigate("/create-trip")} className="mt-2">
              <Button variant="primary">Create Your First Trip</Button>
            </button>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {trips.map((trip) => (
              <motion.div key={trip._id} variants={itemVariants} className="h-full">
                <Card 
                  onClick={() => navigate(`/trips/${trip._id}`)} 
                  className="h-full flex flex-col justify-between border border-zinc-900 hover:border-zinc-800/80 p-6"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xl font-bold truncate max-w-[80%]">{trip.destination}</h3>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        trip.status === "confirmed" 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                          : trip.status === "generated"
                          ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                      }`}>
                        {trip.status}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5 mt-2">
                      <div className="flex items-center gap-2 text-zinc-400 text-xs">
                        <Calendar size={13} className="text-zinc-500" />
                        <span>{trip.startDate} to {trip.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400 text-xs">
                        <Users size={13} className="text-zinc-500" />
                        <span>{trip.travelers} Traveler{trip.travelers > 1 ? "s" : ""}</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400 text-xs">
                        <DollarSign size={13} className="text-zinc-500" />
                        <span>Est. Cost: <strong className="text-white">{trip.currencySymbol || "$"}{trip.totalEstimatedCost}</strong> / Budget: {trip.currencySymbol || "$"}{trip.localBudget || trip.budget}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-900/60">
                    <button
                      onClick={(e) => handleDelete(e, trip._id)}
                      className="text-zinc-500 hover:text-red-400 transition-colors p-1.5 rounded hover:bg-zinc-850 cursor-pointer"
                      title="Delete Trip"
                    >
                      <Trash2 size={15} />
                    </button>
                    <span className="text-zinc-400 hover:text-brand-accent transition-colors text-xs font-semibold flex items-center gap-1">
                      View Planner
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
