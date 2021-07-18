export interface IMember {
  id: string;
  email: string;
  name: string;
  material: IMemberMaterial;
  role: ERole;
  joinedAt: Date;
}

export interface IMemberMaterial {
  puek: string; // public user encryption key
}

export type IMemberPreview = Pick<IMember, 'id' | 'name'>;

export enum ERole {
  Member = 0,
  Master = 1,
}
