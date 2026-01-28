import React, { useState, useEffect } from "react";
import { getAllMenus, getDefaultMenuType } from "../services/api";
import MenuItems from "../components/MenuItems";
import Line from "../components/Line";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import PacmanLoader from "react-spinners/PacmanLoader";
import SportsBackground from "../components/SportsBackground"; 

const MenuPage = () => {
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
      if (initialMenu) {
        setMenuData(initialMenu);
      } else {
        setError("Default menu type not found");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (type) => {
    if (allMenus) {
      const nextMenu = allMenus.find((menu) => menu.type === type);
      if (nextMenu) {
        setMenuData(nextMenu);
      } else {
        setError(`Menu type ${type} not found`);
      }
    }
  };

  const formatDate = (dateString) => {
    if (menuData?.type === "snacks") {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${day}. ${month}. ${year}`;
    }
    const [day, month, year] = dateString.split("-");
    return `${day}. ${month}. ${year}`;
  };

  const renderNavigation = () => {
    if (!menuData) return null;
    if (menuData.type === "breakfast") {
      return (
        <div className="flex justify-end">
          <button onClick={() => handleNavigation(menuData.next)} className="relative flex items-center px-6 py-2 group transition-colors hover:bg-[#2B2B29]/10 rounded-md cursor-pointer">
            <span className="mr-3 font-[Cormorant_Garamond] text-2xl text-[#2B2B29] capitalize">{menuData.next}</span>
            <FaCaretRight className="absolute right-2 text-2xl text-[#2B2B29] opacity-60 transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-between text-lg">
        {menuData.prev && (
          <button onClick={() => handleNavigation(menuData.prev)} className="relative flex items-center px-6 py-2 group transition-colors hover:bg-[#2B2B29]/10 rounded-md cursor-pointer">
            <FaCaretLeft className="absolute left-2 text-2xl text-[#2B2B29] opacity-60 transition-transform group-hover:-translate-x-2" />
            <span className="ml-3 font-[Cormorant_Garamond] text-2xl text-[#2B2B29] capitalize">{menuData.prev}</span>
          </button>
        )}
        {menuData.next && (
          <button onClick={() => handleNavigation(menuData.next)} className="relative flex items-center px-6 py-2 group transition-colors hover:bg-[#2B2B29]/10 rounded-md cursor-pointer">
            <span className="mr-3 font-[Cormorant_Garamond] text-2xl text-[#2B2B29] capitalize">{menuData.next}</span>
            <FaCaretRight className="absolute right-2 text-2xl text-[#2B2B29] opacity-60 transition-transform group-hover:translate-x-2" />
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#ECDFCB]"><PacmanLoader color="#f9ce8f" size={50} className="my-4" /></div>;
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ECDFCB]">
        <div className="bg-[#F9F0E1] p-8 rounded-lg shadow-lg">
          <p className="text-2xl font-[Cormorant_Garamond] text-red-600 text-center">{error}</p>
          <button onClick={() => fetchAllMenus(getDefaultMenuType())} className="mt-4 px-6 py-2 bg-[#2B2B29]/10 rounded-md hover:bg-[#2B2B29]/20 transition-colors text-[#2B2B29] font-[Cormorant_Garamond]">Retry</button>
        </div>
      </div>
    );
  }
  if (!menuData || !allMenus) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECDFCB] p-8">
      <div className="bg-[#F9F0E1] max-w-3xl w-full min-h-[calc(100vh-4rem)] p-4 shadow-lg relative overflow-hidden flex flex-col">
        
        {/* === REUSABLE SPORTS COMPONENT === */}
        <SportsBackground />

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#2B2B29]/30 z-10"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[#2B2B29]/30 z-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[#2B2B29]/30 z-10"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#2B2B29]/30 z-10"></div>

        <div className="flex-1 z-10 relative">
          
          {/* === HEADER START === */}
          <header className="w-full flex flex-col items-center justify-center pt-10 pb-6 relative">
            {/* Removed the ◈ div here */}
            
            <a 
              href="https://flavium-official.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              <h1 
                className="font-['Cormorant_Garamond'] text-6xl md:text-8xl font-bold tracking-[0.2em] uppercase text-[#2B2B29] leading-none text-center transition-all duration-300 group-hover:tracking-[0.22em]" 
                style={{ textShadow: '2px 2px 4px rgba(43, 43, 41, 0.1)' }}
              >
                Flavium
              </h1>
              
              {/* NEW: Description Text that appears on hover */}
              <span className="mt-2 text-sm font-[Cormorant_Garamond] text-[#2B2B29]/60 tracking-widest uppercase opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0\\\">
                Visit Official Site of Flavium
              </span>
            </a>

            <div className="flex items-center justify-center w-full max-w-md mt-3 gap-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#2B2B29]/40 to-[#2B2B29]/40"></div>
              <span className="font-['Cormorant_Garamond'] text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#2B2B29]/70 font-bold whitespace-nowrap">Mess Menu</span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#2B2B29]/40 to-[#2B2B29]/40"></div>
            </div>
          </header>
          {/* === HEADER END === */}

          {renderNavigation()}

          <div className="mt-6 flex flex-col items-center justify-center">
            <h1 className="text-[52px] font-[Kaisei_Decol] leading-[1] text-[#2B2B29] capitalize">{menuData.type}</h1>
            <h3 className="text-2xl font-[Cormorant_Garamond] font-extralight text-[#2B2B29] mt-2">{formatDate(menuData.date)}</h3>
          </div>

          <Line className="mt-4 w-[90%]" />
          <div className="px-4"><MenuItems type={menuData.type} menu={menuData.menu} /></div>

          <div className="mt-10 mb-2 text-center">
            <div className="inline-block border-t-2 border-b-2 border-[#2B2B29]/30 py-4">
              <p className="font-[Cormorant_Garamond] text-xl text-[#2B2B29]">Take all you can eat</p>
              <p className="font-[Cormorant_Garamond] text-xl text-[#2B2B29] mt-2">Eat all that you take</p>
            </div>
          </div>
        </div>
        <footer className="mt-auto pt-8 pb-2 z-10 relative">
          <p className="text-sm font-[Cormorant_Garamond] text-[#2B2B29]/70 text-center">Designed by Chinmay Soni<br></br>Developed by Abhishek Pal</p>
        </footer>
      </div>
    </div>
  );
};

export default MenuPage;