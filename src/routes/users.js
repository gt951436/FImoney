// sign up/register the user
// POST /signUp

const bcypt = require("bcyptjs");
const User = require("../models/user.js");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send("Provide required details of the user!");
  }
  const isPresent = await User.findOne({ username, email });
  if (isPresent) {
    return res.status(409).send("User already exists");
  }
  const hashedPassword = await bcypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).send({ message: "User registered!" });
};

// login user
// POST /login

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ username, email });
  if (!user) {
    return res.status(401).send("Invalid credentials!");
  }
  const validUser = await bcypt.compare(password, user.password);
  if (!validUser) {
    return res.status(401).send("Invalid credentials!");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).send({ access_token: token });
};
