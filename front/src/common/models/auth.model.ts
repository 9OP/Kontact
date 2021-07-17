export interface IAuth {
  id: string;
  email: string;
  name: string;
  material: IMaterial;
  access: EAccess;
}

export interface IMaterial {
  puek: string;
  suek: string;
}

export enum EAccess {
  Guest = 0,
  User = 1,
  Admin = 2,
}
