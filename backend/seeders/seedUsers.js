const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Bank = require('../models/bankModel');
const Payment = require('../models/paymentModel');  // Import the Payment model

const seedData = async () => {
  try {
    // Seed Bank Data
    await Bank.create({
      bank: 'BRI',
      an: 'Admin',
      no_rek: '5267891022',
    });

    await Bank.create({
      bank: 'MANDIRI',
      an: 'Mitra',
      no_rek: '62818626372',
    });

    console.log('Banks seeded successfully.');

    // Seed User Data
    const hashedPassword = await bcrypt.hash('12345678', 10);

    // Create admin user
    const adminUser = await User.create({
      name: 'admin',
      password: hashedPassword,
      email: 'admin@example.com',
      role: 'admin',
      bank_id: 1, // Associate this user with Bank A (assuming bank_id is the foreign key)
    });

    // Create regular user
    const regularUser = await User.create({
      name: 'user',
      password: hashedPassword,
      email: 'user@example.com',
      role: 'user',
    });

    // Create Mitra user
    const mitraUser = await User.create({
      name: 'mitra',
      password: hashedPassword,
      email: 'mitra@example.com',
      role: 'mitra',
      bank_id: 2, // Associate this user with Bank B
    });

    console.log('Users seeded successfully.');

    // Seed Payment Data
    await Payment.create({
      user_id: adminUser.id, // Payment for the admin user
      bank_id: 1, // Associated with Bank A
      bukti: 'path/to/payment-proof-admin.jpg', // Payment proof file path
      status_pembayaran: 'selesai', // Payment status (completed)
    });

    await Payment.create({
      user_id: regularUser.id, // Payment for the regular user
      bank_id: 1, // Associated with Bank A
      bukti: 'path/to/payment-proof-user.jpg', // Payment proof file path
      status_pembayaran: 'proses', // Payment status (in progress)
    });

    await Payment.create({
      user_id: mitraUser.id, // Payment for the mitra user
      bank_id: 2, // Associated with Bank B
      bukti: 'path/to/payment-proof-mitra.jpg', // Payment proof file path
      status_pembayaran: 'gagal', // Payment status (failed)
    });

    console.log('Payments seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
