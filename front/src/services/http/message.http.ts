/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { bearer } from '../../common/network/api';
import { IMessage } from '../../common/models';

// duplicate from message.hooks.ts: the issue is to maintain the same interface of messages returned
// by beacon and bearer
let ID_COUNTER = 0; // temporary until bearer implements a uuid (mongodb)
const JsonToMessage = (data: any): IMessage => ({
  id: data.id || String(ID_COUNTER++),
  authorId: data.authorId,
  channelId: data.channelId,
  content: data.data,
  date: new Date(), // should use date send back
});

const JsonToMessages = (json: any[]): IMessage[] => json.map((data: any) => JsonToMessage(data));

export const fetchMessages = async (cid: string): Promise<IMessage[]> => {
  const res = await bearer.get({ route: `message/${cid}` });
  return JsonToMessages(res);
};
