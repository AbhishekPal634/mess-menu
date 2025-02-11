const NodeCache = require("node-cache");
const cache = new NodeCache();

const CACHE_DURATION = process.env.CACHE_DURATION_MINUTES * 60;

const getCacheKey = (type) =>
  `menu_${type}_${new Date().toISOString().split("T")[0]}`;

const clearExpiredCache = () => {
  const keys = cache.keys();
  const today = new Date().toISOString().split("T")[0];

  keys.forEach((key) => {
    const keyDate = key.split("_")[2];
    if (keyDate !== today) {
      cache.del(key);
    }
  });
};

module.exports = {
  cache,
  getCacheKey,
  clearExpiredCache,
  CACHE_DURATION,
};
