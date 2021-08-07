import * as http from 'http';
import { Server } from 'socket.io';

import { ExtSocket } from './types';
import { authentication } from './middlewares';
import binders from './controllers';
import { presenceLeave } from './controllers/user_controller';

// App factory
const createApp = (listener: http.Server): void => {
  const io = new Server({
    cors: {
      origin: '*',
    },
    path: '/beacon',
  });

  io.listen(listener);

  console.log('socket io started');

  io.use(authentication);

  io.on('connection', (socket: ExtSocket) => {
    console.log(`Socket ${socket.id} connected.`);

    socket.on('disconnecting', () => {
      presenceLeave(socket);
    });

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected.`);
    });

    binders.forEach((binder) => binder(socket));
  });
};

// Create app
const httpServer = http.createServer();
createApp(httpServer);
httpServer.listen(4000, '0.0.0.0');
