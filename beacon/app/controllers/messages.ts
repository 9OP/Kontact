/* eslint-disable no-console */
import { Socket } from 'socket.io';
import Joi from 'joi';
import { createEvent } from '../helpers';

// define schema here

// handlers name here

// move logic outside

export const sendMessage = createEvent('message:send', {
  message: Joi.string().required().description('The content of the message'),
  to: Joi.string().optional().description('The name of the user to send the message'),
}, (socket: Socket, { message, to }: {message: string, to: string}) => {
  // Insert your logic here
  console.log('message: ', message);
  console.log('socketId: ', socket.id);
});

export const receiveMessage = 0;
