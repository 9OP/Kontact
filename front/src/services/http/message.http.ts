/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { bearer } from '../../common/network/api';
import { IMessage } from '../../common/models';

export const JsonToMessage = (data: any): IMessage => ({
  id: data.id,
  authorId: data.authorId,
  channelId: data.channelId,
  content: data.content,
  date: new Date(data.date),
});

const JsonToMessages = (json: any[]): IMessage[] => json.map((data: any) => JsonToMessage(data));

export const fetchMessages = async (cid: string): Promise<IMessage[]> => {
  const res = await bearer.get({ route: `message/${cid}` });
  return JsonToMessages(res);
};
