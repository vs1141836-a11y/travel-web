// Reusable motion variants for Framer Motion

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
  exit: { opacity: 0, y: -20 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { opacity: 0 }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export const scaleOnHover = {
  hover: { 
    scale: 1.03, 
    transition: { type: "spring", stiffness: 400, damping: 10 }
  },
  tap: { scale: 0.98 }
};

export const slideIn = (direction = "left") => {
  return {
    initial: {
      opacity: 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
    exit: {
      opacity: 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      y: direction === "up" ? -50 : direction === "down" ? 50 : 0,
      transition: { duration: 0.2 }
    }
  };
};

// Safe helper to check accessibility defaults
export const getMotionVariants = (variants, reducedMotion = false) => {
  if (reducedMotion) {
    // Instant/opacity-only transitions for accessibility fallback
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.1 } },
      exit: { opacity: 0, transition: { duration: 0.1 } }
    };
  }
  return variants;
};
