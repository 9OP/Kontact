/* eslint-disable max-len */
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

export function fetchMembersAction(payload: { members: IMember[], channel: IChannel}): membersActionTypes {
  return {
    type: FETCH_MEMBERS,
    payload,
  };
}

export function createMemberAction(payload: { member: IMember, channel: IChannel }): membersActionTypes {
  return {
    type: CREATE_MEMBER,
    payload,
  };
}

export function updateMemberAction(payload: { member: IMember}): membersActionTypes {
  return {
    type: UPDATE_MEMBER,
    payload,
  };
}

export function deleteMemberAction(payload: { uid: string, cid: string }): membersActionTypes {
  return {
    type: DELETE_MEMBER,
    payload,
  };
}

export function presenceConnectAction(payload: { uid: string }): membersActionTypes {
  return {
    type: PRESENCE_CONNECT,
    payload,
  };
}

export function presenceDisconnectAction(payload: { uid: string}): membersActionTypes {
  return {
    type: PRESENCE_DISCONNECT,
    payload,
  };
}
