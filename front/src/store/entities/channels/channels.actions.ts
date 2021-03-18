import { Action } from 'redux';
import { IChannel } from '../../../common/models';
import { apiActionsCreator } from '../../api/api.actions';

// API actions
export const FETCH_CHANNELS = '[API] FETCH_CHANNELS';
export const CREATE_CHANNEL = '[API] CREATE_CHANNEL';
export const DELETE_CHANNEL = '[API] DELETE_CHANNEL';

// Channels actions
export const SET_CHANNELS = '[CHANNELS] SET_CHANNELS';
export const REMOVE_CHANNEL = '[CHANNELS] REMOVE_CHANNEL';

interface setChannelsAction extends Action {
  payload: IChannel[];
  type: typeof SET_CHANNELS;
}

interface removeChannelAction extends Action {
  payload: string;
  type: typeof REMOVE_CHANNEL;
}

export type channelsActionTypes = setChannelsAction | removeChannelAction;

export const fetchChannelsActions = apiActionsCreator(FETCH_CHANNELS);
export const createChannelActions = apiActionsCreator(CREATE_CHANNEL);
export const deleteChannelActions = apiActionsCreator(DELETE_CHANNEL);

export function setChannelsAction(channels: IChannel[]): channelsActionTypes {
  return {
    payload: channels,
    type: SET_CHANNELS,
  };
}

export function removeChannelAction(cid: string): channelsActionTypes {
  return {
    payload: cid,
    type: REMOVE_CHANNEL,
  };
}
