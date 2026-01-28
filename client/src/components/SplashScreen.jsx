import React, { useState, useEffect } from 'react';
import SportsBackground from './SportsBackground'; // 1. Import

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsOpening(true); 
          setTimeout(onComplete, 1000); 
          return 100;
        }
        let increment;
        if (prev < 30) increment = Math.random() * 5 + 2;      
        else if (prev < 70) increment = Math.random() * 2 + 0.5; 
        else increment = Math.random() * 8 + 4;                  
        return Math.min(prev + increment, 100);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${isOpening ? 'pointer-events-none' : ''}`}>
      
      {/* === LEFT DOOR === */}
      <div className={`absolute left-0 top-0 w-1/2 h-full bg-[#EAE0D5] transition-transform duration-[1200ms] ease-in-out border-r border-[#2C2420]/10 flex items-center justify-end overflow-hidden ${isOpening ? '-translate-x-full' : 'translate-x-0'}`}>
         {/* 2. Add Background to Door (Clipped) */}
         <SportsBackground />
      </div>

      {/* === RIGHT DOOR === */}
      <div className={`absolute right-0 top-0 w-1/2 h-full bg-[#EAE0D5] transition-transform duration-[1200ms] ease-in-out border-l border-[#2C2420]/10 flex items-center justify-start overflow-hidden ${isOpening ? 'translate-x-full' : 'translate-x-0'}`}>
         {/* 3. Add Background to Door (Clipped) */}
         <SportsBackground />
      </div>

      {/* === CENTER CONTENT === */}
      <div className={`relative z-10 flex flex-col items-center justify-center transition-opacity duration-500 ${isOpening ? 'opacity-0' : 'opacity-100'}`}>
        <div className="mb-8 animate-pulse">
          <img src="/flavium-logo.png" alt="Flavium Logo" className="w-32 md:w-48 object-contain drop-shadow-md" />
        </div>
        <h1 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] font-bold tracking-widest uppercase mb-6 text-[#1A1A1A]">
          Flavium
        </h1>
        <div className="w-48 md:w-64 flex flex-col items-center gap-3">
          <div className="w-full h-[2px] bg-[#2C2420]/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#1A1A1A] transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
          </div>
          <div className="font-['Cormorant_Garamond'] text-sm tracking-widest text-[#2C2420] font-semibold mt-2">
            {Math.floor(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;