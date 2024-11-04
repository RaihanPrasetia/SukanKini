// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  // New column for user role
  role: {
    type: DataTypes.ENUM('admin', 'user', 'mitra'),
    allowNull: false,
    defaultValue: 'user',
  },
  // New column for blocking/unblocking a user
  isBlocked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  // Enable soft deletes
  paranoid: true,
  // Optional: Define the field name for the deleted timestamp
  // This will default to 'deletedAt' if you don't specify
  deletedAt: 'deletedAt',
});

module.exports = User;
