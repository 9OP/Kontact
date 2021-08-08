import { IChannel } from '../../../common/models';
import {
  channelsActionTypes,
  FETCH_CHANNELS,
  CREATE_CHANNEL,
  UPDATE_CHANNEL,
  DELETE_CHANNEL,
  OPEN_CHANNEL,
} from './channels.action-types';

export function fetchChannelsAction(payload: { channels: IChannel[] }): channelsActionTypes {
  return {
    type: FETCH_CHANNELS,
    payload,
  };
}

export function createChannelAction(payload: { channel: IChannel }): channelsActionTypes {
  return {
    type: CREATE_CHANNEL,
    payload,
  };
}

export function updateChannelAction(payload: { channel: IChannel }): channelsActionTypes {
  return {
    type: UPDATE_CHANNEL,
    payload,
  };
}

export function deleteChannelAction(payload: { cid: string }): channelsActionTypes {
  return {
    type: DELETE_CHANNEL,
    payload,
  };
}

export function openChannelAction(payload: { cid: string }): channelsActionTypes {
  return {
    type: OPEN_CHANNEL,
    payload,
  };
}
