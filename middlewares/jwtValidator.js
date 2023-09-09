const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtValidator = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'unauthorized token has not been provided',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SK);

    //* getAuthUser
    const authUser = await User.findById(uid);

    if (!authUser) {
      return res.status(401).json({
        msg: 'User dont exist in DB',
      });
    }

    if (!authUser.state) {
      return res.status(401).json({
        msg: 'Invalid token - User state false',
      });
    }

    req.authUser = authUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Invalid token',
    });
  }
};

module.exports = {
  jwtValidator,
};
