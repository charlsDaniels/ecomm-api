const { Router } = require('express');
const { check } = require('express-validator');
const { 
  productCreate,
  productsGet,
  productGet
} = require('../controllers/product.controller');
const { documentExists } = require('../helpers/validations');
const { validateFields, verifyJWT } = require('../middleware');
const { Product } = require('../models');

const router = Router()

router.get('/', productsGet)
router.get('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom((value) => documentExists(value, Product)),
  validateFields
], productGet)
router.post('/', [
  verifyJWT,
  check('name', 'name is required').not().isEmpty(),
  check('category', 'category is required').not().isEmpty(),
  check('price', 'price is required').not().isEmpty(),
  validateFields
], productCreate)
// router.put('/:id', [
//   verifyJWT,
//   check('id', 'ID is not valid').isMongoId(),
//   check('id').custom(validateCategoryById),
//   validateFields
// ], categoryUpdate)
// router.delete('/:id', [
//   verifyJWT,
//   check('id', 'ID is not valid').isMongoId(),
//   check('id').custom(validateCategoryById),
//   validateFields
// ], categoryDelete)

module.exports = router