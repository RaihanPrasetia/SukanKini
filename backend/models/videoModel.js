const { DataTypes } = require('sequelize');
const sequelize = require('../../config');
const User = require('./userModel');


const Video = sequelize.define('Video', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    video_link: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'URL for YouTube video',
    },
    video_path: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'File path for uploaded video',
    },
    thumbnail_link: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'URL of thumbnail (e.g., from YouTube)',
    },
    thumbnail_path: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Path of uploaded thumbnail image',
    },
    view_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Total number of views',
    },
    like_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Total number of likes',
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
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    paranoid: true, // Enables soft deletes
    deletedAt: 'deletedAt',
});

module.exports = Video;
