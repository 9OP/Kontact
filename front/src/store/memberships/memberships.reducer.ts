import { IMembership } from '../../common/models/membership.model';
import { membershipsActionTypes, SET_MEMBERSHIPS, RESET_MEMBERSHIPS } from './memberships.action-types';

type State = IMembership[]

const INITIAL_STATE = null as unknown as State;

export default function membershipReducer(
  state = INITIAL_STATE, action: membershipsActionTypes,
): State {
  switch (action.type) {
    case SET_MEMBERSHIPS:
      return [...action.payload];
    case RESET_MEMBERSHIPS:
      return INITIAL_STATE;

    default:
      return state;
  }
}
