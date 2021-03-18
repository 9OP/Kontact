export interface IAuth {
  id: string,
  email: string,
  name: string,
  access: EAccess,
}

export enum EAccess {
  Guest = 0,
  User = 1,
  Admin = 2,
}
