import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Line from "../components/Line";
import axios from "axios";

const MessLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData,
        { withCredentials: true }
      );

      if (response.data.accessToken) {
        localStorage.setItem("authToken", response.data.accessToken);
        navigate("/mess/dashboard");
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
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-[#2B2B29]/30 focus:border-[#2B2B29] outline-none text-lg"
              placeholder="Enter your password"
              required
            />
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
