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
      const { members } = req.body;

      const candidate = await Chat.findOne({ members });

      if (candidate) {
        return res.status(400).json({ error: 'There is same chat' });
      }

      const chat = await new Chat({ members, messages: [] });
      await chat.save();

      res.status(201).json({ members, messages: [] });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getChat = async (req: express.Request, res: express.Response) => {
    try {
      const chat_id = req.params.id;
      const { user_id } = req.body;
      const chat = await Chat.findById(chat_id);

      if (chat?.errors) {
        throw new Error(chat?.errors);
      }
      const members = chat!.members;
      const companion_id = members.find((user) => user !== user_id);

      const messages = chat!.messages;
      this.io.emit('SERVER:CHAT', { companion_id, messages });
    } catch (error) {
      console.error(error.message);
    }
  };
}

export default ChatController;
