/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from 'socket.io';
import Joi from 'joi';

type SocketEvent = (socket: Socket, payload: any) => void;
interface Event {
  name: string,
  func: SocketEvent,
  validation: Joi.ObjectSchema<any>,
}

export const createEvent = (
  name: string,
  rules: Joi.SchemaMap<any>,
  func: SocketEvent,
): Event => ({
  name,
  func,
  validation: rules && Joi.object().keys(rules),
});

export const bindEvent = (socket: Socket, event: Event): void => {
  const { name, func, validation } = event;

  socket.on(name, (payload = {}) => {
    if (validation) {
      validation.validateAsync(payload).catch((err: any) => socket.emit(`${name}:error`, { err }));
    }
    return func(socket, payload);
  });
};
