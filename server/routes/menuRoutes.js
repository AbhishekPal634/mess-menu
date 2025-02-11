const express = require("express");
const router = express.Router();
const { getMenu, updateMenu } = require("../controllers/menuController.js");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/:type", getMenu);
router.put("/:type", verifyToken, updateMenu);

module.exports = router;
