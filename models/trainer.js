'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Trainer extends Model {
        static associate(models) {
            // Trainer has many Classes
            Trainer.hasMany(models.Class, {
                foreignKey: 'trainer_id',
                as: 'classes',
            });
        }
    }

    Trainer.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        image_path: {
            type: DataTypes.STRING,
            allowNull: true,
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
        modelName: 'Trainer',
        tableName: 'Trainers',
        timestamps: true,
    });

    return Trainer;
};
