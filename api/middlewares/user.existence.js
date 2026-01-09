const UserService = require('../services/user.service');
const boom = require('@hapi/boom');
const service = new UserService();

function userExistenceVerification(field, mode) {
  return async (req, res, next) => {
    try {
      //just in case body is in an empty state
      const value = req.body[field];
      const exists = await service.verifyFieldExistence(field, value);
      if (!exists && mode === 'allowed') {
        throw new Error(`${field} does not exists`);
      } else if (exists && mode === 'notAllowed') {
        throw new Error(`The ${field} already exists`);
      }
      next();
    } catch (error) {
      next(boom.conflict(error.message));
    }
  }
}


module.exports = userExistenceVerification;
