/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { back } from '../../../common/network/api';
import { IMemberPreview } from '../../../common/models';

const JsonToMemberPreviews = (json: any): IMemberPreview[] => json.map((member: IMemberPreview) => (
  {
    id: member.id,
    name: member.name,
  }
));

export const searchUser = async (name = '', email = ''): Promise<IMemberPreview[]> => {
  const res = await back.get({
    route: `user/search?name=${name}&email=${email}`,
  });
  return JsonToMemberPreviews(res);
};
