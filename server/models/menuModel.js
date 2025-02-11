const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true },
  items: { type: Array, required: true },
  date: { type: String, required: true },
  prev: { type: String, default: null },
  next: { type: String, default: null },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
