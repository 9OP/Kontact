/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi';
import { ExtSocket } from '../types';

type SocketEvent = (socket: ExtSocket, payload: any, ack: () => void) => Promise<void>;
type SocketBinder = (socket: ExtSocket) => void;

interface Event {
  name: string,
  func: SocketEvent,
  validation: Joi.ObjectSchema<any> | null,
}

export const createEvent = (
  name: string,
  rules: Joi.SchemaMap<any> | null,
  func: SocketEvent,
): Event => ({
  name,
  func,
  validation: rules && Joi.object().keys(rules),
});

export const bindEvent = (event: Event): SocketBinder => {
  const { name, func, validation } = event;

  return (socket: ExtSocket) => {
    socket.on(name, async (payload = {}, ack = () => null) => {
      try {
        if (validation) {
          await validation.validateAsync(payload);
        }
        await func(socket, payload, ack);
      } catch (err) {
        console.log(err);
        ack(`${name}:error`);
      }

      // validation.validateAsync(payload)
      //   .then(
      //     async () => {
      //       await func(socket, payload, ack);
      //     },
      //   )
      //   .catch(
      //     // (err: any) => socket.emit(`${name}:error`, { error: err }),
      //     () => { ack(`${name}:error`); },
      //   );
    });
  };
};
