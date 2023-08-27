const { Router } = require('express');
const {
  getUsers,
  putUser,
  postUser,
  deleteUser,
} = require('../controllers/users');

const router = Router();

router.get('/', getUsers);
router.post('/', postUser);
router.put('/:id', putUser);
router.delete('/', deleteUser);

module.exports = router;
