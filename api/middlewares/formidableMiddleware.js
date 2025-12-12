const {formidable} = require('formidable');
const boom = require('@hapi/boom');

function parserFormData(req, res, next) {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(boom.badRequest(err.message));
      return;
    } else {
      const parsedData = {};
      for (const key in fields) {
        parsedData[key] = fields[key][0];
      }
      console.log('Parsed fields:', parsedData);
      req.body = parsedData;
      req.files = files;
      next();
    }
  });
}

module.exports = parserFormData;
