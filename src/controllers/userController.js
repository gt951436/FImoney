// registration and login
const bcypt = require("bcyptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
require("dotenv").config();

// registering new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Username or email already in use!" });
    }
    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Registraction error:", err);
    res.status(500).json({ message: "server error" });
  }
};

// login user
exports.login = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // find user by name or email
    const existing = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (!existing) {
      return res.status(404).json({ message: "User not found!" });
      // should be redirected to register page
    }
    const isSame = await bcrypt.compare(password, existing.password);
    if (!isSame) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // generate JWT token
    const token = jwt.sign({ userId: existing._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.error("login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
