'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'user@example.com',
        phone_number: '123456789',
        password: '12345678', // Pastikan Anda mengenkripsi password sebelum memasukkannya ke database
        age: 25,
        kota: 'Jakarta',
        alamat: 'Jl. Merdeka No.1',
        height: 175,
        weight: 70,
        gender: 'Laki-Laki',
        role: 'user', // Contoh role, sesuaikan dengan data Anda
        isBlocked: false,
        isVerified: true,
        image_path: 'default-avatar.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'John Doe',
        email: 'mitra@example.com',
        phone_number: '123456789',
        password: '12345678', // Pastikan Anda mengenkripsi password sebelum memasukkannya ke database
        age: 25,
        kota: 'Jakarta',
        alamat: 'Jl. Merdeka No.1',
        height: 175,
        weight: 70,
        role: 'mitra', // Contoh role, sesuaikan dengan data Anda
        isBlocked: false,
        isVerified: true,
        image_path: 'default-avatar.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Doe',
        email: 'admin@example.com',
        phone_number: '987654321',
        password: '12345678',
        age: 28,
        kota: 'Bandung',
        alamat: 'Jl. Merdeka No.2',
        height: 160,
        weight: 55,
        role: 'admin',
        isBlocked: false,
        isVerified: true,
        image_path: 'default-avatar.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
