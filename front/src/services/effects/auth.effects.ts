import { AppThunk } from '../../store';
import effect from '../../store/api/api.effect';
import {
  setUserAction,
  resetUserAction,
  signinActions,
  signupActions,
  whoamiActions,
  signoutActions,
} from '../../store/authentication/auth.actions';
import * as httpService from './http/auth.http';

export const signin = (
  email: string,
  password: string,
): AppThunk => async (dispatch) => {
  const { request, success, failure } = signinActions;

  dispatch(request());
  try {
    const user = await httpService.signin(email, password);
    dispatch(success());
    dispatch(setUserAction(user));
  } catch (err) {
    dispatch(failure(err.message));
    dispatch(resetUserAction());
  }
};

export const signup = (
  name: string,
  email: string,
  password: string,
): AppThunk => async (dispatch) => {
  const successCb = async () => {
    const user = await httpService.signup(email, password, name);
    dispatch(setUserAction(user));
  };

  const failureCb = async () => {
    dispatch(resetUserAction());
  };

  await effect(dispatch, signupActions, successCb, failureCb);
};

export const whoami = (): AppThunk => async (dispatch) => {
  const successCb = async () => {
    const user = await httpService.whoami();
    dispatch(setUserAction(user));
  };

  const failureCb = async () => {
    dispatch(resetUserAction());
  };

  await effect(dispatch, whoamiActions, successCb, failureCb);
};

export const signout = (): AppThunk => async (dispatch) => {
  const successCb = async () => {
    await httpService.signout();
    window.location.reload(); // reset Redux store
  };

  const failureCb = async () => {
    dispatch(resetUserAction());
  };

  await effect(dispatch, signoutActions, successCb, failureCb);
};
