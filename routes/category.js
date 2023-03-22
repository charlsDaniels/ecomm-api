const { Router } = require('express');
const { check } = require('express-validator');
const { 
  categoryCreate, 
  categoryDelete, 
  categoryGet, 
  categoriesGet, 
  categoryUpdate 
} = require('../controllers/category.controller');
const { documentExists } = require('../helpers/validations');
const { validateFields, verifyJWT } = require('../middleware');
const { Category } = require('../models');

const router = Router()

router.get('/', categoriesGet)
router.get('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom((value) => documentExists(value, Category)),
  validateFields
], categoryGet)
router.post('/', [
  verifyJWT,
  check('name', 'Name is required').not().isEmpty(),
  validateFields
], categoryCreate)
router.put('/:id', [
  verifyJWT,
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom((value) => documentExists(value, Category)),
  validateFields
], categoryUpdate)
router.delete('/:id', [
  verifyJWT,
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom((value) => documentExists(value, Category)),
  validateFields
], categoryDelete)

module.exports = router