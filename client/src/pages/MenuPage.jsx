// src/pages/MenuPage.jsx
import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { getAllMenus, getDefaultMenuType } from "../services/api";
import SplashScreen from "../components/SplashScreen";
import MenuItems from "../components/MenuItems";
import Line from "../components/Line";
import AmbioraBackground from "../components/AmbioraBackground"; 

// Lazy load the Flavium background
const FlaviumBackground = React.lazy(() => import("../components/FlaviumBackground"));

const MenuPage = () => {
  // === TOP 1% FIX: Always Show Splash ===
  // Reverted back to a simple 'true' so the animation plays on every reload.
  const [showSplash, setShowSplash] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [allMenus, setAllMenus] = useState([]);
  
  const [isFlaviumTheme, setIsFlaviumTheme] = useState(false);
  const flaviumSectionRef = useRef(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const cachedMenus = localStorage.getItem('ambiora_menus');
        const defaultType = getDefaultMenuType();

        if (cachedMenus) {
          const parsedMenus = JSON.parse(cachedMenus);
          setAllMenus(parsedMenus);
          const initial = parsedMenus.find((m) => m.type === defaultType) || parsedMenus[0];
          setMenuData(initial);
          setLoading(false); 
        }

        const freshMenus = await getAllMenus();
        setAllMenus(freshMenus);
        localStorage.setItem('ambiora_menus', JSON.stringify(freshMenus));
        
        if (!cachedMenus) {
          const initialMenu = freshMenus.find((m) => m.type === defaultType) || freshMenus[0];
          if (initialMenu) setMenuData(initialMenu);
          setLoading(false);
        }
      } catch (err) {
        if (!allMenus.length) setError(err.message || "Failed to load menus.");
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsFlaviumTheme(entry.isIntersecting);
      },
      { root: null, threshold: 0.3 }
    );
    
    if (flaviumSectionRef.current) observer.observe(flaviumSectionRef.current);
    
    return () => observer.disconnect();
  }, [loading, menuData?.type]);

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
    if (parts.length === 3) return `${parts[0]}. ${parts[1]}. ${parts[2]}`;
    return menuData.date; 
  }, [menuData]);

  // Dynamic Colors
  const themeText = isFlaviumTheme ? "text-[#2B2B29]" : "text-[#F9F0E1]";
  const themeBorder = isFlaviumTheme ? "border-[#2B2B29]" : "border-[#F9F0E1]";
  const themeBg = isFlaviumTheme ? "bg-[#2B2B29]" : "bg-[#F9F0E1]";
  const themeFill = isFlaviumTheme ? "fill-[#2B2B29]" : "fill-[#F9F0E1]";
  const hoverBg = isFlaviumTheme ? "hover:bg-[#2B2B29] hover:text-[#F9F0E1]" : "hover:bg-[#F9F0E1] hover:text-[#1A1A19]";

  return (
    <>
      {/* Simply passing setShowSplash(false) here now */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <div className="min-h-screen flex flex-col relative items-center justify-center p-4 md:p-8 overflow-hidden bg-[#ECDFCB]">
        
        {error ? (
          <div className="flex-1 flex items-center justify-center p-4 w-full z-20 relative">
             <div className="bg-[#1A1A19] p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center">
                <p className="text-2xl font-['Cormorant_Garamond'] text-red-400 text-center">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-6 px-8 py-2 border border-[#F9F0E1] rounded-full text-[#F9F0E1] hover:bg-[#F9F0E1] hover:text-[#1A1A19] transition-colors duration-300">Retry</button>
             </div>
          </div>
        ) : menuData ? (
          
         <main className={`bg-transparent max-w-3xl w-full min-h-[calc(100vh-4rem)] shadow-2xl relative flex flex-col z-10 border transition-colors duration-700 ${themeBorder}/20 overflow-hidden rounded-lg`}>
            
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isFlaviumTheme ? 'opacity-0' : 'opacity-100'}`}>
                    <AmbioraBackground />
                </div>
                <Suspense fallback={null}>
                  <FlaviumBackground isVisible={isFlaviumTheme} />
                </Suspense>
            </div>

            <div className={`absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-l-[1.5px] border-t-[1.5px] transition-colors duration-700 ${themeBorder}/30 pointer-events-none z-20`}></div>
            <div className={`absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 border-r-[1.5px] border-t-[1.5px] transition-colors duration-700 ${themeBorder}/30 pointer-events-none z-20`}></div>
            <div className={`absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16 border-l-[1.5px] border-b-[1.5px] transition-colors duration-700 ${themeBorder}/30 pointer-events-none z-20`}></div>
            <div className={`absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 border-r-[1.5px] border-b-[1.5px] transition-colors duration-700 ${themeBorder}/30 pointer-events-none z-20`}></div>

            <div key={menuData.type} className="flex-1 relative z-10 flex flex-col pt-6 md:pt-10 px-4 md:px-8 animate-[fadeSlideUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]">
              
              <header className="w-full flex flex-col items-center justify-center pt-2 pb-2">
                <h1 className={`font-['Cormorant_Garamond'] text-[3.5rem] md:text-[5.5rem] font-bold tracking-[0.05em] uppercase leading-none text-center drop-shadow-sm transition-colors duration-700 mt-2 ${themeText}`}>
                  AMBIORA
                </h1>

                <a href="https://www.ambioratechfest.in/" target="_blank" rel="noopener noreferrer" className={`mt-6 px-8 md:px-10 py-2.5 border rounded-[40px] font-['Cormorant_Garamond'] text-xs md:text-sm tracking-[0.2em] uppercase transition-all duration-700 flex items-center justify-center gap-2 group bg-transparent cursor-pointer ${themeBorder} ${themeText} ${hoverBg}`}>
                  VISIT OFFICIAL SITE
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>

                <div className="flex items-center justify-center w-full max-w-[320px] mt-8 opacity-60">
                  <div className={`h-[1px] flex-1 transition-colors duration-700 ${themeBg}`}></div>
                  <span className={`font-['Cormorant_Garamond'] text-[10px] md:text-[11px] tracking-[0.3em] uppercase px-4 transition-colors duration-700 ${themeText}`}>MESS MENU</span>
                  <div className={`h-[1px] flex-1 transition-colors duration-700 ${themeBg}`}></div>
                </div>
              </header>

              <div className={`flex items-center mt-6 relative ${!menuData.prev ? 'justify-end' : 'justify-between'}`}>
                {menuData.prev && (
                  <button onClick={() => handleNavigation(menuData.prev)} className="relative flex items-center group cursor-pointer pl-2 transition-all duration-300 ease-in-out hover:opacity-70">
                    <svg width="8" height="12" viewBox="0 0 10 14" className={`mr-3 transition-colors duration-700 group-hover:-translate-x-1 ${themeFill}`}><polygon points="10,0 0,7 10,14" /></svg>
                    <span className={`font-['Cormorant_Garamond'] text-xl md:text-2xl capitalize transition-colors duration-700 ${themeText}`}>{menuData.prev}</span>
                  </button>
                )}
                {menuData.next && (
                  <button onClick={() => handleNavigation(menuData.next)} className="relative flex items-center group cursor-pointer pr-2 transition-all duration-300 ease-in-out hover:opacity-70">
                    <span className={`font-['Cormorant_Garamond'] text-xl md:text-2xl capitalize transition-colors duration-700 ${themeText}`}>{menuData.next}</span>
                    <svg width="8" height="12" viewBox="0 0 10 14" className={`ml-3 transition-colors duration-700 group-hover:translate-x-1 ${themeFill}`}><polygon points="0,0 10,7 0,14" /></svg>
                  </button>
                )}
              </div>

              <div className="mt-4 flex flex-col items-center justify-center">
                <h2 className={`text-4xl md:text-[48px] font-['Kaisei_Decol'] leading-[1] capitalize text-center transition-colors duration-700 ${themeText}`}>{menuData.type}</h2>
                <h3 className={`text-lg md:text-xl font-['Cormorant_Garamond'] font-extralight mt-3 transition-colors duration-700 tracking-widest ${themeText}`}>{formattedDate}</h3>
              </div>

              <Line className="mt-6 w-full opacity-70" isFlavium={isFlaviumTheme} />
              
              <div className="w-full flex-1 mb-10">
                <MenuItems type={menuData.type} menu={menuData.menu} isFlavium={isFlaviumTheme} />
              </div>

              <div ref={flaviumSectionRef} className="w-full flex flex-col items-center justify-center mb-8 relative">
                 <Line className="w-full max-w-[80%] md:max-w-md opacity-40 mb-8" isFlavium={isFlaviumTheme} />
                 
                 <a href="https://flavium-official.vercel.app/" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center px-8 md:px-10 py-3 border rounded-[40px] transition-all duration-700 group cursor-pointer bg-transparent shadow-sm ${themeBorder}/40 ${themeText} ${hoverBg}`}>
                   <span className="font-['Cormorant_Garamond'] text-[13px] md:text-[15px] tracking-[0.25em] uppercase flex items-center justify-center">
                     FLAVIUM 
                     <span className="mx-3 text-[8px] opacity-40 leading-none">●</span> 
                     <span className="font-light">VISIT OFFICIAL SITE</span> 
                     <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-lg leading-none ml-2">↗</span>
                   </span>
                 </a>
              </div>

              <div className="mb-6 text-center opacity-90">
                <p className={`font-['Cormorant_Garamond'] text-sm md:text-base uppercase tracking-widest font-semibold transition-colors duration-700 ${themeText}`}>Take all you can eat</p>
                <p className={`font-['Cormorant_Garamond'] text-sm md:text-base mt-2 uppercase tracking-widest font-semibold transition-colors duration-700 ${themeText}`}>Eat all that you take</p>
              </div>
            </div>
            
            <footer className="mt-auto pt-4 pb-6 relative z-20">
              <p className={`text-[10px] md:text-xs font-['Cormorant_Garamond'] tracking-[0.2em] uppercase text-center leading-relaxed transition-colors duration-700 ${themeText}/60`}>
                Designed by Chinmay Soni<br/>Developed by Abhishek Pal
              </p>
            </footer>
          </main>
        ) : null}
      </div>
    </>
  );
};

export default MenuPage;