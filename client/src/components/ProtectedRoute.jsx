import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const token = localStorage.getItem("authToken");
  // console.log("Current token:", token); // Debug log

  const isTokenValid = () => {
    if (!token) {
      // console.log("No token found"); // Debug log
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      // console.log("Decoded token:", decoded); // Debug log

      const isValid = decoded.exp * 1000 > Date.now();
      // console.log("Token validity:", isValid); // Debug log

      return isValid;
    } catch (error) {
      // console.error("Token validation error:", error); // Debug log
      return false;
    }
  };

  const tokenValid = isTokenValid();

  if (!tokenValid) {
    // Clean up invalid token
    localStorage.removeItem("authToken");
    // console.log("Token invalid, redirecting to login"); // Debug log
    return <Navigate to="/mess/login" />;
  }

  // console.log("Token valid, allowing access"); // Debug log
  return <Outlet />;
};

export default ProtectedRoute;
