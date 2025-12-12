const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const passport = require('passport');
const { config } = require('./../config/config')
const routerBuilder = require('./routes');
const { boomErrorHandler,errorHandler } = require('./middlewares/error.handler');

const app = express();
const {port} = config;
const whitelist = ['http://127.0.0.1:5500','https://taxi.co'];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const options = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('not permission'));
    }
  }
}
app.use(cors(options));
app.use(passport.initialize());

app.listen(port, () => {
  console.log('AutoTaxi port ' + port);
});

routerBuilder(app);

app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
