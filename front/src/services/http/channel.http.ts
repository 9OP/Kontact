/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { back, beacon } from '../../common/network/api';
import { IChannel } from '../../common/models';
import { generateCEK, wrapCEK, unwrapCEK } from '../../common/crypto';
import { userSocket } from '../socket';

const JsonToChannel = async (json: any, suek: string): Promise<IChannel> => {
  let scek = '';
  if (!json.pending) {
    // should try catch ?
    scek = await unwrapCEK(json.material?.scek, suek);
  }

  return {
    id: json.channel.id,
    name: json.channel.name,
    createdAt: new Date(json.channel.created_at),
    material: { scek },
    active: !json.pending,
  };
};

const JsonToChannels = async (json: any, suek: string): Promise<IChannel[]> => {
  const channels = json.map(
    async (channel: IChannel) => JsonToChannel(channel, suek),
  );

  return Promise.all(channels);
};

export const fetchChannels = async (suek: string): Promise<IChannel[]> => {
  const res = await back.get({ route: 'channel/memberships?include_pending=1' });
  return JsonToChannels(res, suek);
};

export const createChannel = async (name: string, puek: string, suek: string): Promise<IChannel> => {
  const cek = await generateCEK();
  const wrappedCek = await wrapCEK(cek, puek);
  const material = { scek: wrappedCek };

  const res = await back.post({
    route: 'channel',
    payload: { name, material },
  });

  // Force Beacon to refetch new memberships from Back
  await userSocket.reloadBeacon();

  return JsonToChannel(res, suek);
};

export const deleteChannel = async (cid: string): Promise<void> => {
  await back.delete({ route: `channel/${cid}` });
};

export const joinChannel = async (cid: string): Promise<void> => {
  await back.post({ route: `channel/${cid}/join` });
};

// Fetch ids of users connected to beacon
export const fetchPresence = async (cids: string[]): Promise<string[]> => {
  const query = `?channel=${cids.join('&channel=')}`;
  const res = await beacon.get({
    route: `presence${query}`,
  });
  return res;
};
