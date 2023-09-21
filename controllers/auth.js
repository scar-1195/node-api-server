const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJwt } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSingIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, email, img } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: ':p',
        img,
        google: true,
        rol: 'USER',
      };

      user = new User(data);
      await user.save();
    }

    const token = await generateJwt(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: 'Token can not verify',
    });
  }
};

module.exports = {
  login,
  googleSingIn,
};
