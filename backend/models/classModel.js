const { DataTypes } = require('sequelize');
const sequelize = require('../../config');

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
    category_id: {  // Changed to camelCase
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Category',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    trainer_id: {  // Changed to camelCase
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Trainer',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    image_path: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
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
