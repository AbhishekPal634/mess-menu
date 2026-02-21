// src/components/AmbioraBackground.jsx
import React from 'react';

const AmbioraBackground = () => {
  return (
    // Fills parent container perfectly
    <div className="absolute top-0 left-0 w-full h-full flex justify-center overflow-hidden pointer-events-none">
      
      <style>{`
        /* Soothing, slow fiber optic flows */
        @keyframes gentleSurge {
          0% { stroke-dashoffset: 800; opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes slowPan {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
        .elegant-line {
          stroke: #F9F0E1; /* Light beige lines to pop against dark bg */
          fill: none;
          stroke-linecap: round;
        }
      `}</style>

      {/* === THE DARK CONTAINER BACKGROUND === */}
      {/* Removed max-w so it fills the menu card edge-to-edge */}
      <div className="relative w-full h-full bg-[#1A1A19] overflow-hidden shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]">
        
        {/* Layer 1: Slow Panning Blueprint Grid (Faint Beige) */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{ 
            backgroundImage: 'linear-gradient(#F9F0E1 1px, transparent 1px), linear-gradient(90deg, #F9F0E1 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            animation: 'slowPan 60s linear infinite'
          }} 
        />

        {/* Layer 2: Left Side Technical Lines */}
        <svg className="absolute top-0 left-0 w-[150px] md:w-[200px] h-full opacity-60" viewBox="0 0 200 1000" preserveAspectRatio="xMinYMin slice" xmlns="http://www.w3.org/2000/svg">
          {/* Static Track */}
          <path className="elegant-line opacity-20" strokeWidth="1" d="M 0 150 L 60 150 L 100 190 L 100 600" />
          <path className="elegant-line opacity-20" strokeWidth="1" d="M -20 400 L 30 400 L 60 430 L 60 800" />
          
          {/* Gentle Data Flow */}
          <path className="elegant-line" strokeWidth="1.5" strokeDasharray="40 800" d="M 0 150 L 60 150 L 100 190 L 100 600" style={{ animation: 'gentleSurge 6s ease-in-out infinite' }} />
          <path className="elegant-line" strokeWidth="1.5" strokeDasharray="30 800" d="M -20 400 L 30 400 L 60 430 L 60 800" style={{ animation: 'gentleSurge 5s ease-in-out infinite 2s' }} />

          {/* Elegant Nodes */}
          <circle cx="60" cy="150" r="2.5" fill="#F9F0E1" opacity="0.8" />
          <rect x="98" y="598" width="4" height="4" fill="#F9F0E1" transform="rotate(45 100 600)" opacity="0.7" />
        </svg>

        {/* Layer 3: Right Side Technical Lines */}
        <svg className="absolute top-0 right-0 w-[150px] md:w-[200px] h-full opacity-60" viewBox="0 0 200 1000" preserveAspectRatio="xMaxYMin slice" xmlns="http://www.w3.org/2000/svg">
          {/* Static Track */}
          <path className="elegant-line opacity-20" strokeWidth="1" d="M 200 250 L 140 250 L 100 290 L 100 700" />
          <path className="elegant-line opacity-20" strokeWidth="1" d="M 220 500 L 170 500 L 140 530 L 140 900" />
          
          {/* Gentle Data Flow */}
          <path className="elegant-line" strokeWidth="1.5" strokeDasharray="40 800" d="M 200 250 L 140 250 L 100 290 L 100 700" style={{ animation: 'gentleSurge 7s ease-in-out infinite 1s' }} />
          <path className="elegant-line" strokeWidth="1.5" strokeDasharray="30 800" d="M 220 500 L 170 500 L 140 530 L 140 900" style={{ animation: 'gentleSurge 5.5s ease-in-out infinite 3s' }} />

          {/* Elegant Nodes */}
          <circle cx="140" cy="250" r="2.5" fill="#F9F0E1" opacity="0.8" />
          <rect x="98" y="698" width="4" height="4" fill="#F9F0E1" transform="rotate(45 100 700)" opacity="0.7" />
        </svg>

      </div>
    </div>
  );
};

export default AmbioraBackground;