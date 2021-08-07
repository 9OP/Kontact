import { IChannel, IMember } from '../../../common/models';
import {
  membersActionTypes,
  FETCH_MEMBERS,
  CREATE_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER,
  PRESENCE_JOIN,
  PRESENCE_LEAVE,
} from './members.action-types';

export function fetchMembersAction(members: IMember[], channel: IChannel): membersActionTypes {
  return {
    type: FETCH_MEMBERS,
    payload: { members, channel },
  };
}

export function createMemberAction(member: IMember, channel: IChannel): membersActionTypes {
  return {
    type: CREATE_MEMBER,
    payload: { member, channel },
  };
}

export function updateMemberAction(member: IMember): membersActionTypes {
  return {
    type: UPDATE_MEMBER,
    payload: { member },
  };
}

export function deleteMemberAction(uid: string, cid: string): membersActionTypes {
  return {
    type: DELETE_MEMBER,
    payload: { uid, cid },
  };
}

export function presenceJoinAction(uid: string): membersActionTypes {
  return {
    type: PRESENCE_JOIN,
    payload: { uid },
  };
}

export function presenceLeaveAction(uid: string): membersActionTypes {
  return {
    type: PRESENCE_LEAVE,
    payload: { uid },
  };
}
