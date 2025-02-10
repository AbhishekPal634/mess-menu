import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaPencilAlt } from "react-icons/fa";
import Line from "../components/Line";
import { getMenu } from "../services/api.js";

const MessDashboard = () => {
  const [selectedType, setSelectedType] = useState("breakfast");
  const [regularMenu, setRegularMenu] = useState({
    type: "",
    menu: [],
    date: "",
    prev: null,
    next: null,
  });
  const [snacksMenu, setSnacksMenu] = useState({
    type: "snacks",
    menu: [{ categoryName: "", items: [] }],
    date: "",
    prev: null,
    next: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState({});

  const mealTypes = ["breakfast", "lunch", "snacks", "dinner"];
  const dateOptions = ["Today", "Tomorrow"];

  useEffect(() => {
    fetchMenu(selectedType);
  }, [selectedType]);

  const fetchMenu = async (type) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMenu(type);
      if (type === "snacks") {
        setSnacksMenu(response);
      } else {
        setRegularMenu(response);
      }
      setEditMode({});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    if (selectedType === "snacks") {
      setSnacksMenu({
        ...snacksMenu,
        menu: [
          ...snacksMenu.menu,
          {
            categoryName: "New Category",
            items: [],
          },
        ],
      });
    } else {
      setRegularMenu({
        ...regularMenu,
        menu: [...regularMenu.menu, ""],
      });
    }
  };

  const renderRegularMenu = () => (
    <div className="space-y-4">
      {regularMenu.menu.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {editMode[index] ? (
            <input
              type="text"
              className="flex-1 p-2 text-lg border border-[#2B2B29]/20 rounded-md font-[Cormorant_Garamond]"
              value={item}
              onChange={(e) => {
                const newMenu = [...regularMenu.menu];
                newMenu[index] = e.target.value;
                setRegularMenu({ ...regularMenu, menu: newMenu });
              }}
              placeholder="Enter item name"
            />
          ) : (
            <div className="flex-1 p-2 text-lg font-[Cormorant_Garamond]">
              {item}
            </div>
          )}
          <button
            onClick={() =>
              setEditMode({ ...editMode, [index]: !editMode[index] })
            }
            className="text-blue-500 p-2 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
          >
            <FaPencilAlt className="text-sm" />
          </button>
          <button
            onClick={() => {
              const newMenu = [...regularMenu.menu];
              newMenu.splice(index, 1);
              setRegularMenu({ ...regularMenu, menu: newMenu });
            }}
            className="text-red-500 p-2 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
          >
            <FaTrash className="text-sm" />
          </button>
        </div>
      ))}

      <button
        onClick={handleAddItem}
        className="w-full p-3 bg-[#2B2B29]/5 hover:bg-[#2B2B29]/10 rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <FaPlus className="text-sm" />
        <span className="font-[Cormorant_Garamond] text-lg">Add Item</span>
      </button>
    </div>
  );

  const renderSnacksMenu = () => (
    <div className="space-y-6">
      {snacksMenu.menu.map((category, catIndex) => (
        <div key={catIndex} className="bg-[#ECDFCB]/30 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            {editMode[`cat-${catIndex}`] ? (
              <input
                type="text"
                className="text-2xl font-[Cormorant_Garamond] font-semibold bg-transparent border-b-2 border-[#2B2B29]/20 px-2 py-1 focus:border-[#2B2B29] focus:outline-none"
                value={category.categoryName}
                onChange={(e) => {
                  const newMenu = [...snacksMenu.menu];
                  newMenu[catIndex].categoryName = e.target.value;
                  setSnacksMenu({ ...snacksMenu, menu: newMenu });
                }}
              />
            ) : (
              <div className="text-2xl font-[Cormorant_Garamond] font-semibold px-2 py-1">
                {category.categoryName}
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setEditMode({
                    ...editMode,
                    [`cat-${catIndex}`]: !editMode[`cat-${catIndex}`],
                  })
                }
                className="text-blue-500 p-2 hover:bg-blue-50 rounded-md cursor-pointer"
              >
                <FaPencilAlt />
              </button>
              <button
                className="text-red-500 p-2 hover:bg-red-50 rounded-md cursor-pointer"
                onClick={() => {
                  const newMenu = [...snacksMenu.menu];
                  newMenu.splice(catIndex, 1);
                  setSnacksMenu({ ...snacksMenu, menu: newMenu });
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center gap-2">
                {editMode[`item-${catIndex}-${itemIndex}`] ? (
                  <>
                    <input
                      type="text"
                      className="flex-1 p-2 text-lg border border-[#2B2B29]/20 rounded-md font-[Cormorant_Garamond]"
                      value={item.name}
                      placeholder="Item name"
                      onChange={(e) => {
                        const newMenu = [...snacksMenu.menu];
                        newMenu[catIndex].items[itemIndex].name =
                          e.target.value;
                        setSnacksMenu({ ...snacksMenu, menu: newMenu });
                      }}
                    />
                    <input
                      type="number"
                      className="w-24 p-2 text-lg border border-[#2B2B29]/20 rounded-md font-[Cormorant_Garamond]"
                      value={item.price}
                      placeholder="Price"
                      onChange={(e) => {
                        const newMenu = [...snacksMenu.menu];
                        newMenu[catIndex].items[itemIndex].price =
                          parseInt(e.target.value) || 0;
                        setSnacksMenu({ ...snacksMenu, menu: newMenu });
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div className="flex-1 p-2 text-lg font-[Cormorant_Garamond]">
                      {item.name}
                    </div>
                    <div className="w-24 p-2 text-lg font-[Cormorant_Garamond] text-right">
                      ₹{item.price}
                    </div>
                  </>
                )}
                <button
                  onClick={() =>
                    setEditMode({
                      ...editMode,
                      [`item-${catIndex}-${itemIndex}`]:
                        !editMode[`item-${catIndex}-${itemIndex}`],
                    })
                  }
                  className="text-blue-500 p-2 hover:bg-blue-50 rounded-md cursor-pointer"
                >
                  <FaPencilAlt className="text-sm" />
                </button>
                <button
                  className="text-red-500 p-2 hover:bg-red-50 rounded-md cursor-pointer"
                  onClick={() => {
                    const newMenu = [...snacksMenu.menu];
                    newMenu[catIndex].items.splice(itemIndex, 1);
                    setSnacksMenu({ ...snacksMenu, menu: newMenu });
                  }}
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>
            ))}

            <button
              onClick={() => {
                const newMenu = [...snacksMenu.menu];
                newMenu[catIndex].items.push({ name: "", price: 0 });
                setSnacksMenu({ ...snacksMenu, menu: newMenu });
              }}
              className="w-full mt-2 p-2 bg-[#2B2B29]/5 hover:bg-[#2B2B29]/10 rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <FaPlus className="text-sm" />{" "}
              <span className="text-sm">Add Item</span>
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddItem}
        className="w-full p-3 bg-[#2B2B29]/5 hover:bg-[#2B2B29]/10 rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <FaPlus />{" "}
        <span className="font-[Cormorant_Garamond] text-lg">
          Add New Category
        </span>
      </button>
    </div>
  );

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

  return (
    <div className="min-h-screen p-4 md:p-6 bg-[#ECDFCB]">
      <div className="mt-6 md:mt-10 flex flex-col items-center justify-center">
        <h1 className="text-6xl md:text-[88px] font-[Imperial_Script] leading-[1] text-[#2B2B29]">
          Mess Dashboard
        </h1>
        <h3 className="text-xl md:text-2xl font-[Cormorant_Garamond] font-extralight text-[#2B2B29] mt-2">
          Edit Menu
        </h3>
      </div>

      <Line className="my-6 md:my-8" />

      <div className="max-w-4xl mx-auto px-2 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 md:mb-8">
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
          <select
            className="w-full md:w-auto border-2 border-[#2B2B29] bg-transparent p-2 rounded-md font-[Cormorant_Garamond] text-lg md:text-xl"
            value={
              selectedType === "snacks" ? snacksMenu.date : regularMenu.date
            }
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
        </div>

        <div className="bg-white/90 backdrop-blur-sm p-4 md:p-8 rounded-lg shadow-lg">
          {selectedType === "snacks" ? renderSnacksMenu() : renderRegularMenu()}
        </div>

        <div className="flex justify-center gap-4 mt-6 md:mt-8">
          <button
            onClick={() => window.history.back()}
            className="px-6 md:px-8 py-2 md:py-3 bg-transparent border-2 border-[#2B2B29] text-[#2B2B29] rounded-md font-[Cormorant_Garamond] text-lg md:text-xl hover:bg-[#2B2B29]/10 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button className="px-6 md:px-8 py-2 md:py-3 bg-[#2B2B29] text-[#ECDFCB] rounded-md font-[Cormorant_Garamond] text-lg md:text-xl hover:bg-[#2B2B29]/90 transition-colors cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessDashboard;
