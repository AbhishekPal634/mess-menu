// src/pages/MenuPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { getAllMenus, getDefaultMenuType } from "../services/api";
import SplashScreen from "../components/SplashScreen";
import MenuItems from "../components/MenuItems";
import Line from "../components/Line";
import AmbioraBackground from "../components/AmbioraBackground"; 

const MenuPage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [allMenus, setAllMenus] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        const defaultType = getDefaultMenuType();
        const menus = await getAllMenus();
        setAllMenus(menus);
        const initialMenu = menus.find((menu) => menu.type === defaultType) || menus[0];
        if (initialMenu) setMenuData(initialMenu);
        else setError("No menu data available.");
      } catch (err) {
        setError(err.message || "Failed to load menus.");
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleNavigation = (type) => {
    if (!allMenus.length) return;
    const nextMenu = allMenus.find((menu) => menu.type === type);
    if (nextMenu) setMenuData(nextMenu);
  };

  const formattedDate = useMemo(() => {
    if (!menuData) return "";
    if (!menuData.date) {
      const today = new Date();
      return `${String(today.getDate()).padStart(2, "0")}. ${String(today.getMonth() + 1).padStart(2, "0")}. ${today.getFullYear()}`;
    }
    const parts = menuData.date.split("-");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${day}. ${month}. ${year}`;
    }
    return menuData.date; 
  }, [menuData]);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <div className="min-h-screen flex flex-col bg-[#ECDFCB] relative items-center justify-center p-4 md:p-8">
        
        <style>{`
          @keyframes fadeSlideUp {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .page-enter-animation {
            animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @keyframes pulseText {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .loading-text {
            animation: pulseText 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>

        {loading ? (
          <div className="flex-1 flex items-center justify-center z-20 relative">
             <p className="text-2xl font-['Cormorant_Garamond'] text-[#2B2B29] loading-text uppercase tracking-widest">
               Preparing Menu...
             </p>
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center p-4 w-full z-20 relative">
             <div className="bg-[#F9F0E1] p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center">
                <p className="text-2xl font-['Cormorant_Garamond'] text-red-600 text-center">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-6 px-8 py-2 border border-[#2B2B29] rounded-full text-[#2B2B29] hover:bg-[#2B2B29] hover:text-[#F9F0E1] transition-colors duration-300"
                >
                  Retry
                </button>
             </div>
          </div>
        ) : menuData ? (
          <div key={menuData.type} className="bg-[#F9F0E1] max-w-3xl w-full min-h-[calc(100vh-4rem)] shadow-lg relative overflow-hidden flex flex-col px-4 md:px-8 page-enter-animation">
            
            <AmbioraBackground />

            <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-l-[1.5px] border-t-[1.5px] border-[#2B2B29]/30 z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 border-r-[1.5px] border-t-[1.5px] border-[#2B2B29]/30 z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16 border-l-[1.5px] border-b-[1.5px] border-[#2B2B29]/30 z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 border-r-[1.5px] border-b-[1.5px] border-[#2B2B29]/30 z-10 pointer-events-none"></div>

            <div className="flex-1 z-20 relative flex flex-col pt-4 md:pt-6">
              
              {/* Header */}
              <header className="w-full flex flex-col items-center justify-center pt-2 pb-2">
                <h1 
                  className="font-['Cormorant_Garamond'] text-[3.5rem] md:text-[5rem] font-bold tracking-[0.05em] uppercase text-[#2B2B29] leading-none text-center drop-shadow-sm transition-all duration-300 mt-2"
                  style={{ textShadow: '2px 2px 4px rgba(43, 43, 41, 0.08)' }}
                >
                  AMBIORA
                </h1>

                <a 
                  href="https://www.ambioratechfest.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 px-8 py-2 border border-[#2B2B29] rounded-[40px] font-['Cormorant_Garamond'] text-xs md:text-sm tracking-[0.2em] uppercase text-[#2B2B29] hover:bg-[#2B2B29] hover:text-[#F9F0E1] transition-all duration-300 flex items-center justify-center gap-2 group bg-transparent"
                >
                  VISIT OFFICIAL SITE
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>

                {/* Inline Divider Text */}
                <div className="flex items-center justify-center w-full max-w-[320px] mt-6 opacity-60">
                  <div className="h-[1px] flex-1 bg-[#2B2B29]"></div>
                  <span className="font-['Cormorant_Garamond'] text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#2B2B29] px-4">
                    MESS MENU
                  </span>
                  <div className="h-[1px] flex-1 bg-[#2B2B29]"></div>
                </div>
              </header>

              {/* Navigation */}
              <div className={`flex items-center mt-4 z-20 relative ${!menuData.prev ? 'justify-end' : 'justify-between'}`}>
                {menuData.prev && (
                  <button onClick={() => handleNavigation(menuData.prev)} className="relative flex items-center group cursor-pointer pl-2 transition-all duration-300 ease-in-out hover:opacity-70">
                    <svg width="8" height="12" viewBox="0 0 10 14" className="mr-3 fill-[#7A7571] group-hover:-translate-x-1 transition-transform duration-300 relative z-10">
                       <polygon points="10,0 0,7 10,14" />
                    </svg>
                    <span className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-[#2B2B29] capitalize relative z-10 transition-colors duration-300">{menuData.prev}</span>
                  </button>
                )}
                
                {menuData.next && (
                  <button onClick={() => handleNavigation(menuData.next)} className="relative flex items-center group cursor-pointer pr-2 transition-all duration-300 ease-in-out hover:opacity-70">
                    <span className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-[#2B2B29] capitalize relative z-10 transition-colors duration-300">{menuData.next}</span>
                    <svg width="8" height="12" viewBox="0 0 10 14" className="ml-3 fill-[#7A7571] group-hover:translate-x-1 transition-transform duration-300 relative z-10">
                       <polygon points="0,0 10,7 0,14" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Title & Date */}
              <div className="mt-4 flex flex-col items-center justify-center">
                <h2 className="text-3xl md:text-[42px] font-['Kaisei_Decol'] leading-[1] text-[#2B2B29] capitalize text-center transition-all duration-300">
                  {menuData.type}
                </h2>
                <h3 className="text-lg md:text-xl font-['Cormorant_Garamond'] font-extralight text-[#2B2B29] mt-2 transition-all duration-300">
                  {formattedDate}
                </h3>
              </div>

              <Line className="mt-4 w-full opacity-70" />
              
              {/* === THE MENU ITEMS === */}
              <div className="w-full flex-1">
                <MenuItems type={menuData.type} menu={menuData.menu} />
              </div>

              {/* === NEW REDESIGNED FLAVIUM LINK === */}
              <div className="w-full flex flex-col items-center justify-center mt-6 mb-4 relative z-10">
                 {/* Top Divider exactly like screenshot */}
                 
                 {/* Fully clickable pill button */}
                 <a 
                   href="https://flavium-official.vercel.app/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center justify-center px-10 py-3 border border-[#2B2B29]/30 rounded-[40px] bg-[#F9F0E1]/60 hover:bg-[#2B2B29] hover:text-[#F9F0E1] text-[#2B2B29] transition-all duration-300 group cursor-pointer shadow-sm backdrop-blur-sm"
                 >
                   <span className="font-['Cormorant_Garamond'] text-[13px] md:text-[15px] tracking-[0.25em] font-semibold flex items-center gap-3">
                     FLAVIUM 
                     <span className="w-1 h-1 rounded-full bg-current opacity-50"></span> 
                     <span className="font-light">VISIT OFFICIAL SITE</span> 
                     <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-lg leading-none ml-1">↗</span>
                   </span>
                 </a>

                 {/* Bottom Divider exactly like screenshot */}
                 <Line className="w-full max-w-[200px] opacity-40 mt-6" />
              </div>

              {/* Footer Quote */}
              <div className="mb-4 text-center">
                <div className="inline-block border-t border-b border-[#2B2B29]/30 py-3 px-5">
                  <p className="font-['Cormorant_Garamond'] text-base md:text-lg text-[#2B2B29] uppercase tracking-wider">Take all you can eat</p>
                  <p className="font-['Cormorant_Garamond'] text-base md:text-lg text-[#2B2B29] mt-1 uppercase tracking-wider">Eat all that you take</p>
                </div>
              </div>
            </div>
            
            {/* Developer Credits */}
            <footer className="mt-auto pt-4 pb-4 z-20 relative">
              <p className="text-xs font-['Cormorant_Garamond'] text-[#2B2B29]/60 tracking-widest uppercase text-center">
                Designed by Chinmay Soni<br/>Developed by Abhishek Pal
              </p>
            </footer>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MenuPage;