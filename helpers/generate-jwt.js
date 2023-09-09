const jwt = require('jsonwebtoken');

const generateJwt = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SK,
      {
        expiresIn: '4h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('token could not be generated');
        } else {
          resolve(token);
        }
      },
    );
  });
};

module.exports = {
  generateJwt,
};
