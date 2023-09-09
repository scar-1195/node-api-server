const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  //* Manera no optima hacer diferentes peticiones en vez de usar un Promise.all
  // const users = await User.find({ state: true })
  //   .skip(Number(from))
  //   .limit(Number(limit));

  // const total = await User.countDocuments({ state: true });

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const postUser = async (req = request, res = response) => {
  const { name, email, password, rol } = req.body;
  const user = new User({ name, email, password, rol });

  //* Crypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  //* Save user in MongoDB
  await user.save();

  res.json({
    success: true,
    msg: 'User save',
    user,
  });
};

const putUser = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    success: true,
    msg: 'update user',
    user,
  });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  //* Delete db document
  // const user = await User.findByIdAndDelete(id);

  //? Change status db document
  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({
    success: true,
    msg: 'delete user',
    user,
  });
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
