const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { config } = require('./../../config/config');
const UserService = require('../services/user.service');
const service = new UserService();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  'auth-facebook',
  new FacebookStrategy(
    {
      clientID: config.FACEBOOK_APP_ID,
      clientSecret: config.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/api/v1/auth/users/integrate/facebook/callback',
      scope : 'email'
    },
    function (accessToken, refreshToken, profile, cb) {
      service.findOrCreate(profile, function (err, user) {
        return cb(err, user);
      });
    },
  ),
);
