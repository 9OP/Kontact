/* eslint-disable @typescript-eslint/no-explicit-any */
import { back } from '../../../common/network/api';
import { IMembership, IMember, IChannel } from '../../../common/models';

const JsonToChannels = (json: any): IChannel[] => json.map(
  (channel: IChannel) => ({
    id: channel.id,
    name: channel.name,
    createdAt: new Date(channel.createdAt),
  }),
);

const JsonToMembers = (json: any[]): IMember[] => json.map(
  (member: any) => ({
    id: member.id,
    name: member.name,
    email: member.email,
    // role: member.role,
    // joinedAt: new Date(member.joinedAt),
  }),
);

const JsonToMemberships = (cid: string, json: any[]): IMembership[] => json.map(
  (member: any) => ({
    id: `${cid}.${member.id}`,
    channelId: cid,
    memberId: member.id,
    role: member.role,
    joinedAt: new Date(member.joined_at),
  }),
);

export const fetchChannels = async (): Promise<IChannel[]> => {
  const res = await back.get({ route: 'channel/memberships' });
  return JsonToChannels(res);
};

export const fetchMembers = async (cid: string): Promise<{
  members: IMember[], memberships: IMembership[] }> => {
  const res = await back.get({ route: `channel/${cid}` });

  const members = JsonToMembers(res.members);
  const memberships = JsonToMemberships(cid, res.members);
  return { members, memberships };
};
