export interface IAuth {
  id: string;
  email: string;
  name: string;
  material: IMaterial;
  access: EAccess;
}

export interface IMaterial {
  puek: string; // public user encryption key
  suek: string; // secret user encryption key
  pkf: string // public key fingerprint
}

export enum EAccess {
  Guest = 0,
  User = 1,
  Admin = 2,
}
