'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Bank extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Bank belongs to a User (createdBy)
            Bank.belongsTo(models.User, {
                foreignKey: 'createdBy',
                as: 'user', // Optional alias for the association
            });
        }
    }

    Bank.init({
        an: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        no_rek: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensure account number is unique
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Reference to the Users table
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    }, {
        sequelize,
        modelName: 'Bank',
        tableName: 'Banks', // Optional: Ensure table name matches
        timestamps: true, // Automatically add createdAt and updatedAt
        paranoid: true, // Enable soft deletes (deletedAt)
    });

    return Bank;
};
