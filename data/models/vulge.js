const Sequelize = require('sequelize')
const db = require('../db')

const Vulge = db.define('vulge', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  upVotes: {
    type: Sequelize.INTEGER
  },
  downVotes: {
    type: Sequelize.INTEGER
  },
  collectionId:{
    type: Sequelize.INTEGER
  }
});

module.exports = Vulge

/*
 * instanceMethods
 */

/*
 * classMethods
 */

/**
 * hooks
 */
