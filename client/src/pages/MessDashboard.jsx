// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaSignOutAlt } from "react-icons/fa";
// import Line from "../components/Line";
// import { getMenu } from "../services/api.js";
// import axios from "axios";
// import MenuTypeSelector from "../components/MenuTypeSelector";
// import DateSelector from "../components/DateSelector";
// import RegularMenu from "../components/RegularMenu";
// import SnacksMenu from "../components/SnacksMenu";

// const MessDashboard = () => {
//   const navigate = useNavigate();
//   const [selectedType, setSelectedType] = useState("breakfast");
//   const [regularMenu, setRegularMenu] = useState({
//     type: "",
//     menu: [],
//     date: "",
//     prev: null,
//     next: null,
//   });
//   const [snacksMenu, setSnacksMenu] = useState({
//     type: "snacks",
//     menu: [{ categoryName: "", items: [] }],
//     date: "",
//     prev: null,
//     next: null,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editMode, setEditMode] = useState({});

//   useEffect(() => {
//     fetchMenu(selectedType);
//   }, [selectedType]);

//   const fetchMenu = async (type) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await getMenu(type);
//       if (type === "snacks") {
//         setSnacksMenu(response);
//       } else {
//         setRegularMenu(response);
//       }
//       setEditMode({});
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/auth/logout`,
//         {},
//         { withCredentials: true }
//       );
//       localStorage.removeItem("authToken");
//       navigate("/mess/login");
//     } catch (error) {
//       console.error("Logout error:", error);
//       localStorage.removeItem("authToken");
//       navigate("/mess/login");
//     }
//   };

//   if (loading) return <div className="text-center p-8">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

//   return (
//     <div className="min-h-screen p-4 md:p-6 bg-[#ECDFCB]">
//       <div className="absolute top-4 right-4">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 px-4 py-2 bg-[#2B2B29] text-[#ECDFCB] rounded-md hover:bg-[#2B2B29]/90 transition-colors"
//         >
//           <FaSignOutAlt />
//           <span className="font-[Cormorant_Garamond]">Logout</span>
//         </button>
//       </div>

//       <div className="mt-16 md:mt-20 flex flex-col items-center justify-center">
//         <h1 className="text-6xl md:text-[88px] font-[Imperial_Script] leading-[1] text-[#2B2B29]">
//           Mess Dashboard
//         </h1>
//         <h3 className="text-xl md:text-2xl font-[Cormorant_Garamond] font-extralight text-[#2B2B29] mt-2">
//           Edit Menu
//         </h3>
//       </div>

//       <Line className="my-6 md:my-8" />

//       <div className="max-w-4xl mx-auto px-2 md:px-0">
//         <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
//           <MenuTypeSelector
//             selectedType={selectedType}
//             setSelectedType={setSelectedType}
//           />
//           <DateSelector
//             selectedType={selectedType}
//             snacksMenu={snacksMenu}
//             regularMenu={regularMenu}
//             setSnacksMenu={setSnacksMenu}
//             setRegularMenu={setRegularMenu}
//           />
//         </div>

//         <div className="bg-white/90 backdrop-blur-sm p-4 md:p-8 rounded-lg shadow-lg mt-6">
//           {selectedType === "snacks" ? (
//             <SnacksMenu
//               snacksMenu={snacksMenu}
//               setSnacksMenu={setSnacksMenu}
//               editMode={editMode}
//               setEditMode={setEditMode}
//             />
//           ) : (
//             <RegularMenu
//               regularMenu={regularMenu}
//               setRegularMenu={setRegularMenu}
//               editMode={editMode}
//               setEditMode={setEditMode}
//             />
//           )}
//         </div>
//         <div className="flex justify-center gap-4 mt-6 md:mt-8">
//           <button
//             onClick={() => window.history.back()}
//             className="px-6 md:px-8 py-2 md:py-3 bg-transparent border-2 border-[#2B2B29] text-[#2B2B29] rounded-md font-[Cormorant_Garamond] text-lg md:text-xl hover:bg-[#2B2B29]/10 transition-colors cursor-pointer"
//           >
//             Cancel
//           </button>
//           <button className="px-6 md:px-8 py-2 md:py-3 bg-[#2B2B29] text-[#ECDFCB] rounded-md font-[Cormorant_Garamond] text-lg md:text-xl hover:bg-[#2B2B29]/90 transition-colors cursor-pointer">
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessDashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Line from "../components/Line";
import { getMenu } from "../services/api.js";
import axios from "axios";
import MenuTypeSelector from "../components/MenuTypeSelector";
import DateSelector from "../components/DateSelector";
import RegularMenu from "../components/RegularMenu";
import SnacksMenu from "../components/SnacksMenu";

const MessDashboard = () => {
  const navigate = useNavigate();
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
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

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

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      setSaveError(null);

      const menuData = selectedType === "snacks" ? snacksMenu : regularMenu;

      // Add validation before saving
      if (selectedType === "snacks") {
        const isValid = menuData.menu.every(
          (category) =>
            category.categoryName.trim() !== "" &&
            category.items.every(
              (item) => item.name.trim() !== "" && item.price > 0
            )
        );

        if (!isValid) {
          throw new Error("Please fill in all category names and item details");
        }
      } else {
        const isValid = menuData.menu.every((item) => item.trim() !== "");
        if (!isValid) {
          throw new Error("Please fill in all menu items");
        }
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/menu/${selectedType}`,
        menuData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      // Show success message (you can add a toast notification here)
      console.log("Menu updated successfully");

      // Refresh the menu data
      await fetchMenu(selectedType);

      // Clear all edit modes
      setEditMode({});
    } catch (err) {
      setSaveError(err.message || "Failed to save changes");
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("authToken");
      navigate("/mess/login");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("authToken");
      navigate("/mess/login");
    }
  };

  const handleCancel = () => {
    // Reset the menu to its original state by re-fetching
    fetchMenu(selectedType);
    // Clear all edit modes
    setEditMode({});
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

  return (
    <div className="min-h-screen p-4 md:p-6 bg-[#ECDFCB]">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-[#2B2B29] text-[#ECDFCB] rounded-md hover:bg-[#2B2B29]/90 transition-colors"
        >
          <FaSignOutAlt />
          <span className="font-[Cormorant_Garamond]">Logout</span>
        </button>
      </div>

      <div className="mt-16 md:mt-20 flex flex-col items-center justify-center">
        <h1 className="text-6xl md:text-[88px] font-[Imperial_Script] leading-[1] text-[#2B2B29]">
          Mess Dashboard
        </h1>
        <h3 className="text-xl md:text-2xl font-[Cormorant_Garamond] font-extralight text-[#2B2B29] mt-2">
          Edit Menu
        </h3>
      </div>

      <Line className="my-6 md:my-8" />

      <div className="max-w-4xl mx-auto px-2 md:px-0">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <MenuTypeSelector
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <DateSelector
            selectedType={selectedType}
            snacksMenu={snacksMenu}
            regularMenu={regularMenu}
            setSnacksMenu={setSnacksMenu}
            setRegularMenu={setRegularMenu}
          />
        </div>

        {saveError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            {saveError}
          </div>
        )}

        <div className="bg-white/90 backdrop-blur-sm p-4 md:p-8 rounded-lg shadow-lg mt-6">
          {selectedType === "snacks" ? (
            <SnacksMenu
              snacksMenu={snacksMenu}
              setSnacksMenu={setSnacksMenu}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          ) : (
            <RegularMenu
              regularMenu={regularMenu}
              setRegularMenu={setRegularMenu}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          )}
        </div>
        <div className="flex justify-center gap-4 mt-6 md:mt-8">
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="px-6 md:px-8 py-2 md:py-3 bg-transparent border-2 border-[#2B2B29] text-[#2B2B29] rounded-md font-[Cormorant_Garamond] text-lg md:text-xl hover:bg-[#2B2B29]/10 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="px-6 md:px-8 py-2 md:py-3 bg-[#2B2B29] text-[#ECDFCB] rounded-md font-[Cormorant_Garamond] text-lg md:text-xl hover:bg-[#2B2B29]/90 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessDashboard;
