const bcrypt = require('bcryptjs');
const User = require('../models/modelUser');

const seedUsers = async () => {
  try {
    const hashedPassword = await bcrypt.hash('12345678', 10);

    // Create admin user
    await User.create({
      name: 'admin',
      password: hashedPassword,
      email: 'admin@example.com',
      role: 'admin',
    });

    // Create regular user
    await User.create({
      name: 'user',
      password: hashedPassword,
      email: 'user@example.com',
      role: 'user',
    });

    console.log('Users seeded successfully.');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

seedUsers();
