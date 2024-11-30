const {
  updateUser,
  updateUserPushToken,
  confirmAttendance,
} = require("../models/User");
const validLocations = require("../config/locations");

exports.updateProfile = async (req, res) => {
  const { username, email, phone_number, age, location_id, home_address } =
    req.body;
  const { id } = req.params;
  const requesterId = req.user.id;

  try {
    // Ensure user is updating their own profile
    if (id !== requesterId) {
      return res
        .status(403)
        .json({ message: "You can only update your own profile." });
    }

    // Validate location ID if provided
    if (location_id && !validLocations.includes(location_id)) {
      return res.status(400).json({ message: "Invalid location specified." });
    }

    // Prepare fields for update
    const fieldsToUpdate = {
      username,
      email,
      phone_number,
      age,
      location_id,
      home_address,
    };

    // Check at least one field is provided for update
    if (Object.values(fieldsToUpdate).every((value) => value === undefined)) {
      return res
        .status(400)
        .json({ message: "At least one field must be provided for update." });
    }

    const updatedUser = await updateUser(id, fieldsToUpdate);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user.", error });
  }
};

exports.registerPushToken = async (req, res) => {
  const { push_token } = req.body;
  const userId = req.user.id;

  try {
    // Validate push token
    if (!push_token) {
      return res.status(400).json({ message: "Push token is required." });
    }

    await updateUserPushToken(userId, push_token);
    res.status(200).json({ message: "Push token stored successfully." });
  } catch (error) {
    console.error("Error storing push token:", error);
    res.status(500).json({ message: "Failed to store push token." });
  }
};

exports.changeUserLocation = async (req, res) => {
  const { id } = req.params;
  const { location_id } = req.body;
  const requesterId = req.user.id;

  try {
    // Ensure user is updating their own location
    if (id !== requesterId) {
      return res
        .status(403)
        .json({ message: "You can only update your own location." });
    }

    // Validate location ID
    if (!validLocations.includes(location_id)) {
      return res.status(400).json({ message: "Invalid location specified." });
    }

    const updatedUser = await updateUser(id, { location_id });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Location updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Error updating user location:", error);
    res.status(500).json({ message: "Failed to update user location.", error });
  }
};

// Confirm attendance for an event
exports.confirmAttendance = async (req, res) => {
  const userId = req.user.id; // User ID from authenticated user
  const eventId = req.params.eventId; // Event ID passed as a URL parameter

  try {
    // Confirm attendance for the event
    const result = await confirmAttendanceForEvent(userId, eventId);

    if (!result) {
      return res.status(404).json({ message: "Event not found or user is not registered." });
    }

    res.status(200).json({ message: "Attendance confirmed successfully." });
  } catch (error) {
    console.error("Error confirming attendance:", error);
    res.status(500).json({ message: "Failed to confirm attendance." });
  }
};

