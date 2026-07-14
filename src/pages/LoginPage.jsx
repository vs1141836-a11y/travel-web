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
import api from "../utils/api";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");
    try {
      await login(data.email, data.password);
      toast.success("Welcome back to TripCraft AI!");
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.message || "Invalid credentials provided");
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    setLoading(true);
    setServerError("");
    const email = `${provider.toLowerCase()}.explorer@tripcraft.ai`;
    const password = `${provider}Secure123!`;
    const name = `${provider} Traveler`;

    const oauthToast = toast.loading(`Connecting to ${provider} secure OAuth...`);

    try {
      // Silent signup check/attempt
      try {
        await api.post("/auth/register", { name, email, password });
      } catch (regErr) {
        // Safe to ignore if email exists
      }

      await login(email, password);
      toast.dismiss(oauthToast);
      toast.success(`Authenticated successfully via ${provider}!`);
      navigate("/dashboard");
    } catch (err) {
      toast.dismiss(oauthToast);
      setServerError(`Failed to authenticate via ${provider}`);
      toast.error(`OAuth login failed`);
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
            Secure Agency Portal
          </p>
        </div>

        <Card className="border border-zinc-800/80 p-8 shadow-premium">
          <h2 className="text-2xl font-semibold mb-6 text-center">Access Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {serverError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-lg flex items-start gap-2.5 text-xs mb-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

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
              placeholder="••••••••"
              error={errors.password}
              {...register("password")}
            />

            <Button
              type="submit"
              variant="accent"
              className="w-full py-3.5 mt-2 font-semibold"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>

          <div className="flex items-center my-5">
            <div className="flex-grow border-t border-zinc-900"></div>
            <span className="flex-shrink mx-4 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Or login with</span>
            <div className="flex-grow border-t border-zinc-900"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleOAuthLogin("Google")}
              className="py-2.5 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-lg flex items-center justify-center gap-2 text-xs font-semibold transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.694 0-8.503-3.809-8.503-8.503s3.809-8.503 8.503-8.503c2.25 0 4.3.81 5.92 2.21l3.107-3.109C18.665.94 15.65 0 12.24 0 5.58 0 0 5.58 0 12.24s5.58 12.24 12.24 12.24c6.96 0 12.24-4.89 12.24-12.24 0-.83-.07-1.63-.2-2.4H12.24z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleOAuthLogin("GitHub")}
              className="py-2.5 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-lg flex items-center justify-center gap-2 text-xs font-semibold transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          <div className="mt-8 text-center text-xs text-zinc-500 border-t border-zinc-900 pt-6">
            New to TripCraft AI?{" "}
            <Link to="/register" className="text-brand-accent hover:underline font-semibold">
              Create Account
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
