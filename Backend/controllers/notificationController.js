const { updateUserPushToken } = require("../models/User");

exports.registerPushToken = async (req, res) => {
  const { push_token } = req.body;

  if (push_token) {
    return res.status(400).json({ message: "Push token is required." });
  }

  try {
    const userId = req.user.id; // Auth middleware attaches `user` to the request
    await updateUserPushToken(userId, push_token);
    res.status(200).json({ message: "Push token registered successfully." });
  } catch (error) {
    console.error("Error registering push token:", error);
    res.status(500).json({ message: "Failed to register push token." });
  }
};
