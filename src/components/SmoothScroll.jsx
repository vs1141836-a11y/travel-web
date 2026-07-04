import React from "react";
import { ReactLenis } from "lenis/react";

const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1,             // Scroll easing speed
        duration: 1.2,         // Animation length
        smoothTouch: false,    // Native touch responsiveness on mobile
        wheelMultiplier: 1.0,  // Scroll sensitivity
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
