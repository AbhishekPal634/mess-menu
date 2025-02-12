const NodeCache = require("node-cache");
const cache = new NodeCache();

const CACHE_DURATION = process.env.CACHE_DURATION_MINUTES * 60;

const getCacheKey = (type) => {
  const today = new Date().toISOString().split("T")[0];
  return type === "all" ? `menus_all_${today}` : `menu_${type}_${today}`;
};

const clearExpiredCache = () => {
  const keys = cache.keys();
  const today = new Date().toISOString().split("T")[0];

  keys.forEach((key) => {
    const keyDate = key.split("_").pop();
    if (keyDate !== today) {
      cache.del(key);
    }
  });
};

const invalidateMenuCache = () => {
  const keys = cache.keys();
  keys.forEach((key) => {
    if (key.startsWith("menu_") || key.startsWith("menus_")) {
      cache.del(key);
    }
  });
};

module.exports = {
  cache,
  getCacheKey,
  clearExpiredCache,
  invalidateMenuCache,
  CACHE_DURATION,
};
