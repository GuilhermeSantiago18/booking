const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  cep: {
    type: DataTypes.STRING(9),
    allowNull: false,
  },

  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  complement: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  state: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM('admin', 'client'),
    allowNull: false,
    defaultValue: 'client',
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
});

module.exports = User;
