const crypto = require('crypto');
const _ = require('lodash');
const Sequelize = require('sequelize');
const db = require('./database');

const Asari = db.define(
  'asari',
  {
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    salt: {
      type: Sequelize.STRING,
    },
    google_id: {
      type: Sequelize.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword,
    },
  }
);

Asari.prototype.correctPassword = function (candidatePassword) {
  return (
    this.Model.encryptPassword(candidatePassword, this.salt) === this.password
  );
};

Asari.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// class methods
Asari.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

Asari.encryptPassword = function (plainText, salt) {
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

function setSaltAndPassword(user) {
  // need to salt and hash again when user enters their password for the first time and do it again every time they change it
  if (user.changed('password')) {
    user.salt = Asari.generateSalt();
    user.password = Asari.encryptPassword(user.password, user.salt);
  }
}

module.exports = Asari;
