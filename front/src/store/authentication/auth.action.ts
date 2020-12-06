import {
  authActionTypes,
  SIGNIN,
  SIGNUP,
  SIGNOUT,
} from './auth.action-types';

export function signup(auth: {name: string, email: string, password: string}): authActionTypes {
  return {
    payload: auth,
    type: SIGNUP,
  };
}

export function signin(auth: {email: string, password: string}): authActionTypes {
  return {
    payload: auth,
    type: SIGNIN,
  };
}

export function signout(): authActionTypes {
  return {
    type: SIGNOUT,
  };
}
