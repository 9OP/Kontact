/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-case-declarations */
import { IMembership } from '../../../common/models';
import {
  membershipsActionTypes,
  FETCH_MEMBERSHIPS,
  CREATE_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER,
} from './memberships.action-types';

interface State {
  byId: {
    [id: string]: IMembership;
  };
}

const INITIAL_STATE = {} as State;

export default function membershipsReducer(state = INITIAL_STATE,
  action: membershipsActionTypes): State {
  switch (action.type) {
    case FETCH_MEMBERSHIPS:
      const memberships = action.payload.reduce((acc, membership) => {
        acc[membership.id] = membership;
        return acc;
      }, {} as {[id: string]: IMembership});

      return { byId: { ...state.byId, ...memberships } };

    case UPDATE_MEMBER:
    case CREATE_MEMBER:
      const membership = action.payload;
      return { byId: { ...state.byId, [membership.id]: membership } };

    case DELETE_MEMBER:
      const { [action.payload]: _, ...rest } = state.byId;
      return { byId: { ...rest } };

    default:
      return state;
  }
}
