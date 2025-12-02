const app = require('express');
const validationHandler = require('../middlewares/validation.handler');
const {
  getUserSchema,
  createUserSchema,
  getUserEmailSchema,
} = require('../schemas/user.schema');
const UserService = require('../services/user.service');

const boom = require('@hapi/boom');
const router = app.Router();

const service = new UserService();

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
  '/app',
  validationHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await service.createInAPP(body);
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
        const {ok,message} = await service.sendLinkToEmail(email);
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



module.exports = router;
