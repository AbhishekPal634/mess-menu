import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLaptopCode,
  FaRobot,
  FaMicrochip,
  FaCode,
  FaTimes,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AmbioraPreloader.css";

const AmbioraPreloader = ({ isLoading, onFinishedLoading }) => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show skip button after 4 seconds
    const skipButtonTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 4000);

    // Auto skip after 10 seconds
    const autoSkipTimer = setTimeout(() => {
      handleSkip();
    }, 10000);

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowSkipButton(true);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearTimeout(skipButtonTimer);
      clearTimeout(autoSkipTimer);
      clearInterval(interval);
    };
  }, [isLoading]);

  const handleSkip = () => {
    setShowPreloader(false);
    onFinishedLoading && onFinishedLoading();
  };

  const handleRegisterClick = () => {
    window.open("https://www.ambioratech.com/events", "_blank");
  };

  const particles = Array.from({ length: 70 }).map((_, i) => (
    <div
      key={i}
      className="absolute bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-70"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 6 + 1}px`,
        height: `${Math.random() * 6 + 1}px`,
        animation: `float ${Math.random() * 10 + 5}s linear infinite`,
        animationDelay: `${Math.random() * 5}s`,
      }}
    />
  ));

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 overflow-y-auto" // Changed from overflow-hidden and added overflow-y-auto
        >
          {/* Skip Button */}
          {showSkipButton && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleSkip}
              className="fixed top-4 right-4 z-50 bg-gray-900/50 text-white px-4 py-2 rounded-md 
                font-tech text-sm tracking-wider flex items-center gap-2 
                hover:bg-gray-900/70 transition-colors duration-200
                backdrop-blur-sm border border-gray-700/30"
            >
              <span>SKIP</span>
              <FaTimes className="text-xs" />
            </motion.button>
          )}

          {/* Add a min-height wrapper to ensure proper scrolling */}
          <div className="min-h-screen flex items-center justify-center relative py-8">
            {" "}
            {/* Added py-8 for padding */}
            {/* Particle background - Make it fixed */}
            <div className="fixed inset-0 overflow-hidden opacity-80">
              {particles}
            </div>
            {/* Circuit pattern - Make it fixed */}
            <div className="fixed inset-0 overflow-hidden opacity-30">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <pattern
                  id="circuit"
                  patternUnits="userSpaceOnUse"
                  width="100"
                  height="100"
                  patternTransform="scale(0.5)"
                >
                  <path
                    d="M0,0 L100,0 L100,100 L0,100 Z"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M0,50 L100,50"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M50,0 L50,100"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="0.5"
                  />
                  <circle cx="50" cy="50" r="5" fill="#4F46E5" />
                  <circle cx="0" cy="50" r="5" fill="#4F46E5" />
                  <circle cx="100" cy="50" r="5" fill="#4F46E5" />
                  <circle cx="50" cy="0" r="5" fill="#4F46E5" />
                  <circle cx="50" cy="100" r="5" fill="#4F46E5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#circuit)" />
              </svg>
            </div>
            {/* Content wrapper - Add relative positioning */}
            <div className="flex flex-col items-center justify-center p-8 relative z-10 max-w-2xl w-full">
              {/* Logo and Event Name */}
              <div className="mb-6 relative flex flex-col items-center justify-center text-center">
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  src="/assets/images/ambiora_logo.png"
                  alt="Ambiora Logo"
                  className="w-48 h-48 object-contain mb-4 drop-shadow-lg"
                />
                <h1
                  className="glitch text-3xl text-white font-tech tracking-wider"
                  data-text="AMBIORA'25"
                >
                  <span aria-hidden="true">AMBIORA'25</span>
                  AMBIORA'25
                  <span aria-hidden="true">AMBIORA'25</span>
                </h1>
              </div>

              {/* Event Date */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8 text-center"
              >
                <h2 className="text-sm text-cyan-400 font-semibold tracking-widest mb-1 font-tech">
                  28th FEB - 2nd MAR
                </h2>
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400"></div>
                  <FaMicrochip className="text-cyan-400" />
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400"></div>
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-gray-300 text-center mb-8 font-tech text-sm tracking-wider"
              ></motion.p>

              {/* Animated Icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center space-x-10 mb-10"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-40"></div>
                  <FaLaptopCode className="text-4xl text-blue-400 relative z-10" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-40"></div>
                  <FaRobot className="text-4xl text-purple-400 relative z-10" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-40"></div>
                  <FaMicrochip className="text-4xl text-green-400 relative z-10" />
                </motion.div>
              </motion.div>

              {/* Progress Bar */}
              <div className="w-full max-w-md mb-10">
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden relative backdrop-blur-sm border border-gray-700/30">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    style={{
                      boxShadow: "0 0 10px rgba(79, 70, 229, 0.6)",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400 font-tech tracking-wider">
                  <span>INITIALIZING</span>
                  <span className="text-cyan-400">{progress}%</span>
                </div>
              </div>

              {/* Sponsors */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mb-10 text-center"
              >
                <h3 className="text-gray-400 mb-4 font-tech tracking-wider text-sm">
                  POWERED BY
                </h3>
                <div className="grid grid-cols-3 gap-8 items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex justify-center items-center bg-gray-900/50 p-4 rounded-lg backdrop-blur-sm border border-gray-800/30"
                  >
                    <img
                      src="/assets/images/Sponsor1.png"
                      alt="Sponsor 1"
                      className="h-12 w-auto object-contain filter brightness-150"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex justify-center items-center bg-gray-900/50 p-4 rounded-lg backdrop-blur-sm border border-gray-800/30"
                  >
                    <img
                      src="/assets/images/Sponsor2.png"
                      alt="Sponsor 2"
                      className="h-12 w-auto object-contain filter brightness-150"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex justify-center items-center bg-gray-900/50 p-4 rounded-lg backdrop-blur-sm border border-gray-800/30"
                  >
                    <img
                      src="/assets/images/Sponsor3.png"
                      alt="Sponsor 3"
                      className="h-12 w-auto object-contain filter brightness-150"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Closing Soon Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 1.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.5,
                }}
                className="mb-4 text-center"
              >
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text font-tech tracking-wider text-sm px-4 py-1 rounded-full border border-red-500/30">
                  REGISTRATIONS CLOSING SOON • HURRY UP!
                </span>
              </motion.div>

              {/* Register Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(79, 70, 229, 0.8)",
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-tech tracking-wider py-4 px-10 rounded-md mt-4 relative overflow-hidden group"
                onClick={handleRegisterClick}
              >
                <span className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-30 -translate-x-full group-hover:animate-shine"></span>
                <span className="relative z-10 flex items-center justify-center">
                  REGISTER NOW
                  <FaExternalLinkAlt className="ml-2 text-sm opacity-80 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AmbioraPreloader;
