// src/components/AmbioraBackground.jsx
import React, { useMemo } from 'react';

import imgCineTech from '../assets/cine_tech.png';
import imgCodeVyuh from '../assets/code_vyuh.png';
import imgDeepFake from '../assets/deep_fake_hisence.png'; 
import imgDrone from '../assets/drone_o_mania.png';
import imgPitchApp from '../assets/pitch_your_own_app.png'; 
import imgRobo from '../assets/robo_workshop.png';
import imgTower from '../assets/tower_of_stability.png';
import imgTreasure from '../assets/treasure_hunt.png';

const AmbioraBackground = () => {
  const floatingCards = useMemo(() => {
    return [
      { id: 1, src: imgCodeVyuh, top: '2%', left: '2%', rotation: -12 },
      { id: 2, src: imgTreasure, top: '8%', left: '86%', rotation: 8 },
      { id: 3, src: imgRobo, top: '32%', left: '1%', rotation: 15 },
      { id: 4, src: imgDeepFake, top: '38%', left: '89%', rotation: -10 }, 
      { id: 5, src: imgPitchApp, top: '62%', left: '3%', rotation: -8 },
      { id: 6, src: imgDrone, top: '68%', left: '86%', rotation: 12 },
      { id: 7, src: imgCineTech, top: '85%', left: '4%', rotation: -5 },
      { id: 8, src: imgTower, top: '88%', left: '84%', rotation: 6 }
    ].map(card => ({
      ...card,
      // Massive negative delay spread so every card is at a completely different phase of its animation
      delay: `${Math.random() * -80}s`, 
      // Drastically increased duration (70s to 110s) for that ultra-smooth, slow-motion float
      duration: `${70 + Math.random() * 40}s` 
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      
      <div 
        className="absolute inset-0 opacity-[0.08]" 
        style={{ 
          backgroundImage: 'linear-gradient(#2B2B29 1px, transparent 1px), linear-gradient(90deg, #2B2B29 1px, transparent 1px)', 
          backgroundSize: '48px 48px',
          backgroundPosition: 'center center'
        }} 
      />

      <style>{`
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0) rotate(var(--rot)); }
          /* Kept the 35px travel distance so the movement is visible, just much slower now */
          50% { transform: translateY(-35px) rotate(calc(var(--rot) + 5deg)); }
        }
      `}</style>
      
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 90%, rgba(0,0,0,1) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 90%, rgba(0,0,0,1) 100%)'
        }}
      >
        {floatingCards.map((card) => (
          <div 
            key={card.id}
            className="absolute transition-transform rounded-md overflow-hidden bg-transparent"
            style={{
              top: card.top,
              left: card.left,
              width: '140px', 
              height: '200px',
              '--rot': `${card.rotation}deg`,
              animation: `gentleFloat ${card.duration} ease-in-out infinite`,
              animationDelay: card.delay,
              opacity: 0.30, 
              mixBlendMode: 'multiply',
              filter: 'drop-shadow(0 15px 20px rgba(0, 0, 0, 0.2))'
            }}
          >
            <img 
              src={card.src} 
              alt="Ambiora Event Poster" 
              loading="lazy" 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Made the trace lines move slightly slower as well to match the new relaxed vibe */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100,150 L200,150 L250,200 L250,450 L400,600 L1200,600" fill="none" stroke="#2B2B29" strokeWidth="2" strokeDasharray="1500" strokeDashoffset="1500" className="animate-[drawTrace_12s_cubic-bezier(0.4,0,0.2,1)_infinite]" />
        <path d="M1200,300 L800,300 L750,350 L750,600 L600,750 L-100,750" fill="none" stroke="#2B2B29" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" className="animate-[drawTrace_20s_ease-in-out_infinite_reverse]" />
      </svg>
    </div>
  );
};

export default AmbioraBackground;