import React from "react";
import Line from "./Line";

const MenuItems = ({ type, menu }) => {
  return (
    <div className="mt-10">
      {type === "Snacks" ? (
        // Snacks Menu Layout
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
                <div
                  key={idx}
                  className="flex items-center justify-between group"
                >
                  <div className="flex-1 flex items-center">
                    <span className="text-2xl font-[Cormorant_Garamond] text-[#2B2B29]">
                      {item.name}
                    </span>
                    <div className="flex-1 mx-4 border-b-2 border-dotted border-[#2B2B29] group-hover:border-[#2B2B29]/80 transition-colors"></div>
                  </div>
                  <span className="text-2xl font-[Cormorant_Garamond] text-[#2B2B29]">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Container for the line to match max-w-2xl */}
            <div className="max-w-2xl mx-auto">
              <Line className="mt-10 w-full" />
            </div>
          </div>
        ))
      ) : (
        // Breakfast, Lunch, Dinner Menu Layout
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6 text-center">
            {menu.map((item, index) => (
              <div key={index} className="relative group">
                <p className="text-2xl font-[Cormorant_Garamond] text-[#2B2B29] py-1 px-4 transition-colors hover:text-[#2B2B29]/80">
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
