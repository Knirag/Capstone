const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Notification extends Model {}

Notification.init(
  {
    message: DataTypes.STRING,
    targetRegion: DataTypes.STRING,
    status: DataTypes.STRING, // e.g., 'Sent', 'Pending'
  },
  { sequelize, modelName: "notification" }
);

module.exports = Notification;
