const dotenv = require("dotenv");
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
console.log("JWT_SECRET from .env:", process.env.JWT_SECRET);
const {
  authRoutes,
  userRoutes,
  otpRoutes,
  eventRoutes,
  locationRoutes,
  adminRoutes,
  supportRoutes,
  feedbackRoutes,
} = require("./routes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/feedback", feedbackRoutes);


module.exports = app;
