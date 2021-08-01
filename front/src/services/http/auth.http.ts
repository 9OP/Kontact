import CryptoJS from 'crypto-js';
import { back, bearer } from '../../common/network/api';
import { beacon } from '../../common/network/socket';
import LES from '../../common/localStorage';
import { PASSPHRASE, TOKEN } from '../../common/constants';
import { IAuth } from '../../common/models';
import { generateUserEncryptionKeyPair, unwrapUserEncryptionKey } from '../../common/crypto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JsonToUser = async (json: any): Promise<IAuth> => {
  const passphrase = LES.getItem(PASSPHRASE);

  const keyBundle = {
    key: json.material?.suek,
    salt: new Uint8Array(json.material?.salt),
    iv: new Uint8Array(json.material?.iv),
  };

  const suek = await unwrapUserEncryptionKey(keyBundle, passphrase);

  return {
    id: json.id,
    email: json.email,
    name: json.name,
    access: json.access,
    material: {
      puek: json.material?.puek,
      suek,
    },
  };
};

const connect = (token: string) => {
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

const storeAccess = (key: string, token: string, passphrase: string): void => {
  LES.key(key);
  LES.setItem(TOKEN, token);
  LES.setItem(PASSPHRASE, passphrase);
};

const key = async (): Promise<string> => {
  const res = await back.get({ route: 'auth/key' });
  return res.key;
};

export const signin = async (email: string, password: string): Promise<IAuth> => {
  const passphrase = CryptoJS.SHA256(password).toString(); // use web api instead of crypto js
  const prehash = CryptoJS.SHA256(passphrase).toString();
  const res = await back.post({
    route: 'auth/signin',
    payload: { email, password: prehash },
  });

  const k = await key();
  const { token } = res;
  storeAccess(k, token, passphrase);
  connect(token);

  return JsonToUser(res);
};

export const signup = async (email: string, password: string, name: string): Promise<IAuth> => {
  const passphrase = CryptoJS.SHA256(password).toString(); // use web api instead of crypto js
  const prehash = CryptoJS.SHA256(passphrase).toString();
  const keyPair = await generateUserEncryptionKeyPair(passphrase);
  const material = {
    puek: keyPair.public,
    suek: keyPair.private.key,
    salt: Array.from(keyPair.private.salt),
    iv: Array.from(keyPair.private.iv),
  };
  const res = await back.post({
    route: 'auth/signup',
    payload: {
      email, password: prehash, name, material,
    },
  });

  const k = await key();
  const { token } = res;
  storeAccess(k, token, passphrase);
  connect(token);

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
