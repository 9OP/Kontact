/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Socket } from 'socket.io';
import { IUser, IMembership } from '../models/user.model';
import { ExtSocket } from '../types';

const BACKEND_API = 'http://localhost:5000'; // process.env.BACKEND_API
const back = axios.create({ baseURL: BACKEND_API, timeout: 2000 });

const JSONtoIMembership = (data: any): IMembership => ({
  id: data.id,
  role: data.role.toLowerCase(),
});

const JSONtoIUser = (data: any): IUser => {
  const memberships: IMembership[] = [];
  data.channels.forEach((m: any) => memberships.push(JSONtoIMembership(m)));
  return {
    id: data.id,
    access: data.access.toLowerCase(),
    memberships,
  };
};

const whoami = async (token: string): Promise<IUser> => {
  const res = await back.get(
    '/auth/whoami', {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return JSONtoIUser(res.data);
};

export default async (socket: Socket, next: (any?: any) => void): Promise<void> => {
  const { token } = socket.handshake.auth as {token: string};
  try {
    const user = await whoami(token);
    (socket as ExtSocket).user = user;
    (socket as ExtSocket).token = token;
    user.memberships?.forEach((channel) => socket.join(channel.id));
    next();
  } catch (err) {
    next(err);
  }
};
