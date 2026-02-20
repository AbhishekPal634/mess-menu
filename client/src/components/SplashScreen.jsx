import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    let startTime;
    let animationFrameId;
    const duration = 700; 
    const animateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(animateProgress);
      } else {
        // Trigger exit animations when exact time is reached
        setIsOpening(true);
        setTimeout(onComplete, 700);
      }
    };

    // Start the highly-precise animation loop
    animationFrameId = requestAnimationFrame(animateProgress);

    // Cleanup to prevent memory leaks if component unmounts early
    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${isOpening ? 'pointer-events-none' : ''}`}>
      
      {/* Inline styles for the custom staggered lines loader */}
      <style>{`
        @keyframes stir {
          0% { transform: rotate(0deg) translate(0px, 0px); }
          33% { transform: rotate(120deg) translate(3px, 3px); }
          66% { transform: rotate(240deg) translate(-3px, 3px); }
          100% { transform: rotate(360deg) translate(0px, 0px); }
        }
      `}</style>

      {/* === LEFT DOOR === */}
      <div className={`absolute left-0 top-0 w-1/2 h-full bg-[#ECDFCB] transition-transform duration-[1200ms] ease-in-out flex items-center justify-end overflow-hidden ${isOpening ? '-translate-x-full' : 'translate-x-0'}`}>
      </div>

      {/* === RIGHT DOOR === */}
      <div className={`absolute right-0 top-0 w-1/2 h-full bg-[#ECDFCB] transition-transform duration-[1200ms] ease-in-out  flex items-center justify-start overflow-hidden ${isOpening ? 'translate-x-full' : 'translate-x-0'}`}>
      </div>

      {/* === CENTER CONTENT === */}
      <div className={`relative z-10 flex flex-col items-center justify-center transition-opacity duration-500 ${isOpening ? 'opacity-0' : 'opacity-100'}`}>
        
        
        {/* === NEW PLATE & SPOON LOADER === */}
        <div className="flex flex-col items-center justify-center h-24 mb-2">
          <svg 
            viewBox="0 0 100 100" 
            className="w-30 h-30 opacity-80 " 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* Outer Plate Outline */}
            <circle cx="50" cy="50" r="44" strokeWidth="8" />
            {/* Inner Plate Rim */}
            <circle cx="50" cy="50" r="30" strokeWidth="4" className="opacity-60" />
            
            {/* Rotating Hollow Spoon */}
            <g className="origin-center" style={{ animation: 'stir 2s linear infinite' }}>
               {/* Spoon Head */}
               <ellipse cx="50" cy="32" rx="8" ry="14" strokeWidth="6" />
               {/* Spoon Handle */}
               <path d="M50 46 L50 72" strokeWidth="6" />
            </g>
          </svg>
        </div>

      </div>
    </div>
  );
};

export default SplashScreen;