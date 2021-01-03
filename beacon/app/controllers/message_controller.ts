/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import Joi from 'joi';
import { Socket } from 'socket.io';
import { createEvent } from '../helpers';

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
  (socket: Socket, payload: Message): void => {
    // add author id in payload
    const cid = payload.channel;
    socket.to(`channel:${cid}`).emit(RECEIVE_MESSAGE, { message: payload.message }); // to room
    socket.emit(RECEIVE_MESSAGE, { message: payload.message }); // to sender
  },
);
