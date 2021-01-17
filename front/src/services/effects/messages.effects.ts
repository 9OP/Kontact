/* eslint-disable import/prefer-default-export */
import { store, AppThunk } from '../../store';
import { addMessageAction, sendMessageActions } from '../../store/channel/messages/messages.actions';
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
    authorId: data.author,
    content: data.message,
    date: new Date(),
  }));
});
