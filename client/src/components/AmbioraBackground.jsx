// src/components/AmbioraBackground.jsx
import React from 'react';

const AmbioraBackground = () => {
  return (
    // Changed base background to slightly darker beige variant if needed, but keeping #F9F0E1 ensures consistency
    <div className="absolute inset-0 overflow-hidden bg-[#F9F0E1] z-0 pointer-events-none">
      
      {/* 1. THE ARCHITECTURAL BLUEPRINT GRID */}
      {/* Increased opacity from 0.04 to 0.08 to make the grid visibly darker and heavier */}
      <div 
        className="absolute inset-0 opacity-[0.08]" 
        style={{ 
          backgroundImage: 'linear-gradient(#2B2B29 1px, transparent 1px), linear-gradient(90deg, #2B2B29 1px, transparent 1px)', 
          backgroundSize: '48px 48px',
          backgroundPosition: 'center center'
        }} 
      />

      {/* 2. LIVE CIRCUIT TRACES (SVG Data Flows) */}
      {/* Increased base opacity from 0.20 to 0.40 so the traces are much more prominent */}
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          .trace-fast { 
            stroke-dasharray: 1500; 
            stroke-dashoffset: 1500; 
            animation: drawTrace 6s cubic-bezier(0.4, 0, 0.2, 1) infinite; 
          }
          .trace-slow { 
            stroke-dasharray: 2000; 
            stroke-dashoffset: 2000; 
            animation: drawTrace 12s ease-in-out infinite reverse; 
          }
          @keyframes drawTrace { 
            100% { stroke-dashoffset: 0; } 
          }
          .tech-node { 
            animation: pulseNode 4s ease-in-out infinite; 
            transform-origin: center;
          }
          @keyframes pulseNode { 
            0%, 100% { transform: scale(1); opacity: 0.6; } /* Increased base opacity */
            50% { transform: scale(1.8); opacity: 1; } 
          }
        `}</style>

        {/* Thickened the stroke widths slightly to add visual weight */}
        <path d="M-100,150 L200,150 L250,200 L250,450 L400,600 L1200,600" fill="none" stroke="#2B2B29" strokeWidth="2.5" className="trace-fast" />
        <path d="M1200,300 L800,300 L750,350 L750,600 L600,750 L-100,750" fill="none" stroke="#2B2B29" strokeWidth="2" className="trace-slow" />
        <path d="M350,-100 L350,250 L450,350 L850,350 L900,400 L900,1200" fill="none" stroke="#2B2B29" strokeWidth="3" className="trace-fast" style={{animationDelay: '-2s', opacity: 0.8}} />
        <path d="M150,1000 L150,800 L300,650 L500,650" fill="none" stroke="#2B2B29" strokeWidth="2" className="trace-slow" style={{animationDelay: '-4s'}} />

        {/* Hardware Nodes */}
        <circle cx="200" cy="150" r="4" fill="#2B2B29" className="tech-node" />
        <circle cx="250" cy="200" r="4" fill="#2B2B29" className="tech-node" style={{animationDelay: '-1s'}} />
        <circle cx="400" cy="600" r="4" fill="#2B2B29" className="tech-node" style={{animationDelay: '-2s'}} />
        <circle cx="800" cy="300" r="4" fill="#2B2B29" className="tech-node" style={{animationDelay: '-3s'}} />
        <circle cx="600" cy="750" r="4" fill="#2B2B29" className="tech-node" style={{animationDelay: '-0.5s'}} />
        <circle cx="450" cy="350" r="4" fill="#2B2B29" className="tech-node" style={{animationDelay: '-1.5s'}} />
        <circle cx="900" cy="400" r="4" fill="#2B2B29" className="tech-node" style={{animationDelay: '-2.5s'}} />
      </svg>

      {/* 3. ROTATING STRUCTURAL HUD RINGS (Top Right) */}
      {/* Increased opacity from 0.06 to 0.15 */}
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] opacity-[0.15]">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_60s_linear_infinite]">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#2B2B29" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="#2B2B29" strokeWidth="2" strokeDasharray="30 15 5 15" className="origin-center animate-[spin_30s_linear_infinite_reverse]" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#2B2B29" strokeWidth="1" />
          <path d="M100 5 L100 25 M100 175 L100 195 M5 100 L25 100 M175 100 L195 100" stroke="#2B2B29" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 4. ROTATING STRUCTURAL HUD RINGS (Bottom Left) */}
      {/* Increased opacity from 0.08 to 0.18 */}
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] opacity-[0.18]">
        <svg viewBox="0 0 200 200" className="w-full h-full origin-center animate-[spin_40s_linear_infinite_reverse]">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#2B2B29" strokeWidth="1.5" strokeDasharray="10 20 50 20" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#2B2B29" strokeWidth="1" strokeDasharray="2 4" className="origin-center animate-[spin_20s_linear_infinite]" />
        </svg>
      </div>

      {/* Vignette effect */}
      {/* Reduced opacity from 0.70 to 0.40 to allow more of the dark grid/traces to show through the center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#F9F0E1_100%)] opacity-40"></div>
    </div>
  );
};

export default AmbioraBackground;