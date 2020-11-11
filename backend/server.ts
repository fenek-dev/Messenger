import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import http from 'http';
import Chat from './models/Chat';
import User, { IUser } from './models/User';
import dotenv from 'dotenv';

import { Server, Socket } from 'socket.io';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = config.get('port') || 5000;

app.use(express.json({ type: 'text/plain' }));
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/chats', require('./routes/chats.routes'));
app.use('/api/message', require('./routes/messages.routes'));

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    server.listen(PORT, () => console.log('Server is working on PORT ', PORT));
  } catch (error) {
    console.log('Error: ', error.message);
    process.exit(1);
  }
}

start();

io.on('connection', (socket: Socket) => {
  const query = socket.handshake.query as { user_id: string };
  const id = query.user_id;

  if (id) {
    User.findByIdAndUpdate(
      id,
      { logs: { online: true, last_activity: new Date().getTime() } },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  socket.on('list-of-chats', async ({ user_id }) => {
    if (user_id) {
      const chats = await Chat.find({ members: user_id });

      let data: any[] = [];
      chats.forEach((chat) => {
        new Promise(async (res: (value: IUser) => void, rej) => {
          const user = await User.findOne({
            _id: chat.members.filter((name) => name !== user_id),
          });

          res(user!);
        })
          .then((user) => {
            data.push({
              companion_name: user.name,
              companion_id: user._id,
              last_massage: chat.last_message || '',
              created_at: chat.created_at || 0,
            });
          })
          .then(() => {
            socket.emit('get:list-of-chats', data);
          });
      });

      Chat.watch([{ $match: { 'fullDocument.members': user_id } }]).on(
        'change',
        (data: any) => {
          const updates = {
            companion_id: data.fullDocument.members.filter(
              (member: string) => member !== user_id
            )[0],
            last_massage: data.fullDocument.last_message || '',
            created_at: data.fullDocument.created_at || '',
          };
          socket.emit('get:list-of-chats', [updates]);
        }
      );
    }
  });

  socket.on('chat', async ({ members }: { members: string[] }) => {
    if (members) {
      const chat = await Chat.findOne({ members });
      const companion_id = members.find((user) => user !== id);
      if (chat) {
        const messages = chat.messages;
        socket.emit('get:chat', { companion_id, messages });
      }
      Chat.watch([{ $match: { 'fullDocument.members': members } }]).on(
        'change',
        (data: any) => {
          const messages = data.fullDocument.messages;
          socket.emit('get:chat', { companion_id, messages });
        }
      );
    }
  });

  socket.on('disconnect', () => {
    if (id) {
      User.findByIdAndUpdate(
        id,
        { logs: { online: false, last_activity: new Date().getTime() } },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });
});
