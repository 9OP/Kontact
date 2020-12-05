/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { setUser } from '../user/user.action';
import { DEFAULT_EMPTY_USER } from '../user/user.reducer';

export function signin(auth: {
  email: string;
  password: string;
}): any {
  // First part of fecth could be in an httpService file
  return (dispatch: any) => {
    fetch('http://localhost:5000/auth/signin', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(auth),
    })
      .then((res) => res.json())
      .then((res: any) => {
        console.log('AUTH effect login', res);
        if (res.error) {
          throw res.error;
        }
        dispatch(setUser(res));
        return res;
      })
      .catch((error) => {
        console.log(error);
        dispatch(setUser(DEFAULT_EMPTY_USER));
      });
  };
}

// temporary
export function signup(auth: {
  name: string;
  email: string;
  password: string;
}) {
  return (dispatch: any) => {
    fetch('http://localhost/auth/signin', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(auth),
    })
      .then((res) => res.json())
      .then((res: any) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(setUser(res));
        return res;
      })
      .catch((error) => {
        dispatch(setUser(DEFAULT_EMPTY_USER));
      });
  };
}
