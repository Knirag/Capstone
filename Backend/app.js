const dotenv = require("dotenv");
const express = require("express");
require("dotenv").config();
console.log("JWT_SECRET from .env:", process.env.JWT_SECRET);
const {
  authRoutes,
  userRoutes,
  eventRoutes,
  locationRoutes,
  adminRoutes,
} = require("./routes");

dotenv.config();

const app = express();
app.use(express.json());

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/locations", locationRoutes);

module.exports = app;
