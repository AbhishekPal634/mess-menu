import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import MenuPage from "./pages/MenuPage";
import "./App.css";

function App() {
  return (
    <MenuPage
      prev="Lunch"
      next="Dinner"
      type="Snacks"
      date="10. 02. 2025"
      menu={[
        {
          categoryName: "Sandwich",
          items: [
            { name: "Bread Butter", price: 15 },
            { name: "Bread Jam", price: 15 },
            { name: "Veg Chop", price: 25 },
            { name: "Veg Cheese Chop", price: 40 },
            { name: "Veg Grill", price: 45 },
            { name: "Paneer", price: 45 },
            { name: "Veg Cheese Grill", price: 55 },
            { name: "Paneer Cheese", price: 65 },
          ],
        },
        {
          categoryName: "Frankie",
          items: [
            { name: "Bread Butter", price: 15 },
            { name: "Bread Jam", price: 15 },
            { name: "Veg Chop", price: 25 },
            { name: "Veg Cheese Chop", price: 40 },
            { name: "Veg Grill", price: 45 },
            { name: "Paneer", price: 45 },
            { name: "Veg Cheese Grill", price: 55 },
          ],
        },
      ]}
    />

    // <MenuPage
    //   prev="Dinner"
    //   next="Lunch"
    //   type="Breakfast"
    //   date="10. 02. 2025"
    //   menu={["Bread Pakoda", "Sev Poha", "Chutney", "Tea", "Coffee", "Milk"]}
    // />
  );
}

export default App;
