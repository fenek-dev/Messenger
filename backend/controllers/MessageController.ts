import express from 'express';
import socket from 'socket.io';
import Chat, { IMessage } from '../models/Chat';

interface IMessageCreateReqBody {
  readonly members: string[];
  readonly from: string;
  readonly body: string;
  readonly created_at: number;
  readonly reply: {
    readonly from: string;
    readonly body: string;
    readonly created_at: number;
  };
}

interface IMessageUpdateReqBody {
  readonly message_id: string;
  readonly body: string;
  readonly chat_id: string;
}

interface IMessageDeleteReqBody {
  readonly user_id: string;
  readonly created_at: number;
}
class MessageController {
  io: socket.Server;
  constructor(io: socket.Server) {
    this.io = io;
  }

  create = async (req: express.Request, res: express.Response) => {
    try {
      const {
        members,
        from,
        body,
        reply,
        created_at,
      }: IMessageCreateReqBody = req.body;

      if (!reply) {
        const newMessage: IMessage = {
          from,
          body,
          created_at,
          received: false,
          edited: false,
        };

        const chat = await Chat.findOneAndUpdate(
          { members },
          {
            $push: { messages: newMessage },
            last_message: body,
            created_at: newMessage.created_at,
          }
        );

        this.io.emit('SERVER:CHAT', {
          chat_id: chat?.id,
          messages: [newMessage],
        });
      } else {
        const newMessage: IMessage = {
          from,
          body,
          created_at,
          received: false,
          edited: false,
          reply,
        };
        const chat = await Chat.findOneAndUpdate(
          { members },
          {
            $push: { messages: newMessage },
            last_message: body,
            created_at: newMessage.created_at,
          },
          { new: true, useFindAndModify: true }
        );
        this.io.emit('SERVER:CHAT', {
          chat_id: chat?.id,
          messages: [newMessage],
        });
      }
      res.status(201).json({ message: 'Message created' });
    } catch (error) {
      res.status(500).json({ message: 'Something goes wrong' });
    }
  };

  update = async (req: express.Request, res: express.Response) => {
    try {
      const { message_id, body, chat_id }: IMessageUpdateReqBody = req.body;
      await Chat.findOneAndUpdate(
        { _id: chat_id, 'messages._id': message_id },
        {
          $set: {
            'messages.$.body': body,
            'messages.$.edited': true,
          },
        }
      );

      this.io.emit('SERVER:CHAT', {
        chat_id,
        messages: [{ _id: message_id, body, chat_id }],
      });
      res.status(201).json({ message: 'Message was updated' });
    } catch (error) {
      res.status(500).json({ message: 'Something goes wrong' });
    }
  };

  delete = async (req: express.Request, res: express.Response) => {
    try {
      const { user_id, created_at }: IMessageDeleteReqBody = req.body;

      await Chat.findOneAndUpdate(
        {
          'messages.created_at': created_at,
          'messages.from': user_id,
        },
        {
          $pull: { messages: { created_at } },
        }
      );
      this.io.emit('SERVER:MESSAGE_DELETED', { user_id, created_at });
      res.json({ message: 'Message was deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Something goes wrong' });
    }
  };
}

export default MessageController;
