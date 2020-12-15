/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import axios from 'axios';
import { Socket } from 'socket.io';

const whoami = async (token: string) => {
  // console.log(token);
  const res = await axios.get(
    'http://localhost:5000/auth/whoami',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  // catch error flow

  return res.data;
};

export default async (socket: Socket, next: (any?: any) => void): Promise<void> => {
  const { token } = socket.handshake.auth as {token: string};

  try {
    // http request to /auth/whoami {token}

    /*
  for channel in user.channels
    socket.join(channel)
  */

    const user = await whoami(token);
    console.log(user);
    // add user to socket
    next();
  } catch (e) {
    next(new Error('unknown user'));
  }
};
