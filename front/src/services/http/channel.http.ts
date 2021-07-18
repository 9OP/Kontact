/* eslint-disable @typescript-eslint/no-explicit-any */
import { back } from '../../common/network/api';
import { IChannel } from '../../common/models';

const JsonToChannel = (json: any): IChannel => ({
  id: json.id,
  name: json.name,
  createdAt: new Date(json.createdAt),
  material: {
    pcek: json.material?.pcek,
    scek: json.material?.scek,
  },
});

const JsonToChannels = (json: any): IChannel[] => json.map(
  (channel: IChannel) => JsonToChannel(channel),
);

export const fetchChannels = async (): Promise<IChannel[]> => {
  const res = await back.get({ route: 'channel/memberships' });
  return JsonToChannels(res);
};

export const createChannel = async (name: string): Promise<IChannel> => {
  const res = await back.post({
    route: 'channel',
    payload: { name },
  });

  return JsonToChannel(res);
};

export const deleteChannel = async (cid: string): Promise<void> => {
  await back.delete({ route: `channel/${cid}` });
};
