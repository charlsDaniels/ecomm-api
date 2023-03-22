const { Router } = require('express');
const { check } = require('express-validator');
const { 
  usersGet, 
  userGet, 
  userCreate, 
  userUpdate, 
  userDelete
} = require('../controllers/user.controller');
const { validateRole, validateEmail, documentExists } = require('../helpers/validations');
const {
  verifyJWT,
  hasRole,
  validateFields
} = require('../middleware');
const { User } = require('../models');

const router = Router()

router.get('/', usersGet)
router.get('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom((value) => documentExists(value, User)),
], userGet)
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password must has 6 characters minimun').isLength({ min: 6 }),
  check('email', 'Email has not valid format').isEmail(),
  check('email').custom(validateEmail),
  check('role').custom(validateRole),
  validateFields
], userCreate)
router.put('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom((value) => documentExists(value, User)),
  check('role').custom(validateRole),
  validateFields
], userUpdate)
router.delete('/:id', [
  verifyJWT,
  hasRole('ADMIN_ROLE'),
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom((value) => documentExists(value, User)),
  validateFields
], userDelete)

module.exports = router
