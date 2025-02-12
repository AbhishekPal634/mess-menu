const express = require("express");
const router = express.Router();
const {
  getAllMenus,
  getMenu,
  updateMenu,
} = require("../controllers/menuController.js");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/all", getAllMenus); // New route to get all menus
router.get("/:type", getMenu);
router.put("/:type", verifyToken, updateMenu);

module.exports = router;
