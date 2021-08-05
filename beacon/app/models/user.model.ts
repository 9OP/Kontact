import { string } from 'joi';

/* eslint-disable no-shadow */
export enum Access {
  GUEST = 0,
  USER = 1,
  ADMIN = 2,
}

export enum Role {
  MEMBER = 0,
  MASTER = 1,
}

export interface IUser {
  id: string,
  access: Access,
}

export interface IChannel {
  id: string,
}

export interface IMembership {
  role: Role,
  user: IUser,
  channel: IChannel,
}
