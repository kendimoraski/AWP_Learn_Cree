// this is our entry point
const app = require('./server/index');
const port = process.env.PORT || 3000; // useful for deploying to Heroku
const { db } = require('./server/db');

if (process.env.NODE_ENV === 'development') {
  require('./localSecrets');
}

require('./main');

db.sync({ force: true }).then(() => {
  console.log('hello', 'db synced');
  app.listen(port, () => {
    console.log('starting server!');
    console.log('look here!');
    console.log('Hello', `Your server is listening on port ${port}!`);
  });
});

module.exports = app;
