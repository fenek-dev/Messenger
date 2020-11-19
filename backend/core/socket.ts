import { Server, Socket } from 'socket.io';
import http from 'http';
import User from '../models/User';

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
    socket.on('CHAT:JOIN', (chat_id: string) => {
      socket.join(chat_id);
    });
    // socket.on('DIALOGS:TYPING', (obj: any) => {
    //   socket.broadcast.emit('DIALOGS:TYPING', obj);
    // });

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
