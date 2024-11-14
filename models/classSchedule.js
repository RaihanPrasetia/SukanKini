'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ClassSchedule extends Model {
        static associate(models) {
            // ClassSchedule belongs to a Class
            ClassSchedule.belongsTo(models.Class, {
                foreignKey: 'class_id',
                as: 'class',
            });
        }
    }

    ClassSchedule.init({
        class_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Classes',
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
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: 'ClassSchedule',
        tableName: 'ClassSchedules',
        timestamps: true,
    });

    return ClassSchedule;
};
