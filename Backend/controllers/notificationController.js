const { getUsersByLocation } = require("../models/User");
const { sendNotification } = require("../utils/notifications");

exports.sendNotification = async (req, res) => {
  const { title, message } = req.body;
  const adminLocationId = req.user.location_id;

  try {
    const users = await getUsersByLocation(adminLocationId);

    const pushTokens = users.map((user) => user.push_token);
    if (pushTokens.length > 0) {
      await sendNotification(pushTokens, title, message, {
        type: "admin_notification",
      });
    }

    res.status(200).json({ message: "Notification sent successfully." });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ message: "Failed to send notification.", error });
  }
};
