import React, { useState } from "react";
import Line from "../components/Line";

const MessLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Login attempt:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECDFCB] p-4 sm:p-6 md:p-8">
      <div className="bg-[#F9F0E1] w-full max-w-md p-4 sm:p-6 md:p-8 shadow-lg relative">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-l-2 border-t-2 border-[#2B2B29]/30"></div>
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-r-2 border-t-2 border-[#2B2B29]/30"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-l-2 border-b-2 border-[#2B2B29]/30"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-r-2 border-b-2 border-[#2B2B29]/30"></div>

        {/* Title */}
        <div className="text-center mb-8 mt-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-[Imperial_Script] text-[#2B2B29] leading-tight">
            Mess Login
          </h1>
          <Line className="mt-4 w-[90%] mx-auto" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 px-4 sm:px-6 mt-8">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-xl font-[Cormorant_Garamond] text-[#2B2B29]"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#ECDFCB] border-2 border-[#2B2B29]/30 focus:border-[#2B2B29] 
                         outline-none transition-colors duration-200 text-lg font-[Cormorant_Garamond] text-[#2B2B29]
                         placeholder-[#2B2B29]/50"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xl font-[Cormorant_Garamond] text-[#2B2B29]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#ECDFCB] border-2 border-[#2B2B29]/30 focus:border-[#2B2B29] 
                         outline-none transition-colors duration-200 text-lg font-[Cormorant_Garamond] text-[#2B2B29]
                         placeholder-[#2B2B29]/50"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#2B2B29] text-[#F9F0E1] py-2 px-4 text-xl font-[Cormorant_Garamond]
                         hover:bg-[#2B2B29]/90 transition-colors duration-200 relative overflow-hidden
                         group flex items-center justify-center cursor-pointer"
            >
              <span className="relative z-10">Login</span>
              <div
                className="absolute inset-0 bg-[#ECDFCB] transform scale-x-0 group-hover:scale-x-100 
                            transition-transform duration-200 origin-left"
              ></div>
              <span
                className="absolute z-20 text-[#2B2B29] opacity-0 group-hover:opacity-100 
                            transition-opacity duration-200"
              >
                Login
              </span>
            </button>
          </div>
        </form>

        {/* Footer Decorative Line */}
        <div className="mt-12 mb-4">
          <Line className="w-[90%] mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default MessLogin;
