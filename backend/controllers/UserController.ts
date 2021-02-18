import express from 'express';
import bcrypt from 'bcryptjs';
import socket from 'socket.io';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class UserController {
  io: socket.Server;
  constructor(io: socket.Server) {
    this.io = io;
  }

  register = async (req: express.Request, res: express.Response) => {
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

      res.json({
        token,
        userId: user!.id,
        name: user!.name,
        status: user?.status,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something goes wrong' });
    }
  };

  login = async (req: express.Request, res: express.Response) => {
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

      res.json({
        token,
        userId: user!.id,
        name: user!.name,
        status: user?.status,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something goes wrong' });
    }
  };

  token = async (req: express.Request, res: express.Response) => {
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

        res.json({ userId: user!.id, name: user!.name, status: user?.status });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  update = async (req: express.Request, res: express.Response) => {
    try {
      const { name, status, user_id } = req.body;

      if (name) {
        await User.findByIdAndUpdate(user_id, {
          $set: {
            name,
            status,
          },
        });

        res.status(201).json({ message: 'User was updated' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  profile = async (req: express.Request, res: express.Response) => {
    try {
      const { user_id } = req.body;

      const user = await User.findById(user_id);

      if (!user) {
        res.status(404).json({ message: 'User is not found' });
      }

      const result = {
        user_id,
        user_name: user?.name,
        user_photo: '',
        user_last_seen: user?.logs,
        user_status: user?.status,
      };
      console.log(result);

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default UserController;
