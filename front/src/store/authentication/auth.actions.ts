import { CREATE_ERROR, errorActionTypes } from '../error/error.action-types';
import { errorActionCreator } from '../error/error.actions';

// Move to auth.action-types.ts
export const SIGNIN_ERROR = '[AUTH-ERROR] Signin Error' as typeof CREATE_ERROR;
export const SIGNUP_ERROR = '[AUTH-ERROR] Signup Error' as typeof CREATE_ERROR;
export const WHOAMI_ERROR = '[AUTH-ERROR] Whoami Error' as typeof CREATE_ERROR;
export const SIGNOUT_ERROR = '[AUTH-ERROR] Signout Error' as typeof CREATE_ERROR;

export function signinErrorAction(error: Error): errorActionTypes {
  return errorActionCreator(SIGNIN_ERROR, error);
}

export function signupErrorAction(error: Error): errorActionTypes {
  return errorActionCreator(SIGNUP_ERROR, error);
}

export function whoamiErrorAction(error: Error): errorActionTypes {
  return errorActionCreator(WHOAMI_ERROR, error);
}

export function signoutErrorAction(error: Error): errorActionTypes {
  return errorActionCreator(SIGNOUT_ERROR, error);
}
