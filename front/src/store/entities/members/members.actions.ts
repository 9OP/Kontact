import { Action } from 'redux';
import { IMember } from '../../../common/models';
import { apiActionsCreator } from '../../api/api.actions';

// API actions
export const FETCH_MEMBERS = '[API] FETCH_MEMBERS';

// Members actions
export const SET_MEMBERS = '[MEMBERS] SET_MEMBERS';
// export const UPDATE_MEMBER
// export const DELETE_MEMBER

interface setMembersAction extends Action {
  payload: IMember[];
  type: typeof SET_MEMBERS;
}

export type membersActionTypes = setMembersAction;

export const fetchMembersActions = apiActionsCreator(FETCH_MEMBERS);

export function setMembersAction(members: IMember[]): membersActionTypes {
  return {
    payload: members,
    type: SET_MEMBERS,
  };
}
