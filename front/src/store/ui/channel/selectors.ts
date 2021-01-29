/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';
import { IChannel, IMessage } from '../../../common/models';

export const selectChannel = (state: RootState): IChannel => {
  const cid = state.ui.channel;
  return state.entities.channels[cid];
};

export const selectMessages = (state: RootState): IMessage[] => {
  const cid = state.ui.channel;
  const messages = Object.values(state.entities.messages);
  return messages.filter((message: IMessage) => message.channelId === cid);
};
