export interface IMessage {
  id: string,
  authorId: string;
  channelId: string;
  // verified: boolean;
  content: string;
  date: Date;
}
