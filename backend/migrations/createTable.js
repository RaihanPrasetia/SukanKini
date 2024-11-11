const User = require('../models/userModel');
const Bank = require('../models/bankModel');
const Payment = require('../models/paymentModel');  // Import the Payment model

const migrate = async () => {
  try {
    // Drop tables in the correct order
    await Payment.drop();  // Drop Payment table first (if it exists)
    await User.drop();  // Drop User table
    await Bank.drop();  // Drop Bank table

    // Recreate the tables with the updated foreign key constraints
    await Bank.sync({ force: true });
    console.log('Bank table created successfully.');

    await User.sync({ force: true });
    console.log('User table created successfully.');

    await Payment.sync({ force: true });  // Create the Payment table
    console.log('Payment table created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

migrate();
