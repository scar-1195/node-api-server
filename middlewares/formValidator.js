const { validationResult } = require('express-validator');

const formValidator = (req, res, next) => {
  //* Express-Validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);
  next();
};

module.exports = {
  formValidator,
};
