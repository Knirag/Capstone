const express = require("express");
const dotenv = require("dotenv");

const verifyToken = require("./middleware/authMiddleware");
const {
  authRoutes,
  userRoutes,
  notificationRoutes,
  eventRoutes,
  locationRoutes,
  tokenRoutes,
  adminRoutes,
} = require("./routes");

dotenv.config();

const app = express();
app.use(express.json());

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", verifyToken, userRoutes);
app.use("/api/notifications", verifyToken, notificationRoutes);
app.use("/api/events", verifyToken, eventRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/tokens", tokenRoutes);

module.exports = app;
