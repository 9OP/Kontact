/* eslint-disable no-use-before-define */
import * as http from 'http';
import express from 'express';
import { Server } from 'socket.io';

import { ExtSocket } from './types';
import { authentication } from './middlewares';
import binders from './controllers';
import {
  presenceController,
  joinController,
  presenceDisconnect,
} from './controllers/user_controller';

// App factory
const createApp = (): http.Server => {
  // Express
  const app = express();
  const httpServer = http.createServer(app);
  // app.use() // http API authentication
  app.use(express.json());
  app.get('/presence', presenceController);
  app.post('/join', joinController);

  // SocketIo
  const io = new Server({
    cors: {
      origin: '*',
    },
    path: '/beacon',
  });
  app.set('socketio', io);

  io.listen(httpServer);
  io.use(authentication);

  io.on('connection', (socket: ExtSocket) => {
    // console.log(`Socket ${socket.id} connected.`);
    // socket.on('disconnect', () => {
    //   console.log(`Socket ${socket.id} disconnected.`);
    // });
    socket.on('disconnecting', () => {
      presenceDisconnect(socket);
    });

    binders.forEach((binder) => binder(socket));
  });

  return httpServer;
};

// Create app
const bearer = createApp();
bearer.listen(4000, '0.0.0.0');
