const { Router } = require('express');
const { check } = require('express-validator');
const { formValidator } = require('../middlewares/formValidator');
const { isValidRol, existEmail } = require('../helpers/db-validators');
const {
  getUsers,
  putUser,
  postUser,
  deleteUser,
} = require('../controllers/users');

const router = Router();

router.get('/', getUsers);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'email format not valid').isEmail(),
    check('email').custom(existEmail),
    check('password', 'password must be 6 characters').isLength({ min: 6 }),
    // check('rol', 'Rol not exist').isIn(['ADMIN', 'USER']),
    check('rol').custom(isValidRol),
    formValidator,
  ],
  postUser,
);

router.put('/:id', putUser);

router.delete('/', deleteUser);

module.exports = router;
