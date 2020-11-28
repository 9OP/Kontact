import { Socket } from 'socket.io';
import * as Joi from 'joi';

function assert(condition: boolean, message: string) {
  if (!condition) {
    const mess = message || 'Assertion failed';
    throw new Error(mess);
  }
}

/**
   * Create an event to be implemented into sockets
   * @param {String} name - The name of the event
   * @param {object} rules - Object containing Joi validation rules
   * @param {Function} fn - The function to be called on event
   * @returns {*} The event Object
   */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createEvent = (
  name: string,
  rules: any,
  fn: (socket: Socket, payload: any) => any,
): any => {
  assert(!!name, 'helpers - socket.createEvent() must have a name');
  assert(typeof fn === 'function', 'helpers - socket.createEvent() must have a function');

  return {
    name,
    fn,
    validation: rules && Joi.object().keys(rules),
  };
};

/**
   * Bind an event to a socket
   * @param {String} name - The name of the event
   * @param {any} validation - A Joi object validation
   * @param {Function} fn - The function to be called on event
   */
export const bindEvent = (socket: Socket, { name, validation, fn }: any) => {
  socket.on(name, (payload = {}) => {
    // Validate

    if (validation) {
      validation.validateAsync(payload).then((val: any) => {
        console.log('pass validation: ', val);
      }).catch((err: any) => socket.emit(`${name}:error`, { err }));
      // throw new Error(`Failed to validate input ${err.details[0].message}`);
    }

    return fn(socket, payload);
  });
};
