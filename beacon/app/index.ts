import dotenv from 'dotenv';
import * as http from 'http';
import { Server, Socket } from 'socket.io';
import { bindEvent } from './helpers';
// load dotenv and config options

// Middlewares
import { authentication } from './middlewares';

// Events
import { messageHandlers } from './controllers';

// Load .env
dotenv.config();

// assign namespaces
const handlers = Object.values({
  ...messageHandlers,
});

// App factory
const createApp = (listener: http.Server): void => {
  const io = new Server({
    cors: {
      origin: '*',
    },
  });

  io.listen(listener);

  io.use(authentication);

  io.on('connection', (socket: Socket) => {
    console.log(`Socket ${socket.id} connected.`);

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected.`);
    });

    handlers.forEach((handler) => {
      bindEvent(socket, handler);
    });
  });
};

// Create app
const httpServer = http.createServer();
createApp(httpServer);
httpServer.listen(4000);
