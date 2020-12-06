/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppThunk } from '..';
import { setUser } from '../user/user.action';
import { DEFAULT_EMPTY_USER } from '../user/user.reducer';
/*
  R = return of thunk
  S = is the type of root state
    = is the return type of the getState() method.

  E = is the type of the extra arguments passed to the ThunkAction

  A = is the action type defined in your application.
    = it should be able to extend from Action.
      (this means that it should be an object
      that must have a `type` field.) Action type is defined in the redux typings.
  */

// eslint-disable-next-line max-len
export const signin = (email: string, password: string): AppThunk => async (dispatch) => {
  // First part of fecth could be in an httpService file
  // return (dispatch: any): void => {
  fetch('http://localhost:5000/auth/signin', {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
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
// }

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
        console.log(error);
        dispatch(setUser(DEFAULT_EMPTY_USER));
      });
  };
}
