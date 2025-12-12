const express = require('express');
const usersRouter = require('./user.router');

function routerBuilder(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth/users', usersRouter);
}

module.exports = routerBuilder;
