const app = require('express');
const validationHandler = require('../middlewares/validation.handler');
const {
  createUserSchema,
  getUserEmailSchema,
  loginUserSchema,
} = require('../schemas/user.schema');
const UserService = require('../services/user.service');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = app.Router();
const { config } = require('./../../config/config');
const uploadIMGMiddleware = require('./../middlewares/uploadIMGMiddleware');
const upload = uploadIMGMiddleware('users-app');
const userExistenceVerification = require('../middlewares/user.existence');
const jwt = require('jsonwebtoken');
const {keepSession} = require('../middlewares/authMiddleware');

router.use(keepSession);

const service = new UserService();

router.post(
  '/register',
  verifyToken('register_token'),
  upload.single('profileImage'),
  validationHandler(createUserSchema, 'body'),
  userExistenceVerification('email', 'notAllowed'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await service.registerInAPP(body, req.file);
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
  '/login',
  validationHandler(loginUserSchema, 'body'),
  userExistenceVerification('email', 'allowed'),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await service.loginInAPP(email, password);
      const access_token = await service.createUserAccessToken(user);
      const refreshToken = jwt.sign(
        { id: user.user_id, username: user.username },
        config.SECRET_JWT_REFRESH_KEY,
        {
          expiresIn: '7d',
        },
      );
      res
        .cookie('access_token', access_token, {
          httpOnly: true,
        })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
        })
        .send({ user, access_token, refreshToken });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/token',
  verifyToken('refreshToken'),
  async (req, res, next) => {
    try {
      const { user } = req;
      const access_token = await service.createUserAccessToken({
        user_id: user.id,
        username: user.username,
      });
      const refreshToken = jwt.sign(
        { id: user.id, username: user.username },
        config.SECRET_JWT_REFRESH_KEY,
        {
          expiresIn: '7d',
        },
      );
      res
        .cookie('access_token', access_token, {
          httpOnly: true,
        })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
        })
        .send({ access_token, refreshToken });
    } catch (error) {
      next(error);
    }
  },
);

router.get('/test', verifyToken('access_token'), async (req, res, next) => {
  try {
    console.log('This is', req.session);
    res.send('Welcome to AutoTaxi API');
  } catch (error) {
    next(error);
  }
});

router.post(
  '/validate-email',
  validationHandler(getUserEmailSchema, 'body'),
  userExistenceVerification('email', 'notAllowed'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const { ok, message } = await service.sendLinkToEmail(email);
      res.json({
        ok,
        message,
      });
    } catch (error) {
      next(error);
    }
  },
);


module.exports = router;
