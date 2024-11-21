const { DataTypes } = require('sequelize');
const sequelize = require('../../config');
const User = require('./userModel');

const Trainer = sequelize.define('Trainer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    image_path: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  // Menambahkan aturan null jika tidak ada gambar
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: true,
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
    paranoid: true,  // Enables soft delete functionality
    deletedAt: 'deletedAt',  // Automatically adds createdAt and updatedAt fields
});

module.exports = Trainer;
