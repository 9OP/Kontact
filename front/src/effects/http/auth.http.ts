import { back } from '../../common/network/api';
import { beacon } from '../../common/network/socket';
import { getToken, saveToken, clearToken } from '../../common/local_storage';
import { IUser } from '../../common/models/user.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JsonToUser = (json: any): IUser => ({
  id: json.id,
  email: json.email,
  name: json.name,
  access: json.access,
});

const connect = (token: string) => {
  back.authorization = { Authorization: `Bearer ${token}` };
  beacon.connect(token);
};

const disconnect = () => {
  back.authorization = null;
  beacon.disconnect();
  clearToken();
};

const key = async (): Promise<string> => {
  const res = await back.get({
    route: 'auth/key',
  });
  return res.key;
};

export const signin = async (email: string, password: string): Promise<IUser> => {
  await new Promise((r) => setTimeout(r, 400));
  const res = await back.post({
    route: 'auth/signin',
    payload: { email, password },
  });
  const { token } = res;
  saveToken(token, await key());
  connect(token);
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
  await back.post({ route: 'auth/signout' });
  disconnect();
};

export const whoami = async (): Promise<IUser> => {
  if (!back.authorization) {
    const token = getToken(await key());
    connect(token);
  }
  const res = await back.get({ route: 'auth/whoami' });
  return JsonToUser(res);
};
