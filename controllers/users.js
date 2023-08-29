const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = (req = request, res = response) => {
  const query = req.query;

  res.json({
    msg: 'get API controller',
    query,
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

const putUser = (req = request, res = response) => {
  const id = req.params.id;

  res.json({
    msg: 'put API controller',
    id,
  });
};

const deleteUser = (req, res = response) => {
  res.json({
    msg: 'delete API controller',
  });
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
