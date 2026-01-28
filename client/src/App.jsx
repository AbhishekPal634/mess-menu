import { useState } from 'react'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import MenuPage from "./pages/MenuPage";
import MessLogin from "./pages/MessLogin";
import MessDashboard from "./pages/MessDashboard";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SplashScreen from "./components/SplashScreen"; 

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* 1. The Splash Screen (Double Doors) sits on top (z-index 9999) */}
      {isLoading && <SplashScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. CRITICAL FIX: Removed 'hidden' class. 
          The app must be rendered BEHIND the doors so it is visible 
          the moment the animation starts. */}
      <div>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MenuPage />} />
            <Route path="/mess/login" element={<MessLogin />} />

            {/* Protected Route for MessDashboard */}
            <Route element={<ProtectedRoute />}>
              <Route path="/mess/dashboard" element={<MessDashboard />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <Analytics />
      </div>
    </>
  );
}

export default App;