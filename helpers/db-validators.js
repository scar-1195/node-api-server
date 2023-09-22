const { Category, Product, Rol, User } = require('../models');

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

const existCategoryId = async id => {
  const existCategoryID = await Category.findById(id);
  if (!existCategoryID) throw new Error(`Category with id:${id} dont exist`);
};

const existProductId = async id => {
  const existProductID = await Product.findById(id);
  if (!existProductID) throw new Error(`Product with id:${id} dont exist`);
};

module.exports = {
  isValidRol,
  existEmail,
  existUserId,
  existCategoryId,
  existProductId,
};
