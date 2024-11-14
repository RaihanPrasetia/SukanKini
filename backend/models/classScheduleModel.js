const { DataTypes } = require('sequelize');
const sequelize = require('../../config');
const Class = require('./classModel');
const User = require('./userModel');

const ClassSchedule = sequelize.define('ClassSchedule', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
    hari: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jam: {
        type: DataTypes.TIME,
        allowNull: false,
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
    paranoid: true,
    deletedAt: 'deletedAt',
});



module.exports = ClassSchedule;
