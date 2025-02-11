import React from "react";
import { FaPlus, FaTrash, FaPencilAlt } from "react-icons/fa";

const RegularMenu = ({
  regularMenu,
  setRegularMenu,
  editMode,
  setEditMode,
}) => {
  const handleAddItem = () => {
    setRegularMenu({
      ...regularMenu,
      menu: [...regularMenu.menu, ""],
    });
  };

  return (
    <div className="space-y-4">
      {regularMenu.menu.map((item, index) => (
        <div key={index} className="flex items-center justify-between gap-2">
          {editMode[index] ? (
            <input
              type="text"
              className="w-full max-w-56 truncate overflow-hidden text-ellipsis p-2 text-lg border border-[#2B2B29]/20 rounded-md font-[Cormorant_Garamond] focus:outline-none focus:ring-1 focus:ring-[#2B2B29]"
              value={item}
              onChange={(e) => {
                const newMenu = [...regularMenu.menu];
                newMenu[index] = e.target.value;
                setRegularMenu({ ...regularMenu, menu: newMenu });
              }}
              placeholder="Enter item name"
            />
          ) : (
            <div className="w-full max-w-56 p-2 text-lg font-[Cormorant_Garamond] truncate">
              {item}
            </div>
          )}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() =>
                setEditMode({ ...editMode, [index]: !editMode[index] })
              }
              className="text-blue-500 p-2 hover:bg-blue-50 rounded-md transition-colors cursor-pointer hover:scale-110"
            >
              <FaPencilAlt className="text-sm" />
            </button>
            <button
              onClick={() => {
                const newMenu = [...regularMenu.menu];
                newMenu.splice(index, 1);
                setRegularMenu({ ...regularMenu, menu: newMenu });
              }}
              className="text-red-500 p-2 hover:bg-red-50 rounded-md transition-colors cursor-pointer hover:scale-110"
            >
              <FaTrash className="text-sm" />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddItem}
        className="w-full p-3 bg-[#2B2B29]/5 hover:bg-[#2B2B29]/10 rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer group"
      >
        <FaPlus className="text-sm group-hover:scale-110 transition-transform" />
        <span className="font-[Cormorant_Garamond] text-lg">Add Item</span>
      </button>
    </div>
  );
};

export default RegularMenu;

// src/components/RegularMenu.jsx
// import React from "react";
// import { FaPlus, FaTrash, FaPencilAlt } from "react-icons/fa";

// const RegularMenu = ({
//   regularMenu,
//   setRegularMenu,
//   editMode,
//   setEditMode,
// }) => {
//   const handleAddItem = () => {
//     setRegularMenu({
//       ...regularMenu,
//       menu: [...regularMenu.menu, ""],
//     });
//   };

//   return (
//     <div className="space-y-4">
//       {regularMenu.menu.map((item, index) => (
//         <div key={index} className="flex items-center gap-2">
//           {editMode[index] ? (
//             <input
//               type="text"
//               className="flex-1 p-2 text-lg border border-[#2B2B29]/20 rounded-md font-[Cormorant_Garamond] focus:outline-none focus:ring-1 focus:ring-[#2B2B29]"
//               value={item}
//               onChange={(e) => {
//                 const newMenu = [...regularMenu.menu];
//                 newMenu[index] = e.target.value;
//                 setRegularMenu({ ...regularMenu, menu: newMenu });
//               }}
//               placeholder="Enter item name"
//             />
//           ) : (
//             <div className="flex-1 p-2 text-lg font-[Cormorant_Garamond]">
//               {item}
//             </div>
//           )}
//           <div className="flex gap-2">
//             <button
//               onClick={() =>
//                 setEditMode({ ...editMode, [index]: !editMode[index] })
//               }
//               className="text-blue-500 p-2 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
//             >
//               <FaPencilAlt className="text-sm" />
//             </button>
//             <button
//               onClick={() => {
//                 const newMenu = [...regularMenu.menu];
//                 newMenu.splice(index, 1);
//                 setRegularMenu({ ...regularMenu, menu: newMenu });
//               }}
//               className="text-red-500 p-2 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
//             >
//               <FaTrash className="text-sm" />
//             </button>
//           </div>
//         </div>
//       ))}

//       <button
//         onClick={handleAddItem}
//         className="w-full p-3 bg-[#2B2B29]/5 hover:bg-[#2B2B29]/10 rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer group"
//       >
//         <FaPlus className="text-sm group-hover:scale-110 transition-transform" />
//         <span className="font-[Cormorant_Garamond] text-lg">Add Item</span>
//       </button>
//     </div>
//   );
// };

// export default RegularMenu;
