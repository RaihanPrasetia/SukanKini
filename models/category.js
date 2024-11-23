'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            // Category has many Classes
            Category.hasMany(models.Class, {
                foreignKey: 'category_id',
                as: 'classes',
            });
        }
    }

    Category.init({
        name: {
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
        modelName: 'Category',
        tableName: 'Categories',
        timestamps: true,
    });

    return Category;
};
