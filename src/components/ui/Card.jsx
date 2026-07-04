import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const Card = ({ 
  children, 
  className = "", 
  hoverable = true,
  onClick, 
  ...props 
}) => {
  const shouldReduceMotion = useReducedMotion();

  const hoverAnimation = (hoverable && !shouldReduceMotion && !onClick)
    ? { y: -6, boxShadow: "var(--tw-shadow-cardHover, 0 30px 60px -20px rgba(0,0,0,0.8))" }
    : {};

  const clickableAnimation = (hoverable && !shouldReduceMotion && onClick)
    ? { 
        y: -4, 
        scale: 1.01,
        boxShadow: "var(--tw-shadow-cardHover, 0 30px 60px -20px rgba(0,0,0,0.8))" 
      }
    : {};

  const tapAnimation = (hoverable && !shouldReduceMotion && onClick) ? { scale: 0.99 } : {};

  return (
    <motion.div
      onClick={onClick}
      whileHover={onClick ? clickableAnimation : hoverAnimation}
      whileTap={tapAnimation}
      className={`glass rounded-xl p-6 transition-all duration-300 ${onClick ? "cursor-pointer" : ""} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
