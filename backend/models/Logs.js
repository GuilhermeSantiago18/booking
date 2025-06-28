const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Log = sequelize.define('Log', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  module: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'logs',
  timestamps: true,
  underscored: true,
});

Log.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

module.exports = Log;
