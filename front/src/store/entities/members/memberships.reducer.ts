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
} from './memberships.action-types';

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
      const members = action.payload.reduce((acc, membership) => {
        acc[membership.id] = membership;
        return acc;
      }, {} as { [id: string]: IMember });

      return { byId: members };

    case UPDATE_MEMBER:
    case CREATE_MEMBER:
      const member = action.payload;
      return { byId: { ...state.byId, [member.id]: member } };

    case DELETE_MEMBER:
      const { [action.payload]: _, ...rest } = state.byId;
      return { byId: { ...rest } };

    case RESET_USER:
      return INITIAL_STATE;

    default:
      return state;
  }
}
