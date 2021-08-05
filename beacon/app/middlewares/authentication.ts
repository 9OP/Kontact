/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { Socket } from 'socket.io';
import { ExtSocket } from '../types';
import { whoami, fetchMemberships } from '../api';

export default async (socket: Socket, next: (any?: any) => void): Promise<void> => {
  const { token } = socket.handshake.auth as {token: string};
  try {
    const user = await whoami(token);
    const memberships = await fetchMemberships(token);
    (socket as ExtSocket).user = user;
    (socket as ExtSocket).token = token;
    (socket as ExtSocket).memberships = memberships;
    memberships.forEach((membership) => socket.join(membership.channel.id));
    next();
  } catch (err) {
    next(err);
  }
};
