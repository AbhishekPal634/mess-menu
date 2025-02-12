import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECDFCB] p-8">
      <div className="bg-[#F9F0E1] max-w-2xl w-full h-full p-8 shadow-lg relative overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#2B2B29]/30"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[#2B2B29]/30"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[#2B2B29]/30"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#2B2B29]/30"></div>

        <div className="flex flex-col items-center justify-center space-y-6">
          {/* 404 Title */}
          <h1 className="text-[120px] font-[Cormorant_Garamond] leading-[1] text-[#2B2B29]">
            404
          </h1>

          {/* Decorative line */}
          <div className="w-32 h-px bg-[#2B2B29]/30"></div>

          {/* Message */}
          <div className="text-center">
            <h2 className="text-3xl font-[Cormorant_Garamond] text-[#2B2B29] mb-4">
              Page Not Found
            </h2>
            <p className="font-[Cormorant_Garamond] text-xl text-[#2B2B29]/80 max-w-md">
              We couldn't find what you were looking for. Perhaps you'd like to
              see today's menu instead?
            </p>
          </div>

          {/* Home button */}
          <button
            onClick={() => navigate("/")}
            className="relative flex items-center px-8 py-3 mt-6 group transition-colors hover:bg-[#2B2B29]/10 rounded-md cursor-pointer"
          >
            <FaHome className="text-xl text-[#2B2B29] opacity-60 mr-2" />
            <span className="font-[Cormorant_Garamond] text-xl text-[#2B2B29]">
              Return Home
            </span>
          </button>

          {/* Decorative footer quote */}
          <div className="mt-8 border-t-2 border-b-2 border-[#2B2B29]/30 py-4 text-center w-full">
            <p className="font-[Cormorant_Garamond] text-lg text-[#2B2B29] italic">
              "The best dishes are found where you least expect them"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
