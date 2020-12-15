/* eslint-disable import/prefer-default-export */

import io from 'socket.io-client';

class Socket {
  host: string;

  socket: SocketIOClient.Socket;

  options: SocketIOClient.ConnectOpts;

  constructor(host: string, opts?: SocketIOClient.ConnectOpts) {
    const defaultConf = {
      autoConnect: false,
    };
    // this.socket = io(host, { ...defaultConf, ...opts });
    this.options = { ...defaultConf, ...opts };
    this.host = host;
    this.socket = null as unknown as SocketIOClient.Socket;
    // register default handler
    // on disconnect
  }

  public connect(token: string) {
    const auth = { auth: { token } };
    this.socket = io(this.host, { ...this.options, ...auth });
    this.socket.connect();
    // this.socket.emit('authentication', token);
  }

  public disconnect() {
    this.socket.disconnect();
  }

  // Manage add and deletes listenners

  // refresh user data (channels)

  // manages key sharing etc...
}

/**
 * Beacon Api
 */
const BEACON = process.env.REACT_APP_BEACON_URL as string;

export const beacon = new Socket(BEACON);
