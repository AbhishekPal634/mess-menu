import React, { useEffect, useState } from 'react';

const SportsBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // I assigned 'moveType' to alternate the direction of movement for a more natural feel
  const sportsIcons = [
    { icon: '🏀', size: 'text-8xl', delay: '0s', duration: '18s', top: '20%', left: '10%', moveType: 'floatA' },
    { icon: '⚽', size: 'text-7xl', delay: '2s', duration: '23s', top: '80%', left: '85%', moveType: 'floatB' },
    { icon: '🏏', size: 'text-6xl', delay: '4s', duration: '20s', top: '10%', left: '25%', moveType: 'floatA' },
    { icon: '🏸', size: 'text-7xl', delay: '1s', duration: '25s', top: '85%', left: '15%', moveType: 'floatB' },
    { icon: '♟️', size: 'text-6xl', delay: '5s', duration: '22s', top: '60%', left: '5%', moveType: 'floatA' },
    { icon: '🏐', size: 'text-8xl', delay: '3s', duration: '24s', top: '30%', left: '90%', moveType: 'floatB' },
    { icon: '🎾', size: 'text-6xl', delay: '0.5s', duration: '19s', top: '15%', left: '50%', moveType: 'floatA' },
    { icon: '🏓', size: 'text-7xl', delay: '6s', duration: '27s', top: '5%', left: '80%', moveType: 'floatB' },
    { icon: '🏊', size: 'text-7xl', delay: '2.5s', duration: '21s', top: '50%', left: '40%', moveType: 'floatA' },
        ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      
      {/* Texture Overlay (Adds the paper feel) */}
      <div 
        className="absolute inset-0 opacity-[0.3] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Moving Icons */}
      {mounted && sportsIcons.map((sport, index) => (
        <div
          key={index}
          className={`absolute ${sport.size} select-none`}
          style={{
            left: sport.left,
            top: sport.top,
            
            // --- ANIMATION CONFIG ---
            animationName: sport.moveType, // This links to the @keyframes below
            animationDuration: sport.duration,
            animationDelay: sport.delay,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            
            // --- VISUAL STYLE ---
            willChange: 'transform',
            opacity: 0.35, // Slightly higher so you can definitely see them
            filter: 'grayscale(0.4) sepia(0.2)',
            mixBlendMode: 'multiply',
          }}
        >
          {sport.icon}
        </div>
      ))}

      {/* FIX: Using a standard <style> tag ensures this works in Vite, CRA, and Next.js.
         The movement is now significantly larger (50px range vs 15px) so it's clearly visible.
      */}
      <style>{`
        @keyframes floatA {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -50px) rotate(10deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

        @keyframes floatB {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, 40px) rotate(-10deg); }
          66% { transform: translate(40px, -30px) rotate(5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default SportsBackground;