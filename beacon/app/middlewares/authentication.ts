/* eslint-disable no-console */
import { Socket } from 'socket.io';

export default (socket: Socket, next: () => void): void => {
  const token = socket.handshake.auth;
  // http request to /auth/whoami {token}
  console.log('AuthnToken: ', token);
  /*
  for channel in user.channels
    socket.join(channel)
  */
  next();
};

// // in a middleware
// io.use(async (socket, next) => {
//   try {
//     const user = await fetchUser(socket);
//     socket.user = user;
//   } catch (e) {
//     next(new Error("unknown user"));
//   }
// });
