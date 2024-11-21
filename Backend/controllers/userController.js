const { updateUser, updateUserPushToken } = require("../models/User");
const { Expo } = require("expo-server-sdk");

// const redisClient = require("../utils/redis");

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
exports.registerPushToken = async (req, res) => {
  const { push_token } = req.body;
  const userId = req.user.id;

  if (!push_token || !Expo.isExpoPushToken(push_token)) {
    return res.status(400).json({ message: "Invalid Expo push token" });
  }

  try {
    await updateUserPushToken(userId, push_token);
    res.status(200).json({ message: "Push token stored successfully." });
  } catch (error) {
    console.error("Error storing push token:", error);
    res.status(500).json({ message: "Failed to store push token." });
  }
};


