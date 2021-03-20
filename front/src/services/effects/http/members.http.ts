/* eslint-disable @typescript-eslint/no-explicit-any */
import { back } from '../../../common/network/api';
import { IMember } from '../../../common/models';

const JsonToMembers = (json: any[]): IMember[] => json.map(
  (member: any) => ({
    id: member.id,
    name: member.name,
    email: member.email,
    role: member.role,
    joinedAt: new Date(member.joined_at),
  }),
);

export const fetchMembers = async (cid: string): Promise<IMember[]> => {
  const res = await back.get({ route: `channel/${cid}` });
  return JsonToMembers(res.members);
};

export const createMember = async (cid: string, uid: string): Promise<void> => {
  await back.post({ route: `channel/${cid}/membership/${uid}` });
};

export const deleteMember = async (cid: string, uid: string): Promise<void> => {
  await back.delete({ route: `channel/${cid}/membership/${uid}` });
};
