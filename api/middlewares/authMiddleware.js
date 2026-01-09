const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const { config } = require('../../config/config');

function verifyToken(tokenType) {
  return (req, res, next) => {
    console.log(`Verifying ${tokenType} token...`);
    const mapSecretKeys = {
      access_token: config.SECRET_JWT_ACCESS_KEY,
      refreshToken: config.SECRET_JWT_REFRESH_KEY,
      register_token: config.SECRET_JWT_REGISTER_KEY,
    };
    const token = req.cookies[tokenType];
    if (!token) throw boom.unauthorized(`Access denied. No ${tokenType} token provided.`);
    try {
      const data = jwt.verify(token, mapSecretKeys[tokenType]);
      req.user = data;
      next();
    } catch (error) {
      const messagesError = {
        access_token: 'Invalid access token.',
        refreshToken: 'Back login required - No refresh token',
        register_token: 'Invalid or expired registration token.',
      };
      next(boom.unauthorized(messagesError[tokenType]));
    }
  };
}

function keepSession(req, res, next) {
  console.log('keepSession');
  const token = req.cookies['access_token'];
  req.session = { user: null };
  try {
    const data = jwt.verify(token, config.SECRET_JWT_ACCESS_KEY);
    req.session.user = data;
    console.log('Session user set:', req.session.user);
  } catch {}
  next();
}

module.exports = { verifyToken, keepSession };
