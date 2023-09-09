const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJwt } = require('../helpers/generate-jwt');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //* Verify if email exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'User / Password is not correct - email',
      });
    }

    //* Verify if user is active
    if (!user.state) {
      return res.status(400).json({
        msg: 'User / Password is not correct - state false',
      });
    }

    //* Verify password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User / Password is not correct - password',
      });
    }

    //* JWT
    const token = await generateJwt(user.id);

    res.json({
      success: true,
      msg: 'Login ok',
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Server Error',
    });
  }
};

module.exports = {
  login,
};
