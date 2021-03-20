/* eslint-disable import/prefer-default-export */
import { IMessage } from '../../../common/models';
import { messagesActionTypes, RECEIVE_MESSAGES } from './messages.action-types';

export function receiveMessagesAction(
  messages: IMessage[],
): messagesActionTypes {
  return {
    type: RECEIVE_MESSAGES,
    payload: messages,
  };
}
