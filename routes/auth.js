const { Router } = require('express')
const { check } = require('express-validator')
const { login, googleSignIn } = require('../controllers/auth.controller')
const { validateFields } = require('../middleware/fields-validator')

const router = Router()

router.post('/login', [
  check('email', 'Email must be a valid format').isEmail(),
  validateFields
], login)
router.post('/loginGoogle', [
  check('idToken', 'idToken is required').not().isEmpty(),
  validateFields
], googleSignIn)

module.exports = router