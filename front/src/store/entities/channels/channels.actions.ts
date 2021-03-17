import { Action } from 'redux';
import { IChannel } from '../../../common/models';
import { apiActionsCreator } from '../../api/api.actions';

// API actions
export const FETCH_CHANNELS = '[API] FETCH_CHANNELS';
export const CREATE_CHANNEL = '[API] CREATE_CHANNEL';

// Channels actions
export const SET_CHANNELS = '[CHANNELS] SET_CHANNELS';

interface setChannelsAction extends Action {
  payload: IChannel[];
  type: typeof SET_CHANNELS;
}

export type channelsActionTypes = setChannelsAction;

export const fetchChannelsActions = apiActionsCreator(FETCH_CHANNELS);
export const createChannelActions = apiActionsCreator(CREATE_CHANNEL);

export function setChannelsAction(channels: IChannel[]): channelsActionTypes {
  return {
    payload: channels,
    type: SET_CHANNELS,
  };
}
