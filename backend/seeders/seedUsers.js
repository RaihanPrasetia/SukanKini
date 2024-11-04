// seeders/seedUsers.js
const bcrypt = require('bcryptjs');
const User = require('../models/modelUser');

const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash('12345678', 10); // Contoh password yang di-hash
  await User.create({ name: 'admin', password: hashedPassword, email: 'admin@example.com', role: 'admin' });
  console.log('Users seeded successfully.');
};

seedUsers().catch(console.error);
