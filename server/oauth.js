const passport = require('passport');
const { User } = require('./db');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const router = require('express').Router();

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
};

const strategy = new GoogleStrategy(
  googleConfig,
  function (token, refreshToken, profile, done) {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;

    User.findOne({ where: { googleId: googleId } })
      .then(function (user) {
        if (!user) {
          return User.create({ name, email, googleId }).then(function (user) {
            done(null, user);
          });
        } else {
          done(null, user);
        }
      })
      .catch(done);
  }
);

passport.use(strategy);

router.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});
