const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth');
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

router.post(
  '/google',
  [
    check('id_token', 'Google token is necesary').not().isEmpty(),
    formValidator,
  ],
  googleSingIn,
);

module.exports = router;
