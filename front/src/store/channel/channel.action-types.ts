import { Action } from 'redux';
import { IChannel } from '../../common/models/channel.model';

/**
 * Api actions
 */
export const CREATE_CHANNEL = '[CHANNEL-INFO] CREATE_CHANNEL';
export const FETCH_CHANNEL = '[CHANNEL-INFO] FETCH_CHANNEL';
export const UPDATE_CHANNEL = '[CHANNEL-INFO] UPDATE_CHANNEL';
export const DELETE_CHANNEL = '[CHANNEL-INFO] DELETE_CHANNEL';

export const CREATE_MEMBERSHIP = '[CHANNEL-INFO] CREATE_MEMBERSHIP';
export const UPDATE_MEMBERSHIP = '[CHANNEL-INFO] UPDATE_MEMBERSHIP';
export const DELETE_MEMBERSHIP = '[CHANNEL-INFO] DELETE_MEMBERSHIP';

/**
 * Channel actions
 */
export const SET_CHANNEL = '[CHANNEL-INFO] SET_CHANNEL';
export const RESET_CHANNEL = '[CHANNEL-INFO] RESET_CHANNEL';

interface setChannelAction extends Action {
  payload: IChannel;
  type: typeof SET_CHANNEL;
}

interface resetChannelAction extends Action {
  type: typeof RESET_CHANNEL;
}

export type channelActionTypes = setChannelAction | resetChannelAction;
