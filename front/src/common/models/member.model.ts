export interface IMember {
  id: string;
  email: string;
  name: string;
  role: ERole;
  joinedAt: Date;
}

export type IMemberPreview = Pick<IMember, 'id' | 'name'>

export enum ERole {
  Member = 0,
  Master = 1,
}
