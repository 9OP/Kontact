import { IAuth } from '../../common/models';
import {
  authActionTypes,
  SET_USER,
  RESET_USER,
} from './auth.action-types';

export function setUserAction(payload: { user: IAuth }): authActionTypes {
  return {
    type: SET_USER,
    payload,
  };
}

export function resetUserAction(): authActionTypes {
  return {
    type: RESET_USER,
  };
}
