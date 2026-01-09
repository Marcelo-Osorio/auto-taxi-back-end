const express = require('express');
const usersRouter = require('./user.router');
const userIntegrateAppsRouter = require('./userIntegrateApps.router');

function routerBuilder(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth/users/app', usersRouter);
  router.use('/auth/users/integrate', userIntegrateAppsRouter);
}

module.exports = routerBuilder;
