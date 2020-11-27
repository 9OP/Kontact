/* eslint-disable no-console */
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const httpServer = createServer().listen(3000, '0.0.0.0');

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

let cpt = 0;

io.use((socket, next) => {
  const token = socket.handshake.auth;
  // ...
  console.log('AuthnToken: ', token);
  next();
});

io.on('connection', (socket: Socket) => {
  socket.emit('welcome', 'welcome man');

  // console.log('SocketId: ', socket.id);
  // console.log('SocketHandshake: ', socket.handshake);

  socket.join('channel-0');

  console.log('Channels: ', socket.rooms);

  socket.on('message', () => {
    console.log('message');
    cpt += 1;
    socket.emit('hello', cpt);
  });

  socket.on('JOIN_CHANNEL', (channel) => {
    console.log(channel);
    socket.join(`channel-${channel}`);
    console.log('Channels: ', socket.rooms);
    socket.emit('JOIN_CHANNEL_SUCCESS');
  });
});

httpServer.listen(3000);

// // in a middleware
// io.use(async (socket, next) => {
//   try {
//     const user = await fetchUser(socket);
//     socket.user = user;
//   } catch (e) {
//     next(new Error("unknown user"));
//   }
// });

// const server = require('https').createServer({
//   key: fs.readFileSync('/tmp/key.pem'),
//   cert: fs.readFileSync('/tmp/cert.pem')
// });
