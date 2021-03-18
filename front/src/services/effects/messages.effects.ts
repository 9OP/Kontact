/* eslint-disable import/prefer-default-export */
import { store, AppThunk } from '../../store';
import { addMessageAction, fetchMessagesActions, sendMessageActions } from '../../store/entities/messages/messages.actions';
import * as message from './socket/message.socket';

export const sendMessage = (
  cid: string,
  mess: string,
): AppThunk => async (dispatch) => {
  const { request, success, failure } = sendMessageActions;

  dispatch(request());
  try {
    await message.send({ channel: cid, message: mess });
    dispatch(success());
  } catch (err) {
    dispatch(failure(err.message));
  }
};

message.receive((data: message.response) => {
  store.dispatch(addMessageAction({
    id: data.id,
    authorId: data.author,
    channelId: data.channel,
    content: data.message,
    date: new Date(),
  }));
});

export const fetchMessages = (
  cid: string,
): AppThunk => async (dispatch) => {
  const { request, success, failure } = fetchMessagesActions;

  dispatch(request());
  try {
    await message.fetch({ channel: cid });
    dispatch(success());
  } catch (err) {
    dispatch(failure(err.message));
  }
};

message.receiveBatch((data: message.response[]) => {
  data.forEach((mess: message.response) => {
    store.dispatch(addMessageAction({
      id: mess.id,
      authorId: mess.author,
      channelId: mess.channel,
      content: mess.message,
      date: new Date(),
    }));
  });
});
