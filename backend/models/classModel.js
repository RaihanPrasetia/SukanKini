const { DataTypes } = require('sequelize');
const sequelize = require('../../config');
const Category = require('./categoryModel');
const User = require('./userModel');
const Trainer = require('./trainerModel');

const Class = sequelize.define('Class', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    trainer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Trainer,
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
    }
}, {
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedAt',
});



module.exports = Class;
