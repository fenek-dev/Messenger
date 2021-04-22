import {check, oneOf} from 'express-validator'
export default oneOf([
  check('email', 'Type correct email').normalizeEmail().isEmail(),
  check('password', 'Type password').exists(),
])
