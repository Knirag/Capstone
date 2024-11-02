// models/Location.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Location extends Model {}

Location.init(
  {
    district: DataTypes.STRING,
    sector: DataTypes.STRING,
    cell: DataTypes.STRING,
    village: DataTypes.STRING,
    address: DataTypes.STRING,
  },
  { sequelize, modelName: "location" }
);

module.exports = Location;
