const {
  cache,
  getCacheKey,
  clearExpiredCache,
  CACHE_DURATION,
} = require("../utils/cache");
const Menu = require("../models/menuModel");

const getMenu = async (req, res) => {
  try {
    clearExpiredCache();

    const requestedType = req.params.type;

    const cacheKey = getCacheKey(requestedType);
    let menuItems = cache.get(cacheKey);

    if (!menuItems) {
      const menu = await Menu.findOne({ type: requestedType });

      if (!menu) {
        return res.status(400).json({
          success: false,
          error: "Invalid menu type",
        });
      }

      const { prev, next } = getNavigation(requestedType);

      menuItems = {
        type: requestedType,
        menu: menu.items,
        date: menu.date,
        prev,
        next,
      };

      cache.set(cacheKey, menuItems, CACHE_DURATION);
    }

    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getNavigation = (currentType) => {
  const sequence = ["breakfast", "lunch", "snacks", "dinner"];
  const currentIndex = sequence.indexOf(currentType);

  let prev = null;
  let next = null;

  if (currentIndex > 0) prev = sequence[currentIndex - 1];
  if (currentIndex < sequence.length - 1) next = sequence[currentIndex + 1];

  return { prev, next };
};

module.exports = { getMenu };
