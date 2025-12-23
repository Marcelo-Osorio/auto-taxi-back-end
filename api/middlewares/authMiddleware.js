const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const {config} = require('../../config/config');

function verifyToken(req, res, next) {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) throw boom.unauthorized('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token,config.SECRET_JWT_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(boom.unauthorized('Invalid token.'));
  }
}

module.exports = verifyToken;
