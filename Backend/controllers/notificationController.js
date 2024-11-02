const Notification = require("../models/Notification");

exports.sendNotification = async (req, res) => {
  const { message, targetRegion } = req.body;
  try {
    const notification = await Notification.create({
      message,
      targetRegion,
      status: "Sent",
    });
    res.status(201).json({ notification });
  } catch (err) {
    res.status(500).json({ message: "Error sending notification" });
  }
};
