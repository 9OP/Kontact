export interface IMember {
  id: string;
  email: string;
  name: string;
  role: string;
  joinedAt: Date;
}

export interface IChannel {
  id: string;
  name: string;
  createdAt: Date;
  members: IMember[];
}
