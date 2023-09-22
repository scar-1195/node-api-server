const { Router } = require('express');
const { check } = require('express-validator');
const { formValidator } = require('../middlewares');
const { uploadFiles, updateImg } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers/db-validators');

const router = Router();

router.post('/', uploadFiles);
router.put(
  '/:collection/:id',
  [
    check('id', 'invalid mongo id').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['user', 'product'])),
    formValidator,
  ],
  updateImg,
);

module.exports = router;
