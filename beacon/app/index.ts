import * as http from 'http';
import { Server, Socket } from 'socket.io';
import { bindEvent } from './helpers';
// load dotenv and config options

// Middlewares
import auth from './middlewares/auth';

// Events
import * as messageHandlers from './controllers/messages';

// assign namespaces
const handlers = Object.values({
  ...messageHandlers,
});

const createApp = (listener: http.Server): void => {
  const io = new Server({
    cors: {
      origin: '*',
    },
  });

  io.listen(listener);

  io.use(auth);

  io.on('connection', (socket: Socket) => {
    console.log('connect');

    handlers.forEach((handler) => {
      bindEvent(socket, handler);
    });
  });
};

// Create app
const httpServer = http.createServer();
createApp(httpServer);
httpServer.listen(3000);
