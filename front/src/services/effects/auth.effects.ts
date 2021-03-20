import { AppThunk } from '../../store';
import {
  setUserAction,
  resetUserAction,
} from '../../store/authentication/auth.actions';
import { authHttpService } from './http';

export const signin = (email: string, password: string): AppThunk => async (
  dispatch,
) => {
  try {
    const user = await authHttpService.signin(email, password);
    dispatch(setUserAction(user));
  } catch (err) {
    dispatch(resetUserAction());
  }
};

export const whoami = (): AppThunk => async (dispatch) => {
  try {
    const user = await authHttpService.whoami();
    dispatch(setUserAction(user));
  } catch (err) {
    dispatch(resetUserAction());
  }
};

export const signout = (): AppThunk => async (dispatch) => {
  try {
    await authHttpService.signout();
    window.location.reload();
  } catch (err) {
    dispatch(resetUserAction());
  }
};
