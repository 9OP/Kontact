/* eslint-disable @typescript-eslint/no-explicit-any */
import { back } from '../../../common/network/api';
import { ERole, IMember } from '../../../common/models';

const JsonToMember = (json: any): IMember => ({
  id: json.id,
  name: json.name,
  email: json.email,
  role: json.role,
  joinedAt: new Date(json.joined_at),
});

const JsonToMembers = (json: any[]): IMember[] => json.map((member: any) => JsonToMember(member));

export const fetchMembers = async (cid: string): Promise<IMember[]> => {
  const res = await back.get({ route: `channel/${cid}` });
  return JsonToMembers(res.members);
};

export const createMember = async (cid: string, uid: string): Promise<IMember> => {
  const res = await back.post({ route: `channel/${cid}/membership/${uid}` });
  return JsonToMember(res);
};

export const deleteMember = async (cid: string, uid: string): Promise<void> => {
  await back.delete({ route: `channel/${cid}/membership/${uid}` });
};

export const updateMember = async (cid: string, uid: string, role: ERole): Promise<IMember> => {
  const res = await back.put({
    route: `channel/${cid}/membership/${uid}`,
    payload: { role },
  });
  return JsonToMember(res);
};
