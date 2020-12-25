import { IMembership } from '../../common/models/membership.model';
import { membershipsActionTypes, SET_MEMBERSHIPS } from './memberships.actions';

type State = IMembership[]

const INITIAL_STATE = null as unknown as State;

export default function membershipReducer(
  state = INITIAL_STATE, action: membershipsActionTypes,
): State {
  switch (action.type) {
    case SET_MEMBERSHIPS:
      return { ...action.payload };

    default:
      return state;
  }
}
