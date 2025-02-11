import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Line from "../components/Line";
import axios from "axios";

const MessLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in with a valid token
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          navigate("/mess/dashboard");
          return;
        }
        // Clean up invalid token
        localStorage.removeItem("authToken");
      } catch (error) {
        console.error("Token validation error:", error);
        localStorage.removeItem("authToken");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // First check if there's a valid token
    const existingToken = localStorage.getItem("authToken");
    if (existingToken) {
      try {
        const decoded = jwtDecode(existingToken);
        if (decoded.exp * 1000 > Date.now()) {
          navigate("/mess/dashboard");
          return;
        }
      } catch (error) {
        localStorage.removeItem("authToken");
      }
    }

    // Proceed with login if no valid token exists
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData,
        { withCredentials: true }
      );

      if (response.data.accessToken) {
        try {
          const decoded = jwtDecode(response.data.accessToken);
          localStorage.setItem("authToken", response.data.accessToken);
          navigate("/mess/dashboard");
        } catch (error) {
          setError("Invalid token received from server");
        }
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECDFCB] p-4 sm:p-6 md:p-8">
      <div className="bg-[#F9F0E1] w-full max-w-md p-4 sm:p-6 md:p-8 shadow-lg relative">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-[#2B2B29]/30"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-[#2B2B29]/30"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-[#2B2B29]/30"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-[#2B2B29]/30"></div>

        {/* Title */}
        <div className="text-center mb-8 mt-4">
          <h1 className="text-5xl font-[Imperial_Script] text-[#2B2B29]">
            Mess Login
          </h1>
          <Line className="mt-4 w-[90%] mx-auto" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 px-4 sm:px-6 mt-8">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-xl text-[#2B2B29]">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-[#2B2B29]/30 focus:border-[#2B2B29] outline-none text-lg"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-xl text-[#2B2B29]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-[#2B2B29]/30 focus:border-[#2B2B29] outline-none text-lg pr-12"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2B2B29]/70 hover:text-[#2B2B29] transition-colors cursor-pointer p-1"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#2B2B29] text-white py-2 px-4 text-xl hover:bg-[#2B2B29]/90"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessLogin;
