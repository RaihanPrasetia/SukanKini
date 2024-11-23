'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Class extends Model {
        static associate(models) {
            // Class belongs to a Category
            Class.belongsTo(models.Category, {
                foreignKey: 'category_id',
                as: 'category',
            });

            // Class belongs to a Trainer
            Class.belongsTo(models.Trainer, {
                foreignKey: 'trainer_id',
                as: 'trainer',
            });

            // Class has many ClassSchedules
            Class.hasMany(models.ClassSchedule, {
                foreignKey: 'class_id',
                as: 'schedules',
            });
        }
    }

    Class.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Categories',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        trainer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Trainers',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        alamat: {
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
        modelName: 'Class',
        tableName: 'Classes',
        timestamps: true,
    });

    return Class;
};
