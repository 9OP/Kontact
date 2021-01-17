/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Socket } from 'socket.io';
import { IUser, IMembership } from '../models/user.model';
import { ExtSocket } from '../types';

const BACKEND_API = 'http://localhost:5000'; // process.env.BACKEND_API
const back = axios.create({ baseURL: BACKEND_API, timeout: 2000 });

const JSONtoIMembership = (data: any): IMembership[] => {
  const memberships: IMembership[] = [];
  data.forEach((channel: IMembership) => memberships.push({ id: channel.id, role: channel.role }));
  return memberships;
};

const JSONtoIUser = (data: any): IUser => ({
  id: data.id,
  access: data.access,
});

const whoami = async (token: string): Promise<IUser> => {
  const res = await back.get(
    '/auth/whoami', {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return JSONtoIUser(res.data);
};

const fetchMemberships = async (token: string): Promise<IMembership[]> => {
  const res = await back.get(
    '/channel/memberships', {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return JSONtoIMembership(res.data);
};

export default async (socket: Socket, next: (any?: any) => void): Promise<void> => {
  const { token } = socket.handshake.auth as {token: string};
  try {
    const user = await whoami(token);
    const memberships = await fetchMemberships(token);
    (socket as ExtSocket).user = user;
    (socket as ExtSocket).token = token;
    (socket as ExtSocket).memberships = memberships;
    memberships.forEach((channel) => socket.join(channel.id));
    next();
  } catch (err) {
    next(err);
  }
};
