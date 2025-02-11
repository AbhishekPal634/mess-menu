import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const token = localStorage.getItem("authToken");

  const isTokenValid = () => {
    if (!token) {
      return false;
    }
    try {
      const decoded = jwtDecode(token);
      const isValid = decoded.exp * 1000 > Date.now();
      return isValid;
    } catch (error) {
      return false;
    }
  };
  const tokenValid = isTokenValid();
  if (!tokenValid) {
    // Clean up invalid token
    localStorage.removeItem("authToken");
    return <Navigate to="/mess/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
