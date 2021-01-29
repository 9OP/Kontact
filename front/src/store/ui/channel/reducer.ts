/* eslint-disable no-case-declarations */
import { OPEN_CHANNEL, actionTypes } from './actions';

type State = string;

const INITIAL_STATE = '' as State;

export default function reducer(
  state = INITIAL_STATE,
  action: actionTypes,
): State {
  switch (action.type) {
    case OPEN_CHANNEL:
      return action.payload;

    default:
      return state;
  }
}
