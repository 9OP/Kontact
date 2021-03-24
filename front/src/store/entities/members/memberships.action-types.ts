import { Action } from 'redux';
import { IMember } from '../../../common/models';
import { authActionTypes } from '../../authentication/auth.action-types';

export const FETCH_MEMBERS = '[memberships] fetch_members';
export const CREATE_MEMBER = '[memberships] create_member';
export const UPDATE_MEMBER = '[memberships] update_member';
export const DELETE_MEMBER = '[memberships] delete_member';

interface fetchMembers extends Action {
  type: typeof FETCH_MEMBERS;
  payload: IMember[];
}

interface createMember extends Action {
  type: typeof CREATE_MEMBER;
  payload: IMember;
}

interface updateMember extends Action {
  type: typeof UPDATE_MEMBER;
  payload: IMember;
}

interface deleteMember extends Action {
  type: typeof DELETE_MEMBER;
  payload: string;
}

export type membersActionTypes =
  | authActionTypes
  | fetchMembers
  | createMember
  | updateMember
  | deleteMember;
