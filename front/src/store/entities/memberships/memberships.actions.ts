import { Action } from 'redux';
import { IMembership } from '../../../common/models';
// import { apiActionsCreator } from '../api/api.actions';

// API actions
// ADD_MEMBER
// UPDATE_MEMBER
// DELETE_MEMBER

// Memberships actions
export const SET_MEMBERSHIPS = '[MEMBERSHIPS] SET_MEMBERSHIPS';

interface setMembershipsAction extends Action {
  payload: IMembership[];
  type: typeof SET_MEMBERSHIPS;
}

export type membershipsActionTypes = setMembershipsAction;

export function setMembershipsAction(
  memberships: IMembership[],
): membershipsActionTypes {
  return {
    payload: memberships,
    type: SET_MEMBERSHIPS,
  };
}
