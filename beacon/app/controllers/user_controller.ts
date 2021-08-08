/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createEvent } from './events';
import { ExtSocket } from '../types';
import { whoami, fetchMemberships } from '../api';

const WHOAMI_AUTH = 'auth:whoami';
const PRESENCE_CONNECT = 'presence:connect';
const PRESENCE_DISCONNECT = 'presence:disconnect';

export function presenceConnect(socket: ExtSocket): void {
  socket.memberships.forEach((membership) => {
    const channelId = membership?.channel?.id;
    const pending = membership?.pending;
    if (channelId) {
      if (pending === false) { socket.join(channelId); }
      socket.join(`${channelId}:presence`);
      socket.to(`${channelId}:presence`).emit(PRESENCE_CONNECT, {
        userId: socket.user.id,
        channelId,
      });
    }
  });
  // // should send on channel rooms instead ?
  // socket.join('presence');
  // socket.to('presence').emit(PRESENCE_CONNECT, socket.user.id);
  // socket.emit(PRESENCE_CONNECT, socket.user.id);
}

export function presenceDisconnect(socket: ExtSocket): void {
  socket.memberships.forEach((membership) => {
    const channelId = membership.channel.id;
    if (channelId) {
      socket.to(`${channelId}:presence`).emit(PRESENCE_DISCONNECT, {
        userId: socket.user.id,
        channelId,
      });
      socket.leave(`${channelId}:presence`);
      socket.leave(channelId);
    }
  });
  // socket.to('presence').emit(PRESENCE_DISCONNECT, socket.user.id);
  // socket.emit(PRESENCE_DISCONNECT, socket.user.id);
  // socket.leave('presence');
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
    presenceConnect(socket);
    ack();
  },
);
