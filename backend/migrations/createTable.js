const User = require('../models/modelUser');

const migrate = async () => {
  await User.sync({ force: true });
  console.log('User table created successfully.');
};

migrate().catch(console.error);