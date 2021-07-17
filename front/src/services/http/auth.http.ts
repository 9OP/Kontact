import CryptoJS from 'crypto-js';
import { back, bearer } from '../../common/network/api';
import { beacon } from '../../common/network/socket';
import LES from '../../common/localStorage';
import { TOKEN } from '../../common/constants';
import { IAuth } from '../../common/models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JsonToUser = (json: any): IAuth => ({
  id: json.id,
  email: json.email,
  name: json.name,
  access: json.access,
  material: {
    puek: json.material?.puek,
    suek: json.material?.suek,
  },
});

const connect = (token: string) => {
  LES.setItem(TOKEN, token);
  back.authorization = { Authorization: `Bearer ${token}` };
  bearer.authorization = { Authorization: `Bearer ${token}` };
  beacon.connect(token);
};

const disconnect = () => {
  back.authorization = null;
  bearer.authorization = null;
  beacon.disconnect();
  LES.clear();
};

const key = async (): Promise<string> => {
  const res = await back.get({ route: 'auth/key' });
  return res.key;
};

export const signin = async (email: string, password: string): Promise<IAuth> => {
  const prehash = CryptoJS.SHA256(password).toString();
  const res = await back.post({
    route: 'auth/signin',
    payload: { email, password: prehash },
  });
  const k = await key();

  LES.key(k);
  connect(res.token);

  return JsonToUser(res);
};

export const signup = async (email: string, password: string, name: string): Promise<IAuth> => {
  // should generate keys (puek, suek)
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

export const whoami = async (): Promise<IAuth> => {
  if (!back.authorization) {
    LES.key(await key());
    connect(LES.getItem(TOKEN));
  }
  const res = await back.get({ route: 'auth/whoami' });
  return JsonToUser(res);
};
