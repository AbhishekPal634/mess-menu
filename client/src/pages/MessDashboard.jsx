import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Line from "../components/Line";
import { getMenu } from "../services/api.js";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import MenuTypeSelector from "../components/MenuTypeSelector";
import RegularMenu from "../components/RegularMenu";
import SnacksMenu from "../components/SnacksMenu";

const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const MessDashboard = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("breakfast");
  const [regularMenu, setRegularMenu] = useState({
    type: "",
    menu: [],
    date: "Today",
    prev: null,
    next: null,
  });
  const [snacksMenu, setSnacksMenu] = useState({
    type: "snacks",
    menu: [{ categoryName: "", items: [] }],
    date: "Today",
    prev: null,
    next: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const determineDateOption = (fetchedDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const fetchedDateTime = parseDate(fetchedDate);
    fetchedDateTime.setHours(0, 0, 0, 0);

    if (fetchedDateTime.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    }
    return "Today";
  };

  const getFormattedDate = (dateOption) => {
    const today = new Date();
    if (dateOption === "Tomorrow") {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return formatDate(tomorrow);
    }
    return formatDate(today);
  };

  useEffect(() => {
    fetchMenu(selectedType);
  }, [selectedType]);

  const fetchMenu = async (type) => {
    try {
      setLoading(true);
      setError(null);

      const currentDate =
        type === "snacks" ? snacksMenu.date : regularMenu.date;
      const formattedDate = getFormattedDate(currentDate);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/menu/${type}?date=${formattedDate}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const dateOption = determineDateOption(response.data.date);

      const updatedResponse = {
        ...response.data,
        date: dateOption,
      };

      if (type === "snacks") {
        setSnacksMenu(updatedResponse);
      } else {
        setRegularMenu(updatedResponse);
      }
      setEditMode({});
    } catch (err) {
      setError(err.message);
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      setSaveError(null);

      const menuData = selectedType === "snacks" ? snacksMenu : regularMenu;

      const capitalizedMenu = {
        ...menuData,
        menu:
          selectedType === "snacks"
            ? menuData.menu.map((category) => ({
                ...category,
                categoryName: capitalizeWords(category.categoryName),
                items: category.items.map((item) => ({
                  ...item,
                  name: capitalizeWords(item.name),
                })),
              }))
            : menuData.menu.map((item) => capitalizeWords(item)),
        date: getFormattedDate(menuData.date || "Today"),
      };

      await axios.put(
        `${import.meta.env.VITE_API_URL}/menu/${selectedType}`,
        capitalizedMenu,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      await fetchMenu(selectedType);
      setEditMode({});
      showNotification("Menu updated successfully!");
    } catch (err) {
      setSaveError(err.message || "Failed to save changes");
      showNotification(err.message || "Failed to save changes", "error");
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
    fetchMenu(selectedType);
    setEditMode({});
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ECDFCB]">
        <PacmanLoader color="#f9ce8f" size={50} className="my-4" />
      </div>
    );
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

  return (
    <div className="min-h-screen p-4 md:p-6 bg-[#ECDFCB]">
      {notification.show && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center justify-center transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          <span className="font-[Cormorant_Garamond] text-lg">
            {notification.message}
          </span>
        </div>
      )}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-[#2B2B29] text-[#ECDFCB] rounded-md 
    hover:bg-[#2B2B29]/90 transition-all duration-200
    active:scale-[0.98] active:translate-y-[1px]
    focus:outline-none focus:ring-2 focus:ring-[#2B2B29] focus:ring-offset-2 focus:ring-offset-[#ECDFCB]
    disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <FaSignOutAlt />
          <span className="font-[Cormorant_Garamond]">Logout</span>
        </button>
      </div>

      <div className="mt-16 md:mt-20 flex flex-col items-center justify-center">
        <h1 className="text-6xl md:text-[88px] font-[Kaisei_Decol] leading-[1] text-[#2B2B29]">
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

const DateSelector = ({
  selectedType,
  snacksMenu,
  regularMenu,
  setSnacksMenu,
  setRegularMenu,
}) => {
  const handleDateChange = (e) => {
    const dateOption = e.target.value;
    if (selectedType === "snacks") {
      setSnacksMenu((prev) => ({
        ...prev,
        date: dateOption,
      }));
    } else {
      setRegularMenu((prev) => ({
        ...prev,
        date: dateOption,
      }));
    }
  };

  return (
    <select
      className="w-full md:w-auto border-2 border-[#2B2B29] bg-transparent p-2 rounded-md font-[Cormorant_Garamond] text-lg md:text-xl"
      value={(selectedType === "snacks" ? snacksMenu : regularMenu).date}
      onChange={handleDateChange}
    >
      <option value="Today">Today</option>
      <option value="Tomorrow">Tomorrow</option>
    </select>
  );
};

export default MessDashboard;
