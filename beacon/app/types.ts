import { Socket } from 'socket.io';
import { IUser } from './models/user.model';

export interface ExtSocket extends Socket {
  // Custom Socket type with context variable
  user: IUser;
}
