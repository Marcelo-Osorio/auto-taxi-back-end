const app = require('express');
const validationHandler = require('../middlewares/validation.handler');
const {
  getUserSchema,
  createUserSchema,
  getUserEmailSchema,
} = require('../schemas/user.schema');
const UserService = require('../services/user.service');
const passport = require('passport');
const boom = require('@hapi/boom');
const verifyToken = require('../middlewares/authMiddleware');
const router = app.Router();
const session = require('express-session');
const { config } = require('./../../config/config');
const uploadIMGMiddleware = require('./../middlewares/uploadIMGMiddleware');
const upload = uploadIMGMiddleware('users-app');
require('../middlewares/google');
require('../middlewares/facebook');

const service = new UserService();
const sessionOptions = {
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
};

router.get(
  '/app/:id',
  validationHandler(getUserSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = await service.findOne(id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/app/register',
  verifyToken,
  upload.single('profileImage'),
  validationHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await service.createInAPP(body, req.file);
      res.status(201).json({
        ...user,
        message: 'user created',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/app/validate-email',
  validationHandler(getUserEmailSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const exists = await service.verifyEmailExistence(email);
      if (!exists) {
        const { ok, message } = await service.sendLinkToEmail(email);
        res.json({
          ok,
          message,
        });
      } else {
        throw boom.conflict('Email is already created');
      }
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/google',
  session(sessionOptions),
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
  session(sessionOptions),
  passport.authenticate('auth-facebook', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  },
);



module.exports = router;
