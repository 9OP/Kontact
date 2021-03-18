export interface IMembership {
  id: string;
  channelId: string;
  memberId: string;
  role: ERole;
  joinedAt: Date;
}

export enum ERole {
  Member = 0,
  Master = 1,
}
