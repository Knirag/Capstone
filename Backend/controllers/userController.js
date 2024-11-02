const Location = require("../models/Location");

exports.setLocation = async (req, res) => {
  const { district, sector, cell, village } = req.body;
  const userId = req.user.id; // Assume `authMiddleware` attaches user to request
  await Location.saveLocation(userId, district, sector, cell, village);
  res.status(200).json({ message: "Location updated successfully" });
};
