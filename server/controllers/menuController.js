const {
  cache,
  getCacheKey,
  clearExpiredCache,
  invalidateMenuCache,
  CACHE_DURATION,
} = require("../utils/cache");
const Menu = require("../models/menuModel");

const getNavigation = (currentType) => {
  const sequence = ["breakfast", "lunch", "snacks", "dinner"];
  const currentIndex = sequence.indexOf(currentType);

  let prev = null;
  let next = null;

  if (currentIndex > 0) prev = sequence[currentIndex - 1];
  if (currentIndex < sequence.length - 1) next = sequence[currentIndex + 1];

  return { prev, next };
};

const getAllMenus = async (req, res) => {
  try {
    clearExpiredCache();

    const cacheKey = getCacheKey("all");
    let allMenus = cache.get(cacheKey);

    if (!allMenus) {
      const menus = await Menu.find({}).sort({ type: 1 }); // Sort by type to ensure consistent order

      if (!menus || menus.length === 0) {
        return res.status(404).json({
          success: false,
          error: "No menus found",
        });
      }

      allMenus = menus.map((menu) => ({
        type: menu.type,
        menu: menu.items,
        date: menu.date,
        ...getNavigation(menu.type),
      }));

      // Cache all menus together
      cache.set(cacheKey, allMenus, CACHE_DURATION);

      // Also cache individual menus
      allMenus.forEach((menu) => {
        cache.set(getCacheKey(menu.type), menu, CACHE_DURATION);
      });
    }

    res.json(allMenus);
  } catch (error) {
    console.error("Get All Menus Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

const getMenu = async (req, res) => {
  try {
    clearExpiredCache();
    const requestedType = req.params.type.toLowerCase();

    // First try to get from all-menus cache
    const allMenus = cache.get(getCacheKey("all"));
    if (allMenus) {
      const menuData = allMenus.find((m) => m.type === requestedType);
      if (menuData) {
        return res.json(menuData);
      }
    }

    // Then try individual menu cache
    const cacheKey = getCacheKey(requestedType);
    let menuData = cache.get(cacheKey);

    if (!menuData) {
      const menu = await Menu.findOne({ type: requestedType });

      if (!menu) {
        return res.status(404).json({
          success: false,
          error: "Menu not found",
        });
      }

      menuData = {
        type: requestedType,
        menu: menu.items,
        date: menu.date,
        ...getNavigation(requestedType),
      };

      cache.set(cacheKey, menuData, CACHE_DURATION);
    }

    res.json(menuData);
  } catch (error) {
    console.error("Get Menu Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

const updateMenu = async (req, res) => {
  try {
    const { type } = req.params;
    const { menu: items, date } = req.body;

    if (!items && !date) {
      return res.status(400).json({
        success: false,
        error: "No update data provided",
      });
    }

    let menu = await Menu.findOne({ type });

    if (!menu) {
      return res.status(404).json({
        success: false,
        error: "Menu not found",
      });
    }

    // Update only provided fields
    if (items) menu.items = items;
    if (date) menu.date = date;

    await menu.save();

    const updatedMenu = {
      type,
      menu: menu.items,
      date: menu.date,
      ...getNavigation(type),
    };

    // Invalidate all menu-related caches
    invalidateMenuCache();

    res.json({
      success: true,
      message: "Menu updated successfully",
      menu: updatedMenu,
    });
  } catch (error) {
    console.error("Update Menu Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

module.exports = {
  getAllMenus,
  getMenu,
  updateMenu,
};
