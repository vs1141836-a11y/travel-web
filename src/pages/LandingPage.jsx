import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Sparkles, Sliders, Calendar, ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const { user } = useAuth();
  const triggerRef = useRef(null);
  const horizontalSectionRef = useRef(null);

  useEffect(() => {
    // Desktop only horizontal scroll pinning
    let ctx = gsap.context(() => {
      const isLargeScreen = window.innerWidth >= 1024;
      
      if (isLargeScreen && horizontalSectionRef.current) {
        const panels = horizontalSectionRef.current.children;
        const totalPanels = panels.length;
        
        gsap.to(horizontalSectionRef.current, {
          x: () => -(horizontalSectionRef.current.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${horizontalSectionRef.current.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-brand-dark min-h-screen text-white select-none">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-brand-dark/40 backdrop-blur-md border-b border-zinc-900/50 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold flex items-center gap-2 tracking-wider">
          <Compass className="text-brand-accent text-indigo-500 animate-pulse" />
          <span className="font-display bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            TripCraft AI
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <Link to="/dashboard">
              <Button variant="outline" className="px-4 py-2 text-xs">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/register">
                <Button variant="accent" className="px-4 py-2 text-xs">Start Planning</Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full h-[105vh] bg-gradient-hero flex flex-col justify-center items-center px-6 overflow-hidden">
        {/* Parallax elements */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <div className="absolute w-[80vw] h-[80vw] -top-[40vw] -left-[20vw] bg-indigo-500 rounded-full blur-[120px]" />
          <div className="absolute w-[60vw] h-[60vw] top-[30vh] -right-[10vw] bg-brand-accent rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl text-center flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 bg-zinc-900/80 px-4 py-1.5 rounded-full border border-zinc-800 text-brand-accent text-xs font-semibold uppercase tracking-widest mb-2"
          >
            <Sparkles size={12} className="text-indigo-400" />
            AI-Driven Bespoke Journeys
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-medium tracking-tight leading-[1.1] text-white"
          >
            Bespoke Travel Planners, <br />
            <span className="italic font-normal bg-gradient-to-r from-brand-accent via-amber-300 to-indigo-400 bg-clip-text text-transparent">
              Crafted by AI.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-zinc-400 text-base md:text-lg max-w-2xl font-light mt-2"
          >
            Skip the generic lists. Generate agency-quality, personalized day-by-day itineraries tailored strictly to your dates, budget, and tastes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4 mt-4"
          >
            <Link to={user ? "/dashboard" : "/register"}>
              <Button variant="accent" className="px-8 py-4 text-base font-semibold group">
                Plan Your Trip 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* GSAP Horizontal Scrolling Showcase */}
      <section ref={triggerRef} className="relative z-10 w-full bg-zinc-950 overflow-hidden lg:h-screen flex flex-col justify-center">
        <div className="absolute top-10 left-10 z-20 hidden lg:block">
          <p className="text-brand-accent text-xs font-semibold uppercase tracking-wider">How it works</p>
          <h2 className="text-3xl font-display mt-2 font-medium">Crafting in Realtime</h2>
        </div>

        {/* Desktop Carousel Section / Mobile Vertical Grid */}
        <div 
          ref={horizontalSectionRef} 
          className="flex flex-col lg:flex-row w-full lg:w-[400vw] h-auto lg:h-[60vh] gap-12 lg:gap-0 px-6 py-20 lg:py-0"
        >
          {/* Panel 1 */}
          <div className="w-full lg:w-screen flex flex-col lg:flex-row items-center justify-center px-6 lg:px-24 gap-8 lg:gap-16 shrink-0">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <span className="text-indigo-400 text-6xl font-display font-bold opacity-30">01</span>
              <h3 className="text-3xl font-semibold">Enter Details</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Provide your travel destination, exact dates, travel companions, budget range, and personal interests. Whether you are an art buff, a foodie, or an outdoor adventurer, TripCraft gathers it all.
              </p>
            </div>
            <div className="w-full lg:w-1/2 h-[300px] glass rounded-xl flex items-center justify-center border border-zinc-800/80">
              <div className="flex flex-col items-center gap-3">
                <Compass size={40} className="text-indigo-500 animate-bounce" />
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Setting Destination...</span>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="w-full lg:w-screen flex flex-col lg:flex-row items-center justify-center px-6 lg:px-24 gap-8 lg:gap-16 shrink-0">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <span className="text-indigo-400 text-6xl font-display font-bold opacity-30">02</span>
              <h3 className="text-3xl font-semibold">AI Curates Your Flow</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Our advanced AI models analyze your prompt parameters to construct a optimized, cohesive itinerary. It slots stays, meals, local activities, and transport, calculating distances and daily costs dynamically.
              </p>
            </div>
            <div className="w-full lg:w-1/2 h-[300px] glass rounded-xl flex items-center justify-center border border-zinc-800/80">
              <div className="flex flex-col items-center gap-3">
                <Sparkles size={40} className="text-brand-accent animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Curating Activities...</span>
              </div>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="w-full lg:w-screen flex flex-col lg:flex-row items-center justify-center px-6 lg:px-24 gap-8 lg:gap-16 shrink-0">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <span className="text-indigo-400 text-6xl font-display font-bold opacity-30">03</span>
              <h3 className="text-3xl font-semibold">Refine & Drag-n-Drop</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Nothing is locked in stone. Easily drag-and-drop activities between days, add manual events, delete unwanted slots, or ask the AI to regenerate entire days instantly to perfection.
              </p>
            </div>
            <div className="w-full lg:w-1/2 h-[300px] glass rounded-xl flex items-center justify-center border border-zinc-800/80">
              <div className="flex flex-col items-center gap-3">
                <Sliders size={40} className="text-emerald-500 animate-spin" />
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Arranging Timeline...</span>
              </div>
            </div>
          </div>

          {/* Panel 4 */}
          <div className="w-full lg:w-screen flex flex-col lg:flex-row items-center justify-center px-6 lg:px-24 gap-8 lg:gap-16 shrink-0">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <span className="text-indigo-400 text-6xl font-display font-bold opacity-30">04</span>
              <h3 className="text-3xl font-semibold">Export & Book</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Monitor your budget visualizers to track spending categories. Once you are thrilled with the itinerary, download a high-end agency-formatted PDF layout ready for booking and departure.
              </p>
            </div>
            <div className="w-full lg:w-1/2 h-[300px] glass rounded-xl flex items-center justify-center border border-zinc-800/80">
              <div className="flex flex-col items-center gap-3">
                <Calendar size={40} className="text-amber-500" />
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Itinerary Completed!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 w-full px-6 py-24 bg-brand-dark flex flex-col items-center border-t border-zinc-900">
        <div className="max-w-6xl w-full flex flex-col gap-12">
          <div className="text-center flex flex-col items-center gap-3">
            <span className="text-brand-accent text-xs font-semibold uppercase tracking-widest">Designed for Travel Connoisseurs</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium">Bespoke Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hoverable className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800">
                <Sparkles size={20} className="text-brand-accent" />
              </div>
              <h3 className="text-xl font-semibold">Hyper-Personalized AI</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Generates activities, travel categories, and food selections that respect interests and budget limits without canned template recommendations.
              </p>
            </Card>

            <Card hoverable className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800">
                <Sliders size={20} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold">Drag-and-Drop Editor</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Seamless drag mechanics allow swapping events, tweaking hours, and building custom slots. Fully responsive layout.
              </p>
            </Card>

            <Card hoverable className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800">
                <Calendar size={20} className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold">Budget Dashboards</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Premium visual tracking categories (meals, transport, activities) automatically map costs to compare actual totals against constraints.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 w-full px-6 py-24 bg-gradient-cta flex justify-center border-t border-zinc-900 text-center">
        <div className="max-w-3xl flex flex-col items-center gap-6">
          <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight">
            Ready to plan your next <br />
            <span className="italic font-normal text-brand-accent">unforgettable trip?</span>
          </h2>
          <p className="text-zinc-400 max-w-xl font-light text-sm">
            Join other luxury travelers and leverage our AI planner to engineer tailored agency-quality itineraries. Start drafting today.
          </p>
          <Link to={user ? "/dashboard" : "/register"} className="mt-4">
            <Button variant="accent" className="px-8 py-4 text-base font-semibold">
              Begin Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-brand-dark py-8 px-6 text-center border-t border-zinc-950/80 text-zinc-600 text-xs">
        <p>© 2026 TripCraft AI. Designed for professional itinerating.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
