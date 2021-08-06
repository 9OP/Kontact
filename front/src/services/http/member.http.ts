/* eslint-disable @typescript-eslint/no-explicit-any */
import { back } from '../../common/network/api';
import {
  ERole, IMember, IMemberPreview,
} from '../../common/models';
import { publicKeyFingerprint } from '../../common/crypto';

const JsonToMember = async (json: any): Promise<IMember> => {
  const pkf = await publicKeyFingerprint(json.material?.puek);

  return {
    id: json.id,
    name: json.name,
    email: json.email,
    material: {
      puek: json.material?.puek,
      pkf,
    },
    pending: json.pending,
    role: json.role,
  };
};

// const JsonToMembership = (json: any): IMembership => ({
//   userId: json.user.id,
//   channelId: json.channel.id,
//   pending: json.pending,
//   role: json.role,
//   joinedAt: new Date(json.joined_at),
// });

const JsonToMembers = async (json: any[]): Promise<IMember[]> => {
  const members = json.map(
    async (member: any) => JsonToMember(member),
  );

  return Promise.all(members);
};

export const fetchMembers = async (cid: string): Promise<IMember[]> => {
  const res = await back.get({ route: `channel/${cid}` });
  return JsonToMembers(res.members);
};

export const createMember = async (cid: string, uid: string): Promise<IMember> => {
  // generate scek and send material

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

const JsonToMemberPreviews = (json: any): IMemberPreview[] => json.map((member: IMemberPreview) => (
  {
    id: member.id,
    name: member.name,
  }
));

export const searchUser = async (value = ''): Promise<IMemberPreview[]> => {
  let query = `name=${value}`;
  if (value[0] === '#') {
    query = `id=${value.slice(1)}`;
  }
  const res = await back.get({
    route: `user/search?${query}`,
  });
  return JsonToMemberPreviews(res);
};
