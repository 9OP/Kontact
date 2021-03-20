/* eslint-disable no-case-declarations */
import { IMember } from '../../../../common/models';
import { membersActionTypes, FETCH_MEMBERS } from './members.action-types';

interface State {
  byId: {
    [id: string]: IMember;
  };
}

const INITIAL_STATE = {} as State;

export default function membersReducer(state = INITIAL_STATE, action: membersActionTypes): State {
  switch (action.type) {
    case FETCH_MEMBERS:
      const members = action.payload.reduce((acc, member) => {
        acc[member.id] = member;
        return acc;
      }, {} as {[id: string]: IMember});

      return { byId: { ...state.byId, ...members } };

    default:
      return state;
  }
}
