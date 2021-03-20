import { IMembership } from '../../../common/models';
import {
  membershipsActionTypes,
  FETCH_MEMBERSHIPS,
  CREATE_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER,
} from './memberships.action-types';

export function fetchMembershipsAction(
  memberships: IMembership[],
): membershipsActionTypes {
  return {
    type: FETCH_MEMBERSHIPS,
    payload: memberships,
  };
}

export function createMemberAction(membership: IMembership): membershipsActionTypes {
  return {
    type: CREATE_MEMBER,
    payload: membership,
  };
}

export function updateMemberAction(membership: IMembership): membershipsActionTypes {
  return {
    type: UPDATE_MEMBER,
    payload: membership,
  };
}

export function deleteMemberAction(uid: string): membershipsActionTypes {
  return {
    type: DELETE_MEMBER,
    payload: uid,
  };
}
