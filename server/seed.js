require("dotenv").config();
const mongoose = require("mongoose");
const Menu = require("./models/menuModel");
const connectDB = require("./db");

const seedData = async () => {
  await connectDB();

  const menus = [
    {
      type: "breakfast",
      items: ["Bread Pakoda", "Sev Poha", "Chutney", "Tea", "Coffee", "Milk"],
      date: "10-02-2025",
    },
    {
      type: "lunch",
      items: ["Chole", "Tomato Bharta", "Bhature", "Roti", "Salad", "Papad"],
      date: "10-02-2025",
    },
    {
      type: "snacks",
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
    {
      type: "dinner",
      items: ["Rice", "Dal", "Sabji", "Roti", "Salad", "Raita"],
      date: "10-02-2025",
    },
  ];

  await Menu.deleteMany();
  await Menu.insertMany(menus);

  console.log("Database Seeded Successfully");
  process.exit();
};

seedData();
