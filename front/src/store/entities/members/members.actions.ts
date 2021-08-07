import { IChannel, IMember } from '../../../common/models';
import {
  membersActionTypes,
  FETCH_MEMBERS,
  CREATE_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER,
  PRESENCE_CONNECT,
  PRESENCE_DISCONNECT,
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

export function presenceConnectAction(uid: string): membersActionTypes {
  return {
    type: PRESENCE_CONNECT,
    payload: { uid },
  };
}

export function presenceDisconnectAction(uid: string): membersActionTypes {
  return {
    type: PRESENCE_DISCONNECT,
    payload: { uid },
  };
}
