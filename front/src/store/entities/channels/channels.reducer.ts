/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-case-declarations */
import { IChannel, NormalizedState } from '../../../common/models';
import { channelsActionTypes, SET_CHANNELS, REMOVE_CHANNEL } from './channels.actions';

type State = NormalizedState<IChannel>

const INITIAL_STATE = {} as State;

export default function channelsReducer(state = INITIAL_STATE, action: channelsActionTypes): State {
  switch (action.type) {
    case SET_CHANNELS:
      const channels: typeof state = {};
      action.payload.forEach((channel: IChannel) => { channels[channel.id] = channel; });
      return { ...state, ...channels };

    case REMOVE_CHANNEL:
      const cid = action.payload;
      const { [cid]: _, ...rest } = state;
      return { ...rest };

    default:
      return state;
  }
}
