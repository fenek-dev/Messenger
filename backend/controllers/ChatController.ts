import express from 'express';
import socket from 'socket.io';
import Chat from '../models/Chat';
import User, { IUser } from '../models/User';

class ChatController {
  io: socket.Server;
  constructor(io: socket.Server) {
    this.io = io;
  }

  async create(req: express.Request, res: express.Response) {
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
  }

  async getList(req: express.Request, res: express.Response) {
    try {
      const { user_id } = req.body;

      const chats = await Chat.find({ members: user_id });

      if (chats[0].errors) {
        throw new Error(chats[0].errors);
      }
      let data: any[] = [];
      chats.forEach((chat) => {
        new Promise(async (res: (value: IUser) => void, rej) => {
          // Find user by id
          const user = await User.findOne({
            _id: chat.members.find((name) => name !== user_id),
          });
          res(user!);
        }).then((user) => {
          data.push({
            chat_id: chat._id,
            companion_name: user.name,
            companion_id: user._id,
            last_massage: chat.last_message || '',
            created_at: chat.created_at || 0,
          });

          this.io.emit('SERVER:LIST', data);
        });
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  async getChat(req: express.Request, res: express.Response) {
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
  }
}

export default ChatController;
