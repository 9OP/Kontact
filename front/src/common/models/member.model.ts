export interface IMember {
  id: string;
  email: string;
  name: string;
  role: ERole;
  joinedAt: Date;
}

export enum ERole {
  Member = 0,
  Master = 1,
}
