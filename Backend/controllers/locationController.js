const {
  getLocations,
  addLocation,
  getLocationById,
  updateLocation,
  deleteLocation,
} = require("../models/Location"); 

// Retrieve all locations
exports.getLocations = async (req, res) => {
  try {
    const locations = await getLocations(); 
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving locations", error });
  }
};

// Retrieve a specific location by ID
exports.getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await getLocationById(id);
    if (!location)
      return res.status(404).json({ message: "Location not found" });
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving location", error });
  }
};

// Add a new location
exports.addLocation = async (req, res) => {
  const { name, level, parent_id } = req.body;
  try {
    const newLocation = await addLocation({ name, level, parent_id });
    res
      .status(201)
      .json({ message: "Location created", location: newLocation });
  } catch (error) {
    res.status(500).json({ message: "Error creating location", error });
  }
};

// Update an existing location
exports.updateLocation = async (req, res) => {
  const { id } = req.params;
  const { name, level, parent_id } = req.body;
  try {
    const updatedLocation = await updateLocation(id, {
      name,
      level,
      parent_id,
    });
    if (!updatedLocation)
      return res.status(404).json({ message: "Location not found" });
    res
      .status(200)
      .json({ message: "Location updated", location: updatedLocation });
  } catch (error) {
    res.status(500).json({ message: "Error updating location", error });
  }
};

// Delete a location
exports.deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteResult = await deleteLocation(id);
    if (!deleteResult)
      return res.status(404).json({ message: "Location not found" });
    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting location", error });
  }
};
