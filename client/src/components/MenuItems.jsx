import React from "react";
import Line from "./Line";

const MenuItems = ({ type, menu }) => {
  if (!menu) return null;

  return (
    <div className="mt-10">
      {type === "snacks" ? (
        // Snacks Menu
        menu.map((category, index) => (
          <div key={index} className="mb-10 last:mb-8">
            {/* Category Header */}
            <div className="relative text-center mb-8">
              <h2 className="text-6xl font-[Imperial_Script] text-[#2B2B29] relative z-10 inline-block px-6">
                {category.categoryName}
              </h2>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#ECDFCB]/50 rounded-full -z-10"></div>
            </div>

            {/* Menu Items Grid */}
            <div className="space-y-4 max-w-2xl mx-auto">
              {category.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex-1 flex items-center">
                    <span className="text-2xl font-[Cormorant_Garamond] text-[#2B2B29]">
                      {item.name}
                    </span>
                    <div className="flex-1 mx-4 border-b-2 border-dotted border-[#2B2B29]"></div>
                  </div>
                  <span className="text-2xl font-[Cormorant_Garamond] text-[#2B2B29]">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Line */}
            <div className="max-w-2xl mx-auto">
              <Line className="mt-10 w-full" />
            </div>
          </div>
        ))
      ) : (
        // Breakfast, Lunch, Dinner
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6 text-center">
            {Array.isArray(menu) &&
              menu.map((item, index) => (
                <div key={index}>
                  <p className="text-2xl font-[Cormorant_Garamond] text-[#2B2B29] py-1 px-4">
                    {item}
                  </p>
                </div>
              ))}
          </div>

          <Line className="mt-10 w-full" />
        </div>
      )}
    </div>
  );
};

export default MenuItems;
