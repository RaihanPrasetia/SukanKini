const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Bank = require('../models/bankModel'); // Import the Bank model

const seedData = async () => {
  try {
    // Seed Bank Data
    await Bank.create({
      branch: 'BRI',
      name: 'Admin',
      no_rek: '5267891022',
    });

    await Bank.create({
      branch: 'MANDIRI',
      name: 'User',
      no_rek: '62818626372',
    });

    console.log('Banks seeded successfully.');

    // Seed User Data
    const hashedPassword = await bcrypt.hash('12345678', 10);

    // Create admin user
    await User.create({
      name: 'admin',
      password: hashedPassword,
      email: 'admin@example.com',
      role: 'admin',
      bank_id: 1, // Associate this user with Bank A (assuming bank_id is the foreign key)
    });

    // Create regular user
    await User.create({
      name: 'user',
      password: hashedPassword,
      email: 'user@example.com',
      role: 'user',
      bank_id: 2, // Associate this user with Bank B
    });

    console.log('Users seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
