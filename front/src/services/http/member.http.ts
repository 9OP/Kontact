/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { back } from '../../common/network/api';
import {
  ERole, IMember, IMemberPreview,
} from '../../common/models';
import { publicKeyFingerprint, wrapCEK } from '../../common/crypto';

const JsonToMember = async (json: any): Promise<IMember> => {
  const pkf = await publicKeyFingerprint(json.user.material?.puek);

  return {
    id: json.user.id,
    name: json.user.name,
    email: json.user.email,
    material: {
      puek: json.user.material?.puek,
      pkf,
    },
    pending: json.pending,
    role: json.role,
    connected: false,
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
  const members = json.map(async (member: any) => {
    const pkf = await publicKeyFingerprint(member.material?.puek);

    return {
      id: member.id,
      name: member.name,
      email: member.email,
      material: {
        puek: member.material?.puek,
        pkf,
      },
      pending: member.pending,
      role: member.role,
      connected: false,
    };
  });

  return Promise.all(members);
};

export const fetchMembers = async (cid: string): Promise<IMember[]> => {
  const res = await back.get({ route: `channel/${cid}` });
  return JsonToMembers(res.members);
};

export const createMember = async (cid: string, uid: string, cek: string, puek: string): Promise<IMember> => {
  const wrappedCek = await wrapCEK(cek, puek);
  const material = { scek: wrappedCek };

  const res = await back.post({
    route: `channel/${cid}/membership/${uid}`,
    payload: { material },
  });
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
