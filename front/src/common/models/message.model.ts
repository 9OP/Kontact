export interface IMessage {
  id: string,
  authorId: string;
  channelId: string;
  content: string;
  date: Date;
}
