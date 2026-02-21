// src/components/FlaviumBackground.jsx
import React, { useEffect, useState } from 'react';

const FlaviumBackground = ({ isVisible }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sportsIcons = [
    { icon: '🏀', size: 'text-5xl md:text-8xl', delay: '0s', duration: '18s', top: '15%', left: '8%', moveType: 'floatA' },
    { icon: '⚽', size: 'text-4xl md:text-7xl', delay: '2s', duration: '23s', top: '75%', left: '85%', moveType: 'floatB' },
    { icon: '🏏', size: 'text-4xl md:text-6xl', delay: '4s', duration: '20s', top: '8%', left: '30%', moveType: 'floatA' },
    { icon: '🏸', size: 'text-4xl md:text-7xl', delay: '1s', duration: '25s', top: '85%', left: '15%', moveType: 'floatB' },
    { icon: '♟️', size: 'text-4xl md:text-6xl', delay: '5s', duration: '22s', top: '65%', left: '4%', moveType: 'floatA' },
    { icon: '🏐', size: 'text-5xl md:text-8xl', delay: '3s', duration: '24s', top: '25%', left: '88%', moveType: 'floatB' },
    { icon: '🎾', size: 'text-3xl md:text-6xl', delay: '0.5s', duration: '19s', top: '10%', left: '60%', moveType: 'floatA' },
    { icon: '🏓', size: 'text-4xl md:text-7xl', delay: '6s', duration: '27s', top: '5%', left: '75%', moveType: 'floatB' },
    { icon: '🏊', size: 'text-4xl md:text-7xl', delay: '2.5s', duration: '21s', top: '45%', left: '90%', moveType: 'floatA' },
  ];

  return (
    <div 
      className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ease-in-out pointer-events-none bg-[#F9F0E1] ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      
      {/* Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.25] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Wrapping the icons in a center-mask so they don't block the menu text */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: 'radial-gradient(ellipse at center, transparent 15%, black 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 15%, black 70%)'
        }}
      >
        {mounted && sportsIcons.map((sport, index) => (
          <div
            key={index}
            className={`absolute ${sport.size} select-none`}
            style={{
              left: sport.left,
              top: sport.top,
              
              animationName: sport.moveType, 
              animationDuration: sport.duration,
              animationDelay: sport.delay,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
              
              willChange: 'transform',
              // === FINAL OPACITY BOOST ===
              // Increased opacity significantly to 0.75 for much darker icons.
              // Slightly adjusted brightness up to balance the heavy opacity.
              opacity: 0.75, 
              filter: 'grayscale(0.6) sepia(0.4) brightness(0.5) contrast(1.2)',
              mixBlendMode: 'multiply',
            }}
          >
            {sport.icon}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#F9F0E1_100%)] opacity-60" />

      <style>{`
        @keyframes floatA {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(25px, -35px) rotate(10deg); }
          66% { transform: translate(-15px, 15px) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

        @keyframes floatB {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-25px, 30px) rotate(-10deg); }
          66% { transform: translate(30px, -20px) rotate(5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default FlaviumBackground;