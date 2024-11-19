'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    kota: DataTypes.STRING,
    alamat: DataTypes.STRING,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    role: DataTypes.ENUM,
    isBlocked: DataTypes.BOOLEAN,
    isVerified: DataTypes.BOOLEAN,
    image_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};