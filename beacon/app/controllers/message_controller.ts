/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import Joi from 'joi';
import { createEvent } from './events';
import { ExtSocket } from '../types';

let ID_COUNTER = 0;
const DATABASE: { channel: string; author: string; message: string; }[] = [];

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
  (socket: ExtSocket, payload: Message, ack: () => void): void => {
    if (!socket.rooms.has(payload.channel)) {
      throw new Error('Unauthorized');
    }

    const response = {
      id: ID_COUNTER,
      channel: payload.channel,
      author: socket.user.id,
      message: payload.message,
    };

    ID_COUNTER += 1;
    DATABASE.push(response);
    // console.log(DATABASE);

    socket.to(payload.channel).emit(RECEIVE_MESSAGE, response); // to room
    socket.emit(RECEIVE_MESSAGE, response); // to sender
    ack();
  },
);

// Fetch from DATABASE

const FETCH_MESSAGES = 'messages:fetch';
const RECEIVE_MESSAGES = 'messages:receive';

const FETCH_MESSAGES_VALIDATION = {
  channel: Joi.string().required(), // channel-id
};

interface Channel {
  channel: string
}

export const fetchMessages = createEvent(
  FETCH_MESSAGES,
  FETCH_MESSAGES_VALIDATION,
  (socket: ExtSocket, payload: Channel, ack: () => void): void => {
    const messages = DATABASE.filter((message: Message) => message.channel === payload.channel);
    socket.emit(RECEIVE_MESSAGES, messages); // to sender
    ack();
  },
);
