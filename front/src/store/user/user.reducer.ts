import { IUser } from '../../common/models/user.model';
import { userActionTypes, SET_USER } from './user.action-types';

export const DEFAULT_EMPTY_USER = undefined as unknown as IUser;
export const DEFAULT_INITIAL_USER = null as unknown as IUser;

const INITIAL_STATE: IUser = DEFAULT_INITIAL_USER;

export function userReducer(state: IUser = INITIAL_STATE, action: userActionTypes): IUser {
  switch (action.type) {
    case SET_USER:
      return action.payload ? { ...action.payload } : DEFAULT_EMPTY_USER;

    default:
      return state;
  }
}
