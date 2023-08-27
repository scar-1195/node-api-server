const { request, response } = require('express');

const getUsers = (req = request, res = response) => {
  const query = req.query;

  res.json({
    msg: 'get API controller',
    query,
  });
};

const postUser = (req = request, res = response) => {
  const body = req.body;

  res.json({
    msg: 'post API controller',
    body,
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
