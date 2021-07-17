import { IAuth } from '../../common/models';
import {
  authActionTypes,
  SET_USER,
  RESET_USER,
} from './auth.action-types';

const INITIAL_STATE: IAuth = null as unknown as IAuth;

export default function userReducer(state: IAuth = INITIAL_STATE, action: authActionTypes): IAuth {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };

    case RESET_USER:
      return INITIAL_STATE;

    default:
      return state;
  }
}
