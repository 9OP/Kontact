/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import Joi from 'joi';
import { createEvent } from './events';
import { ExtSocket } from '../types';
import { saveMessage } from '../api';

// const ID_COUNTER = 0;
// const DATABASE: { channel: string; author: string; message: string; }[] = [];

const SEND_MESSAGE = 'message:send';
const RECEIVE_MESSAGE = 'message:receive';

const SEND_MESSAGE_VALIDATION = {
  message: Joi.string().required(), // message
  channel: Joi.string().required(), // channel-id
};

interface Message {
  message: string,
  channel: string,
}

export const sendMessage = createEvent(
  SEND_MESSAGE,
  SEND_MESSAGE_VALIDATION,
  async (socket: ExtSocket, payload: Message, ack: () => void): Promise<void> => {
    if (!socket.rooms.has(payload.channel)) {
      throw new Error('Unauthorized');
    }

    const message = await saveMessage(payload.channel, socket.user.id, payload.message);

    socket.to(payload.channel).emit(RECEIVE_MESSAGE, message); // to room
    socket.emit(RECEIVE_MESSAGE, message); // to sender
    ack();
  },
);

// Fetch will be carried through bearer from the front without using beacon
// Fetch from DATABASE

// const FETCH_MESSAGES = 'messages:fetch';
// const RECEIVE_MESSAGES = 'messages:receive';

// const FETCH_MESSAGES_VALIDATION = {
//   channel: Joi.string().required(), // channel-id
// };

// interface Channel {
//   channel: string
// }

// export const fetchMessages = createEvent(
//   FETCH_MESSAGES,
//   FETCH_MESSAGES_VALIDATION,
//   (socket: ExtSocket, payload: Channel, ack: () => void): void => {
//     const messages = DATABASE.filter((message: Message) => message.channel === payload.channel);
//     socket.emit(RECEIVE_MESSAGES, messages.slice(Math.max(messages.length - 5, 1))); // to sender
//     ack();
//   },
// );
