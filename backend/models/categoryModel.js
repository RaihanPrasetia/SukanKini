const { DataTypes } = require('sequelize');
const sequelize = require('../../config');
const User = require('./userModel');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }

}, {
    timestamps: true,
    paranoid: true, // Enables soft deletes
    deletedAt: 'deletedAt', // Automatically adds createdAt and updatedAt fields
});


module.exports = Category;
