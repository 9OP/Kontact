/* eslint-disable no-case-declarations */
import { IMembership, NormalizedState } from '../../../common/models';
import { membershipsActionTypes, SET_MEMBERSHIPS } from './memberships.actions';

type State = NormalizedState<IMembership>;

const INITIAL_STATE = {} as State;

export default function membershipsReducer(
  state = INITIAL_STATE,
  action: membershipsActionTypes,
): State {
  switch (action.type) {
    case SET_MEMBERSHIPS:
      const memberships: typeof state = {};
      action.payload.forEach((membership: IMembership) => {
        memberships[membership.id] = membership;
      });
      return { ...state, ...memberships };

    default:
      return state;
  }
}
