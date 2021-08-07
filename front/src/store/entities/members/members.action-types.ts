import { Action } from 'redux';
import { IChannel, IMember } from '../../../common/models';
import { authActionTypes } from '../../authentication/auth.action-types';

export const FETCH_MEMBERS = '[members] fetch_members';
export const CREATE_MEMBER = '[members] create_member';
export const UPDATE_MEMBER = '[members] update_member';
export const DELETE_MEMBER = '[members] delete_member';
export const PRESENCE_JOIN = '[members] presence_join';
export const PRESENCE_LEAVE = '[members] presence_leave';

interface fetchMembers extends Action {
  type: typeof FETCH_MEMBERS;
  payload: { members: IMember[], channel: IChannel };
}

interface createMember extends Action {
  type: typeof CREATE_MEMBER;
  payload: { member: IMember, channel: IChannel };
}

interface updateMember extends Action {
  type: typeof UPDATE_MEMBER;
  payload: { member: IMember };
}

interface deleteMember extends Action {
  type: typeof DELETE_MEMBER;
  payload: { cid: string, uid: string };
}

interface presenceJoin extends Action {
  type: typeof PRESENCE_JOIN;
  payload: { uid: string };
}

interface presenceLeave extends Action {
  type: typeof PRESENCE_LEAVE;
  payload: { uid: string };
}

export type membersActionTypes =
  | authActionTypes
  | fetchMembers
  | createMember
  | updateMember
  | deleteMember
  | presenceJoin
  | presenceLeave;
