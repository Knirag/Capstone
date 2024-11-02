const Location = require("../models/Location");
const User = require("../models/User");

exports.setLocation = async (req, res) => {
  const { district, sector, cell, village, address } = req.body;
  try {
    const location = await Location.create({ district, sector, cell, village,cell, address });
    await User.update(
      { locationId: location.id },
      { where: { id: req.user.id } }
    );
    res.status(201).json({ message: "Location set successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error setting location" });
  }
};
