/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createEvent } from './events';
import { ExtSocket } from '../types';
import { whoami, fetchMemberships } from '../api';

const WHOAMI_AUTH = 'auth:whoami';
const PRESENCE_JOIN = 'presence:join';
const PRESENCE_LEAVE = 'presence:leave';

export function presenceJoin(socket: ExtSocket): void {
  socket.memberships.forEach((membership) => {
    const channeId = membership.channel.id;
    socket.join(channeId);
    socket.to(channeId).emit(PRESENCE_JOIN, socket.user.id);
  });
}

export function presenceLeave(socket: ExtSocket): void {
  socket.memberships.forEach((membership) => {
    const channeId = membership.channel.id;
    socket.to(channeId).emit(PRESENCE_LEAVE, socket.user.id);
    socket.leave(channeId);
  });
}

export const authWhoami = createEvent(
  WHOAMI_AUTH,
  null,
  async (socket: ExtSocket, payload: null, ack: () => void) => {
    const { token } = socket;
    const user = await whoami(token);
    const memberships = await fetchMemberships(token);
    socket.user = user;
    socket.memberships = memberships;
    presenceJoin(socket);
    ack();
  },
);
