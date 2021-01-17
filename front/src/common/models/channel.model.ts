export interface IMember {
  id: string;
  email: string;
  name: string;
  role: string;
  joinedAt: Date;
}

export interface IMessage {
  // id: string,
  authorId: string;
  author?: IMember;
  // verified: boolean;
  content: string;
  date: Date;
}

export interface IChannel {
  id: string;
  name: string;
  createdAt: Date;
  members: IMember[];
}
