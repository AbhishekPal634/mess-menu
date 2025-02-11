import React from "react";
import { FaPlus, FaTrash, FaPencilAlt } from "react-icons/fa";

const SnacksMenu = ({ snacksMenu, setSnacksMenu, editMode, setEditMode }) => {
  const handleAddCategory = () => {
    const newCategoryIndex = snacksMenu.menu.length;
    setSnacksMenu({
      ...snacksMenu,
      menu: [
        ...snacksMenu.menu,
        {
          categoryName: "",
          items: [],
        },
      ],
    });
    // Enable edit mode for new category
    setEditMode({
      ...editMode,
      [`cat-${newCategoryIndex}`]: true,
    });
  };

  const handleAddItem = (catIndex) => {
    const newItemIndex = snacksMenu.menu[catIndex].items.length;
    const newMenu = [...snacksMenu.menu];
    newMenu[catIndex].items.push({ name: "", price: 0 });
    setSnacksMenu({ ...snacksMenu, menu: newMenu });
    // Enable edit mode for new item
    setEditMode({
      ...editMode,
      [`item-${catIndex}-${newItemIndex}`]: true,
    });
  };

  return (
    <div className="space-y-6 w-full">
      {snacksMenu.menu.map((category, catIndex) => (
        <div
          key={catIndex}
          className="bg-[#ECDFCB]/50 p-4 rounded-lg shadow-sm w-full"
        >
          <div className="flex items-center justify-between mb-4 w-full">
            {editMode[`cat-${catIndex}`] ? (
              <input
                type="text"
                className="w-full truncate text-2xl font-[Cormorant_Garamond] font-semibold bg-transparent border-b-2 border-[#2B2B29]/40 px-2 py-1 focus:border-[#2B2B29] focus:outline-none"
                value={category.categoryName}
                onChange={(e) => {
                  const newMenu = [...snacksMenu.menu];
                  newMenu[catIndex].categoryName = e.target.value;
                  setSnacksMenu({ ...snacksMenu, menu: newMenu });
                }}
                autoFocus={editMode[`cat-${catIndex}`]}
              />
            ) : (
              <h4 className="text-2xl font-[Cormorant_Garamond] font-semibold px-2 py-1 truncate w-full">
                {category.categoryName}
              </h4>
            )}
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() =>
                  setEditMode({
                    ...editMode,
                    [`cat-${catIndex}`]: !editMode[`cat-${catIndex}`],
                  })
                }
                className="text-blue-500 p-2 hover:bg-blue-50 rounded-md cursor-pointer hover:scale-110 transition-transform"
              >
                <FaPencilAlt />
              </button>
              <button
                className="text-red-500 p-2 hover:bg-red-50 rounded-md cursor-pointer hover:scale-110 transition-transform"
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

          <div className="space-y-3 w-full">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center gap-3 w-full">
                {editMode[`item-${catIndex}-${itemIndex}`] ? (
                  <div className="flex gap-3 w-full">
                    <input
                      type="text"
                      className="w-full p-2 text-lg border border-[#2B2B29]/20 rounded-md font-[Cormorant_Garamond] focus:outline-none focus:ring-1 focus:ring-[#2B2B29]"
                      value={item.name}
                      placeholder="Item name"
                      onChange={(e) => {
                        const newMenu = [...snacksMenu.menu];
                        newMenu[catIndex].items[itemIndex].name =
                          e.target.value;
                        setSnacksMenu({ ...snacksMenu, menu: newMenu });
                      }}
                      autoFocus={editMode[`item-${catIndex}-${itemIndex}`]}
                    />
                    <input
                      type="number"
                      className="w-24 p-2 text-lg border border-[#2B2B29]/20 rounded-md font-[Cormorant_Garamond] focus:outline-none focus:ring-1 focus:ring-[#2B2B29]"
                      value={item.price === 0 ? "" : item.price}
                      placeholder="Price"
                      onChange={(e) => {
                        const value = e.target.value;
                        const price = value === "" ? 0 : parseInt(value) || 0;
                        const newMenu = [...snacksMenu.menu];
                        newMenu[catIndex].items[itemIndex].price = price;
                        setSnacksMenu({ ...snacksMenu, menu: newMenu });
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex-1 p-2 text-lg font-[Cormorant_Garamond] truncate w-full">
                      {item.name}
                    </div>
                    <div className="w-24 p-2 text-lg font-[Cormorant_Garamond] text-right">
                      ₹{item.price}
                    </div>
                  </>
                )}
                <div className="flex gap-2 flex-shrink-0 ml-2">
                  <button
                    onClick={() =>
                      setEditMode({
                        ...editMode,
                        [`item-${catIndex}-${itemIndex}`]:
                          !editMode[`item-${catIndex}-${itemIndex}`],
                      })
                    }
                    className="text-blue-500 p-2 hover:bg-blue-50 rounded-md cursor-pointer hover:scale-110 transition-transform"
                  >
                    <FaPencilAlt className="text-sm" />
                  </button>
                  <button
                    className="text-red-500 p-2 hover:bg-red-50 rounded-md cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => {
                      const newMenu = [...snacksMenu.menu];
                      newMenu[catIndex].items.splice(itemIndex, 1);
                      setSnacksMenu({ ...snacksMenu, menu: newMenu });
                    }}
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => handleAddItem(catIndex)}
              className="w-full mt-3 p-2 bg-[#2B2B29]/5 hover:bg-[#2B2B29]/10 rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer group"
            >
              <FaPlus className="text-sm group-hover:scale-110 transition-transform" />
              <span className="text-sm">Add Item</span>
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddCategory}
        className="w-full p-3 bg-[#2B2B29]/5 hover:bg-[#2B2B29]/10 rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer group"
      >
        <FaPlus className="group-hover:scale-110 transition-transform" />
        <span className="font-[Cormorant_Garamond] text-lg">
          Add New Category
        </span>
      </button>
    </div>
  );
};

export default SnacksMenu;
