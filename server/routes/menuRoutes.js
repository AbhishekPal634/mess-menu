const express = require("express");
const router = express.Router();
const { getMenu } = require("../controllers/menuController.js");

router.get("/:type", getMenu);

module.exports = router;
