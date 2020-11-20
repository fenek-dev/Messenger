import express from 'express';
import socket from 'socket.io';
import Chat, { IMessage } from '../models/Chat';

interface IMessageCreateReqBody {
  readonly members: string[];
  readonly from: string;
  readonly body: string;
  readonly reply: {
    readonly from: string;
    readonly body: string;
    readonly created_at: number;
  };
}

interface IMessageUpdateReqBody {
  readonly user_id: string;
  readonly created_at: number;
  readonly body: string;
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
      const { members, from, body, reply }: IMessageCreateReqBody = req.body;

      if (!reply) {
        const newMessage: IMessage = {
          from,
          body,
          created_at: new Date().getTime(),
          received: false,
          edited: false,
        };

        await Chat.findOneAndUpdate(
          { members },
          {
            $push: { messages: newMessage },
            last_message: body,
            created_at: newMessage.created_at,
          }
        );

        this.io.emit('SERVER:CHAT', newMessage);
      } else {
        const newMessage: IMessage = {
          from,
          body,
          created_at: new Date().getTime(),
          received: false,
          edited: false,
          reply,
        };
        await Chat.findOneAndUpdate(
          { members },
          {
            $push: { messages: newMessage },
            last_message: body,
            created_at: newMessage.created_at,
          },
          { new: true, useFindAndModify: true }
        );
        this.io.emit('SERVER:CHAT', newMessage);
      }
      res.status(201).json({ message: 'Message created' });
    } catch (error) {
      res.status(500).json({ message: 'Something goes wrong' });
    }
  };

  update = async (req: express.Request, res: express.Response) => {
    try {
      const { user_id, body, created_at }: IMessageUpdateReqBody = req.body;

      await Chat.findOneAndUpdate(
        { 'messages.created_at': created_at, 'messages.from': user_id },
        {
          $set: {
            'messages.$.body': body,
            'messages.$.edited': true,
          },
        }
      );
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
