const { DataTypes } = require('sequelize');
const sequelize = require('../../config');
const Class = require('./classModel');
const User = require('./userModel');

const Memberships = sequelize.define('memberships', {
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
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Class,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    },

}, {
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedAt',
});

module.exports = Memberships;
