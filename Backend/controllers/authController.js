const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../models/User");
const generateToken = require("../utils/jwtHelper");

exports.signup = async (req, res) => {
  const { names, email, phoneNumber, age, password } = req.body;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({
      names,
      email,
      phoneNumber,
      age,
      password: passwordHash,
    });

    const token = generateToken(user.id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user.length === 0)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user[0].id);
    res.json({ user: user[0], token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
