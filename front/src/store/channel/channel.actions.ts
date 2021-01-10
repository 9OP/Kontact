import { IChannel } from '../../common/models/channel.model';
import { apiActionsCreator } from '../api/api.actions';
import {
  FETCH_CHANNEL,
  CREATE_CHANNEL,
  UPDATE_CHANNEL,
  DELETE_CHANNEL,
  CREATE_MEMBERSHIP,
  UPDATE_MEMBERSHIP,
  DELETE_MEMBERSHIP,
  SET_CHANNEL,
  RESET_CHANNEL,
  channelActionTypes,
} from './channel.action-types';

/**
 * Api actions
 */
export const fetchChannelActions = apiActionsCreator(FETCH_CHANNEL);
export const createChannelActions = apiActionsCreator(CREATE_CHANNEL);
export const updateChannelActions = apiActionsCreator(UPDATE_CHANNEL);
export const deleteChannelActions = apiActionsCreator(DELETE_CHANNEL);

export const createMembershipActions = apiActionsCreator(CREATE_MEMBERSHIP);
export const updateMembershipActions = apiActionsCreator(UPDATE_MEMBERSHIP);
export const deleteMembershipActions = apiActionsCreator(DELETE_MEMBERSHIP);

/**
 * Channel actions
 */
export function setChannelAction(channel: IChannel): channelActionTypes {
  return {
    payload: channel,
    type: SET_CHANNEL,
  };
}

export function resetChannelAction(): channelActionTypes {
  return {
    type: RESET_CHANNEL,
  };
}
