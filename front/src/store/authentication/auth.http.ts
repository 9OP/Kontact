import { IUser } from '../../common/models/user.model';

const API = process.env.REACT_APP_BASE_URL as string;
const TOKEN = process.env.REACT_APP_AUTH_TOKEN as string;

async function handleApiErrors(response: Response) {
  const json = await response.json();
  if (!response.ok) {
    // discriminate type of errors
    throw Error(json.description || response.statusText);
  }
  return json;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JsonToUser = (json: any): IUser => ({
  id: json.id,
  email: json.email,
  name: json.name,
  access: json.access,
});

export const signin = async (email: string, password: string): Promise<IUser> => {
  const res = await fetch(`${API}/auth/signin`, {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleApiErrors);
  await new Promise((r) => setTimeout(r, 500));
  localStorage.setItem(TOKEN, res.token);
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

export const signout = async (): Promise<Response> => {
  const token = localStorage.getItem(TOKEN) || '';
  const res = await fetch(`${API}/auth/signout`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
      [TOKEN]: token,
    },
  }).then(handleApiErrors);
  return res;
};

export const whoami = async (): Promise<IUser> => {
  const token = localStorage.getItem(TOKEN) || '';
  const res = await fetch(`${API}/auth/whoami`, {
    method: 'get',
    headers: {
      'Content-type': 'application/json',
      [TOKEN]: token,
    },
  }).then(handleApiErrors);
  return JsonToUser(res);
};
