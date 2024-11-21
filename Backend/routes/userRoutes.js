const express = require("express");
const router = express.Router();
const {
  updateProfile,
  registerPushToken,
} = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");


// Route for updating user details
router.put("/:id", authenticate, updateProfile);
router.post("/push-token", authenticate, registerPushToken);


module.exports = router;
