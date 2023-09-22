const { Router } = require('express');
const { check } = require('express-validator');
const { formValidator, jwtValidator, isAdmin } = require('../middlewares');
const { existCategoryId, existProductId } = require('../helpers/db-validators');
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

const router = Router();

router.get('/', getProducts);

router.get(
  '/:id',
  [
    check('id', 'invalid mongo id').isMongoId(),
    check('id').custom(existProductId),
    formValidator,
  ],
  getProduct,
);

router.post(
  '/',
  [
    jwtValidator,
    check('name', 'product name is required').not().isEmpty(),
    check('category', 'invalid mongo id').isMongoId(),
    check('category').custom(existCategoryId),
    formValidator,
  ],
  createProduct,
);

router.put(
  '/:id',
  [
    jwtValidator,
    check('id', 'invalid mongo id').isMongoId(),
    check('id').custom(existProductId),
    formValidator,
  ],
  updateProduct,
);

router.delete(
  '/:id',
  [
    jwtValidator,
    isAdmin,
    check('id', 'invalid mongo id').isMongoId(),
    check('id').custom(existProductId),
    formValidator,
  ],
  deleteProduct,
);

module.exports = router;
