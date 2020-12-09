import { AppThunk } from '..';
import { IUser } from '../../common/models/user.model';
import { setUserAction, resetUserAction } from '../user/user.actions';
import {
  signinActions,
  // signupActions,
  // whoamiActions,
  // signoutActions,
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
    dispatch(success(user));
  } catch {
    dispatch(resetUserAction());
    dispatch(failure(Error('invalid mail or address or whatever')));
  }
};

export const signup = (
  name: string,
  email: string,
  password: string,
): AppThunk => async (dispatch) => {
  httpService.signup(email, password, name)
    .then((user: IUser) => {
      dispatch(setUserAction(user));
    })
    .catch(() => {
      dispatch(resetUserAction());
    });
};

export const whoami = (): AppThunk => async (dispatch) => {
  httpService.whoami()
    .then((user: IUser) => {
      dispatch(setUserAction(user));
    })
    .catch(() => {
      dispatch(resetUserAction());
    });
};

export const signout = (): AppThunk => async (dispatch) => {
  httpService.signout()
    .then(() => {
      dispatch(resetUserAction());
    })
    .catch(() => {
      dispatch(resetUserAction());
    });
};
