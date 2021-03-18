import { Socket } from 'socket.io';
import { IMembership, IUser } from './models/user.model';

export interface ExtSocket extends Socket {
  // Custom Socket type with context variables
  user: IUser;
  token: string;
  memberships: IMembership[];
}
