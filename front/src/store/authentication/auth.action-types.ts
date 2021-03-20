import { Action } from 'redux';
import { IAuth } from '../../common/models';

export const SET_USER = '[auth] set_user';
export const RESET_USER = '[auth] reset_user';

interface authSetUser extends Action {
  type: typeof SET_USER;
  payload: IAuth;
}

interface authResetUser extends Action {
  type: typeof RESET_USER;
}

export type authActionTypes = authSetUser | authResetUser;
