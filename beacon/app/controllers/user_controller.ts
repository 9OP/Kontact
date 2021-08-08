/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { Server } from 'socket.io';
import { Request, Response } from 'express';
import { createEvent } from './events';
import { ExtSocket } from '../types';
import { whoami, fetchMemberships } from '../api';

const WHOAMI_AUTH = 'auth:whoami';
const PRESENCE_CONNECT = 'presence:connect';
const PRESENCE_DISCONNECT = 'presence:disconnect';
const USER_JOIN = 'user:join';

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

export const presenceController = (req: Request, res: Response): void => {
  const socketio: Server = req.app.get('socketio');
  let cids = req.query.channel as string[];
  if (!Array.isArray(cids)) { // equivalent to flat
    cids = [cids];
  }

  const { rooms } = socketio.sockets.adapter as any;
  const { sockets } = socketio.sockets;

  const userIds: string[] = [];

  cids.forEach((cid) => {
    const clients: Set<string> = rooms.get(`${cid}:presence`);

    if (clients) {
      clients.forEach((client) => {
        const sock = sockets.get(client);
        if (sock) { userIds.push((sock as any)?.user?.id); }
      });
    }
  });

  function onlyUnique(value: string, index: number, self: string[]) {
    return self.indexOf(value) === index;
  }

  userIds.filter((uid) => uid).filter(onlyUnique);
  res.json(userIds);
};

export const joinController = (req: Request, res: Response): void => {
  const socketio: Server = req.app.get('socketio');
  const { userId, channelId } = req.body;
  const { sockets } = socketio.sockets;

  const userSocket = Array.from(sockets.values())
    .find((socket) => (socket as ExtSocket).user.id === userId);

  if (!userSocket) { res.sendStatus(400); }
  if (!userSocket?.rooms.has(`${channelId}:presence`)) { res.sendStatus(400); }

  userSocket?.emit(USER_JOIN, { channelId });
  res.sendStatus(200);
};
