const app = require('express');
const router = app.Router();
const session = require('express-session');
const passport = require('passport');
const { config } = require('./../../config/config');

require('../middlewares/google');
require('../middlewares/facebook');

const sessionOptions = {
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
};

router.use(session(sessionOptions));

router.get(
  '/google',
  passport.authenticate('auth-google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  }),
  async (req, res, next) => {
    res.send(req.user);
  },
);

router.get('/facebook', passport.authenticate('auth-facebook'));

router.get(
  '/facebook/callback',
  passport.authenticate('auth-facebook', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  },
);


module.exports = router;
