const jwt = require("jsonwebtoken");
require("dotenv").config();

console.log("JWT_SECRET:", process.env.JWT_SECRET); 

const generateToken = (userData) => {
  if (typeof userData !== "object") {
    throw new Error("Invalid payload: generateToken expects an object");
  }
  console.log("Generating JWT with payload:", userData);
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1h" });
};


const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
