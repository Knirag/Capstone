// controllers/userController.js
const { updateUser } = require("../models/User");

exports.modifyUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, phone_number, age, location_id } = req.body;

  try {
    const updatedUser = await updateUser(id, {
      username,
      email,
      phone_number,
      age,
      location_id,
    });
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};
