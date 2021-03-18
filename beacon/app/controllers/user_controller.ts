/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createEvent } from './events';
import { ExtSocket } from '../types';
import { whoami, fetchMemberships } from '../api';

const WHOAMI_AUTH = 'auth:whoami';

export const authWhoami = createEvent(
  WHOAMI_AUTH,
  {},
  async (socket: ExtSocket, payload: null, ack: () => void) => {
    const { token } = socket;
    const user = await whoami(token);
    const memberships = await fetchMemberships(token);
    socket.user = user;
    socket.memberships = memberships;
    memberships.forEach((channel) => socket.join(channel.id));
    ack();
  },
);
