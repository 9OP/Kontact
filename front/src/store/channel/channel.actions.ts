import { Action } from 'redux';
import { IChannel } from '../../common/models/channel.model';

export const SET_CHANNEL = '[CHANNEL] SET_CHANNEL';

interface setChannelAction extends Action {
  payload: IChannel;
  type: typeof SET_CHANNEL;
}

// update channel action
// delete channel action

export type channelActionTypes = setChannelAction;

export function setChannelAction(channel: IChannel): channelActionTypes {
  return {
    payload: channel,
    type: SET_CHANNEL,
  };
}
