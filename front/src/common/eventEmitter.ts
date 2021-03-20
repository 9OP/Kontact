/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
export enum Events {
  // exemple
  CHANNEL_DELETED = 'channel_deleted'
}

type cb = (...args: any[]) => void

interface events {
  [key: string]: cb[],
}

export const eventEmitter = {
  _events: <events>{},

  dispatch<T>(event: Events, data: T): void {
    if (!this._events) return;
    this._events[event].forEach((callback) => callback(data));
  },

  subscribe(event: Events, callback: cb): void {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
  },

  unsubscribe(event: Events): void {
    if (!this._events[event]) return;
    delete this._events[event];
  },
};
