const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/config");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.createUser(username, email, passwordHash);
  res.status(201).json({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id }, config.jwtSecret, {
    expiresIn: "1h",
  });
  res.json({ token });
};
