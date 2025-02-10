// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Client-side cache
// const menuCache = new Map();

// export const getDefaultMenuType = () => {
//   const hour = new Date().getHours();
//   const minutes = new Date().getMinutes();
//   const time = hour * 100 + minutes;

//   if (time > 2200 || time <= 930) return "breakfast";
//   if (time > 930 && time <= 1400) return "lunch";
//   if (time > 1400 && time <= 1900) return "snacks";
//   return "dinner";
// };

// const getCacheKey = (type) => `menu_${type}_${new Date().toLocaleDateString()}`;

// const clearExpiredCache = () => {
//   const today = new Date().toLocaleDateString();
//   for (const [key] of menuCache) {
//     const [, , date] = key.split("_");
//     if (date !== today) {
//       menuCache.delete(key);
//     }
//   }
// };

// export const getMenu = async (type) => {
//   try {
//     clearExpiredCache();

//     const cacheKey = getCacheKey(type);
//     const cachedData = menuCache.get(cacheKey);

//     if (cachedData) {
//       return cachedData;
//     }

//     const response = await api.get(`/menu/${type}`);
//     menuCache.set(cacheKey, response.data);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.error || "Failed to fetch menu");
//   }
// };

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Client-side cache
const menuCache = new Map();

export const getDefaultMenuType = () => {
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  const time = hour * 100 + minutes;

  if (time > 2200 || time <= 930) return "breakfast";
  if (time > 930 && time <= 1400) return "lunch";
  if (time > 1400 && time <= 1900) return "snacks";
  return "dinner";
};

const getCacheKey = (type) => `menu_${type}_${new Date().toLocaleDateString()}`;

const clearExpiredCache = () => {
  const today = new Date().toLocaleDateString();
  for (const [key] of menuCache) {
    const [, , date] = key.split("_");
    if (date !== today) {
      menuCache.delete(key);
    }
  }
};

export const getMenu = async (type) => {
  try {
    clearExpiredCache();

    const cacheKey = getCacheKey(type);
    const cachedData = menuCache.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const response = await api.get(`/menu/${type}`);
    menuCache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch menu");
  }
};

export default api;
