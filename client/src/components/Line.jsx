// src/components/Line.jsx
import React from "react";

const Line = ({ className = "", isFlavium }) => {
  // If Flavium (light bg) use dark lines. If Ambiora (dark bg) use light lines.
  const bgColor = isFlavium ? "bg-[#2B2B29]" : "bg-[#F9F0E1]";
  const borderColor = isFlavium ? "border-[#2B2B29]" : "border-[#F9F0E1]";

  return (
    <div className={`flex items-center justify-center gap-4 w-[90%] mx-auto opacity-60 ${className}`}>
      <div className={`h-[1px] flex-1 transition-colors duration-700 ${bgColor}`}></div>
      <div className={`w-1.5 h-1.5 rotate-45 border transition-colors duration-700 ${borderColor}`}></div>
      <div className={`h-[1px] flex-1 transition-colors duration-700 ${bgColor}`}></div>
    </div>
  );
};

export default Line;