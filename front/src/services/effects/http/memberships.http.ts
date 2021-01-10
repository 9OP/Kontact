/* eslint-disable import/prefer-default-export */
import { back } from '../../../common/network/api';
import { IMembership } from '../../../common/models/membership.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JsonToMemberships = (json: any): IMembership[] => {
  const memberhips: IMembership[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json.forEach((m: any) => {
    memberhips.push({ id: m.id, name: m.name });
  });

  return memberhips;
};

export const fetchMemberships = async (): Promise<IMembership[]> => {
  const res = await back.get({ route: 'auth/whoami' });
  return JsonToMemberships(res.channels);
};
