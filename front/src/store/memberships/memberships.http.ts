/* eslint-disable import/prefer-default-export */
import { back } from '../../common/network/back';
import { IMembership } from '../../common/models/membership.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JsonToMemberships = (json: any): IMembership[] => {
  const memberhips: IMembership[] = [];

  json.forEach((m: IMembership) => {
    memberhips.push({ id: m.id, name: m.name });
  });

  return memberhips;
};

export const fetchMemberships = async (): Promise<IMembership[]> => {
  const res = await back.get({ route: 'auth/whoami' });
  return JsonToMemberships(res.channels);
};
