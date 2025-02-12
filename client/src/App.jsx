import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import MessLogin from "./pages/MessLogin";
import MessDashboard from "./pages/MessDashboard";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MenuPage />} />
        <Route path="/mess/login" element={<MessLogin />} />

        {/* Protected Route for MessDashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mess/dashboard" element={<MessDashboard />} />
        </Route>

        {/* 404 Route - This should always be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
