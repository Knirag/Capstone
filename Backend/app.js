const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const {
  authRoutes,
  userRoutes,
  otpRoutes,
  eventRoutes,
  locationRoutes,
  adminRoutes,
  supportRoutes,
  notificationRoutes,
  feedbackRoutes,
} = require("./routes");

dotenv.config();

// Check for environment variables
if (
  !process.env.JWT_SECRET ||
  !process.env.TWILIO_ACCOUNT_SID ||
  !process.env.TWILIO_AUTH_TOKEN
) {
  console.error("Missing required environment variables.");
  process.exit(1); // Exit the application if variables are missing
}

console.log("JWT_SECRET from .env:", process.env.JWT_SECRET);

const app = express();

// Load Swagger YAML document
const swaggerDocument = YAML.load("./swagger.yaml"); 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support URL-encoded bodies

// CORS setup
app.use(cors());
// app.use(cors({ origin: "http://localhost:5173" }));

// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/auth", authRoutes); // Handles login, signup
app.use("/api/admin", adminRoutes); // Admin-related operations
app.use("/api/users", userRoutes); // User profile, push tokens, etc.
app.use("/api/notifications", notificationRoutes); // Notifications management
app.use("/api/events", eventRoutes); // Event management
app.use("/api/locations", locationRoutes); // Location hierarchy
app.use("/api/otp", otpRoutes); // OTP request and verification
app.use("/api/support", supportRoutes); // Support tickets
app.use("/api/feedback", feedbackRoutes); // User feedback

module.exports = app;
