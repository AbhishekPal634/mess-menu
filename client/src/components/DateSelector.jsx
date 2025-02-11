import React from "react";

const DateSelector = ({
  selectedType,
  snacksMenu,
  regularMenu,
  setSnacksMenu,
  setRegularMenu,
}) => {
  const dateOptions = ["Today", "Tomorrow"];

  return (
    <select
      className="w-full md:w-auto border-2 border-[#2B2B29] bg-transparent p-2 rounded-md font-[Cormorant_Garamond] text-lg md:text-xl"
      value={selectedType === "snacks" ? snacksMenu.date : regularMenu.date}
      onChange={(e) => {
        if (selectedType === "snacks") {
          setSnacksMenu({ ...snacksMenu, date: e.target.value });
        } else {
          setRegularMenu({ ...regularMenu, date: e.target.value });
        }
      }}
    >
      {dateOptions.map((date) => (
        <option key={date} value={date}>
          {date}
        </option>
      ))}
    </select>
  );
};

export default DateSelector;
