import React from "react";

const Line = ({ className = "" }) => {
  return (
    <div
      className={`flex items-center justify-center gap-4 w-[90%] mx-auto ${className}`}
    >
      <div className="h-0.5 bg-[#2B2B29] flex-1"></div>
      <div className="w-2 h-2 rotate-45 border-2 border-[#2B2B29]"></div>
      <div className="h-0.5 bg-[#2B2B29] flex-1"></div>
    </div>
  );
};

export default Line;
