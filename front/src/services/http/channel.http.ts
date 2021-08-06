/* eslint-disable @typescript-eslint/no-explicit-any */
import { back } from '../../common/network/api';
import { IChannel } from '../../common/models';
import { generateChannelEncryptionKey, unwrapChannelEncryptionKey } from '../../common/crypto';
import { userSocket } from '../socket';

const JsonToChannel = async (json: any, passphrase: string): Promise<IChannel> => {
  let scek = '';
  if (!json.pending) {
    const keyBundle = {
      key: json.material?.scek,
      salt: new Uint8Array(json.material?.salt),
      iv: new Uint8Array(json.material?.iv),
    };
    scek = await unwrapChannelEncryptionKey(keyBundle, passphrase);
  }

  return {
    id: json.channel.id,
    name: json.channel.name,
    createdAt: new Date(json.channel.created_at),
    material: { scek },
    active: !json.pending,
  };
};

const JsonToChannels = async (json: any, passphrase: string): Promise<IChannel[]> => {
  const channels = json.map(
    async (channel: IChannel) => JsonToChannel(channel, passphrase),
  );

  return Promise.all(channels);
};

export const fetchChannels = async (suek: string): Promise<IChannel[]> => {
  const res = await back.get({ route: 'channel/memberships?include_pending=1' });
  return JsonToChannels(res, suek);
};

export const createChannel = async (name: string, suek: string): Promise<IChannel> => {
  const { key, salt, iv } = await generateChannelEncryptionKey(suek);
  const material = {
    scek: key,
    salt: Array.from(salt),
    iv: Array.from(iv),
  };

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
