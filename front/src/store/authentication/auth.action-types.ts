import { Action } from 'redux';
import { IAuth } from '../../common/models';

/**
 * Api actions
 */
export const SIGNIN = '[AUTH] SIGNIN';
export const SIGNUP = '[AUTH] SIGNUP';
export const WHOAMI = '[AUTH] WHOAMI';
export const SIGNOUT = '[AUTH] SIGNOUT';

/**
 * Auth user actions
 */
export const SET_USER = '[AUTH] SET_USER';
export const RESET_USER = '[AUTH] RESET_USER';

interface resetAuthAction extends Action {
  type: typeof RESET_USER;
}

interface setAuthAction extends Action {
  payload: IAuth;
  type: typeof SET_USER;
}

export type authActionTypes = setAuthAction | resetAuthAction;
