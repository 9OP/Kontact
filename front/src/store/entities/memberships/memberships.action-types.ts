import { Action } from 'redux';
import { IMembership } from '../../../common/models';

export const FETCH_MEMBERSHIPS = '[memberships] fetch_memberships';
export const CREATE_MEMBER = '[memberships] create_member';
export const UPDATE_MEMBER = '[memberships] update_member';
export const DELETE_MEMBER = '[memberships] delete_member';

interface fetchMemberships extends Action {
  type: typeof FETCH_MEMBERSHIPS;
  payload: IMembership[];
}

interface createMember extends Action {
  type: typeof CREATE_MEMBER;
  payload: IMembership;
}

interface updateMember extends Action {
  type: typeof UPDATE_MEMBER;
  payload: IMembership;
}

interface deleteMember extends Action {
  type: typeof DELETE_MEMBER;
  payload: string;
}

export type membershipsActionTypes =
  | fetchMemberships
  | createMember
  | updateMember
  | deleteMember;
