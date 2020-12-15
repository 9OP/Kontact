/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import Joi from 'joi';
import { Socket } from 'socket.io';
import { createEvent } from '../helpers';

const SEND_MESSAGE = 'message:send';

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
    console.log('message:send', socket.id, payload);
    // add author id in payload
    // socket.to(payload.channel).emit(SEND_MESSAGE, { message: payload.message });
    // console.log('message: ', payload.message);
    // console.log('channel: ', payload.channel);
    // console.log('socketId: ', socket.id);
  },
);
