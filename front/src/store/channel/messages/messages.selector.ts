/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';
import { IMessage } from '../../../common/models/channel.model';

// TODO: Create select member by id function

// TODO: replace author id by author name
export const selectMessages = (state: RootState): IMessage[] => {
  const { messages } = state.channel;
  messages.sort((a, b) => new Date(b.date).getDate() - new Date(a.date).getDate());
  return messages;
};
