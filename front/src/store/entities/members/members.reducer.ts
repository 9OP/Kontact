/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-case-declarations */
import { IMember } from '../../../common/models';
import { RESET_USER } from '../../authentication/auth.action-types';
import {
  membersActionTypes,
  FETCH_MEMBERS,
  CREATE_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER,
  PRESENCE_DISCONNECT,
  PRESENCE_CONNECT,
} from './members.action-types';

interface State {
  byId: {
    [id: string]: IMember;
  };
}

const INITIAL_STATE = {} as State;

export default function membersReducer(
  state = INITIAL_STATE,
  action: membersActionTypes,
): State {
  switch (action.type) {
    case FETCH_MEMBERS:
      const members = action.payload.members.reduce((acc, membership) => {
        acc[membership.id] = membership;
        return acc;
      }, {} as { [id: string]: IMember });

      return {
        byId: {
          ...state.byId,
          ...members,
        },
      };

    case UPDATE_MEMBER:
    case CREATE_MEMBER:
      const { member } = action.payload;
      return { byId: { ...state.byId, [member.id]: member } };

    case PRESENCE_CONNECT: {
      const { uid } = action.payload;
      const member = state.byId?.[uid];

      if (!member) { return state; }

      return { byId: { ...state.byId, [member.id]: { ...member, connected: true } } };
    }

    case PRESENCE_DISCONNECT: {
      const { uid } = action.payload;
      const member = state.byId?.[uid];

      if (!member) { return state; }

      return { byId: { ...state.byId, [member.id]: { ...member, connected: false } } };
    }

    case RESET_USER:
      return INITIAL_STATE;

    default:
      return state;
  }
}
