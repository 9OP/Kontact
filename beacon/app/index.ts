import http from 'http';

const server = http.createServer().listen(3000, '0.0.0.0');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io')(server);

// eslint-disable-next-line space-before-function-paren
io.on('connection', (socket: any) => {
  // console.log('user connected');
  socket.emit('welcome', 'welcome man');
});
