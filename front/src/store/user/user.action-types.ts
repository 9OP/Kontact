import { Action } from 'redux';
import { IUser } from '../../common/models/user.model';

export const RESET_USER = '[USER] Reset User';
export const SET_USER = '[USER] Set User';

interface resetUserAction extends Action {
  type: typeof RESET_USER;
}

interface setUserAction extends Action {
  payload: IUser;
  type: typeof SET_USER;
}

export type userActionTypes = setUserAction | resetUserAction;
