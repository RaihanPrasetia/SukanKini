/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      video_link: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'URL for YouTube video',
      },
      video_path: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'File path for uploaded video',
      },
      thumbnail_link: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'URL of thumbnail (e.g., from YouTube)',
      },
      thumbnail_path: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Path of uploaded thumbnail image',
      },
      view_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Total number of views',
      },
      like_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Total number of likes',
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('videos');
  },
};
