import React from "react";

const MenuTypeSelector = ({ selectedType, setSelectedType }) => {
  const mealTypes = ["breakfast", "lunch", "snacks", "dinner"];

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
      {mealTypes.map((type) => (
        <button
          key={type}
          className={`px-4 md:px-6 py-2 font-[Cormorant_Garamond] text-lg md:text-xl capitalize transition-colors rounded-md cursor-pointer
            ${
              selectedType === type
                ? "bg-[#2B2B29] text-[#ECDFCB]"
                : "bg-transparent hover:bg-[#2B2B29]/10"
            }`}
          onClick={() => setSelectedType(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default MenuTypeSelector;
