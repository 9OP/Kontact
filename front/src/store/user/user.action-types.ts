import { IUser } from '../../common/models/user.model';

export const FETCH_USER = '[USER] Fetch User';
export const SET_USER = '[USER] Set User';

interface fetchUserAction {
  type: typeof FETCH_USER;
}

interface setUserAction {
  payload: IUser;
  type: typeof SET_USER;
}

export type userActionTypes = setUserAction | fetchUserAction;
