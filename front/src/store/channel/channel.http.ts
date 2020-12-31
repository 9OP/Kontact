/* eslint-disable import/prefer-default-export */
import { back } from '../../common/network/api';
import { IChannel, IMember } from '../../common/models/channel.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JsonToMember = (json: any): IMember => ({
  id: json.id,
  name: json.name,
  email: json.email,
  role: json.role,
  joinedAt: new Date(json.joined_at),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JsonToChannel = (json: any): IChannel => {
  const members: IMember[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json.members.forEach((m: any) => { members.push(JsonToMember(m)); });

  return {
    id: json.id,
    name: json.name,
    createdAt: new Date(json.created_at),
    members,
  };
};

export const fetchChannel = async (cid: string): Promise<IChannel> => {
  const res = await back.get({ route: `channel/${cid}` });
  return JsonToChannel(res);
};
