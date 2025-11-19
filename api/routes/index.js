const express = require('express');

function routerBuilder(app) {
  const router = express.Router();
  app.use('api/v1', router);

}


module.exports = routerBuilder;
