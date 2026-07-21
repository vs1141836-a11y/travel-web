import React from "react";

const Skeleton = ({ 
  className = "", 
  variant = "rect",
  height = "h-4",
  width = "w-full",
}) => {
  const shapeClass = variant === "circle" ? "rounded-full" : "rounded-lg";

  return (
    <div 
      className={`shimmer ${width} ${height} ${shapeClass} opacity-60 ${className}`}
      role="presentation"
      aria-hidden="true"
    />
  );
};

export default Skeleton;
