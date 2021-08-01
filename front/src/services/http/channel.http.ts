/* eslint-disable @typescript-eslint/no-explicit-any */
import { back } from '../../common/network/api';
import { IChannel } from '../../common/models';
import { generateChannelEncryptionKey, unwrapChannelEncryptionKey } from '../../common/crypto';
import { userSocket } from '../socket';

const JsonToChannel = async (json: any, passphrase: string): Promise<IChannel> => {
  const keyBundle = {
    key: json.material?.scek,
    salt: new Uint8Array(json.material?.salt),
    iv: new Uint8Array(json.material?.iv),
  };
  const scek = await unwrapChannelEncryptionKey(keyBundle, passphrase);

  return {
    id: json.id,
    name: json.name,
    createdAt: new Date(json.created_at),
    material: { scek },
  };
};

const JsonToChannels = async (json: any, passphrase: string): Promise<IChannel[]> => {
  const channels = json.map(
    async (channel: IChannel) => JsonToChannel(channel, passphrase),
  );

  return Promise.all(channels);
};

export const fetchChannels = async (suek: string): Promise<IChannel[]> => {
  const res = await back.get({ route: 'channel/memberships' });
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

  console.log('before reload');
  // Force Beacon to refetch new memberships from Back
  await userSocket.reloadBeacon();
  console.log('after reload');

  return JsonToChannel(res, suek);
};

export const deleteChannel = async (cid: string): Promise<void> => {
  await back.delete({ route: `channel/${cid}` });
};
