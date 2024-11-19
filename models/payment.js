'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        static associate(models) {
            // Payment belongs to a User
            Payment.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
            });

            // Payment belongs to a Bank
            Payment.belongsTo(models.Bank, {
                foreignKey: 'bank_id',
                as: 'bank',
            });
        }
    }

    Payment.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        bank_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Banks',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        bukti: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status_pembayaran: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Diterima', 'Diproses', 'Ditolak']],
            },
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    }, {
        sequelize,
        modelName: 'Payment',
        tableName: 'Payments',
        timestamps: true,
    });

    return Payment;
};
