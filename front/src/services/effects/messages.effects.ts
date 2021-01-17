/* eslint-disable import/prefer-default-export */
import { store } from '../../store';
import { addMessageAction } from '../../store/channel/messages/messages.actions';
import * as message from './socket/message.socket';

export const sendMessage = async (cid: string, mess: string): Promise<void> => {
  try {
    await message.send({ message: mess, channel: cid });
  } catch (err) {
    console.log(err);
  }
};

message.receive((data: message.response) => {
  store.dispatch(addMessageAction({
    authorId: data.author,
    content: data.message,
    date: new Date(),
  }));
});
