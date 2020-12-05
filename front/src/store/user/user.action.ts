import {
  userActionTypes,
  FETCH_USER,
  SET_USER,
} from './user.action-types';
import { IUser } from '../../common/models/user.model';

export function fetchUser(): userActionTypes {
  return {
    type: FETCH_USER,
  };
}

export function setUser(user: IUser): userActionTypes {
  return {
    payload: user,
    type: SET_USER,
  };
}
