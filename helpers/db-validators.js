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

const existUserId = async id => {
  const existUserID = await User.findById(id);
  if (!existUserID) throw new Error(`User with id:${id} dont exist`);
};

module.exports = {
  isValidRol,
  existEmail,
  existUserId,
};
