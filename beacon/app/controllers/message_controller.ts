/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import Joi from 'joi';
import { createEvent } from './events';
import { ExtSocket } from '../types';
import { saveMessage } from '../api';

const SEND_MESSAGE = 'message:send';
const RECEIVE_MESSAGE = 'message:receive';

const SEND_MESSAGE_VALIDATION = {
  message: Joi.string().required(), // message
  channel: Joi.string().required(), // channelId
};

interface Message {
  message: string;
  channel: string;
  iv: number[];
}

export const sendMessage = createEvent(
  SEND_MESSAGE,
  SEND_MESSAGE_VALIDATION,
  async (socket: ExtSocket, payload: Message, ack: () => void): Promise<void> => {
    if (!socket.rooms.has(payload.channel)) {
      throw new Error('Unauthorized');
    }

    console.log('payload', payload);

    const message = await saveMessage(
      payload.channel,
      payload.message,
      payload.iv,
      socket.token,
    );

    console.log('message', message);

    socket.to(payload.channel).emit(RECEIVE_MESSAGE, message); // to room
    socket.emit(RECEIVE_MESSAGE, message); // to sender
    ack();
  },
);
