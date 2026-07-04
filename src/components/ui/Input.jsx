import React, { forwardRef } from "react";

const Input = forwardRef(({ 
  label, 
  error, 
  type = "text", 
  className = "", 
  id,
  ...props 
}, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5 mb-4">
      {label && (
        <label 
          htmlFor={id} 
          className="text-zinc-400 text-xs font-semibold uppercase tracking-wider px-1"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        className={`w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-all duration-200 outline-none ${
          error ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/30" : ""
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-red-400 text-xs px-1 font-medium transition-opacity duration-200 animate-fadeIn">
          {error.message || error}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
