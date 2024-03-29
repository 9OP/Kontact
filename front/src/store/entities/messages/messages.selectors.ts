/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';
import { IMember, IMessage } from '../../../common/models';
import { selectOpenedChannel } from '../channels/channels.selectors';

export const selectMessages = (
  state: RootState,
): { data: IMessage; author: IMember }[] => {
  const cid = selectOpenedChannel(state).id;
  const messages = Object.values(state.entities.messages?.byId || {}).filter(
    (message: IMessage) => message.channelId === cid,
  );

  return messages.map((message: IMessage) => ({
    data: message,
    author: state.entities.members?.byId?.[message.authorId],
  }));
};
