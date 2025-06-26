const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Room = require('./Room');

const Appointment = sequelize.define('Appointment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.TIME, allowNull: false },
  status: {
    type: DataTypes.ENUM('PENDENTE', 'CONFIRMADO', 'RECUSADO'),
    defaultValue: 'PENDENTE',
  },
}, {
  tableName: 'appointments',
  timestamps: true,
  underscored: true,
});

Appointment.belongsTo(User, { foreignKey: 'user_id' });
Appointment.belongsTo(Room, { foreignKey: 'room_id' });

module.exports = Appointment;
