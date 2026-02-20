// src/pages/MenuPage.jsx
import React, { useState, useEffect } from "react";
import { getAllMenus, getDefaultMenuType } from "../services/api";
import SplashScreen from "../components/SplashScreen"; 
import PacmanLoader from "react-spinners/PacmanLoader";
import Home from "./Home";
import Flavium from "./Flavium";
import Ambiora from "./Ambiora"; // UNCOMMENTED IMPORT

const MenuPage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeRoute, setActiveRoute] = useState("flavium"); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [allMenus, setAllMenus] = useState(null);

  useEffect(() => {
    const defaultType = getDefaultMenuType();
    fetchAllMenus(defaultType);
  }, []);

  const fetchAllMenus = async (initialType) => {
    try {
      setLoading(true);
      setError(null);
      const menus = await getAllMenus();
      setAllMenus(menus);
      const initialMenu = menus.find((menu) => menu.type === initialType);
      if (initialMenu) setMenuData(initialMenu);
      else setError("Default menu type not found");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (type) => {
    if (allMenus) {
      const nextMenu = allMenus.find((menu) => menu.type === type);
      if (nextMenu) setMenuData(nextMenu);
      else setError(`Menu type ${type} not found`);
    }
  };

  const formatDate = (dateString) => {
    if (menuData?.type === "snacks") {
      const today = new Date();
      return `${String(today.getDate()).padStart(2, "0")}. ${String(today.getMonth() + 1).padStart(2, "0")}. ${today.getFullYear()}`;
    }
    const [day, month, year] = dateString.split("-");
    return `${day}. ${month}. ${year}`;
  };

  const sharedProps = { menuData, handleNavigation, formatDate };

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <div className="min-h-screen flex flex-col bg-[#ECDFCB] pt-20 relative">
        
        {/* === TOP 1% PATTERN: Custom Keyframe for Page Transitions === */}
        <style>{`
          @keyframes fadeSlideUp {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .page-enter-animation {
            animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>

        {/* === REFINED, ELEGANT TOP NAVIGATION === */}
        <nav className="fixed top-0 left-0 w-full z-[100] bg-[#ECDFCB] pt-6 pb-4 flex items-center justify-center">
          <div className="flex items-center gap-6 md:gap-10">
            <button 
              onClick={() => setActiveRoute('flavium')}
              className={`font-['Cormorant_Garamond'] text-lg md:text-2xl tracking-[0.15em] uppercase transition-all duration-300 ${activeRoute === 'flavium' ? 'text-[#2B2B29] font-semibold' : 'text-[#2B2B29]/40 hover:text-[#2B2B29]/70'}`}
            >
              Flavium
            </button>
            <span className="text-[#2B2B29]/20 font-light text-xl">|</span>
            <button 
              onClick={() => setActiveRoute('home')}
              className={`font-['Cormorant_Garamond'] text-lg md:text-2xl tracking-[0.15em] uppercase transition-all duration-300 ${activeRoute === 'home' ? 'text-[#2B2B29] font-semibold' : 'text-[#2B2B29]/40 hover:text-[#2B2B29]/70'}`}
            >
              Home
            </button>
            <span className="text-[#2B2B29]/20 font-light text-xl">|</span>
            <button 
              onClick={() => setActiveRoute('ambiora')}
              className={`font-['Cormorant_Garamond'] text-lg md:text-2xl tracking-[0.15em] uppercase transition-all duration-300 ${activeRoute === 'ambiora' ? 'text-[#2B2B29] font-semibold' : 'text-[#2B2B29]/40 hover:text-[#2B2B29]/70'}`}
            >
              Ambiora
            </button>
          </div>
        </nav>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
             <PacmanLoader color="#f9ce8f" size={50} />
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center p-4">
             <div className="bg-[#F9F0E1] p-8 rounded-lg shadow-lg">
                <p className="text-2xl font-[Cormorant_Garamond] text-red-600 text-center">{error}</p>
                <button onClick={() => fetchAllMenus(getDefaultMenuType())} className="mt-4 px-6 py-2 border border-[#2B2B29] rounded-full text-[#2B2B29]">Retry</button>
             </div>
          </div>
        ) : (
          /* === THE FIX: 'key={activeRoute}' forces React to replay the animation on switch === */
          <div key={activeRoute} className="flex-1 flex items-center justify-center p-4 md:p-8 w-full page-enter-animation">
             {activeRoute === 'home' && <Home {...sharedProps} />}
             {activeRoute === 'flavium' && <Flavium {...sharedProps} />}
             {/* UNCOMMENTED COMPONENT */}
             {activeRoute === 'ambiora' && <Ambiora {...sharedProps} />} 
          </div>
        )}
        
      </div>
    </>
  );
};

export default MenuPage;