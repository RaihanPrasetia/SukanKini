'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

// Check if we're using an environment variable for the database connection string
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all model files in the current directory (excluding this file)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && // Exclude hidden files (e.g. .js)
      file !== basename && // Exclude this file itself (index.js)
      file.slice(-3) === '.js' && // Ensure it's a .js file
      file.indexOf('.test.js') === -1 // Exclude any test files
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Call the associate method on models that have it to set up associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Adding sequelize and Sequelize to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
