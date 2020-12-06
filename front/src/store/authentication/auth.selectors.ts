import { RootState } from '..';
import {
  SIGNIN_ERROR,
  SIGNOUT_ERROR,
  SIGNUP_ERROR,
  WHOAMI_ERROR,
} from './auth.actions';

export const selectSigninError = (state: RootState): string => state.error[SIGNIN_ERROR];
export const selectSignupError = (state: RootState): string => state.error[SIGNUP_ERROR];
export const selectWhoamiError = (state: RootState): string => state.error[WHOAMI_ERROR];
export const selectSignoutError = (state: RootState): string => state.error[SIGNOUT_ERROR];
