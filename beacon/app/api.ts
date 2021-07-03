/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { BACKEND_API, BEARER_API, BEARER_TOKEN } from './config';
import { IUser, IMembership, IMessage } from './models';

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
  data.forEach((channel: IMembership) => memberships.push({ id: channel.id, role: channel.role }));
  return memberships;
};

const JSONtoIUser = (data: any): IUser => ({
  id: data.id,
  access: data.access,
});

let ID_COUNTER = 0; // temporary until bearer implements a uuid (mongodb)
const JSONtoIMessage = (data: any): IMessage => ({
  // eslint-disable-next-line no-plusplus
  id: data.id || String(ID_COUNTER++),
  channelId: data.channelId,
  authorId: data.authorId,
  content: data.data,
  // date: data.date,
});

export const whoami = async (token: string): Promise<IUser> => {
  const res = await back.get('/auth/whoami', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return JSONtoIUser(res.data);
};

export const fetchMemberships = async (token: string): Promise<IMembership[]> => {
  const res = await back.get('/channel/memberships', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return JSONtoIMemberships(res.data);
};

export const saveMessage = async (
  channelId: string,
  authorId: string,
  data: string,
): Promise<IMessage> => {
  const res = await bearer.post(`/message/${channelId}`, JSON.stringify({
    authorId,
    data,
  }), {
    headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
  });

  return JSONtoIMessage(res.data);
};
