export interface IMember { // similar to IAuth
  id: string;
  email: string;
  name: string;
  material: IMemberMaterial;
  role: ERole,
  pending: boolean,
}

export interface IMemberMaterial {
  puek: string; // public user encryption key
  pkf: string; // public key fingerprint
}

export type IMemberPreview = Pick<IMember, 'id' | 'name'>;

export enum ERole {
  Member = 0,
  Master = 1,
}

// export interface IMembership {
//   userId: string;
//   channelId: string;
//   role: ERole;
//   pending: boolean;
//   joinedAt: Date;
// }
