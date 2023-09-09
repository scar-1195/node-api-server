const formValidator = require('./formValidator');
const jwtValidator = require('./jwtValidator');
const rolValidator = require('./rolValidator');

module.exports = {
  ...formValidator,
  ...jwtValidator,
  ...rolValidator,
};
