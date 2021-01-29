import { RootState } from '..';
import { IAuth } from '../../common/models';
import { apiSelectorsCreator } from '../api/api.selectors';
import {
  SIGNIN,
  SIGNUP,
  WHOAMI,
  SIGNOUT,
} from './auth.action-types';

/**
 * Api selectors
 */
export const signinSelectors = apiSelectorsCreator(SIGNIN);
export const signupSelectors = apiSelectorsCreator(SIGNUP);
export const whoamiSelectors = apiSelectorsCreator(WHOAMI);
export const signoutSelectors = apiSelectorsCreator(SIGNOUT);

/**
 * Auth selectors
 */
export const selectUser = (state: RootState): IAuth => state.auth;
