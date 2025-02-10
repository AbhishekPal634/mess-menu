const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    }
  );
  return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.jwt;
  if (!refreshToken)
    return res.status(403).json({ message: "No refresh token" });
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken)
      return res.status(403).json({ message: "Invalid refresh token" });
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
    user.refreshToken = newRefreshToken;
    await user.save();
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

exports.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) return res.sendStatus(204);
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
