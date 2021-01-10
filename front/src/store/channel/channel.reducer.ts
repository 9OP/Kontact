import { IChannel } from '../../common/models/channel.model';
import { channelActionTypes, SET_CHANNEL, RESET_CHANNEL } from './channel.action-types';

type State = IChannel

const INITIAL_STATE = null as unknown as State;

export default function channelReducer(
  state = INITIAL_STATE, action: channelActionTypes,
): State {
  switch (action.type) {
    case SET_CHANNEL:
      return action.payload;
    case RESET_CHANNEL:
      return INITIAL_STATE;

    default:
      return state;
  }
}
