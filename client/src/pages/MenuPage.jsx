import React, { useState, useEffect } from "react";
import { getMenu, getDefaultMenuType } from "../services/api";
import MenuItems from "../components/MenuItems";
import Line from "../components/Line";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import PacmanLoader from "react-spinners/PacmanLoader";

const MenuPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    const defaultType = getDefaultMenuType();
    fetchMenu(defaultType);
  }, []);

  const fetchMenu = async (type) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMenu(type);
      setMenuData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (type) => {
    fetchMenu(type);
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return `${day}. ${month}. ${year}`;
  };

  const renderNavigation = () => {
    if (!menuData) return null;

    // Special case: If menu type is "breakfast", align Lunch button to the right
    if (menuData.type === "breakfast") {
      return (
        <div className="flex justify-end">
          <button
            onClick={() => handleNavigation(menuData.next)}
            className="relative flex items-center px-6 py-2 group transition-colors hover:bg-[#2B2B29]/10 rounded-md cursor-pointer"
          >
            <span className="mr-3 font-[Cormorant_Garamond] text-2xl text-[#2B2B29] capitalize">
              {menuData.next}
            </span>
            <FaCaretRight className="absolute right-2 text-2xl text-[#2B2B29] opacity-60 transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      );
    }

    // Default case for other menus (centered navigation with previous and next)
    return (
      <div className="flex items-center justify-between text-lg">
        {menuData.prev && (
          <button
            onClick={() => handleNavigation(menuData.prev)}
            className="relative flex items-center px-6 py-2 group transition-colors hover:bg-[#2B2B29]/10 rounded-md cursor-pointer"
          >
            <FaCaretLeft className="absolute left-2 text-2xl text-[#2B2B29] opacity-60 transition-transform group-hover:-translate-x-2" />
            <span className="ml-3 font-[Cormorant_Garamond] text-2xl text-[#2B2B29] capitalize">
              {menuData.prev}
            </span>
          </button>
        )}

        {menuData.next && (
          <button
            onClick={() => handleNavigation(menuData.next)}
            className="relative flex items-center px-6 py-2 group transition-colors hover:bg-[#2B2B29]/10 rounded-md cursor-pointer"
          >
            <span className="mr-3 font-[Cormorant_Garamond] text-2xl text-[#2B2B29] capitalize">
              {menuData.next}
            </span>
            <FaCaretRight className="absolute right-2 text-2xl text-[#2B2B29] opacity-60 transition-transform group-hover:translate-x-2" />
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ECDFCB]">
        <PacmanLoader color="#f9ce8f" size={50} className="my-4" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ECDFCB]">
        <p className="text-2xl font-[Cormorant_Garamond] text-red-600">
          {error}
        </p>
      </div>
    );
  }

  if (!menuData) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECDFCB] p-8">
      <div className="bg-[#F9F0E1] max-w-3xl w-full h-full p-4 shadow-lg relative overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#2B2B29]/30"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[#2B2B29]/30"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[#2B2B29]/30"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#2B2B29]/30"></div>

        {/* Navigation */}
        {renderNavigation()}

        {/* Menu Type and Date */}
        <div className="mt-10 flex flex-col items-center justify-center">
          <h1 className="text-[88px] font-[Imperial_Script] leading-[1] text-[#2B2B29] capitalize">
            {menuData.type}
          </h1>
          <h3 className="text-2xl font-[Cormorant_Garamond] font-extralight text-[#2B2B29] mt-2">
            {formatDate(menuData.date)}
          </h3>
        </div>

        <Line className="mt-4 w-[90%]" />

        <div className="px-4">
          <MenuItems type={menuData.type} menu={menuData.menu} />
        </div>

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
