/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import io from 'socket.io-client';

class Socket {
  host: string;

  socket: SocketIOClient.Socket;

  options: SocketIOClient.ConnectOpts;

  subscriptions: {event: string, fn: Function}[];

  emissions: {event: string, payload: any, ack?: Function}[];

  constructor(host: string, opts?: SocketIOClient.ConnectOpts) {
    const defaultConf = {
      autoConnect: false,
    };
    this.options = { ...defaultConf, ...opts };
    this.host = host;
    this.socket = null as unknown as SocketIOClient.Socket;
    this.subscriptions = [];
    this.emissions = [];
  }

  public connect(token: string) {
    if (this.socket) { this.disconnect(); }

    const auth = { auth: { token } };
    this.socket = io(this.host, { ...this.options, ...auth });
    this.socket.connect();

    this.subscriptions.forEach((sub) => {
      this.socket.on(sub.event, sub.fn);
    });
    this.emissions.forEach((em) => {
      this.socket.emit(em.event, em.payload, em?.ack);
    });
  }

  public disconnect() {
    this.socket.disconnect();
    this.socket = null as unknown as SocketIOClient.Socket;
  }

  public on(event: string, fn: Function) {
    if (this.socket) {
      this.socket.on(event, fn);
    } else {
      this.subscriptions.push({ event, fn });
    }
  }

  public emit(event: string, payload: any, ack?: Function) {
    if (this.socket) {
      this.socket.emit(event, payload, ack);
    } else {
      this.emissions.push({ event, payload, ack });
    }
  }
}

/**
 * Beacon Api
 */
const BEACON = process.env.REACT_APP_BEACON_URL as string;

export const beacon = new Socket(BEACON);
