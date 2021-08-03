/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { bearer } from '../../common/network/api';
import { IMessage } from '../../common/models';
import { decryptMessage, MessageBundle } from '../../common/crypto';

export const JsonToMessage = async (data: any, key: string): Promise<IMessage> => {
  const bundle: MessageBundle = { text: data.content, iv: new Uint8Array(data.iv) };
  const decryptedContent = await decryptMessage(bundle, key);

  return {
    id: data.id,
    authorId: data.authorId,
    channelId: data.channelId,
    content: decryptedContent,
    date: new Date(data.date),
  };
};

const JsonToMessages = async (json: any[], key: string): Promise<IMessage[]> => {
  const messages = json.map(
    async (data: any) => JsonToMessage(data, key),
  );

  return Promise.all(messages);
};

export const fetchMessages = async (cid: string, key: string): Promise<IMessage[]> => {
  const res = await bearer.get({ route: `message/${cid}` });
  return JsonToMessages(res, key);
};
