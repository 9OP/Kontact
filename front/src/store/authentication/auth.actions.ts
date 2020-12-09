import { apiActionsCreator } from '../api/api.actions';
import {
  SIGNIN,
  SIGNUP,
  WHOAMI,
  SIGNOUT,
} from './auth.action-types';

export const signinActions = apiActionsCreator(SIGNIN);
export const signupActions = apiActionsCreator(SIGNUP);
export const whoamiActions = apiActionsCreator(WHOAMI);
export const signoutActions = apiActionsCreator(SIGNOUT);
