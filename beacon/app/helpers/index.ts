/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi';
import { ExtSocket } from '../types';

type SocketEvent = (socket: ExtSocket, payload: any) => void;
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

export const bindEvent = (socket: ExtSocket, event: Event): void => {
  const { name, func, validation } = event;

  socket.on(name, (payload = {}) => {
    validation.validateAsync(payload)
      .then(
        () => func(socket, payload),
      )
      .catch(
        (err: any) => socket.emit(`${name}:error`, { error: err }),
      );
  });
};
