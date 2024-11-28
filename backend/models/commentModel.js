const { DataTypes } = require('sequelize');
const sequelize = require('../../config');
const User = require('./userModel');
const Video = require('./videoModel');

const Comment = sequelize.define('Comment', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    video_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Video,
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
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

}, {
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedAt',
});

module.exports = Comment;
