import { back } from '../../common/http/api';
import { getToken, saveToken, clearToken } from '../../common/http/local_storage';
import { IUser } from '../../common/models/user.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JsonToUser = (json: any): IUser => ({
  id: json.id,
  email: json.email,
  name: json.name,
  access: json.access,
});

const key = async (): Promise<string> => {
  const res = await back.get({
    route: 'auth/key',
  });
  return res.key;
};

export const signin = async (email: string, password: string): Promise<IUser> => {
  await new Promise((r) => setTimeout(r, 700));
  const res = await back.post({
    route: 'auth/signin',
    payload: { email, password },
  });
  const { token } = res;
  saveToken(token, await key());
  back.authorization = { Authorization: `Bearer ${token}` };
  return JsonToUser(res);
};

export const signup = async (email: string, password: string, name: string): Promise<IUser> => {
  const res = await back.post({
    route: 'auth/signup',
    payload: { email, password, name },
  });
  return JsonToUser(res);
};

export const signout = async (): Promise<void> => {
  await back.post({
    route: 'auth/signout',
  });
  clearToken();
};

export const whoami = async (): Promise<IUser> => {
  if (!back.authorization) {
    const token = getToken(await key());
    back.authorization = { Authorization: `Bearer ${token}` };
  }
  const res = await back.get({
    route: 'auth/whoami',
  });
  return JsonToUser(res);
};
