/* eslint-disable no-shadow */
enum Access {
  GUEST = 0,
  USER = 1,
  ADMIN = 2,
}

enum Role {
  MEMBER = 0,
  MASTER = 1,
}

export interface IMembership {
  id: string,
  role: Role,
}

export interface IUser {
  id: string,
  access: Access,
}
