import { errorActionTypes } from '../error/error.action-types';
import { errorActionCreator } from '../error/error.actions';
import { requestActionCreator, requestActionTypes } from '../request/request.actions';

// Move to auth.action-types.ts
export const SIGNIN_REQUEST = '[REQUEST] Signin';
export const SIGNIN_COMPLETED = '[COMPLETED] Signin';
export const SIGNIN_ERROR = '[ERROR] Signin';

export const SIGNUP_REQUEST = '[REQUEST] Signup';
export const SIGNUP_COMPLETED = '[COMPLETED] Signup';
export const SIGNUP_ERROR = '[ERROR] Signup';

export const WHOAMI_REQUEST = '[REQUEST] Whoami';
export const WHOAMI_COMPLETED = '[COMPLETED] Whoami';
export const WHOAMI_ERROR = '[ERROR] Whoami';

export const SIGNOUT_REQUEST = '[REQUEST] Signout';
export const SIGNOUT_COMPLETED = '[COMPLETED] Signout';
export const SIGNOUT_ERROR = '[ERROR] Signout';

export function signinRequestAction(): requestActionTypes {
  return requestActionCreator(SIGNIN_REQUEST);
}
export function signinErrorAction(error: Error): errorActionTypes {
  return errorActionCreator(SIGNIN_ERROR, error);
}
export function signinCompletedAction(): requestActionTypes {
  return requestActionCreator(SIGNIN_COMPLETED);
}

export function signupRequestAction(): requestActionTypes {
  return requestActionCreator(SIGNUP_REQUEST);
}
export function signupErrorAction(error: Error): errorActionTypes {
  return errorActionCreator(SIGNUP_ERROR, error);
}
export function signupCompletedAction(): requestActionTypes {
  return requestActionCreator(SIGNUP_COMPLETED);
}

export function whoamiRequestAction(): requestActionTypes {
  return requestActionCreator(WHOAMI_REQUEST);
}
export function whoamiErrorAction(error: Error): errorActionTypes {
  return errorActionCreator(WHOAMI_ERROR, error);
}
export function whoamiCompletedAction(): requestActionTypes {
  return requestActionCreator(WHOAMI_COMPLETED);
}

export function signoutRequestAction(): requestActionTypes {
  return requestActionCreator(SIGNOUT_REQUEST);
}
export function signoutErrorAction(error: Error): errorActionTypes {
  return errorActionCreator(SIGNOUT_ERROR, error);
}
export function signoutCompletedAction(): requestActionTypes {
  return requestActionCreator(SIGNOUT_COMPLETED);
}
