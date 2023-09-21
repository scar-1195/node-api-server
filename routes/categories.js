const { Router } = require('express');
const { check } = require('express-validator');
const { formValidator, jwtValidator, isAdmin } = require('../middlewares');
const { existCategoryId } = require('../helpers/db-validators');
const {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');

const router = Router();

router.get('/', getCategories);

router.get(
  '/:id',
  [
    check('id', 'invalid mongo id').isMongoId(),
    check('id').custom(existCategoryId),
    formValidator,
  ],
  getCategory,
);

router.post(
  '/',
  [
    jwtValidator,
    check('name', 'category name is required').not().isEmpty(),
    formValidator,
  ],
  createCategory,
);

router.put(
  '/:id',
  [
    jwtValidator,
    check('name', 'category name is required').not().isEmpty(),
    check('id').custom(existCategoryId),
    formValidator,
  ],
  updateCategory,
);

router.delete(
  '/:id',
  [
    jwtValidator,
    isAdmin,
    check('id', 'invalid mongo id').isMongoId(),
    check('id').custom(existCategoryId),
    formValidator,
  ],
  deleteCategory,
);

module.exports = router;
