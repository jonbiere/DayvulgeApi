const Sequelize = require('sequelize');
const db = require('../db');

const Profile = db.define('profile', {
  picture: {
    type: Sequelize.STRING
  },
  aboutMe: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});


module.exports = Profile;
