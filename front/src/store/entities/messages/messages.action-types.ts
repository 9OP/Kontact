import { Action } from 'redux';
import { IMessage } from '../../../common/models';
import { authActionTypes } from '../../authentication/auth.action-types';

export const RECEIVE_MESSAGES = '[messages] receive_messages';

interface receiveMessages extends Action {
  type: typeof RECEIVE_MESSAGES;
  payload: {messages: IMessage[]};
}

export type messagesActionTypes = authActionTypes | receiveMessages;
