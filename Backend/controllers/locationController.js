const locations = require("../config/locations");

// Retrieve all locations
exports.getLocations = async (req, res) => {
  try {
    res.status(200).json(locations); // Return all predefined locations
  } catch (error) {
    console.error("Error retrieving locations:", error);
    res.status(500).json({ message: "Failed to retrieve locations." });
  }
};

// Retrieve a location by ID
exports.getLocationById = async (req, res) => {
  const { id } = req.params;

  try {
    const location = locations.find((loc) => loc.id === id); // Locate by ID

    if (!location) {
      return res.status(404).json({ message: "Location not found." });
    }

    res.status(200).json(location); // Return the found location
  } catch (error) {
    console.error("Error retrieving location:", error);
    res.status(500).json({ message: "Failed to retrieve location." });
  }
};
