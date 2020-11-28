/* eslint-disable no-console */
import { Socket } from 'socket.io';

const auth = (socket: Socket, next: () => void): void => {
  const token = socket.handshake.auth;
  // ...
  console.log('AuthnToken: ', token);
  next();
};

export default auth;

// // in a middleware
// io.use(async (socket, next) => {
//   try {
//     const user = await fetchUser(socket);
//     socket.user = user;
//   } catch (e) {
//     next(new Error("unknown user"));
//   }
// });
