import express from 'express';
import socket from 'socket.io';
import ChatController from '../controllers/ChatController';
import MessageController from '../controllers/MessageController';
import SearchController from '../controllers/SearchController';
import UploadController from '../controllers/UploadController';
import UserController from '../controllers/UserController';
import {
  loginValidation,
  registerValidation,
} from '../middlewares/validations';

const createRoutes = (app: express.Express, io: socket.Server) => {
  const UserCtrl = new UserController(io);
  const ChatCtrl = new ChatController(io);
  const MessageCtrl = new MessageController(io);
  const SearchCtrl = new SearchController(io);
  const UploadCtrl = new UploadController();

  app.use(express.json({ type: 'text/plain' }));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  // routes
  app.post('/api/auth/register', registerValidation, UserCtrl.register);
  app.post('/api/auth/login', loginValidation, UserCtrl.login);
  app.post('/api/auth/token', UserCtrl.token);
  app.patch('/api/auth/update', UserCtrl.update);
  app.post('/api/auth/profile', UserCtrl.profile);

  app.post('/api/chats/create', ChatCtrl.create);
  app.get('/api/chats/:chat_id/:user_id', ChatCtrl.getChat);

  app.post('/api/message/create', MessageCtrl.create);
  app.patch('/api/message/update', MessageCtrl.update);

  app.post('/api/search/find', SearchCtrl.getMatches);

  app.post('/api/user/photo', UploadCtrl.create);
};

export default createRoutes;
