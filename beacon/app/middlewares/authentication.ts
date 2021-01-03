/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Socket } from 'socket.io';
import { IUser, IMembership } from '../models/user.model';
import { ExtSocket } from '../types';

// const { BACKEND_API } = process.env;
const BACKEND_API = 'http://localhost:5000';

const JSONtoIUser = (data: any): IUser => {
  const memberships: IMembership[] = [];

  data.channels.forEach((m: any) => {
    memberships.push({
      id: m.id,
      name: m.name,
    });
  });

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    access: data.access,
    memberships,
    token: null,
  };
};

const whoami = async (token: string): Promise<IUser> => {
  try {
    const res = await axios.get(
      `${BACKEND_API}/auth/whoami`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return JSONtoIUser(res.data);
  } catch (err) {
    throw new Error('Unauthorized');
  }
};

export default async (socket: Socket, next: (any?: any) => void): Promise<void> => {
  const { token } = socket.handshake.auth as {token: string};

  try {
    const user = await whoami(token);
    user.token = token; // store token for next requests
    // eslint-disable-next-line no-param-reassign
    (socket as ExtSocket).user = user;

    user.memberships?.forEach((channel) => socket.join(channel.id));

    next();
  } catch (err) {
    next(err);
  }
};
