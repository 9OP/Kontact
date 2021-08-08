/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-case-declarations */
import { IMember, IMembership } from '../../../common/models';
import { RESET_USER } from '../../authentication/auth.action-types';
import {
  membersActionTypes,
  FETCH_MEMBERS,
  CREATE_MEMBER,
  DELETE_MEMBER,
} from '../members/members.action-types';

interface State {
  // [channelId: string]: IMembership[];
  [channelId: string]: string[];
}

const INITIAL_STATE = {} as State;

export default function membershipsReducer(
  state = INITIAL_STATE,
  action: membersActionTypes,
): State {
  switch (action.type) {
    case FETCH_MEMBERS: {
      const { members, channel } = action.payload;
      return {
        ...state,
        [channel.id]: members.map(({ id }) => id),
      };
    }

    case CREATE_MEMBER: {
      const { member, channel } = action.payload;
      const memberIds = state?.[channel.id] || [];

      if (memberIds.includes(member.id)) { return state; }

      return {
        ...state,
        [channel.id]: [
          ...memberIds,
          member.id,
        ],
      };
    }

    case DELETE_MEMBER: {
      const { uid, cid } = action.payload;
      const memberIds = state?.[cid].filter((id) => id !== uid);
      return {
        ...state,
        [cid]: memberIds,
      };
    }

    case RESET_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}
