const { updateUser } = require("../models/User");

exports.updateProfile = async (req, res) => {
  const { username, email, phone_number, age, location_id, home_address } =
    req.body;
  const { id } = req.params;

  try {
    const fieldsToUpdate = {};
    if (username) fieldsToUpdate.username = username;
    if (email) fieldsToUpdate.email = email;
    if (phone_number) fieldsToUpdate.phone_number = phone_number;
    if (age) fieldsToUpdate.age = age;
    if (location_id) fieldsToUpdate.location_id = location_id;
    if (home_address) fieldsToUpdate.home_address = home_address;

    const updatedUser = await updateUser(id, fieldsToUpdate);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};
