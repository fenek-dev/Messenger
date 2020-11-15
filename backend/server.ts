import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import dotenv from 'dotenv';

import { Server, Socket } from 'socket.io';
import User, { IUser } from './models/User';
import Chat from './models/Chat';
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;

app.use(express.json({ type: 'text/plain' }));
app.use(express.json());

// routes
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
    console.error('Error: ', error.message);
    process.exit(1);
  }
}

start();
io.on('connection', (socket: Socket) => {
  const query = socket.handshake.query as { user_id: string };
  const id = query.user_id;
  User.findByIdAndUpdate(
    id,
    { logs: { online: true, last_activity: new Date().getTime() } },
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  socket.on('list-of-chats', async ({ user_id }) => {
    try {
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

          socket.emit('get:list-of-chats', data);
        });
      });
    } catch (error) {
      console.error(error);
    }

    // Watch for document updating
    Chat.watch([{ $match: { 'fullDocument.members': user_id } }], {
      fullDocument: 'updateLookup',
    }).on('change', (data: any) => {
      const updates = {
        companion_id: data.fullDocument.members.find(
          (member: string) => member !== user_id
        ),
        last_massage: data.fullDocument.last_message || '',
        created_at: data.fullDocument.created_at || '',
      };
      socket.emit('get:list-of-chats', [updates]);
    });
  });

  socket.on('disconnect', () => {
    socket.disconnect(true);
    User.findByIdAndUpdate(
      id,
      { logs: { online: false, last_activity: new Date().getTime() } },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });

  socket.on(
    'chat',
    async ({ chat_id, user_id }: { chat_id: string; user_id: string }) => {
      try {
        if (chat_id && user_id) {
          const chat = await Chat.findById(chat_id);

          if (chat?.errors) {
            throw new Error(chat?.errors);
          }
          const members = chat!.members;
          const companion_id = members.find((user) => user !== user_id);

          const messages = chat!.messages;

          socket.emit('get:chat', { companion_id, messages });

          // Watch for document updating
          Chat.watch([{ $match: { 'fullDocument.members': members } }], {
            fullDocument: 'updateLookup',
          }).on('change', (data: any) => {
            const message = data.fullDocument.messages.find(
              (mes: any) =>
                mes.created_at ===
                data.updateDescription.updatedFields.created_at
            );
            socket.emit('get:chat', { companion_id, messages: [message] });
          });
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  );
});
