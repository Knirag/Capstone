const jwt = require("jsonwebtoken");
require("dotenv").config();

// Ensure JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

// Generate a token with error handling
const generateToken = (userData) => {
  if (typeof userData !== "object" || Array.isArray(userData) || !userData) {
    throw new Error("Invalid payload: generateToken expects a non-null object");
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("Generating JWT with payload:", userData);
  }

  try {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate token");
  }
};

// Verify a token with detailed error feedback
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Token verification error:", error.message);
    return null; // Could also rethrow the error: throw error;
  }
};

module.exports = { generateToken, verifyToken };
