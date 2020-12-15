import { IUser } from './user.model';

export interface IChannel {
  id: string,
  name: string,
  members: IUser[]
}
