const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { formValidator } = require('../middlewares/formValidator');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Email is obligatory').isEmail(),
    check('password', 'Password is obligatory').not().isEmpty(),
    formValidator,
  ],
  login,
);

module.exports = router;
