import express from 'express';
import socket from 'socket.io';
import Chat from '../models/Chat';
import Message from '../models/Message';
import { IMessageModel } from '../models/types';
import { IMessageCreateReqBody, IMessageUpdateReqBody } from './types';

class MessageController {
  constructor(private io: socket.Server) {}

  create = async (req: express.Request, res: express.Response) => {
    try {
      const {
        from,
        body,
        reply,
        created_at,
        chat_id,
      }: IMessageCreateReqBody = req.body;
      if (!reply) {
        const newMessage: IMessageModel = {
          from,
          body,
          created_at,
          received: false,
          edited: false,
          chat_id,
        };

        let chat = await Chat.findById(chat_id);

        if (chat) {
          chat.updateOne({
            last_message: body,
            created_at: newMessage.created_at,
          });
          const message = new Message(newMessage);
          await message.save();

          this.io.emit('SERVER:CHAT', {
            chat_id,
            messages: [newMessage],
          });
        } else {
          throw new Error('Chat not found');
        }
      } else {
        const newMessage: IMessageModel = {
          from,
          body,
          created_at,
          received: false,
          edited: false,
          reply,
          chat_id,
        };
        let chat = await Chat.findById(chat_id);

        if (chat) {
          chat.updateOne({
            last_message: body,
            created_at: newMessage.created_at,
          });
          const message = new Message(newMessage);
          await message.save();

          this.io.emit('SERVER:CHAT', {
            chat_id,
            messages: [newMessage],
          });
        } else {
          throw new Error('Chat not found');
        }
      }
    } catch (error) {
      this.io.emit('SERVER:CHAT', {
        error,
      });
    }
  };

  update = async (req: express.Request, res: express.Response) => {
    try {
      const { message_id, body, chat_id }: IMessageUpdateReqBody = req.body;

      const message = await Message.findById(message_id);

      if (message) {
        message.updateOne({
          body,
        });

        this.io.emit('SERVER:CHAT', {
          chat_id,
          messages: [{ _id: message_id, body, chat_id }],
        });
      } else {
        throw new Error('Message not found');
      }
    } catch (error) {
      this.io.emit('SERVER:CHAT', {
        error,
      });
    }
  };
}

export default MessageController;
