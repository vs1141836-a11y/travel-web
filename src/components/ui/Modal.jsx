import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className = "" 
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = shouldReduceMotion 
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.1 } }
      }
    : {
        hidden: { opacity: 0, scale: 0.95, y: 15 },
        visible: { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          transition: { type: "spring", stiffness: 350, damping: 25 }
        },
        exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } }
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`glass w-full max-w-lg rounded-xl overflow-hidden shadow-premium relative z-10 p-6 border border-zinc-800 ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-4">
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <button 
                onClick={onClose}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-zinc-800/50"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="text-zinc-300 text-sm max-h-[75vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
