/* eslint-disable no-case-declarations */
import { IMessage } from '../../../common/models';
import { messagesActionTypes, RECEIVE_MESSAGES } from './messages.action-types';

interface State {
  byId: {
    [id: string]: IMessage;
  };
}

const INITIAL_STATE = {} as State;

export default function membershipsReducer(
  state = INITIAL_STATE,
  action: messagesActionTypes,
): State {
  switch (action.type) {
    case RECEIVE_MESSAGES:
      const messages = action.payload.reduce((acc, message) => {
        acc[message.id] = message;
        return acc;
      }, {} as {[id: string]: IMessage});

      return { byId: { ...state.byId, ...messages } };

    default:
      return state;
  }
}
