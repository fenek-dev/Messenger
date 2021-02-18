import express from 'express';
import socket from 'socket.io';
import Chat from '../models/Chat';

class ChatController {
  io: socket.Server;
  constructor(io: socket.Server) {
    this.io = io;
  }

  create = async (req: express.Request, res: express.Response) => {
    try {
      const members = req.body;

      const candidate = await Chat.findOne({ members });
      console.log(candidate);

      if (candidate) {
        return res.status(400).json({ error: 'There is same chat' });
      }

      const chat = await new Chat({
        members,
        messages: [],
        last_message: '',
        created_at: 0,
      });
      await chat.save();

      res.status(201).json({ chat_id: chat._id, members });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default ChatController;
