import CryptoJS from 'crypto-js';
import { back, bearer } from '../../common/network/api';
import { beacon } from '../../common/network/socket';
import LES from '../../common/localStorage';
import { TOKEN } from '../../common/constants';
import { IAuth } from '../../common/models';
import {
  decryptMessage,
  encryptMessage,
  generateChannelEncryptionKey,
  generateUserEncryptionKeyPair,
  unwrapChannelEncryptionKey,
  unwrapUserEncryptionKey,
} from '../../common/crypto';

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

// const cryptoDemo = async (password: string) => {
//   // generate key pair and store on server
//   const keyPair = await generateUserEncryptionKeyPair(password);
//   // fetch key pair from server and unwrap private
//   const privateKey = await unwrapUserEncryptionKey(keyPair.private, password);
//   // generate encryption key and store on server
//   const aesKey = await generateChannelEncryptionKey(privateKey);
//   // fetch encryption key and unwrap
//   const key = await unwrapChannelEncryptionKey(aesKey, privateKey);
//   const message = 'Hello World! 123#@$%^!';

//   // encrypt message
//   const encrypted = await encryptMessage(message, key);
//   const decrypted = await decryptMessage(encrypted, key);
//   console.log('encrypted:', encrypted, 'decrypted:', decrypted);
// };

export const signin = async (email: string, password: string): Promise<IAuth> => {
  const prehash = CryptoJS.SHA256(password).toString();

  // await cryptoDemo(password);

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
  const prehash = CryptoJS.SHA256(password).toString();
  const keyPair = await generateUserEncryptionKeyPair(password);
  const material = {
    puek: keyPair.public,
    suek: keyPair.private,
  };
  const res = await back.post({
    route: 'auth/signup',
    payload: {
      email, password: prehash, name, material,
    },
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
