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

export const signin = async (email: string, password: string): Promise<IUser> => {
  await new Promise((r) => setTimeout(r, 700));
  const res = await back.post({
    route: 'auth/signin',
    payload: { email, password },
  });
  saveToken(res.token);
  return JsonToUser(res);
};

export const signup = async (email: string, password: string, name: string): Promise<IUser> => {
  const res = await back.post({
    route: 'auth/signup',
    payload: { email, password, name },
  });
  saveToken(res.token);
  return JsonToUser(res);
};

export const signout = async (): Promise<void> => {
  const token = getToken();
  await back.post({
    route: 'auth/signout',
    headers: { Authorization: `Bearer ${token}` },
  });
  clearToken();
};

export const whoami = async (): Promise<IUser> => {
  const token = getToken();
  const res = await back.get({
    route: 'auth/whoami',
    headers: { Authorization: `Bearer ${token}` },
  });
  return JsonToUser(res);
};

export const key = async (): Promise<string> => {
  const res = await back.get({
    route: 'auth/key',
  });
  return res.key;
};

/**
 * Logic to implement:
 * - when signin (getting token), fetch encryption at key /auth/key
 * - store authorization bearer encrypted
 * - add encryption / decryption of bearer in local_storage.ts
 * - when user reload:
 *    - first fetch key, auth/key
 *    - then fetch user, auth/whoami
 */
