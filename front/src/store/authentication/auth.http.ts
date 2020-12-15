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

const key = async (): Promise<string> => {
  const res = await back.get({
    route: 'auth/key',
  });
  return res.key;
};

export const signin = async (email: string, password: string): Promise<IUser> => {
  await new Promise((r) => setTimeout(r, 700));

  // Post credentials to server
  const res = await back.post({
    route: 'auth/signin',
    payload: { email, password },
  });

  // Get JWT token
  const { token } = res;

  // Save token in local storage and encrypt it with session key
  saveToken(token, await key());

  // Set the authorization header for the backend API
  back.authorization = { Authorization: `Bearer ${token}` };

  // Connect to Beacon, the websocket server
  beacon.connect(token);

  // Send back user
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
  beacon.disconnect();
  clearToken();
};

export const whoami = async (): Promise<IUser> => {
  // If authorization is not defined
  if (!back.authorization) {
    // Fetch decryption key from server and decrypt local storage
    const token = getToken(await key());

    // Then update authorization header
    back.authorization = { Authorization: `Bearer ${token}` };
  }
  const res = await back.get({
    route: 'auth/whoami',
  });
  return JsonToUser(res);
};
