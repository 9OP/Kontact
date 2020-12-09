import { apiSelectorsCreator } from '../api/api.selectors';
import {
  SIGNIN,
  SIGNUP,
  WHOAMI,
  SIGNOUT,
} from './auth.action-types';

export const signinSelectors = apiSelectorsCreator(SIGNIN);
export const signupSelectors = apiSelectorsCreator(SIGNUP);
export const whoamiSelectors = apiSelectorsCreator(WHOAMI);
export const signoutSelectors = apiSelectorsCreator(SIGNOUT);
