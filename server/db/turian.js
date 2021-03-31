const Sequelize = require('sequelize');
const db = require('./database');

const Turian = db.define('turian', {
  name: {
    type: Sequelize.TEXT,
  },
});

module.exports = Turian;
