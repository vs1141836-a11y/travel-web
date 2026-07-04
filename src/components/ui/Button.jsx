import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  className = "", 
  disabled = false,
  ...props 
}) => {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles = "px-6 py-3 rounded-lg font-medium text-sm transition-colors duration-200 outline-none flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-electric hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20",
    secondary: "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700/50",
    outline: "bg-transparent border border-zinc-700 hover:border-white text-zinc-300 hover:text-white",
    ghost: "bg-transparent hover:bg-zinc-800/50 text-zinc-400 hover:text-white",
    accent: "bg-brand-accent hover:bg-amber-400 text-brand-dark font-semibold shadow-lg shadow-brand-accent/20",
  };

  const hoverAnimation = shouldReduceMotion
    ? {}
    : {
        scale: 1.02,
        boxShadow: variant === "accent" 
          ? "0 0 20px rgba(229, 169, 60, 0.4)" 
          : variant === "primary"
          ? "0 0 20px rgba(99, 102, 241, 0.4)"
          : "0 0 15px rgba(255, 255, 255, 0.05)",
      };

  const tapAnimation = shouldReduceMotion ? {} : { scale: 0.98 };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : hoverAnimation}
      whileTap={disabled ? {} : tapAnimation}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
