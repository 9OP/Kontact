import { IChannel } from '../../../common/models';
import {
  channelsActionTypes,
  FETCH_CHANNELS,
  CREATE_CHANNEL,
  UPDATE_CHANNEL,
  DELETE_CHANNEL,
  OPEN_CHANNEL,
} from './channels.action-types';

export function fetchChannelsAction(channels: IChannel[]): channelsActionTypes {
  return {
    type: FETCH_CHANNELS,
    payload: channels,
  };
}

export function createChannelAction(channel: IChannel): channelsActionTypes {
  return {
    type: CREATE_CHANNEL,
    payload: channel,
  };
}

export function updateChannelAction(channel: IChannel): channelsActionTypes {
  return {
    type: UPDATE_CHANNEL,
    payload: channel,
  };
}

export function deleteChannelAction(cid: string): channelsActionTypes {
  return {
    type: DELETE_CHANNEL,
    payload: cid,
  };
}

export function openChannelAction(cid: string): channelsActionTypes {
  return {
    type: OPEN_CHANNEL,
    payload: cid,
  };
}
