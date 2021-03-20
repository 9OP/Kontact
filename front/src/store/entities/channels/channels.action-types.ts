import { Action } from 'redux';
import { IChannel } from '../../../common/models';

export const FETCH_CHANNELS = '[channels] fetch_channels';
export const CREATE_CHANNEL = '[channels] create_channel';
export const UPDATE_CHANNEL = '[channels update_channel';
export const DELETE_CHANNEL = '[channels] delete_channel';
export const OPEN_CHANNEL = '[channels] open_channel';

interface fetchChannels extends Action {
  type: typeof FETCH_CHANNELS;
  payload: IChannel[];
}

interface createChannel extends Action {
  type: typeof CREATE_CHANNEL;
  payload: IChannel;
}

interface updateChannel extends Action {
  type: typeof UPDATE_CHANNEL;
  payload: IChannel;
}

interface deleteChannel extends Action {
  type: typeof DELETE_CHANNEL;
  payload: string;
}

interface openChannel extends Action {
  type: typeof OPEN_CHANNEL;
  payload: string;
}

export type channelsActionTypes =
  | fetchChannels
  | createChannel
  | updateChannel
  | deleteChannel
  | openChannel;
