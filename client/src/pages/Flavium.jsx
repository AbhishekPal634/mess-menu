// src/pages/Flavium.jsx
import React from "react";
import MenuItems from "../components/MenuItems";
import Line from "../components/Line";
import SportsBackground from "../components/SportsBackground";

const Flavium = ({ menuData, handleNavigation, formatDate }) => {

  return (
    // THE MAGIC IS HERE: bg-[#F9F0E1]/80 + backdrop-blur-md + subtle border
    <div className="bg-[#F9F0E1]/80 backdrop-blur-md border border-[#2B2B29]/5 max-w-3xl w-full min-h-[calc(100vh-8rem)] shadow-2xl relative overflow-hidden flex flex-col px-4 md:px-8 transition-all duration-500">
      
      {/* The background now sits BEHIND the frosted glass */}
      <SportsBackground />

      <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-l-[1.5px] border-t-[1.5px] border-[#2B2B29]/30 z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 border-r-[1.5px] border-t-[1.5px] border-[#2B2B29]/30 z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16 border-l-[1.5px] border-b-[1.5px] border-[#2B2B29]/30 z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 border-r-[1.5px] border-b-[1.5px] border-[#2B2B29]/30 z-10 pointer-events-none"></div>

      <div className="flex-1 z-20 relative flex flex-col pt-10">
        
        <header className="w-full flex flex-col items-center justify-center pb-4">
          <h1 
            className="font-['Cormorant_Garamond'] text-[4rem] md:text-[5.5rem] font-bold tracking-[0.10em] pl-[0.10em] uppercase text-[#2B2B29] leading-none text-center drop-shadow-sm transition-all duration-300" 
            style={{ textShadow: '2px 2px 4px rgba(43, 43, 41, 0.1)' }}
          >
            FLAVIUM
          </h1>
          
          <a 
            href="https://flavium-official.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 px-5 md:px-6 py-1.5 md:py-2 rounded-full border-[1.5px] border-[#2B2B29] bg-transparent transition-all duration-300 hover:bg-[#2B2B29] hover:text-[#F9F0E1] text-[#2B2B29]"
          >
            <span className="text-[9px] md:text-[10px] font-['Cormorant_Garamond'] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
              Visit Official Site <span className="text-xs font-light">↗</span>
            </span>
          </a>

          <div className="flex items-center justify-center w-full max-w-[240px] mt-6 opacity-60">
            <div className="h-[1px] flex-1 bg-[#2B2B29]"></div>
            <span className="font-['Cormorant_Garamond'] text-[10px] tracking-[0.3em] uppercase text-[#2B2B29] mx-4 whitespace-nowrap">Mess Menu</span>
            <div className="h-[1px] flex-1 bg-[#2B2B29]"></div>
          </div>
        </header>

        <div className={`flex items-center mt-6 z-20 relative ${menuData.type === 'breakfast' ? 'justify-end' : 'justify-between'}`}>
          {menuData.prev && (
            <button 
              onClick={() => handleNavigation(menuData.prev)} 
              className="relative flex items-center group cursor-pointer pl-2 transition-all duration-300 ease-in-out hover:opacity-70"
            >
              <svg width="8" height="12" viewBox="0 0 10 14" className="mr-3 fill-[#7A7571] group-hover:-translate-x-1 transition-transform duration-300 relative z-10">
                 <polygon points="10,0 0,7 10,14" />
              </svg>
              <span className="font-[Cormorant_Garamond] text-xl md:text-2xl text-[#2B2B29] capitalize relative z-10 transition-colors duration-300">
                {menuData.prev}
              </span>
            </button>
          )}
          
          {menuData.next && (
            <button 
              onClick={() => handleNavigation(menuData.next)} 
              className="relative flex items-center group cursor-pointer pr-2 transition-all duration-300 ease-in-out hover:opacity-70"
            >
              <span className="font-[Cormorant_Garamond] text-xl md:text-2xl text-[#2B2B29] capitalize relative z-10 transition-colors duration-300">
                {menuData.next}
              </span>
              <svg width="8" height="12" viewBox="0 0 10 14" className="ml-3 fill-[#7A7571] group-hover:translate-x-1 transition-transform duration-300 relative z-10">
                 <polygon points="0,0 10,7 0,14" />
              </svg>
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-[42px] font-[Kaisei_Decol] leading-[1] text-[#2B2B29] capitalize text-center transition-all duration-300">{menuData.type}</h1>
          <h3 className="text-lg md:text-xl font-[Cormorant_Garamond] font-extralight text-[#2B2B29] mt-2 transition-all duration-300">{formatDate(menuData.date)}</h3>
        </div>

        <Line className="mt-4 w-full" />
        <div className="w-full"><MenuItems type={menuData.type} menu={menuData.menu} /></div>

        <div className="mt-8 mb-4 text-center">
          <div className="inline-block border-t border-b border-[#2B2B29]/30 py-3 px-5">
            <p className="font-[Cormorant_Garamond] text-base md:text-lg text-[#2B2B29]">Take all you can eat</p>
            <p className="font-[Cormorant_Garamond] text-base md:text-lg text-[#2B2B29] mt-1">Eat all that you take</p>
          </div>
        </div>
      </div>
      
      <footer className="mt-auto pt-4 pb-4 z-20 relative">
        <p className="text-xs font-[Cormorant_Garamond] text-[#2B2B29]/70 text-center">Designed by Chinmay Soni<br/>Developed by Abhishek Pal</p>
      </footer>
    </div>
  );
};

export default Flavium;