import { IUser } from '../../common/models/user.model';
import {
  userActionTypes,
  RESET_USER,
  SET_USER,
} from './user.action-types';

export function resetUserAction(): userActionTypes {
  return {
    type: RESET_USER,
  };
}

export function setUserAction(user: IUser): userActionTypes {
  return {
    payload: user,
    type: SET_USER,
  };
}
