import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import MenuPage from "./pages/MenuPage";
import MessLogin from "./pages/MessLogin";
import MessDashboard from "./pages/MessDashboard";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

// FIX: Removed SplashScreen import. It is now handled inside MenuPage.jsx

function App() {
  // FIX: Removed global 'isLoading' state. 
  // We don't want the entire app to wait, only the MenuPage.

  return (
    <>
      
      <div>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            {/* MenuPage will now trigger its own internal SplashScreen when visited */}
            <Route path="/" element={<MenuPage />} />
            
            {/* Login Page will now load instantly without the splash screen */}
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