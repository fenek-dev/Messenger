import { check, oneOf } from 'express-validator';

export default oneOf([
  check('email', 'Email is wrong').isEmail(),
  check('password', 'Password is wrong').isLength({ min: 6, max: 50 }),
]);
