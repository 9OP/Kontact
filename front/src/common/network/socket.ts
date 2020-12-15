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
    this.options = { ...defaultConf, ...opts };
    this.host = host;
    this.socket = null as unknown as SocketIOClient.Socket;
  }

  public connect(token: string) {
    if (this.socket) { this.disconnect(); }

    const auth = { auth: { token } };
    this.socket = io(this.host, { ...this.options, ...auth });
    this.socket.connect();
  }

  public disconnect() {
    this.socket.disconnect();
    this.socket = null as unknown as SocketIOClient.Socket;
  }
}

/**
 * Beacon Api
 */
const BEACON = process.env.REACT_APP_BEACON_URL as string;

export const beacon = new Socket(BEACON);
// access socket with beacon.socket
