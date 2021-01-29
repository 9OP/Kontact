/* eslint-disable no-case-declarations */
import { IChannel, NormalizedState } from '../../../common/models';
import { channelsActionTypes, SET_CHANNELS } from './channels.actions';

type State = NormalizedState<IChannel>

// create uiReducer with selectedChannel key

// interface State extends NormalizedState<IChannel> {
//   selected: string;
// }

const INITIAL_STATE = {} as State;

export default function channelsReducer(state = INITIAL_STATE, action: channelsActionTypes): State {
  switch (action.type) {
    case SET_CHANNELS:
      const channels: typeof state = {};
      action.payload.forEach((channel: IChannel) => { channels[channel.id] = channel; });
      return { ...state, ...channels };

    default:
      return state;
  }
}
