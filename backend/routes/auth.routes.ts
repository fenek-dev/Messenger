import { Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { check, validationResult, oneOf } from 'express-validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

// /api/auth/register
router.post(
  '/register',
  oneOf([
    check('email', 'Email is wrong').isEmail(),
    check('password', 'Password is wrong').isLength({ min: 6, max: 50 }),
  ]),
  async (req, res) => {
    try {
      // Get all errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Send error to client
        return res.status(400).json({
          errors: errors.array(),
          message: 'Something goes wrong',
        });
      }

      // Get data from request body
      const { email, password, name } = req.body;

      // Find someone with same email
      const candidate = await User.findOne({ email });

      // If there is user with the same email
      if (candidate) {
        // Send error to client that there is the same user in db
        return res.status(400).json({ message: 'There is same user' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 2);

      // Create new user
      const user = new User({
        email,
        password: hashedPassword,
        name,
        status: '',
      });
      // Save new user in mongoDB
      await user.save();

      // Create jwt token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
      });

      // Send id and token to client
      return res
        .status(201)
        .json({ message: 'User has been created', userId: user.id, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  oneOf([
    check('email', 'Type correct email').normalizeEmail().isEmail(),
    check('password', 'Type password').exists(),
  ]),
  async (req, res) => {
    try {
      // Get all errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Something goes wrong',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ message: "User hasn't found " });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user!.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Password is wrong' });
      }

      const token = jwt.sign({ userId: user!.id }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
      });

      res.json({ token, userId: user!.id, name: user!.name });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something goes wrong' });
    }
  }
);

// /api/auth/token
router.post('/token', async (req, res) => {
  try {
    const { token } = req.body;
    if (token) {
      // Get jwt token

      // If there isn't any token
      if (token == null) return res.sendStatus(401);

      // Check token
      const userId = await jwt.verify(
        token,
        process.env.JWT_SECRET!,
        (err: any, user: any) => {
          if (err)
            return res.sendStatus(403).json({ message: 'Incorrect token' });
          // Get user id
          return user.userId;
        }
      );

      // Find user by id
      const user = await User.findOne({ _id: userId });

      res.json({ userId: user!.id, name: user!.name });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
