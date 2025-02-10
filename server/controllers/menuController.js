const {
  cache,
  getCacheKey,
  clearExpiredCache,
  CACHE_DURATION,
} = require("../utils/cache");

// Dummy data (will add db later)
const menuData = {
  breakfast: {
    items: ["Bread Pakoda", "Sev Poha", "Chutney", "Tea", "Coffee", "Milk"],
    date: "10-02-2025",
  },
  lunch: {
    items: ["Chole", "Tomato Bharta", "Bhature", "Roti", "Salad", "Papad"],
    date: "10-02-2025",
  },
  snacks: {
    items: [
      {
        categoryName: "Sandwich",
        items: [
          { name: "Bread Butter", price: 15 },
          { name: "Bread Jam", price: 15 },
          { name: "Veg Chop", price: 25 },
          { name: "Veg Cheese Chop", price: 40 },
        ],
      },
      {
        categoryName: "Frankie",
        items: [
          { name: "Veg Roll", price: 35 },
          { name: "Paneer Roll", price: 45 },
          { name: "Cheese Roll", price: 40 },
        ],
      },
    ],
    date: "10-02-2025",
  },
  dinner: {
    items: ["Rice", "Dal", "Sabji", "Roti", "Salad", "Raita"],
    date: "10-02-2025",
  },
};

const getMenu = async (req, res) => {
  try {
    clearExpiredCache();

    const requestedType = req.params.type;
    if (!menuData[requestedType]) {
      return res.status(400).json({
        success: false,
        error: "Invalid menu type",
      });
    }

    const cacheKey = getCacheKey(requestedType);

    // Check cache first
    let menuItems = cache.get(cacheKey);

    if (menuItems === undefined) {
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Get navigation
      const { prev, next } = getNavigation(requestedType);

      menuItems = {
        type: requestedType,
        menu: menuData[requestedType].items,
        date: menuData[requestedType].date,
        prev,
        next,
      };

      // Store in cache
      cache.set(cacheKey, menuItems, CACHE_DURATION);
    }

    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getNavigation = (currentType) => {
  // Define the menu sequence
  const sequence = ["breakfast", "lunch", "snacks", "dinner"];
  const currentIndex = sequence.indexOf(currentType);

  let prev = null;
  let next = null;

  switch (currentType) {
    case "breakfast":
      next = "lunch";
      break;
    case "lunch":
      prev = "breakfast";
      next = "snacks";
      break;
    case "snacks":
      prev = "lunch";
      next = "dinner";
      break;
    case "dinner":
      prev = "snacks";
      break;
  }

  return { prev, next };
};

module.exports = {
  getMenu,
};
