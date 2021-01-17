import { Action } from 'redux';
import { IMessage } from '../../../common/models/channel.model';
import { apiActionsCreator } from '../../api/api.actions';

/**
 * Socket actions
 */
export const SEND_MESSAGE = '[CHANNEL-MESSAGES] SEND_MESSAGE';

/**
 * Messages actions
 */
export const ADD_MESSAGE = '[CHANNEL-MESSAGES] ADD_MESSAGE';
export const UPDATE_MESSAGE = '[CHANNEL-MESSAGES] UPDATE_MESSAGE';
export const DELETE_MESSAGE = '[CHANNEL-MESSAGES] DELETE_MESSAGE';
export const SET_MESSAGES = '[CHANNEL-MESSAGES] SET_MESSAGES';
export const RESET_MESSAGES = '[CHANNEL-MESSAGES] RESET_MESSAGES';

interface addMessageAction extends Action {
  payload: IMessage;
  type: typeof ADD_MESSAGE;
}

interface updateMessageAction extends Action {
  payload: Partial<IMessage>; // requires messageId
  type: typeof UPDATE_MESSAGE;
}

interface deleteMessageAction extends Action {
  payload: string; // messageId
  type: typeof DELETE_MESSAGE;
}

interface setMessagesAction extends Action {
  payload: IMessage[];
  type: typeof SET_MESSAGES;
}

interface resetMessagesAction extends Action {
  type: typeof RESET_MESSAGES;
}

export type messagesActionTypes =
  | addMessageAction
  | updateMessageAction
  | deleteMessageAction
  | setMessagesAction
  | resetMessagesAction;

/**
 * Messages actions
 */
export function addMessageAction(message: IMessage): messagesActionTypes {
  return {
    payload: message,
    type: ADD_MESSAGE,
  };
}

export const sendMessageActions = apiActionsCreator(SEND_MESSAGE);
