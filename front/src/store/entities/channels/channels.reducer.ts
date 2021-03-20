/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-case-declarations */
import { IChannel } from '../../../common/models';
import {
  channelsActionTypes,
  FETCH_CHANNELS,
  CREATE_CHANNEL,
  UPDATE_CHANNEL,
  DELETE_CHANNEL,
  OPEN_CHANNEL,
} from './channels.action-types';

interface State {
  byId: {
    [id: string]: IChannel;
  };
  // allIds: string[];
  opened: string;
}

const INITIAL_STATE = {} as State;

export default function channelsReducer(state = INITIAL_STATE, action: channelsActionTypes): State {
  switch (action.type) {
    case FETCH_CHANNELS:
      const channels = action.payload.reduce((acc, channel) => {
        acc[channel.id] = channel;
        return acc;
      }, {} as {[id: string]: IChannel});
      // const ids = action.payload.map(({ id }) => id);

      return {
        ...state,
        byId: { ...state.byId, ...channels },
        // allIds: [...state.allIds, ...ids],
      };

    case UPDATE_CHANNEL:
    case CREATE_CHANNEL:
      const channel = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [channel.id]: channel,
        },
        opened: channel.id,
      };

    case DELETE_CHANNEL:
      const { [action.payload]: _, ...rest } = state.byId;
      return {
        ...state,
        byId: { ...rest },
      };

    case OPEN_CHANNEL:
      return { ...state, opened: action.payload };

    default:
      return state;
  }
}
