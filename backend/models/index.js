// models/index.js
const User = require('./userModel');
const Bank = require('./bankModel');

// Define associations
User.belongsTo(Bank, { foreignKey: 'bank_id', as: 'bank' });
Bank.hasMany(User, { foreignKey: 'bank_id' });

module.exports = { User, Bank };
