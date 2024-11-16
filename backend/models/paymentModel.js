const { DataTypes } = require('sequelize');
const sequelize = require('../../config');
const User = require('./userModel');  // Import the User model
const Bank = require('./bankModel');
const Class = require('./classModel');

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    bank_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Bank,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    bukti: {
        type: DataTypes.STRING,
        allowNull: false,  // The path to the payment proof (could be a URL or file path)
    },
    status_pembayaran: {
        type: DataTypes.ENUM('Diproses', 'Diterima', 'Ditolak'),
        allowNull: false,
        defaultValue: 'Diproses', // Default to 'pending'
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
    },
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: Class,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    timestamps: true,
    paranoid: true, // Enables soft deletes
    deletedAt: 'deletedAt', // Automatically adds createdAt and updatedAt fields
});



module.exports = Payment;
