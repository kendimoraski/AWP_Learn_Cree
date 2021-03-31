const Sequelize = require('sequelize');
const db = require('./database');

const Salarian = db.define('salarian', {
  name: {
    type: Sequelize.TEXT,
  },
});

module.exports = Salarian;
