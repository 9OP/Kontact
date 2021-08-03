import { IMember } from './member.model';

export interface IMessage {
  id: string,
  authorId: string;
  channelId: string;
  content: string;
  date: Date;
}

export interface IMemberMessage {
  data: IMessage;
  author: IMember;
}
