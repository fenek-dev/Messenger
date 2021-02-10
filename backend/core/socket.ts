import { Server, Socket } from 'socket.io';
import http from 'http';
import User from '../models/User';
import Chat, { IChat } from '../models/Chat';
async function getEveryChat(items: IChat[], data: any[], user_id: string) {
  for (const chat of items) {
    const user = await User.findOne({
      _id: chat.members.find((name) => name !== user_id),
    });
    data.push({
      chat_id: chat._id,
      companion_name: user!.name,
      companion_id: user!._id,
      last_massage: chat.last_message || '',
      created_at: chat.created_at || 0,
    });
  }
}

const createSocket = (http: http.Server) => {
  const io = new Server(http);

  io.on('connection', function (socket: Socket) {
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

    socket.on('SERVER:LIST', async (user_id: string) => {
      const chats = await Chat.find({ members: user_id });

      if (chats[0].errors) {
        throw new Error(chats[0].errors);
      }
      let data: any[] = [];

      await getEveryChat(chats, data, user_id);

      socket.emit('SERVER:LIST', data);
    });

    socket.on('SERVER:CHAT', async (chat_id: string, user_id: string) => {
      const chat = await Chat.findById(chat_id);
      socket.join(chat_id);
      if (chat?.errors) {
        throw new Error(chat?.errors);
      }
      const members = chat!.members;
      const companion_id = members.find((user) => user !== user_id);
      const messages = chat!.messages;
      io.to(chat_id).emit('SERVER:CHAT', { chat_id, companion_id, messages });
    });
    // Disconnect
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
  });

  return io;
};
export default createSocket;
