import { AppThunk } from '..';
import { IUser } from '../../common/models/user.model';
import { resetErrorsAction } from '../error/error.actions';
import { setUserAction, resetUserAction } from '../user/user.actions';
import { signinErrorAction } from './auth.actions';
import * as httpService from './auth.http';

export const signin = (
  email: string,
  password: string,
): AppThunk => async (dispatch) => {
  // dispatch(signinRequestAction());
  httpService.signin(email, password)
    .then((user: IUser) => {
      dispatch(setUserAction(user));
      dispatch(resetErrorsAction());
      // dispatch(resetAuthErrorAction());
    })
    .catch(() => {
      dispatch(resetUserAction());
      dispatch(signinErrorAction(Error('invalid mail or address or whatever')));
    });
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
