// src/components/MenuItems.jsx
import React, { memo } from "react";
import Line from "./Line";

// Wrapping the component in 'memo' prevents unnecessary re-renders
// making the scroll and theme transition much smoother.
const MenuItems = memo(({ type, menu, isFlavium }) => {
  if (!menu) return null;

  // The dynamic text color based on the active background theme
  const textColor = isFlavium ? "text-[#2B2B29]" : "text-[#F9F0E1]";

  return (
    <div className="mt-8">
      {type === "snacks" ? (
        menu.map((category, index) => (
          <div key={index} className="mb-12 last:mb-8">
            <div className="text-center mb-8">
              <h2 className={`text-3xl md:text-4xl font-['Cormorant_Garamond'] inline-block px-6 transition-colors duration-700 ${textColor}`}>
                {category.categoryName}
              </h2>
            </div>
            <div className="space-y-6 md:space-y-8 max-w-2xl mx-auto px-4">
              {category.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className={`text-xl md:text-2xl font-['Cormorant_Garamond'] tracking-wide transition-colors duration-700 ${textColor}`}>
                    {item.name}
                  </span>
                  <span className={`text-xl md:text-2xl font-['Cormorant_Garamond'] transition-colors duration-700 ${textColor}`}>
                    {item.price === 0 ? "" : `₹${item.price}`}
                  </span>
                </div>
              ))}
            </div>
            <div className="max-w-2xl mx-auto">
              <Line className="mt-10 w-full" isFlavium={isFlavium} />
            </div>
          </div>
        ))
      ) : (
        <div className="max-w-2xl mx-auto px-4">
          <div className="space-y-8 md:space-y-10 text-center pb-6">
            {Array.isArray(menu) &&
              menu.map((item, index) => (
                <div key={index}>
                  <p className={`text-[1.35rem] md:text-[1.75rem] font-['Cormorant_Garamond'] tracking-wide transition-colors duration-700 ${textColor}`}>
                    {item}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
});

// Setting a display name is good practice when using memo
MenuItems.displayName = "MenuItems";

export default MenuItems;