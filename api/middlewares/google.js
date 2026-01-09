const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { config } = require('./../../config/config');
const UserService = require('../services/user.service');
const service = new UserService();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  'auth-google',
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/v1/auth/users/integrate/google',
    },
    function (accessToken, refreshToken, profile, cb) {
      service.findOrCreate(profile, function (err, user) {
        return cb(err, user);
      });
    },
  ),
);
