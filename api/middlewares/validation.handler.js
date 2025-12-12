const boom = require('@hapi/boom');

function validationHandler(schema, property) {
  return (req,res,next) => {
    console.log(req.body);
    console.log('elr',req)
    next(boom.badRequest('Error de validacion'));
    console.log('validation handler',req[property]);
    const data = req[property];
    const {error} = schema.validate(data,{ abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validationHandler;
