import { AppThunk } from '..';
import {
  setUserAction,
  resetUserAction,
  signinActions,
  signupActions,
  whoamiActions,
  signoutActions,
} from './auth.actions';

import * as httpService from './auth.http';

export const signin = (
  email: string,
  password: string,
): AppThunk => async (dispatch) => {
  const { request, success, failure } = signinActions;

  dispatch(request());
  try {
    const user = await httpService.signin(email, password);
    dispatch(setUserAction(user));
    dispatch(success());
  } catch (err) {
    // console.log(err);
    dispatch(resetUserAction());
    // dispatch(failure('Mail or password invalid'));
    dispatch(failure(err.message));
  }
};

export const signup = (
  name: string,
  email: string,
  password: string,
): AppThunk => async (dispatch) => {
  const { request, success, failure } = signupActions;

  dispatch(request());
  try {
    const user = await httpService.signup(email, password, name);
    dispatch(setUserAction(user));
    dispatch(success());
  } catch {
    dispatch(resetUserAction());
    dispatch(failure('invalid mail or address or whatever'));
  }
};

export const whoami = (): AppThunk => async (dispatch) => {
  const { request, success, failure } = whoamiActions;

  dispatch(request());
  try {
    const user = await httpService.whoami();
    dispatch(setUserAction(user));
    dispatch(success());
  } catch {
    dispatch(resetUserAction());
    dispatch(failure('invalid mail or address or whatever'));
  }
};

export const signout = (): AppThunk => async (dispatch) => {
  const { request, success, failure } = signoutActions;

  dispatch(request());
  try {
    await httpService.signout();
    dispatch(resetUserAction());
    dispatch(success());
  } catch {
    dispatch(resetUserAction());
    dispatch(failure('invalid mail or address or whatever'));
  }
};
