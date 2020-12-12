import { IUser } from '../../common/models/user.model';
import { authActionTypes, SET_USER, RESET_USER } from './auth.action-types';

const INITIAL_STATE: IUser = null as unknown as IUser;

export default function userReducer(state: IUser = INITIAL_STATE, action: authActionTypes): IUser {
  switch (action.type) {
    case SET_USER:
      return { ...action.payload };
    case RESET_USER:
      return INITIAL_STATE;

    default:
      return state;
  }
}
