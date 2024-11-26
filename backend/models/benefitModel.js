const { DataTypes } = require('sequelize');
const sequelize = require('../../config');
const Class = require('./classModel');
const User = require('./userModel');

const Benefit = sequelize.define('benefits', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
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
}, {
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedAt',
});



module.exports = Benefit;
