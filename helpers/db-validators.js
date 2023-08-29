const Rol = require('../models/rol');
const User = require('../models/user');

const isValidRol = async (rol = '') => {
  const existRol = await Rol.findOne({ rol });
  if (!existRol) throw new Error(`invalid ${rol} express validator`);
};

const existEmail = async (email = '') => {
  const existEmail = await User.findOne({ email });
  if (existEmail) throw new Error(`${email} must be unique`);
};

module.exports = {
  isValidRol,
  existEmail,
};
