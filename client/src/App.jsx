import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import MessLogin from "./pages/MessLogin";
import MessDashboard from "./pages/MessDashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/mess/login" element={<MessLogin />} />
        <Route path="/mess/dashboard" element={<MessDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
