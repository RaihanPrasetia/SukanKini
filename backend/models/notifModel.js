const { DataTypes } = require('sequelize');
const sequelize = require('../../config');
const User = require('./userModel');  // Import the User model

const Notification = sequelize.define('notifications', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING, // e.g., 'info', 'warning', 'success', etc.
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Pastikan tabel Users sudah ada
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Pastikan tabel Users sudah ada
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

}, {
    timestamps: true,
    paranoid: true, // Enables soft deletes
    deletedAt: 'deletedAt', // Automatically adds createdAt and updatedAt fields
});



module.exports = Notification;
