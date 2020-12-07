import { RootState } from '..';
import {
  SIGNIN_ERROR,
  SIGNOUT_ERROR,
  SIGNIN_REQUEST,
  SIGNUP_ERROR,
  WHOAMI_ERROR,
} from './auth.actions';

export const selectSigninError = (state: RootState): string => state.errors[SIGNIN_ERROR];
export const selectSignupError = (state: RootState): string => state.errors[SIGNUP_ERROR];
export const selectWhoamiError = (state: RootState): string => state.errors[WHOAMI_ERROR];
export const selectSignoutError = (state: RootState): string => state.errors[SIGNOUT_ERROR];

export const selectSigninRequest = (state: RootState): boolean => (
  state.requests[SIGNIN_REQUEST]?.isFetching
);
