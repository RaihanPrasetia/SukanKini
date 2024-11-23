'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trainers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,  // Menambahkan aturan tidak boleh null
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,  // Menambahkan aturan tidak boleh null
      },
      image_path: {
        type: Sequelize.STRING,
        allowNull: true,  // Menambahkan aturan null jika tidak ada gambar
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,  // Menambahkan aturan null jika tidak ada gambar
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Menyesuaikan dengan nama tabel User di database
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,  // Menambahkan default value untuk createdAt
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,  // Menambahkan default value untuk updatedAt
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,  // Menambahkan kolom deletedAt untuk soft delete
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trainers');
  }
};
