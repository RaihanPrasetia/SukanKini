const { DataTypes } = require('sequelize');
const sequelize = require('../../config');
const User = require('./userModel');
const Video = require('./videoModel');

const Like = sequelize.define('Like', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    video_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Video, // Nama tabel video (harus sesuai dengan nama tabel di database)
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Nama tabel user (harus sesuai dengan nama tabel di database)
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    isLiked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedAt',
});

module.exports = Like;
