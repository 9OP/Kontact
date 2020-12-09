import { handleApiErrors } from '../../common/http/api';
import { getToken, saveToken } from '../../common/http/local_storage';
import { IUser } from '../../common/models/user.model';

const API = process.env.REACT_APP_BASE_URL as string;
const TOKEN = process.env.REACT_APP_AUTH_TOKEN as string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JsonToUser = (json: any): IUser => ({
  id: json.id,
  email: json.email,
  name: json.name,
  access: json.access,
});

export const signin = async (email: string, password: string): Promise<IUser> => {
  await new Promise((r) => setTimeout(r, 700));
  const res = await fetch(`${API}/auth/signin`, {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleApiErrors);
  saveToken(res.token);
  return JsonToUser(res);
};

export const signup = async (email: string, password: string, name: string): Promise<IUser> => {
  const res = await fetch(`${API}/auth/signup`, {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  }).then(handleApiErrors);
  return JsonToUser(res);
};

export const signout = async (): Promise<void> => {
  const token = getToken();
  await fetch(`${API}/auth/signout`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
      [TOKEN]: token,
    },
  }).then(handleApiErrors);
};

export const whoami = async (): Promise<IUser> => {
  const token = getToken();
  const res = await fetch(`${API}/auth/whoami`, {
    method: 'get',
    headers: {
      'Content-type': 'application/json',
      [TOKEN]: token,
    },
  }).then(handleApiErrors);
  return JsonToUser(res);
};
