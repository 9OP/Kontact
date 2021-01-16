/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi';
import { ExtSocket } from '../types';

type SocketEvent = (socket: ExtSocket, payload: any) => void;
type SocketBinder = (socket: ExtSocket) => void;

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

export const bindEvent = (event: Event): SocketBinder => {
  const { name, func, validation } = event;

  return (socket: ExtSocket) => {
    socket.on(name, (payload = {}) => {
      validation.validateAsync(payload)
        .then(
          () => {
            func(socket, payload);
          },
        )
        .catch(
          (err: any) => socket.emit(`${name}:error`, { error: err }),
        );
    });
  };
};
