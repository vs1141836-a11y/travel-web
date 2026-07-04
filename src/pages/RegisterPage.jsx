import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Sparkles, AlertCircle } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

const RegisterPage = () => {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");
    try {
      await authRegister(data.name, data.email, data.password);
      toast.success("Account created! Welcome to TripCraft AI.");
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.message || "Failed to register account.");
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = shouldReduceMotion 
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.1 } }
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: { type: "spring", stiffness: 200, damping: 20 }
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.15 } }
      };

  return (
    <div className="bg-brand-dark min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background glow blur */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute w-[50vw] h-[50vw] top-[10%] left-[25%] bg-indigo-500 rounded-full blur-[100px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-md z-10"
      >
        <div className="flex flex-col items-center gap-2 mb-8 text-center">
          <Link to="/" className="text-3xl font-bold flex items-center gap-2 tracking-wider mb-2">
            <Compass className="text-brand-accent text-indigo-500 animate-spin" />
            <span className="font-display">TripCraft AI</span>
          </Link>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
            <Sparkles size={12} className="text-brand-accent" />
            Bespoke Travel Planner
          </p>
        </div>

        <Card className="border border-zinc-800/80 p-8 shadow-premium">
          <h2 className="text-2xl font-semibold mb-6 text-center">Create Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {serverError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-lg flex items-start gap-2.5 text-xs mb-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            <Input
              label="Full Name"
              type="text"
              id="name"
              placeholder="e.g. John Doe"
              error={errors.name}
              {...register("name")}
            />

            <Input
              label="Email Address"
              type="email"
              id="email"
              placeholder="e.g. wanderer@domain.com"
              error={errors.email}
              {...register("email")}
            />

            <Input
              label="Password"
              type="password"
              id="password"
              placeholder="Min. 6 characters"
              error={errors.password}
              {...register("password")}
            />

            <Button
              type="submit"
              variant="accent"
              className="w-full py-3.5 mt-2 font-semibold"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register Now"}
            </Button>
          </form>

          <div className="mt-8 text-center text-xs text-zinc-500 border-t border-zinc-900 pt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-brand-accent hover:underline font-semibold">
              Sign In
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
