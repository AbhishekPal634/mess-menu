// src/components/SplashScreen.jsx
import React, { useState, useEffect, useMemo } from 'react';

import imgCineTech from '../assets/cine_tech.avif';
import imgCodeVyuh from '../assets/code_vyuh.avif';
import imgDeepFake from '../assets/deep_fake_hisence.avif'; 
import imgDrone from '../assets/drone_o_mania.avif';
import imgPitchApp from '../assets/pitch_your_own_app.avif'; 
import imgRobo from '../assets/robo_workshop.avif';
import imgTower from '../assets/tower_of_stability.avif';
import imgTreasure from '../assets/treasure_hunt.avif';

const SplashScreen = ({ onComplete }) => {
  // Phases: 'hidden' -> 'deck' -> 'scatter' -> 'textReveal' -> 'fadeOut'
  const [phase, setPhase] = useState('hidden'); 

  useEffect(() => {
    const sequence = async () => {
      // 1. Drop the deck instantly
      await new Promise(r => setTimeout(r, 50));
      setPhase('deck');

      // 2. Faster deal: Scatter the cards into the ring
      await new Promise(r => setTimeout(r, 500));
      setPhase('scatter');

      // 3. Text Reveal: Wait for cards to land (700ms), then boot up the text
      await new Promise(r => setTimeout(r, 700));
      setPhase('textReveal');

      // 4. Hold to read, then fade out (Reduced time for a snappier feel)
      await new Promise(r => setTimeout(r, 1400));
      setPhase('fadeOut');

      // 5. Unmount and show the Mess Menu
      await new Promise(r => setTimeout(r, 600)); 
      onComplete();
    };

    sequence();
  }, [onComplete]);

  // Pre-calculate the NO-OVERLAP Ring Grid
  const cardData = useMemo(() => {
    const images = [imgCineTech, imgCodeVyuh, imgDeepFake, imgDrone, imgPitchApp, imgRobo, imgTower, imgTreasure];
    
    // A perfect elliptical ring keeping the center completely empty
    const ringGrid = [
      { x: -32, y: -32 }, // Top Left
      { x: 0,   y: -38 }, // Top Center
      { x: 32,  y: -32 }, // Top Right
      { x: 38,  y: 0 },   // Mid Right
      { x: 32,  y: 32 },  // Bottom Right
      { x: 0,   y: 38 },  // Bottom Center
      { x: -32, y: 32 },  // Bottom Left
      { x: -38, y: 0 },   // Mid Left
    ];

    return images.map((src, i) => {
      const pos = ringGrid[i];
      // Deck has random messy angles
      const deckAngle = (Math.random() - 0.5) * 25;
      // Ring cards are almost perfectly straight for a clean, structural tech look
      const readAngle = (Math.random() - 0.5) * 6; 

      return {
        id: i,
        src: src,
        deckTransform: `translate(0vw, 0vh) rotate(${deckAngle}deg) scale(0.8)`,
        scatterTransform: `translate(${pos.x}vw, ${pos.y}vh) rotate(${readAngle}deg) scale(1)`,
        // Ultra-fast staggering for a snappy deal
        dealDelay: i * 0.05, 
      };
    });
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-[600ms] pointer-events-none bg-[#ECDFCB] ${phase === 'fadeOut' ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Tech Blueprint Background inside the Splash Screen */}
      <div 
        className="absolute inset-0 opacity-[0.07]" 
        style={{ 
          backgroundImage: 'linear-gradient(#2B2B29 1px, transparent 1px), linear-gradient(90deg, #2B2B29 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} 
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#ECDFCB_100%)] opacity-90" />

      {/* === CENTER TEXT REVEAL === */}
      <div 
        className={`absolute z-30 flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${phase === 'textReveal' || phase === 'fadeOut' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
      >
        <h1 className="text-5xl md:text-7xl font-['Cormorant_Garamond'] font-bold text-[#2B2B29] tracking-[0.2em] uppercase drop-shadow-md">
          AMBIORA
        </h1>
        {/* Techy subtitle to sell the Fest vibe */}
        <div className="mt-3 flex items-center gap-3 opacity-70">
          <div className="w-10 h-[1px] bg-[#2B2B29]"></div>
          <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] font-bold text-[#2B2B29]">
            [ SYSTEM.ONLINE ]
          </span>
          <div className="w-10 h-[1px] bg-[#2B2B29]"></div>
        </div>
      </div>

      {/* === THE CARDS === */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        {cardData.map((card) => {
          
          let currentTransform = `translate(0px, 150px) scale(0.3)`; 
          let currentOpacity = 0;
          let currentDelay = 0;

          if (phase === 'deck') {
            currentTransform = card.deckTransform;
            currentOpacity = 1;
            currentDelay = 0; 
          } else if (phase === 'scatter' || phase === 'textReveal' || phase === 'fadeOut') {
            currentTransform = card.scatterTransform;
            currentOpacity = 1;
            currentDelay = card.dealDelay; 
          }

          return (
            <div 
              key={card.id}
              // STRICT RESPONSIVE SIZING: 
              // Mobile: 80x115 (Tiny, guaranteed no overlap)
              // Tablet: 100x145
              // Desktop: 130x190
              className="absolute w-[80px] h-[115px] sm:w-[100px] sm:h-[145px] md:w-[130px] md:h-[190px] rounded-md overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{
                transform: currentTransform,
                opacity: currentOpacity,
                transitionDelay: `${currentDelay}s`,
                boxShadow: phase === 'deck' 
                  ? '0 10px 30px -5px rgba(0, 0, 0, 0.4)' 
                  : '0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0,0,0,0.1)', 
                border: '1px solid rgba(255, 255, 255, 0.15)' 
              }}
            >
              <img 
                src={card.src} 
                alt="Event Poster" 
                className="w-full h-full object-cover contrast-110 brightness-95" 
              />
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default SplashScreen;