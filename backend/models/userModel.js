const { DataTypes } = require('sequelize');
const sequelize = require('../../config');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
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
  kota: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  alamat: {
    type: DataTypes.STRING,
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
  role: {
    type: DataTypes.ENUM('admin', 'user', 'mitra'),
    allowNull: false,
    defaultValue: 'user',
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,  // Default value to false, indicating unverified
  },

  image_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM('Laki-Laki', 'Perempuan'),
    allowNull: true,
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  paranoid: true, // Enables soft deletes
  deletedAt: 'deletedAt',
});

module.exports = User;
