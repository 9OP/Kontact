/* eslint-disable no-case-declarations */
import { IMember, NormalizedState } from '../../../common/models';
import { membersActionTypes, SET_MEMBERS } from './members.actions';

type State = NormalizedState<IMember>

const INITIAL_STATE = {} as State;

export default function membersReducer(state = INITIAL_STATE, action: membersActionTypes): State {
  switch (action.type) {
    case SET_MEMBERS:
      const members: typeof state = {};
      action.payload.forEach((member: IMember) => { members[member.id] = member; });
      return { ...state, ...members };

      // case UPDATE_ENTITY
      // case DELETE_ENTITY

    default:
      return state;
  }
}

// could define a generic entity generator

// const allIds: typeof state.allIds = [];
// const byId: typeof state.byId = {};

// const members = action.payload.sort((a, b) => a.joinedAt.getDate() - b.joinedAt.getDate());

// members.forEach((member: IMember) => {
//   allIds.push(member.id);
//   byId[member.id] = member;
// });

// return {
//   byId: { ...state.byId, ...byId },
//   allIds,
// };
