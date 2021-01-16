/* eslint-disable no-shadow */
enum Access {
  GUEST = '<guest>',
  USER = '<user>',
  ADMIN = '<admin>',
}

enum Role {
  MEMBER = '<member>',
  MASTER = '<master>',
}

export interface IMembership {
  id: string,
  role: Role,
}

export interface IUser {
  id: string,
  access: Access,
  memberships: IMembership[],
}
