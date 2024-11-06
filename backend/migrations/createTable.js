const User = require('../models/userModel');
const Bank = require('../models/bankModel');

const migrate = async () => {
  try {
    // Drop tables in the correct order
    await User.drop();
    await Bank.drop();

    // Recreate the tables with the updated foreign key constraints
    await Bank.sync({ force: true });
    console.log('Bank table created successfully.');

    await User.sync({ force: true });
    console.log('User table created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

migrate();
