import { Server, Socket } from 'socket.io';
import http from 'http';
import User from '../models/User';
import Chat from '../models/Chat';
import { IChatModel } from '../models/types';

async function getEveryChat(items: IChatModel[], data: any[], user_id: string) {
  for (const chat of items) {
    const user = await User.findById({
      _id: chat.members.find((name) => name !== user_id),
    });
    data.push({
      chat_id: chat._id,
      companion_name: user!.name,
      companion_id: user!._id,
      companion_last_seen: user?.logs.last_seen,
      companion_photo: user?.photo,
      last_massage: chat.last_message || '',
      created_at: chat.created_at || 0,
    });
  }
}

const createSocket = (http: http.Server) => {
  const io = new Server(http);

  io.on('connection', async (socket: Socket) => {
    const query = socket.handshake.query as { user_id: string };
    const id = query.user_id;

    await User.findByIdAndUpdate(id, {
      $set: {
        logs: {
          online: true,
          last_seen: new Date().getTime(),
        },
      },
    });

    socket.on('SERVER:LIST', async (user_id: string) => {
      const chats = await Chat.find({ members: user_id });

      if (chats[0].errors) {
        throw new Error('Something goes wrong');
      }
      let data: any[] = [];

      await getEveryChat(chats, data, user_id);
      chats.forEach((chat) => {
        socket.join(chat.id);
      });
      console.log('Rooms in socket: ', socket.rooms);

      socket.emit('SERVER:LIST', data);
    });

    // Disconnect
    socket.on('disconnect', async () => {
      await User.findByIdAndUpdate(id, {
        $set: {
          logs: {
            online: false,
            last_seen: new Date().getTime(),
          },
        },
      });
      socket.disconnect(true);
    });
  });

  return io;
};
export default createSocket;
