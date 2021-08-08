/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { BACKEND_API, BEARER_API } from './config';
import { IUser, IMembership } from './models';

const back = axios.create({
  baseURL: BACKEND_API,
  timeout: 2000,
});

const bearer = axios.create({
  baseURL: BEARER_API,
  timeout: 2000,
});

const JSONtoIMemberships = (data: any): IMembership[] => {
  const memberships: IMembership[] = [];
  data.forEach((membership: IMembership) => {
    memberships.push({
      role: membership.role,
      user: membership.user,
      channel: membership.channel,
      pending: membership.pending,
    });
  });
  return memberships;
};

const JSONtoIUser = (data: any): IUser => ({
  id: data.id,
  access: data.access,
});

export const whoami = async (token: string): Promise<IUser> => {
  const res = await back.get('/auth/whoami', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return JSONtoIUser(res.data);
};

export const fetchMemberships = async (token: string): Promise<IMembership[]> => {
  const res = await back.get('/channel/memberships?include_pending=1', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return JSONtoIMemberships(res.data);
};

// Do not marshall the response to keep the responsibility of the interface format
// to Bearer service
export const saveMessage = async (
  channelId: string,
  content: string,
  iv: number[],
  token: string,
): Promise<any> => {
  const res = await bearer.post(`/message/${channelId}`, JSON.stringify({ content, iv }), {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};
