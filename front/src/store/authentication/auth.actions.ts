import { IUser } from '../../common/models/user.model';
import { apiActionsCreator } from '../api/api.actions';
import {
  SIGNIN,
  SIGNUP,
  WHOAMI,
  SIGNOUT,
  authActionTypes,
  RESET_USER,
  SET_USER,
} from './auth.action-types';

/**
 * Api actions
 */
export const signinActions = apiActionsCreator(SIGNIN);
export const signupActions = apiActionsCreator(SIGNUP);
export const whoamiActions = apiActionsCreator(WHOAMI);
export const signoutActions = apiActionsCreator(SIGNOUT);

/**
 * Auth user actions
 */
export function resetUserAction(): authActionTypes {
  return {
    type: RESET_USER,
  };
}

export function setUserAction(user: IUser): authActionTypes {
  return {
    payload: user,
    type: SET_USER,
  };
}
