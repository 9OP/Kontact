import { Action } from 'redux';
import { IMessage } from '../../../common/models';

export const RECEIVE_MESSAGES = '[messages] receive_messages';

interface receiveMessages extends Action {
  type: typeof RECEIVE_MESSAGES;
  payload: IMessage[];
}

export type messagesActionTypes = receiveMessages;
