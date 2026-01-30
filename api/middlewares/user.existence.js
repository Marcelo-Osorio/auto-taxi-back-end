const UserService = require('../services/user.service');
const boom = require('@hapi/boom');
const service = new UserService();

function fieldExistenceVerification(field, mode, extraFilters = null) {
  return async (req, res, next) => {
    try {
      //just in case body is in an empty state
      const value = req.body[field];
      //was expanded to accept others filters
      /*filters = {
       type_account : 'application'
       } */
      const exists = await service.verifyFieldExistence(
        field,
        value,
        extraFilters
      );
      if (!exists && mode === 'allowed') {
        throw boom.conflict(`${field} does not exists`);
      } else if (exists && mode === 'notAllowed') {
        throw boom.conflict(`The ${field} already exists`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = fieldExistenceVerification;
