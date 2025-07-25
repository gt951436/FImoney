const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
require("dotenv").config();

// Registering new user
exports.register = async (req, res) => {
  const { username, password } = req.body;
  console.log("Attempting registration for:", username);

  try {
    const existing = await User.findOne({ $or: [{ username }] });
    if (existing) {
      console.warn("Registration failed: username already in use:", username);
      return res
        .status(409)
        .json({ message: "Username already in use!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully for:", username);

    

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    console.log("User registered successfully:", username);
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(409).json({ message: "Server error" });
  }
};

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt received:", { username});

  try {
    const existing = await User.findOne({ username });
    if (!existing) {
      console.warn("Login failed: user not found for:", username);
      return res.status(404).json({ message: "User not found!" });
    }

    console.log("User found, verifying password for:", existing.username);
    const isSame = await bcrypt.compare(password, existing.password);
    if (!isSame) {
      console.warn("Login failed: invalid password for:", existing.username);
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const access_token = jwt.sign({ userId: existing._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("JWT generated for user:", existing.username);

    res.status(200).json({ access_token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
