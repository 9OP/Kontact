/* eslint-disable no-use-before-define */
import * as http from 'http';
import express from 'express';
import { Server } from 'socket.io';

import { ExtSocket } from './types';
import { authentication } from './middlewares';
import binders from './controllers';
import { presenceDisconnect } from './controllers/user_controller';

// App factory
const createApp = (): http.Server => {
  // Express
  const app = express();
  app.get('/presence', (req, res) => {
    let cids = req.query.channel as string[];
    if (!Array.isArray(cids)) { // equivalent to flat
      cids = [cids];
    }

    const { rooms } = io.sockets.adapter as any;
    const { sockets } = io.sockets;

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
  });

  const httpServer = http.createServer(app);

  // SocketIo
  const io = new Server({
    cors: {
      origin: '*',
    },
    path: '/beacon',
  });

  io.listen(httpServer);
  io.use(authentication);

  io.on('connection', (socket: ExtSocket) => {
    // console.log(`Socket ${socket.id} connected.`);
    // socket.on('disconnect', () => {
    //   console.log(`Socket ${socket.id} disconnected.`);
    // });
    socket.on('disconnecting', () => {
      presenceDisconnect(socket);
    });

    binders.forEach((binder) => binder(socket));
  });

  return httpServer;
};

// Create app
const bearer = createApp();
bearer.listen(4000, '0.0.0.0');
