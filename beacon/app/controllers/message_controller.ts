/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import Joi from 'joi';
import { createEvent } from '../helpers';
import { ExtSocket } from '../types';

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
  (socket: ExtSocket, payload: Message): void => {
    const response = {
      author: socket.user.id,
      message: payload.message,
    };
    socket.to(payload.channel).emit(RECEIVE_MESSAGE, response); // to room
    socket.emit(RECEIVE_MESSAGE, response); // to sender
  },
);
