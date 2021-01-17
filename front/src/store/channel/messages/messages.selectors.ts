/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';
import { selectMember } from '../channel.selectors';
import { IMessage } from '../../../common/models/channel.model';

export const selectMessages = (state: RootState): IMessage[] => {
  const { messages } = state.channel;
  messages.sort((a, b) => b.date.getDate() - a.date.getDate());
  messages.forEach((message: IMessage) => {
    message.author = selectMember(state, message.authorId);
  });
  return messages;
};
