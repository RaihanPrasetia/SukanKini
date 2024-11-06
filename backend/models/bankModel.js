const { DataTypes } = require('sequelize');
const sequelize = require('../../config');

const Bank = sequelize.define('Bank', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    an: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    no_rek: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    bank: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
    paranoid: true, // Enables soft deletes
    deletedAt: 'deletedAt', // Automatically adds createdAt and updatedAt fields
});

module.exports = Bank;
