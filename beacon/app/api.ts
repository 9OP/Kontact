/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { IUser, IMembership } from './models/user.model';

const BACKEND_API = 'http://proxy/api'; // process.env.BACKEND_API
const back = axios.create({
  baseURL: BACKEND_API,
  timeout: 2000,
  // headers: { Referer: 'http://localhost:3000' },
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
