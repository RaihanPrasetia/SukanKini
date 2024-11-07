const { DataTypes } = require('sequelize');
const sequelize = require('../../config');
const User = require('./userModel');  // Import the User model
const Bank = require('./bankModel');

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
        type: DataTypes.ENUM('proses', 'selesai', 'gagal'),
        allowNull: false,
        defaultValue: 'proses', // Default to 'pending'
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = Payment;
