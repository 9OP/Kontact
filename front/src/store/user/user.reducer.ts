import { IUser } from '../../common/models/user.model';
import { userActionTypes, SET_USER, RESET_USER } from './user.action-types';

const INITIAL_STATE: IUser = null as unknown as IUser;

export default function userReducer(state: IUser = INITIAL_STATE, action: userActionTypes): IUser {
  switch (action.type) {
    case SET_USER: // case SIGNIN
      return action.payload;
    case RESET_USER:
      return INITIAL_STATE;

    default:
      return state;
  }
}
