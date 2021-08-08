import { Action } from 'redux';
import { IChannel } from '../../../common/models';
import { authActionTypes } from '../../authentication/auth.action-types';

export const FETCH_CHANNELS = '[channels] fetch_channels';
export const CREATE_CHANNEL = '[channels] create_channel';
export const UPDATE_CHANNEL = '[channels update_channel';
export const DELETE_CHANNEL = '[channels] delete_channel';
export const OPEN_CHANNEL = '[channels] open_channel';

interface fetchChannels extends Action {
  type: typeof FETCH_CHANNELS;
  payload: { channels: IChannel[] };
}

interface createChannel extends Action {
  type: typeof CREATE_CHANNEL;
  payload: { channel: IChannel };
}

interface updateChannel extends Action {
  type: typeof UPDATE_CHANNEL;
  payload: { channel: IChannel };
}

interface deleteChannel extends Action {
  type: typeof DELETE_CHANNEL;
  payload: {cid: string};
}

interface openChannel extends Action {
  type: typeof OPEN_CHANNEL;
  payload: {cid: string};
}

export type channelsActionTypes =
  | authActionTypes
  | fetchChannels
  | createChannel
  | updateChannel
  | deleteChannel
  | openChannel;
