/* eslint-disable import/prefer-default-export */
import { IMember } from '../../../../common/models';
import { membersActionTypes, FETCH_MEMBERS } from './members.action-types';

export function fetchMembersAction(members: IMember[]): membersActionTypes {
  return {
    type: FETCH_MEMBERS,
    payload: members,
  };
}
