import { IMember } from '../../../common/models';
import {
  membersActionTypes,
  FETCH_MEMBERS,
  CREATE_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER,
} from './memberships.action-types';

export function fetchMembersAction(members: IMember[]): membersActionTypes {
  return {
    type: FETCH_MEMBERS,
    payload: members,
  };
}

export function createMemberAction(member: IMember): membersActionTypes {
  return {
    type: CREATE_MEMBER,
    payload: member,
  };
}

export function updateMemberAction(member: IMember): membersActionTypes {
  return {
    type: UPDATE_MEMBER,
    payload: member,
  };
}

export function deleteMemberAction(uid: string): membersActionTypes {
  return {
    type: DELETE_MEMBER,
    payload: uid,
  };
}
