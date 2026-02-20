// src/components/MenuItems.jsx
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
            {/* Clean Category Header - Removed the illogical background "ball" */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-['Cormorant_Garamond'] text-[#2B2B29] inline-block px-6">
                {category.categoryName}
              </h2>
            </div>

            {/* Menu Items Grid */}
            <div className="space-y-4 max-w-2xl mx-auto">
              {category.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex-1 flex items-center">
                    <span className="text-2xl font-['Cormorant_Garamond'] text-[#2B2B29]">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-2xl font-['Cormorant_Garamond'] text-[#2B2B29]">
                    {item.price === 0 ? "" : `₹${item.price}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Line */}
            <div className="max-w-2xl mx-auto">
              <Line className="mt-10 w-full opacity-60" />
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
                  <p className="text-2xl font-['Cormorant_Garamond'] text-[#2B2B29] py-1 px-4">
                    {item}
                  </p>
                </div>
              ))}
          </div>

          <Line className="mt-10 w-full opacity-60" />
        </div>
      )}
    </div>
  );
};

export default MenuItems;