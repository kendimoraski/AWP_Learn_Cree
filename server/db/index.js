const db = require('./database');
const Asari = require('./asari');
const Turian = require('./turian');
const Salarian = require('./salarian');

Asari.hasMany(Turian);
Turian.belongsTo(Asari);
Asari.hasMany(Salarian);
Salarian.belongsTo(Asari);

module.exports = { db, Asari, Turian, Salarian };
