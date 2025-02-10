const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const menuRoutes = require("./routes/menuRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
