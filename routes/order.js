const { Router } = require('express');
const { check } = require('express-validator');
const { 
  ordersGet,
  orderCreate
} = require('../controllers/order.controller');
const { documentExists } = require('../helpers/validations');
const { validateFields, verifyJWT } = require('../middleware');
const { Order } = require('../models');

const router = Router()

router.get('/', ordersGet)
// router.get('/:id', [
//   check('id', 'ID is not valid').isMongoId(),
//   check('id').custom((value) => documentExists(value, Order)),
//   validateFields
// ], productGet)
router.post('/', [
  verifyJWT,
  check('total', 'total is required').not().isEmpty(),
  check('items', 'items is required').not().isEmpty(),
  validateFields
], orderCreate)
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