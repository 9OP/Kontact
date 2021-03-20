import { Action } from 'redux';
import { IMember } from '../../../../common/models';

export const FETCH_MEMBERS = '[members] fetch_members';

interface fetchMembers extends Action {
  type: typeof FETCH_MEMBERS;
  payload: IMember[];
}

export type membersActionTypes = fetchMembers;
