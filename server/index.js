// server entry file
const express = require('express');
const app = express();
const path = require('path');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db/database.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
const passport = require('passport');

// logging middlware
app.use(volleyball);

// bodyparsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbStore.sync();
// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../public')));

// server.js
app.use('/api', require('../apiRoutes')); // matches all requests to /api

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res
    .status(err.status || 500)
    .send(
      err.message ||
        'http://www.yiyinglu.com/wp-content/uploads/2014/05/Social-Media-Propaganda-Posters.jpg'
    );
});

module.exports = app;
