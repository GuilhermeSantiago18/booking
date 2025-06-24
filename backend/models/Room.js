const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Room = sequelize.define('Room', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  capacity: { type: DataTypes.INTEGER, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: true },
  startTime: {
  type: DataTypes.TIME,
  allowNull: false,
},

endTime: {
  type: DataTypes.TIME,
  allowNull: false,
},

slotDurationMinutes: {
  type: DataTypes.INTEGER,
  allowNull: false,
  defaultValue: 30,
},

}, {
  tableName: 'rooms',
  timestamps: true,
  underscored: true
});

module.exports = Room;
