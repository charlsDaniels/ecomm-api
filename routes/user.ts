import { Router } from "express";
import { check } from 'express-validator';
import { 
  usersGet, 
  userGet, 
  userCreate, 
  userUpdate, 
  userDelete
} from '../controllers/user.controller';
import { validateUsername, validateRole, validateEmail, documentExists } from '../helpers/validations';
import { verifyJWT, hasRole, validateFields } from '../middleware';
import { User } from '../models';

const router = Router()

router.get('/', usersGet)
router.get('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom((value: string) => documentExists(value, User)),
], userGet)
router.post('/', [
  check('username', 'username is required').not().isEmpty(),
  check('username').custom(validateUsername),
  check('password', 'password must has 6 characters minimun').isLength({ min: 6 }),
  check('email', 'email has not valid format').isEmail(),
  check('email').custom(validateEmail),
  check('role').custom(validateRole),
  validateFields
], userCreate)
router.put('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom((value: string) => documentExists(value, User)),
  check('role').custom(validateRole),
  validateFields
], userUpdate)
router.delete('/:id', [
  verifyJWT,
  hasRole('ADMIN_ROLE'),
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom((value: string) => documentExists(value, User)),
  validateFields
], userDelete)

export default router;