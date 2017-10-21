const Sequelize = require('sequelize');

const db = new Sequelize(process.env.POSTGRES_DATABASE_URL || 'postgres://localhost:5432/dev-dayvulge', {
  logging: false
  // other options
});

module.exports = db;

// register models
require('./models/postgres')

