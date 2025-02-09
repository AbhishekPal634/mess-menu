import React from "react";
import MenuItems from "../components/MenuItems";
import Line from "../components/Line";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

const MenuPage = (props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECDFCB] p-8">
      <div className="bg-[#F9F0E1] max-w-3xl w-full h-full p-4 shadow-lg relative overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#2B2B29]/30"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[#2B2B29]/30"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[#2B2B29]/30"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#2B2B29]/30"></div>

        {/* Navigation */}
        <nav className="flex items-center justify-between text-lg">
          {/* Previous Navigation */}
          {props.prev ? (
            <button className="flex items-center space-x-2 hover:text-[#2B2B29]/70 transition-colors group">
              <FaCaretLeft className="text-2xl text-[#2B2B29] group-hover:-translate-x-1 transition-transform" />
              <span className="font-[Cormorant_Garamond] text-2xl text-[#2B2B29]">
                {props.prev}
              </span>
            </button>
          ) : (
            <div></div>
          )}

          {/* Next Navigation */}
          {props.next ? (
            <button className="flex items-center space-x-2 hover:text-[#2B2B29]/70 transition-colors group">
              <span className="font-[Cormorant_Garamond] text-2xl text-[#2B2B29]">
                {props.next}
              </span>
              <FaCaretRight className="text-2xl text-[#2B2B29] group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div></div>
          )}
        </nav>

        {/* Menu Type and Date */}
        <div className="mt-10 flex flex-col items-center justify-center">
          <h1 className="text-[88px] font-[Imperial_Script] leading-[1] text-[#2B2B29]">
            {props.type}
          </h1>
          <h3 className="text-2xl font-[Cormorant_Garamond] font-extralight text-[#2B2B29] mt-2">
            {props.date}
          </h3>
        </div>

        {/* Main separating line */}
        <Line className="mt-4 w-[90%]" />

        {/* Menu Items */}
        <div className="px-4">
          <MenuItems type={props.type} menu={props.menu} />
        </div>

        {/* Footer */}
        <div className="mt-10 mb-2 text-center">
          <div className="inline-block border-t-2 border-b-2 border-[#2B2B29]/30 py-4">
            <p className="font-[Cormorant_Garamond] text-xl text-[#2B2B29]">
              Take all you can eat
            </p>
            <p className="font-[Cormorant_Garamond] text-xl text-[#2B2B29] mt-2">
              Eat all that you take
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
