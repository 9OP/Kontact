import { IChannel } from '../../common/models/channel.model';
import { channelActionTypes, SET_CHANNEL } from './channel.actions';

type State = IChannel

const INITIAL_STATE = null as unknown as State;

export default function channelReducer(
  state = INITIAL_STATE, action: channelActionTypes,
): State {
  switch (action.type) {
    case SET_CHANNEL:
      return action.payload;

    default:
      return state;
  }
}
