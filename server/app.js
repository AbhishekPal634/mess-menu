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

connectDB();
console.log("DEBUG: Current CLIENT_URL is:", `"${process.env.CLIENT_URL}"`);
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/menu", menuRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);
// This regex removes any trailing slash automatically
const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, "") : "http://localhost:5173";

app.use(cors({ 
  origin: clientUrl, 
  credentials: true 
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
